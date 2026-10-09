"use client";

import { useState, useEffect, useRef } from "react";
import {
  RotateCcw,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Flame,
  MousePointer,
  Compass,
  Sparkles,
  Layers,
  ArrowUpDown,
  Eraser,
} from "lucide-react";

interface ClickStat {
  left: number;
  right: number;
  middle: number;
  back: number;
  forward: number;
}

interface ChatterEvent {
  button: string;
  intervalMs: number;
  isChatter: boolean;
  time: string;
}

export default function MouseTester() {
  const [activeButtons, setActiveButtons] = useState<{
    left: boolean;
    right: boolean;
    middle: boolean;
    back: boolean;
    forward: boolean;
  }>({
    left: false,
    right: false,
    middle: false,
    back: false,
    forward: false,
  });

  const [clickCounts, setClickCounts] = useState<ClickStat>({
    left: 0,
    right: 0,
    middle: 0,
    back: 0,
    forward: 0,
  });

  // Tekerlek Durumu
  const [wheelDelta, setWheelDelta] = useState(0);
  const [wheelDirection, setWheelDirection] = useState<"up" | "down" | null>(null);
  const [wheelSteps, setWheelSteps] = useState(0);

  // Çift Tıklama (Switch Chatter / Bouncing) Hata Dedektörü
  const lastClickTimes = useRef<{ [key: string]: number }>({});
  const [chatterHistory, setChatterHistory] = useState<ChatterEvent[]>([]);

  // Polling Rate (Yoklama Oranı - Hz) ve Sensör İzleme
  const [currentHz, setCurrentHz] = useState(0);
  const [maxHz, setMaxHz] = useState(0);
  const [cursorSpeed, setCursorSpeed] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const moveSamplesRef = useRef<number[]>([]);
  const lastMovePosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(true);

  // Polling Rate Hesaplama Döngüsü (100ms aralıklarla örnekleme)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = performance.now();
      // Son 1000ms içindeki hareket olaylarını filtrele
      moveSamplesRef.current = moveSamplesRef.current.filter((t) => now - t <= 1000);
      const hz = moveSamplesRef.current.length;
      setCurrentHz(hz);
      setMaxHz((prev) => (hz > prev ? hz : prev));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const registerClick = (buttonKey: keyof ClickStat, btnName: string) => {
    const now = performance.now();
    const lastTime = lastClickTimes.current[buttonKey] || 0;
    const diff = lastTime > 0 ? Math.round(now - lastTime) : 999;
    lastClickTimes.current[buttonKey] = now;

    // Switch Chatter / Hatalı Çift Tıklama Kriteri: < 80ms
    const isChatter = diff < 80;

    const timeStr = new Date().toLocaleTimeString("tr-TR", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
    });

    setChatterHistory((prev) => [
      {
        button: btnName,
        intervalMs: diff,
        isChatter,
        time: timeStr,
      },
      ...prev.slice(0, 14),
    ]);

    setClickCounts((prev) => ({
      ...prev,
      [buttonKey]: prev[buttonKey] + 1,
    }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.button === 0) {
      setActiveButtons((p) => ({ ...p, left: true }));
      registerClick("left", "Sol Tık");
    } else if (e.button === 1) {
      setActiveButtons((p) => ({ ...p, middle: true }));
      registerClick("middle", "Orta Tık");
    } else if (e.button === 2) {
      setActiveButtons((p) => ({ ...p, right: true }));
      registerClick("right", "Sağ Tık");
    } else if (e.button === 3) {
      setActiveButtons((p) => ({ ...p, back: true }));
      registerClick("back", "Yan Geri");
    } else if (e.button === 4) {
      setActiveButtons((p) => ({ ...p, forward: true }));
      registerClick("forward", "Yan İleri");
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (e.button === 0) setActiveButtons((p) => ({ ...p, left: false }));
    else if (e.button === 1) setActiveButtons((p) => ({ ...p, middle: false }));
    else if (e.button === 2) setActiveButtons((p) => ({ ...p, right: false }));
    else if (e.button === 3) setActiveButtons((p) => ({ ...p, back: false }));
    else if (e.button === 4) setActiveButtons((p) => ({ ...p, forward: false }));
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setWheelDelta((prev) => prev + e.deltaY);
    setWheelSteps((prev) => prev + 1);
    setWheelDirection(e.deltaY < 0 ? "up" : "down");
  };

  const handleMouseMoveArea = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = performance.now();
    moveSamplesRef.current.push(now);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCursorPos({ x, y });

    // Hız hesaplama (px / saniye)
    if (lastMovePosRef.current) {
      const dt = (now - lastMovePosRef.current.time) / 1000;
      if (dt > 0) {
        const dx = x - lastMovePosRef.current.x;
        const dy = y - lastMovePosRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        setCursorSpeed(Math.round(dist / dt));
      }
    }
    lastMovePosRef.current = { x, y, time: now };

    // Çizim yapılıyorsa canvas'a çiz
    if (isDrawing && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const resetAll = () => {
    setClickCounts({ left: 0, right: 0, middle: 0, back: 0, forward: 0 });
    setActiveButtons({ left: false, right: false, middle: false, back: false, forward: false });
    setWheelDelta(0);
    setWheelSteps(0);
    setWheelDirection(null);
    setMaxHz(0);
    setCurrentHz(0);
    setChatterHistory([]);
    clearCanvas();
  };

  return (
    <div className="space-y-6">
      {/* 1. ÜST KONTROL & BİLGİ ALANI */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-5 rounded-3xl bg-base-100 border border-base-300 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge badge-secondary badge-sm font-mono font-bold">
              Fare & Sensör Testi
            </span>
            <span className="badge badge-neutral badge-sm font-mono">
              Toplam Tıklama: {clickCounts.left + clickCounts.right + clickCounts.middle + clickCounts.back + clickCounts.forward}
            </span>
            {currentHz > 0 && (
              <span className="badge badge-primary badge-sm font-mono font-bold animate-pulse">
                {currentHz} Hz (Canlı Yoklama)
              </span>
            )}
          </div>
          <h2 className="text-xl font-black text-base-content flex items-center gap-2">
            <span>Tıklama, Tekerlek, Çift Tık Hata & Polling Rate Testi</span>
          </h2>
          <p className="text-xs text-base-content/70">
            Farenizin tüm butonlarını (Sol, Sağ, Orta, Yan Butonlar), tekerlek kaydırmasını ve sensör yoklama hızını (Hz) test edin.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsDrawing((p) => !p)}
            className={`btn btn-xs font-mono rounded-xl ${
              isDrawing ? "btn-secondary" : "btn-ghost border border-base-content/10"
            }`}
          >
            <span>İz Çizimi: {isDrawing ? "Açık" : "Kapalı"}</span>
          </button>

          <button
            onClick={clearCanvas}
            className="btn btn-xs btn-ghost border border-base-content/10 font-mono gap-1 rounded-xl"
            title="Çizim alanını temizle"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>İzi Temizle</span>
          </button>

          <button
            onClick={resetAll}
            className="btn btn-xs btn-error btn-outline font-mono gap-1 rounded-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* 2. ANA TEST ALANI: GÖRSEL FARE VE HAREKET ALANI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Sol Alan: Görsel Fare & Buton Tıklama Kutusu (5 Kolon) */}
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()}
          onWheel={handleWheel}
          className="lg:col-span-5 p-6 rounded-3xl bg-base-100 border-2 border-dashed border-base-300 hover:border-secondary/50 transition-colors flex flex-col items-center justify-between space-y-6 select-none cursor-pointer group relative shadow-sm"
        >
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-base-content/50">
              Tıklama & Tekerlek Test Alanı
            </span>
            <p className="text-xs text-base-content/70">
              Bu kutunun içinde Sol, Sağ, Orta veya Yan tuşlara tıklayın & tekerleği döndürün.
            </p>
          </div>

          {/* Vektörel Fare Gövdesi */}
          <div className="relative w-48 h-72 rounded-t-[70px] rounded-b-[60px] bg-base-200/90 border-2 border-base-300 shadow-xl p-2 flex flex-col justify-between overflow-hidden">
            {/* Üst Kısım: Sol ve Sağ Butonlar + Tekerlek */}
            <div className="grid grid-cols-2 gap-1.5 h-32 relative">
              {/* Sol Tık Butonu */}
              <div
                className={`rounded-tl-[60px] rounded-bl-xl border flex flex-col items-center justify-center p-2 transition-all ${
                  activeButtons.left
                    ? "bg-secondary text-secondary-content border-secondary scale-95 shadow-lg"
                    : clickCounts.left > 0
                    ? "bg-success/20 text-success border-success/40"
                    : "bg-base-100 text-base-content/70 border-base-300"
                }`}
              >
                <span className="font-mono text-xs font-bold">SOL TIK</span>
                <span className="text-[10px] font-mono opacity-70">#{clickCounts.left}</span>
              </div>

              {/* Sağ Tık Butonu */}
              <div
                className={`rounded-tr-[60px] rounded-br-xl border flex flex-col items-center justify-center p-2 transition-all ${
                  activeButtons.right
                    ? "bg-secondary text-secondary-content border-secondary scale-95 shadow-lg"
                    : clickCounts.right > 0
                    ? "bg-success/20 text-success border-success/40"
                    : "bg-base-100 text-base-content/70 border-base-300"
                }`}
              >
                <span className="font-mono text-xs font-bold">SAĞ TIK</span>
                <span className="text-[10px] font-mono opacity-70">#{clickCounts.right}</span>
              </div>

              {/* Orta Tekerlek (Scroll Wheel) */}
              <div
                className={`absolute left-1/2 top-4 -translate-x-1/2 w-8 h-16 rounded-full border-2 flex flex-col items-center justify-center z-10 transition-all ${
                  activeButtons.middle
                    ? "bg-primary text-primary-content border-primary scale-95 shadow-md"
                    : wheelSteps > 0
                    ? "bg-accent/20 text-accent border-accent/40"
                    : "bg-base-300 text-base-content/80 border-base-content/20"
                }`}
              >
                <span className="text-[9px] font-mono font-black">
                  {wheelDirection === "up" ? "▲" : wheelDirection === "down" ? "▼" : "•"}
                </span>
                <span className="text-[8px] font-mono">#{clickCounts.middle}</span>
              </div>
            </div>

            {/* Yan Butonlar (Geri / İleri) */}
            <div className="absolute left-0 top-36 flex flex-col gap-1 -translate-x-1">
              <div
                className={`w-4 h-9 rounded-r-md border text-[8px] flex items-center justify-center font-mono ${
                  activeButtons.forward ? "bg-warning text-warning-content" : "bg-base-300 border-base-content/20"
                }`}
                title="Yan İleri (Mouse 5)"
              >
                ►
              </div>
              <div
                className={`w-4 h-9 rounded-r-md border text-[8px] flex items-center justify-center font-mono ${
                  activeButtons.back ? "bg-warning text-warning-content" : "bg-base-300 border-base-content/20"
                }`}
                title="Yan Geri (Mouse 4)"
              >
                ◄
              </div>
            </div>

            {/* Fare Avuç İçi Logosu / Gövdesi */}
            <div className="flex-1 flex flex-col items-center justify-center text-base-content/30 space-y-1">
              <MousePointer className="w-8 h-8 opacity-40" />
              <span className="text-[10px] font-mono tracking-widest uppercase">TEST ALANI</span>
            </div>
          </div>

          {/* Tekerlek Sayaçları */}
          <div className="w-full grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-base-200/60 border border-base-300 text-center">
              <span className="text-base-content/50 block text-[10px]">Tekerlek Yönü:</span>
              <span className="font-bold text-accent">
                {wheelDirection === "up" ? "▲ YUKARI" : wheelDirection === "down" ? "▼ AŞAĞI" : "Hareketsiz"}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-base-200/60 border border-base-300 text-center">
              <span className="text-base-content/50 block text-[10px]">Toplam Adım:</span>
              <span className="font-bold text-base-content">{wheelSteps} Tick</span>
            </div>
          </div>
        </div>

        {/* Sağ Alan: Polling Rate (Hz) & Sensör Hareket Pedi (7 Kolon) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Sensör Hareket ve Çizim Pedi */}
          <div
            onMouseMove={handleMouseMoveArea}
            className="flex-1 min-h-[300px] p-4 rounded-3xl bg-[#1e1e2e] border-2 border-base-300 relative overflow-hidden cursor-crosshair shadow-inner flex flex-col justify-between"
          >
            {/* Çizim Tuvali */}
            <canvas
              ref={canvasRef}
              width={600}
              height={320}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* Üst Bilgi Rozetleri */}
            <div className="relative z-10 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="badge badge-warning font-mono font-bold text-xs">
                  {currentHz} Hz (Anlık)
                </span>
                <span className="badge badge-neutral font-mono text-xs">
                  Max: {maxHz} Hz
                </span>
              </div>

              <div className="text-[11px] font-mono text-white/60">
                X: {cursorPos.x}px | Y: {cursorPos.y}px | Hız: {cursorSpeed} px/sn
              </div>
            </div>

            {/* Orta İpucu */}
            <div className="relative z-10 text-center pointer-events-none select-none py-12">
              <div className="text-sm font-bold font-mono text-white/80">
                Farenizi bu alan üzerinde hızlıca dairesel hareket ettirin
              </div>
              <p className="text-xs text-white/40 mt-1">
                Sensör pürüzsüzlüğü, piksel atlama (jitter) ve canlı Polling Rate (Yoklama Oranı) anlık ölçülür.
              </p>
            </div>

            {/* Alt Standart Kategori Barı */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60 pt-2 border-t border-white/10">
              <span>125 Hz (Ofis)</span>
              <span>500 Hz (Oyun)</span>
              <span>1000 Hz (1ms Espor)</span>
              <span>4000+ Hz (Hi-End)</span>
            </div>
          </div>

          {/* Çift Tıklama / Debounce Hata Paneli */}
          <div className="p-4 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span>Çift Tıklama Hata Dedektörü (Switch Chatter / Debounce)</span>
              </h3>
              <span className="text-[10px] font-mono text-base-content/40">Eşik: &lt; 80ms</span>
            </div>

            <div className="max-h-28 overflow-y-auto space-y-1.5 font-mono text-xs pr-1">
              {chatterHistory.length === 0 ? (
                <div className="text-center p-3 text-base-content/50 border border-dashed border-base-300 rounded-xl text-[11px]">
                  Butonlara bastıkça iki tıklama arasındaki milisaniye (ms) süresi burada test edilir.
                </div>
              ) : (
                chatterHistory.map((ev, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl border flex items-center justify-between text-[11px] ${
                      ev.isChatter
                        ? "bg-error/15 border-error/40 text-error font-bold animate-pulse"
                        : ev.intervalMs < 200
                        ? "bg-warning/10 border-warning/30 text-warning-content"
                        : "bg-base-200/50 border-base-300 text-base-content/80"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{ev.button}</span>
                      {ev.isChatter ? (
                        <span className="badge badge-error badge-xs font-bold text-[9px]">
                          HATALI ÇİFT TIKLAMA!
                        </span>
                      ) : ev.intervalMs < 200 ? (
                        <span className="badge badge-warning badge-xs text-[9px]">Seri Çift Tık</span>
                      ) : (
                        <span className="badge badge-ghost badge-xs text-[9px]">Tek Tık</span>
                      )}
                    </div>
                    <span className="font-mono font-bold">{ev.intervalMs} ms</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
