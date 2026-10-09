"use client";

import { useState, useEffect, useRef } from "react";
import {
  RotateCcw,
  Volume2,
  VolumeX,
  Shield,
  Activity,
  CheckCircle2,
  Sparkles,
  Info,
  Clock,
  Layers,
  Flame,
} from "lucide-react";

interface KeyDef {
  code: string;
  labelEn: string;
  labelTr?: string;
  width?: string; // Tailwind class, e.g. "w-12"
}

// Klavye Satırları Tanımı
const KEYBOARD_ROWS: KeyDef[][] = [
  // 1. Fonksiyon Satırı
  [
    { code: "Escape", labelEn: "ESC", width: "w-10 sm:w-12" },
    { code: "F1", labelEn: "F1" },
    { code: "F2", labelEn: "F2" },
    { code: "F3", labelEn: "F3" },
    { code: "F4", labelEn: "F4" },
    { code: "F5", labelEn: "F5" },
    { code: "F6", labelEn: "F6" },
    { code: "F7", labelEn: "F7" },
    { code: "F8", labelEn: "F8" },
    { code: "F9", labelEn: "F9" },
    { code: "F10", labelEn: "F10" },
    { code: "F11", labelEn: "F11" },
    { code: "F12", labelEn: "F12" },
    { code: "PrintScreen", labelEn: "PRT" },
    { code: "ScrollLock", labelEn: "SCR" },
    { code: "Pause", labelEn: "PAU" },
  ],
  // 2. Sayı Satırı
  [
    { code: "Backquote", labelEn: "` ~", labelTr: '" é' },
    { code: "Digit1", labelEn: "1 !" },
    { code: "Digit2", labelEn: "2 @" },
    { code: "Digit3", labelEn: "3 #" },
    { code: "Digit4", labelEn: "4 $" },
    { code: "Digit5", labelEn: "5 %" },
    { code: "Digit6", labelEn: "6 ^" },
    { code: "Digit7", labelEn: "7 &" },
    { code: "Digit8", labelEn: "8 *" },
    { code: "Digit9", labelEn: "9 (" },
    { code: "Digit0", labelEn: "0 )" },
    { code: "Minus", labelEn: "- _" },
    { code: "Equal", labelEn: "= +" },
    { code: "Backspace", labelEn: "BACKSPACE", width: "w-16 sm:w-20" },
    { code: "Insert", labelEn: "INS" },
    { code: "Home", labelEn: "HOM" },
    { code: "PageUp", labelEn: "PGU" },
  ],
  // 3. QWERTY Satırı
  [
    { code: "Tab", labelEn: "TAB", width: "w-14 sm:w-16" },
    { code: "KeyQ", labelEn: "Q" },
    { code: "KeyW", labelEn: "W" },
    { code: "KeyE", labelEn: "E" },
    { code: "KeyR", labelEn: "R" },
    { code: "KeyT", labelEn: "T" },
    { code: "KeyY", labelEn: "Y" },
    { code: "KeyU", labelEn: "U" },
    { code: "KeyI", labelEn: "I", labelTr: "I" },
    { code: "KeyO", labelEn: "O" },
    { code: "KeyP", labelEn: "P" },
    { code: "BracketLeft", labelEn: "[ {", labelTr: "Ğ" },
    { code: "BracketRight", labelEn: "] }", labelTr: "Ü" },
    { code: "Backslash", labelEn: "\\ |", width: "w-12 sm:w-14" },
    { code: "Delete", labelEn: "DEL" },
    { code: "End", labelEn: "END" },
    { code: "PageDown", labelEn: "PGD" },
  ],
  // 4. Ana (Home) Satırı
  [
    { code: "CapsLock", labelEn: "CAPS", width: "w-16 sm:w-18" },
    { code: "KeyA", labelEn: "A" },
    { code: "KeyS", labelEn: "S" },
    { code: "KeyD", labelEn: "D" },
    { code: "KeyF", labelEn: "F" },
    { code: "KeyG", labelEn: "G" },
    { code: "KeyH", labelEn: "H" },
    { code: "KeyJ", labelEn: "J" },
    { code: "KeyK", labelEn: "K" },
    { code: "KeyL", labelEn: "L" },
    { code: "Semicolon", labelEn: "; :", labelTr: "Ş" },
    { code: "Quote", labelEn: "' \"", labelTr: "İ" },
    { code: "Enter", labelEn: "ENTER", width: "w-20 sm:w-24" },
  ],
  // 5. Alt Harf Satırı
  [
    { code: "ShiftLeft", labelEn: "SHIFT", width: "w-20 sm:w-24" },
    { code: "KeyZ", labelEn: "Z" },
    { code: "KeyX", labelEn: "X" },
    { code: "KeyC", labelEn: "C" },
    { code: "KeyV", labelEn: "V" },
    { code: "KeyB", labelEn: "B" },
    { code: "KeyN", labelEn: "N" },
    { code: "KeyM", labelEn: "M" },
    { code: "Comma", labelEn: ", <", labelTr: "Ö" },
    { code: "Period", labelEn: ". >", labelTr: "Ç" },
    { code: "Slash", labelEn: "/ ?", labelTr: ". :" },
    { code: "ShiftRight", labelEn: "SHIFT", width: "w-24 sm:w-28" },
    { code: "ArrowUp", labelEn: "▲" },
  ],
  // 6. Değiştirici (Modifier) Satırı
  [
    { code: "ControlLeft", labelEn: "CTRL", width: "w-12 sm:w-14" },
    { code: "MetaLeft", labelEn: "WIN", width: "w-10 sm:w-12" },
    { code: "AltLeft", labelEn: "ALT", width: "w-10 sm:w-12" },
    { code: "Space", labelEn: "SPACE", width: "flex-1 min-w-[140px]" },
    { code: "AltRight", labelEn: "ALT GR", width: "w-12 sm:w-14" },
    { code: "MetaRight", labelEn: "WIN", width: "w-10 sm:w-12" },
    { code: "ContextMenu", labelEn: "MENU", width: "w-10 sm:w-12" },
    { code: "ControlRight", labelEn: "CTRL", width: "w-12 sm:w-14" },
    { code: "ArrowLeft", labelEn: "◄" },
    { code: "ArrowDown", labelEn: "▼" },
    { code: "ArrowRight", labelEn: "►" },
  ],
];

