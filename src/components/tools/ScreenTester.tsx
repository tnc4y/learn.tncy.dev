"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Monitor,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Eye,
  Info,
  Check,
  ChevronRight,
  Gauge,
  Palette,
} from "lucide-react";

type ScreenSubTab = "dead_pixel" | "refresh_rate" | "ghosting" | "gradient";

const PIXEL_COLORS = [
  { name: "Siyah (Işık Sızması & Beyaz Piksel)", hex: "#000000", text: "#ffffff" },
  { name: "Beyaz (Ölü Siyah Piksel)", hex: "#ffffff", text: "#000000" },
  { name: "Saf Kırmızı (Sub-pixel Kırmızı)", hex: "#ff0000", text: "#ffffff" },
  { name: "Saf Yeşil (Sub-pixel Yeşil)", hex: "#00ff00", text: "#000000" },
  { name: "Saf Mavi (Sub-pixel Mavi)", hex: "#0000ff", text: "#ffffff" },
  { name: "Sarı (Kırmızı + Yeşil)", hex: "#ffff00", text: "#000000" },
  { name: "Cyan (Yeşil + Mavi)", hex: "#00ffff", text: "#000000" },
  { name: "Macenta (Kırmızı + Mavi)", hex: "#ff00ff", text: "#ffffff" },
];