export default function KeyboardTester() {
  const [layout, setLayout] = useState<"TR" | "EN">("TR");
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [testedKeys, setTestedKeys] = useState<Set<string>>(new Set());
  const [lastEvent, setLastEvent] = useState<{
    key: string;
    code: string;
    keyCode: number;
    location: number;
    time: string;
    repeat: boolean;
  } | null>(null);
  const [eventHistory, setEventHistory] = useState<
    { key: string; code: string; type: "down" | "up"; time: string }[]
  >([]);
  const [maxRollover, setMaxRollover] = useState(0);
  const [preventDefaultShortcuts, setPreventDefaultShortcuts] = useState(true);
  const [soundMode, setSoundMode] = useState<"clicky" | "tactile" | "off">("clicky");

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio Switch Sesi Sentezleme
  const playSwitchSound = (type: "clicky" | "tactile") => {
    if (typeof window === "undefined") return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === "clicky") {
        // Mavi switch yüksek keskin tıkırtı (High Click)
        osc.type = "sine";
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } else {
        // Kahverengi switch tok tıkırtı (Dull Thud)
        osc.type = "triangle";
        osc.frequency.setValueAtTime(650, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      }
    } catch {
      // Audio not permitted or supported
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tarayıcının varsayılan kısayollarını (F5, Tab, Alt vb.) engelle
      if (
        preventDefaultShortcuts &&
        [
          "Tab",
          "AltLeft",
          "AltRight",
          "F5",
          "F1",
          "F3",
          "F7",
          "F11",
          "F12",
          "Backspace",
          "Space",
        ].includes(e.code)
      ) {
        e.preventDefault();
      }

      if (soundMode !== "off" && !e.repeat) {
        playSwitchSound(soundMode);
      }

      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.add(e.code);
        if (next.size > maxRollover) {
          setMaxRollover(next.size);
        }
        return next;
      });

      setTestedKeys((prev) => {
        const next = new Set(prev);
        next.add(e.code);
        return next;
      });

      const now = new Date().toLocaleTimeString("tr-TR", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
      });

      setLastEvent({
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        location: e.location,
        time: now,
        repeat: e.repeat,
      });

      setEventHistory((prev) => [
        { key: e.key, code: e.code, type: "down", time: now },
        ...prev.slice(0, 19),
      ]);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });

      const now = new Date().toLocaleTimeString("tr-TR", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
      });

      setEventHistory((prev) => [
        { key: e.key, code: e.code, type: "up", time: now },
        ...prev.slice(0, 19),
      ]);
    };

    const handleBlur = () => {
      // Sekme odağı kaybedilirse takılı kalan tuşları temizle
      setActiveKeys(new Set());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [preventDefaultShortcuts, soundMode, maxRollover]);

  const resetTest = () => {
    setActiveKeys(new Set());
    setTestedKeys(new Set());
    setMaxRollover(0);
    setLastEvent(null);
    setEventHistory([]);
  };

  const totalPossibleKeys = KEYBOARD_ROWS.reduce((acc, row) => acc + row.length, 0);
  const testedCount = testedKeys.size;
  const progressPercent = Math.round((testedCount / totalPossibleKeys) * 100);

  return (
    <div className="space-y-6">
      {/* 1. ÜST KONTROL BAR VE İSTATİSTİKLER */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-5 rounded-3xl bg-base-100 border border-base-300 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge badge-primary badge-sm font-mono font-bold">
              Klavye & Anti-Ghosting
            </span>
            <span className="badge badge-neutral badge-sm font-mono">
              {testedCount} / {totalPossibleKeys} Tuş (%{progressPercent})
            </span>
            {activeKeys.size > 1 && (
              <span className="badge badge-secondary badge-sm font-mono animate-pulse">
                {activeKeys.size} Tuş Basılı (Eşzamanlı)
              </span>
            )}
          </div>
          <h2 className="text-xl font-black text-base-content flex items-center gap-2">
            <span>İnteraktif Klavye & Rollover (NKRO) Testi</span>
          </h2>
          <p className="text-xs text-base-content/70">
            Klavyenizdeki herhangi bir tuşa basın. Çalışan tuşlar yeşil yanar, takılı kalan veya algılanmayan tuşlar anında tespit edilir.
          </p>
        </div>

        {/* Kontrol Düğmeleri */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Düzen Seçici */}
          <div className="join">
            <button
              onClick={() => setLayout("TR")}
              className={`join-item btn btn-xs font-mono ${
                layout === "TR" ? "btn-primary font-bold" : "btn-ghost border border-base-content/10"
              }`}
            >
              Türkçe Q
            </button>
            <button
              onClick={() => setLayout("EN")}
              className={`join-item btn btn-xs font-mono ${
                layout === "EN" ? "btn-primary font-bold" : "btn-ghost border border-base-content/10"
              }`}
            >
              US ANSI
            </button>
          </div>

          {/* Ses Efekti */}
          <button
            onClick={() => {
              if (soundMode === "clicky") setSoundMode("tactile");
              else if (soundMode === "tactile") setSoundMode("off");
              else setSoundMode("clicky");
            }}
            className={`btn btn-xs font-mono gap-1 rounded-xl ${
              soundMode !== "off" ? "btn-secondary" : "btn-ghost border border-base-content/10"
            }`}
            title="Mekanik switch sesi"
          >
            {soundMode !== "off" ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>
              {soundMode === "clicky" ? "Mavi Switch" : soundMode === "tactile" ? "Kahve Switch" : "Sessiz"}
            </span>
          </button>

          {/* Kısayol Önleme */}
          <button
            onClick={() => setPreventDefaultShortcuts((prev) => !prev)}
            className={`btn btn-xs font-mono gap-1 rounded-xl ${
              preventDefaultShortcuts ? "btn-neutral" : "btn-ghost border border-base-content/10"
            }`}
            title="F5, Tab ve Alt tuşlarının tarayıcıyı terk etmesini engeller"
          >
            <Shield className="w-3.5 h-3.5 text-warning" />
            <span>Kısayol Koruması: {preventDefaultShortcuts ? "Açık" : "Kapalı"}</span>
          </button>

          {/* Sıfırla */}
          <button
            onClick={resetTest}
            className="btn btn-xs btn-error btn-outline font-mono gap-1 rounded-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* 2. GÖRSEL KLAVYE GÖVDESİ */}
      <div className="p-4 sm:p-6 rounded-3xl bg-base-200/60 border border-base-300 shadow-inner overflow-x-auto">
        <div className="min-w-[760px] space-y-2 select-none mx-auto">
          {KEYBOARD_ROWS.map((row, rIdx) => (
            <div key={rIdx} className="flex items-center gap-1.5 justify-center">
              {row.map((k) => {
                const isActive = activeKeys.has(k.code);
                const isTested = testedKeys.has(k.code);
                const label = layout === "TR" && k.labelTr ? k.labelTr : k.labelEn;
                const widthClass = k.width || "w-10 sm:w-11";

                return (
                  <div
                    key={k.code}
                    className={`h-10 sm:h-11 ${widthClass} rounded-xl font-mono text-[11px] font-bold flex flex-col items-center justify-center transition-all duration-75 relative border shadow-xs cursor-default ${
                      isActive
                        ? "bg-secondary text-secondary-content scale-95 shadow-md border-secondary ring-2 ring-secondary/50 font-black z-10"
                        : isTested
                        ? "bg-success/20 text-success border-success/40 shadow-inner"
                        : "bg-base-100 text-base-content/80 border-base-300 hover:border-base-content/30"
                    }`}
                  >
                    <span className="truncate px-0.5">{label}</span>
                    <span className="text-[8px] opacity-40 font-normal leading-none hidden sm:inline">
                      {k.code.replace("Key", "").replace("Digit", "")}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 3. TEKNİK BİLGİ & TELEMETRİ PANELLERİ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Son Basılan Tuş Analizi */}
        <div className="p-5 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-primary" />
            <span>Son Tuş Telemetrisi (Inspector)</span>
          </h3>

          {lastEvent ? (
            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-base-200/60 border border-base-300 flex items-center justify-between">
                <span className="text-base-content/60">Görünen Tuş (e.key):</span>
                <span className="badge badge-primary font-bold text-sm">
                  {lastEvent.key === " " ? "Space" : lastEvent.key}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-base-200/60 border border-base-300 flex items-center justify-between">
                <span className="text-base-content/60">Donanım Kodu (e.code):</span>
                <span className="badge badge-neutral font-bold">{lastEvent.code}</span>
              </div>
              <div className="p-3 rounded-2xl bg-base-200/60 border border-base-300 flex items-center justify-between">
                <span className="text-base-content/60">JavaScript KeyCode:</span>
                <span className="badge badge-ghost font-bold">{lastEvent.keyCode}</span>
              </div>
              <div className="p-3 rounded-2xl bg-base-200/60 border border-base-300 flex items-center justify-between">
                <span className="text-base-content/60">Konum (Location):</span>
                <span className="badge badge-ghost font-bold">
                  {lastEvent.location === 1 ? "Sol (Left)" : lastEvent.location === 2 ? "Sağ (Right)" : "Standart (0)"}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-base-200/60 border border-base-300 flex items-center justify-between">
                <span className="text-base-content/60">Tekrarlama (Repeat):</span>
                <span className={`badge ${lastEvent.repeat ? "badge-warning" : "badge-ghost"} font-bold`}>
                  {lastEvent.repeat ? "Evet (Hold)" : "Hayır"}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs font-mono text-base-content/50 border border-dashed border-base-300 rounded-2xl">
              Klavyeden herhangi bir tuşa bastığınızda JavaScript ve HID telemetrisi burada görünecektir.
            </div>
          )}
        </div>

        {/* N-Key Rollover (NKRO) & Anti-Ghosting Skoru */}
        <div className="p-5 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-warning" />
            <span>N-Key Rollover (NKRO / Ghosting)</span>
          </h3>

          <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300 text-center space-y-1">
            <div className="text-4xl font-black font-mono text-warning">
              {maxRollover}
            </div>
            <div className="text-xs font-mono text-base-content/70">
              Maksimum Eşzamanlı Tuş Rekoru
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-base-200/40 border border-base-300">
              <span className="font-mono text-base-content/70">Mevcut Basılı Tuşlar:</span>
              <span className="font-mono font-bold text-secondary">{activeKeys.size}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-base-200/40 border border-base-300">
              <span className="font-mono text-base-content/70">Anti-Ghosting Durumu:</span>
              <span className="font-mono font-bold text-success">
                {maxRollover >= 6 ? "NKRO / 6KRO (Gaming)" : maxRollover >= 3 ? "Standart USB" : "2KRO (Membran)"}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-info/10 border border-info/20 text-[11px] text-info-content leading-relaxed">
            <strong>Bilgi:</strong> Birçok eski veya ucuz klavye, matris hatları paylaşıldığı için aynı anda 3&apos;ten fazla tuşa basıldığında kilitlenir (Ghosting). Mekanik oyun klavyeleri ise diyot yalıtımı ile sınırsız tuşu (NKRO) aynı anda iletebilir.
          </div>
        </div>

        {/* Olay Günlüğü (Event Log) */}
        <div className="p-5 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-secondary" />
              <span>Canlı Tuş Geçmişi (Log)</span>
            </h3>
            <span className="text-[10px] font-mono text-base-content/40">Son 20 Olay</span>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1 font-mono text-[11px]">
            {eventHistory.length === 0 ? (
              <div className="p-8 text-center text-base-content/50 border border-dashed border-base-300 rounded-2xl">
                Henüz tuş hareketi kaydedilmedi.
              </div>
            ) : (
              eventHistory.map((ev, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-base-200/50 border border-base-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`badge badge-xs font-bold ${
                        ev.type === "down" ? "badge-success" : "badge-ghost"
                      }`}
                    >
                      {ev.type === "down" ? "BASILDI" : "BIRAKILDI"}
                    </span>
                    <span className="font-bold text-base-content truncate">
                      {ev.key === " " ? "Space" : ev.key}
                    </span>
                    <span className="text-[10px] opacity-50 truncate">({ev.code})</span>
                  </div>
                  <span className="text-[10px] opacity-40 shrink-0">{ev.time.split(" ")[0]}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