export default function ScreenTester() {
  const [activeSubTab, setActiveSubTab] = useState<ScreenSubTab>("dead_pixel");

  // ----------------------------------------------------
  // 1. ÖLÜ PİKSEL TESTİ STATE
  // ----------------------------------------------------
  const [colorIndex, setColorIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControlsHint, setShowControlsHint] = useState(true);
  const deadPixelContainerRef = useRef<HTMLDivElement>(null);

  const nextColor = useCallback(() => {
    setColorIndex((prev) => (prev + 1) % PIXEL_COLORS.length);
  }, []);

  const prevColor = useCallback(() => {
    setColorIndex((prev) => (prev - 1 + PIXEL_COLORS.length) % PIXEL_COLORS.length);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (deadPixelContainerRef.current) {
          await deadPixelContainerRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn("Fullscreen hatası:", err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Klavye ile renk değiştirme
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeSubTab === "dead_pixel") {
        if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
          nextColor();
        } else if (e.key === "ArrowLeft") {
          prevColor();
        } else if (e.key === "f" || e.key === "F") {
          toggleFullscreen();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSubTab, nextColor, prevColor]);

  // ----------------------------------------------------
  // 2. YENİLEME HIZI (Hz) & FPS SAYACI STATE
  // ----------------------------------------------------
  const [measuredHz, setMeasuredHz] = useState<number>(60);
  const [currentFps, setCurrentFps] = useState<number>(60);
  const [frameTimeMs, setFrameTimeMs] = useState<number>(16.6);
  const [frameHistory, setFrameHistory] = useState<number[]>([]);
  const ufoCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (activeSubTab !== "refresh_rate" && activeSubTab !== "ghosting") return;

    let frameCount = 0;
    let lastTime = performance.now();
    let sampleStartTime = performance.now();
    let samples: number[] = [];

    const canvas = ufoCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    let ufoX = 0;

    const loop = (currentTime: number) => {
      frameCount++;
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      const instantFps = delta > 0 ? 1000 / delta : 60;
      samples.push(instantFps);

      // Her 500ms'de bir ortalama Hz ve FPS hesapla
      if (currentTime - sampleStartTime >= 500) {
        const avgFps = Math.round(samples.reduce((a, b) => a + b, 0) / samples.length);
        setCurrentFps(avgFps);
        setMeasuredHz(avgFps);
        setFrameTimeMs(Number((1000 / (avgFps || 60)).toFixed(2)));

        setFrameHistory((prev) => [...prev.slice(-30), avgFps]);
        samples = [];
        sampleStartTime = currentTime;
      }

      // Animasyon Çizimi (UFO / Hızlı Şerit)
      if (canvas && ctx) {
        ctx.fillStyle = "#11111b";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid çizgileri
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }

        // Hız 1: 960 px/saniye
        const speed = (canvas.width * 0.8 * (delta / 1000)) || 8;
        ufoX = (ufoX + speed) % canvas.width;

        // Üst Şerit (Tam Hız)
        const rowHeight = canvas.height / 3;

        // 1. Şerit: Tam Panel Hızı
        ctx.fillStyle = "#10b981";
        ctx.fillRect(ufoX, 20, 60, 30);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px monospace";
        ctx.fillText(`${measuredHz} Hz`, ufoX + 10, 40);

        // 2. Şerit: Yarı Hız (60 Hz eşdeğeri benzetim)
        const halfX = (ufoX * 0.5) % canvas.width;
        ctx.fillStyle = "#0284c7";
        ctx.fillRect(halfX, rowHeight + 20, 60, 30);
        ctx.fillStyle = "#ffffff";
        ctx.fillText("60 Hz Ref", halfX + 8, rowHeight + 40);

        // 3. Şerit: Çeyrek Hız (30 Hz eşdeğeri benzetim)
        const quarterX = (ufoX * 0.25) % canvas.width;
        ctx.fillStyle = "#f59e0b";
        ctx.fillRect(quarterX, rowHeight * 2 + 20, 60, 30);
        ctx.fillStyle = "#ffffff";
        ctx.fillText("30 Hz Ref", quarterX + 8, rowHeight * 2 + 40);
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [activeSubTab, measuredHz]);

  // ----------------------------------------------------
  // 3. GHOSTING TESTİ STATE
  // ----------------------------------------------------
  const [ghostingSpeed, setGhostingSpeed] = useState<number>(12); // px per frame
  const ghostingCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (activeSubTab !== "ghosting") return;

    const canvas = ghostingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let posX = 0;
    let animId: number;

    const render = () => {
      // Arka plan rengi (Koyu Gri - Ghosting'in en belirgin olduğu ton)
      ctx.fillStyle = "#1e1e2e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      posX = (posX + ghostingSpeed) % canvas.width;

      // 1. Satır: Mavi Blok (Cyan üzerinde)
      ctx.fillStyle = "#00d2ff";
      ctx.fillRect(posX, 30, 80, 50);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px monospace";
      ctx.fillText("CYAN", posX + 22, 60);

      // 2. Satır: Yüksek Kontrast Beyaz Blok
      ctx.fillStyle = "#ffffff";
      ctx.fillRect((posX + 100) % canvas.width, 110, 80, 50);
      ctx.fillStyle = "#000000";
      ctx.fillText("WHITE", ((posX + 100) % canvas.width) + 20, 140);

      // 3. Satır: Kırmızı Blok (Karanlık zemin)
      ctx.fillStyle = "#ef4444";
      ctx.fillRect((posX + 200) % canvas.width, 190, 80, 50);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("RED", ((posX + 200) % canvas.width) + 26, 220);

      // Dikey referans çizgisi
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [activeSubTab, ghostingSpeed]);

  const currentColor = PIXEL_COLORS[colorIndex];

  return (
    <div className="space-y-6">
      {/* Üst Alt Sekmeler */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-base-300">
        <button
          onClick={() => setActiveSubTab("dead_pixel")}
          className={`btn btn-sm font-mono text-xs rounded-xl gap-2 transition-all ${
            activeSubTab === "dead_pixel"
              ? "btn-primary shadow-xs font-bold text-white"
              : "btn-ghost border border-base-content/10 text-base-content/75"
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Ölü Piksel Testi</span>
        </button>

        <button
          onClick={() => setActiveSubTab("refresh_rate")}
          className={`btn btn-sm font-mono text-xs rounded-xl gap-2 transition-all ${
            activeSubTab === "refresh_rate"
              ? "btn-primary shadow-xs font-bold text-white"
              : "btn-ghost border border-base-content/10 text-base-content/75"
          }`}
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>Tazeleme Hızı (Hz & FPS)</span>
        </button>

        <button
          onClick={() => setActiveSubTab("ghosting")}
          className={`btn btn-sm font-mono text-xs rounded-xl gap-2 transition-all ${
            activeSubTab === "ghosting"
              ? "btn-primary shadow-xs font-bold text-white"
              : "btn-ghost border border-base-content/10 text-base-content/75"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Ghosting & Tepki Süresi</span>
        </button>

        <button
          onClick={() => setActiveSubTab("gradient")}
          className={`btn btn-sm font-mono text-xs rounded-xl gap-2 transition-all ${
            activeSubTab === "gradient"
              ? "btn-primary shadow-xs font-bold text-white"
              : "btn-ghost border border-base-content/10 text-base-content/75"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Renk Gradyanı & Bantlanma</span>
        </button>
      </div>

      {/* =======================================================
          1. ÖLÜ PİKSEL TESTİ
          ======================================================= */}
      {activeSubTab === "dead_pixel" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-base-200/50 border border-base-300">
            <div>
              <h3 className="font-bold text-base text-base-content flex items-center gap-2">
                <Monitor className="w-4 h-4 text-primary" />
                <span>Ölü & Sıkışmış (Stuck) Piksel Kontrolü</span>
              </h3>
              <p className="text-xs text-base-content/70 mt-0.5">
                Piksel hatalarını tespit etmek için tam ekrana geçin. Boşluk (Space) veya yön tuşlarıyla renkleri değiştirin.
              </p>
            </div>
            <button
              onClick={toggleFullscreen}
              className="btn btn-primary btn-sm font-mono text-xs rounded-xl gap-2 text-white shrink-0 shadow-sm"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Başlat (F)"}</span>
            </button>
          </div>

          {/* Test Alanı (Tıklanabilir) */}
          <div
            ref={deadPixelContainerRef}
            onClick={nextColor}
            className="relative w-full h-[360px] sm:h-[420px] rounded-2xl border border-base-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center transition-colors shadow-inner select-none"
            style={{ backgroundColor: currentColor.hex }}
          >
            {/* HUD / Bilgi Kutusu */}
            <div
              className={`p-4 rounded-xl backdrop-blur-md border shadow-xl transition-all duration-300 text-center space-y-2 pointer-events-none max-w-sm ${
                currentColor.hex === "#000000"
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-black/40 border-black/20 text-white"
              }`}
            >
              <div className="font-mono text-xs font-bold uppercase tracking-wider opacity-80">
                Mevcut Renk ({colorIndex + 1}/{PIXEL_COLORS.length})
              </div>
              <div className="text-lg font-black">{currentColor.name}</div>
              <div className="font-mono text-xs opacity-75">{currentColor.hex}</div>
              <div className="pt-2 text-[11px] opacity-90 border-t border-white/10 flex items-center justify-center gap-3">
                <span>🖱️ Tıkla / Boşluk: Sonraki</span>
                <span>⌨️ F: Tam Ekran</span>
              </div>
            </div>

            {/* Alt Renk Paleti Hızlı Seçici */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20"
            >
              {PIXEL_COLORS.map((c, idx) => (
                <button
                  key={c.hex}
                  onClick={() => setColorIndex(idx)}
                  className={`w-5 h-5 rounded-full border-2 transition-transform ${
                    colorIndex === idx ? "scale-125 border-white shadow-md" : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-base-200/40 border border-base-300 text-xs text-base-content/80 space-y-1.5">
            <div className="font-bold text-base-content flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-primary" />
              <span>Piksel Türleri Nasıl Teşhis Edilir?</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 text-[11px]">
              <li className="p-2 rounded-lg bg-base-100 border border-base-300">
                <span className="font-bold text-rose-500">• Ölü Piksel (Dead Pixel):</span> Transistörü tamamen kapalı kalmıştır; tüm renklerde siyah bir nokta olarak görünür.
              </li>
              <li className="p-2 rounded-lg bg-base-100 border border-base-300">
                <span className="font-bold text-amber-500">• Sıkışmış Piksel (Stuck):</span> Belirli bir sub-pixel (Kırmızı, Yeşil veya Mavi) sürekli yanık kalır; siyah ekranda parlak nokta olarak sırıtır.
              </li>
              <li className="p-2 rounded-lg bg-base-100 border border-base-300">
                <span className="font-bold text-sky-500">• Işık Sızması (Backlight Bleed):</span> IPS panellerde siyah ekranda panelin kenarlarından sarımsı/beyazımsı ışık taşmasıdır.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* =======================================================
          2. TAZELEME HIZI (Hz & FPS SAYACI)
          ======================================================= */}
      {activeSubTab === "refresh_rate" && (
        <div className="space-y-6">
          {/* Gösterge Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-base-200/50 border border-base-300 text-center space-y-1">
              <span className="text-xs font-mono text-base-content/60 uppercase">Algılanan Panel Hızı</span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-primary flex items-center justify-center gap-1">
                <span>{measuredHz}</span>
                <span className="text-lg text-primary/70">Hz</span>
              </div>
              <span className="text-[10px] font-mono text-success font-semibold">
                {measuredHz >= 120 ? "✓ Yüksek Yenileme (High Refresh)" : "Standart 60Hz Panel"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-base-200/50 border border-base-300 text-center space-y-1">
              <span className="text-xs font-mono text-base-content/60 uppercase">Anlık Tarayıcı FPS</span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-secondary flex items-center justify-center gap-1">
                <span>{currentFps}</span>
                <span className="text-lg text-secondary/70">FPS</span>
              </div>
              <span className="text-[10px] font-mono text-base-content/50">
                requestAnimationFrame senkronu
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-base-200/50 border border-base-300 text-center space-y-1">
              <span className="text-xs font-mono text-base-content/60 uppercase">Kare Zamanı (Frame Time)</span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-accent flex items-center justify-center gap-1">
                <span>{frameTimeMs}</span>
                <span className="text-lg text-accent/70">ms</span>
              </div>
              <span className="text-[10px] font-mono text-base-content/50">
                Her yeni kare arasındaki süre
              </span>
            </div>
          </div>

          {/* UFO / Akıcılık Canvas Çizimi */}
          <div className="p-4 rounded-2xl bg-[#11111b] border border-base-300 space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono text-white/70 px-1">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Akıcılık & Hız Karşılaştırma Şeridi (UFO Benchmark Tarzı)</span>
              </span>
              <span className="text-[10px] text-white/40">Gözlerinizle hareket eden nesneleri takip edin</span>
            </div>

            <canvas
              ref={ufoCanvasRef}
              width={760}
              height={220}
              className="w-full h-[220px] rounded-xl border border-white/10 block"
            />
          </div>

          <div className="p-4 rounded-xl bg-base-200/40 border border-base-300 text-xs text-base-content/80 leading-relaxed">
            <strong className="text-base-content font-bold">Nasıl Yorumlanır?</strong> 144Hz veya 240Hz gibi yüksek tazeleme hızına sahip bir ekranda, en üstteki yeşil şerit son derece akıcı ve net görünürken; altındaki 60Hz ve 30Hz şeritleri belirgin şekilde takılarak ve titreyerek ilerler. Ekranınız 60Hz ise en üstteki şerit de 60 FPS hızında kilitlenecektir.
          </div>
        </div>
      )}

      {/* =======================================================
          3. GHOSTING & TEPKİ SÜRESİ TESTİ
          ======================================================= */}
      {activeSubTab === "ghosting" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-base-200/50 border border-base-300">
            <div>
              <h3 className="font-bold text-base text-base-content flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span>Panel Ghosting & Hareket İzi (Inverse Ghosting / Overshoot)</span>
              </h3>
              <p className="text-xs text-base-content/70 mt-0.5">
                Yüksek kontrastlı pikseller kayarken arkasında koyu veya açık gölge izi (ghost trail) bırakıyor mu gözlemleyin.
              </p>
            </div>

            {/* Hız Kontrolü */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-base-content/60">Hız:</span>
              {[6, 12, 18, 24].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setGhostingSpeed(spd)}
                  className={`btn btn-xs font-mono rounded-lg ${
                    ghostingSpeed === spd ? "btn-primary text-white font-bold" : "btn-ghost border border-base-content/10"
                  }`}
                >
                  {spd} px
                </button>
              ))}
            </div>
          </div>

          {/* Ghosting Canvas */}
          <div className="p-4 rounded-2xl bg-[#1e1e2e] border border-base-300 shadow-inner">
            <canvas
              ref={ghostingCanvasRef}
              width={760}
              height={260}
              className="w-full h-[260px] rounded-xl border border-white/10 block"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-base-content/80">
            <div className="p-3.5 rounded-xl bg-base-200/40 border border-base-300 space-y-1">
              <span className="font-bold text-base-content">Ghosting (Karanlık İz):</span>
              <p className="text-[11px] leading-relaxed">
                Kayan kutunun arkasında koyu bir kuyruk kalıyorsa piksellerin renk değiştirme hızı (GtG - Gray to Gray) panelin yenileme hızına yetişemiyordur (Özellikle VA panellerde yaygındır).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-base-200/40 border border-base-300 space-y-1">
              <span className="font-bold text-base-content">Overshoot / Inverse Ghosting:</span>
              <p className="text-[11px] leading-relaxed">
                Kutunun önünde veya arkasında parlak beyaz bir hale oluşuyorsa monitörünüzün Overdrive (Tepki Süresi Hızlandırma) ayarı çok yüksektir; menüden bir kademe düşürün.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          4. RENK GRADYANI & BANTLANMA TESTİ
          ======================================================= */}
      {activeSubTab === "gradient" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300">
            <h3 className="font-bold text-base text-base-content flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" />
              <span>Renk Bantlanması (Color Banding) & 8-bit/10-bit Doğruluğu</span>
            </h3>
            <p className="text-xs text-base-content/70 mt-1">
              Aşağıdaki gradyan geçişlerinde belirgin keskin basamaklar (çizgiler) yerine pürüzsüz ipeksi bir geçiş görmelisiniz.
            </p>
          </div>

          {/* Gradyan Çubukları */}
          <div className="space-y-3 p-5 rounded-2xl bg-base-100 border border-base-300">
            {/* Gri Tonlama (256 Seviye) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-base-content/60">
                <span>Gri Tonlama (Black to White)</span>
                <span>256 Ton</span>
              </div>
              <div
                className="w-full h-12 rounded-xl border border-base-content/10 shadow-inner"
                style={{
                  background: "linear-gradient(to right, #000000 0%, #808080 50%, #ffffff 100%)",
                }}
              />
            </div>

            {/* Kırmızı Gradyan */}
            <div className="space-y-1">
              <div className="text-xs font-mono text-base-content/60">Kırmızı (Red Channel)</div>
              <div
                className="w-full h-8 rounded-lg border border-base-content/10 shadow-inner"
                style={{
                  background: "linear-gradient(to right, #000000 0%, #ff0000 100%)",
                }}
              />
            </div>

            {/* Yeşil Gradyan */}
            <div className="space-y-1">
              <div className="text-xs font-mono text-base-content/60">Yeşil (Green Channel)</div>
              <div
                className="w-full h-8 rounded-lg border border-base-content/10 shadow-inner"
                style={{
                  background: "linear-gradient(to right, #000000 0%, #00ff00 100%)",
                }}
              />
            </div>

            {/* Mavi Gradyan */}
            <div className="space-y-1">
              <div className="text-xs font-mono text-base-content/60">Mavi (Blue Channel)</div>
              <div
                className="w-full h-8 rounded-lg border border-base-content/10 shadow-inner"
                style={{
                  background: "linear-gradient(to right, #000000 0%, #0000ff 100%)",
                }}
              />
            </div>

            {/* Tam Spektrum Gökkuşağı */}
            <div className="space-y-1">
              <div className="text-xs font-mono text-base-content/60">Tam Spektrum (Full RGB Spectrum)</div>
              <div
                className="w-full h-10 rounded-xl border border-base-content/10 shadow-inner"
                style={{
                  background:
                    "linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
