"use client";

import { useState, useEffect, useRef } from "react";
import {
  RotateCcw,
  Sparkles,
  Zap,
  Timer,
  Award,
  MousePointer,
  Flame,
  Volume2,
  VolumeX,
  Target,
} from "lucide-react";

export default function MouseSpeedTester() {
  const [duration, setDuration] = useState<number>(5); // 5s veya 10s
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [clickCount, setClickCount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Dalga / Tıklama ripple efekti koordinatları
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClickSound = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.025);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {}
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsActive(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleClickArea = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (isFinished) return;

    // İlk tıklamada testi başlat
    if (!isActive && !isFinished) {
      setIsActive(true);
      setTimeLeft(duration);
    }

    playClickSound();
    setClickCount((p) => p + 1);

    // Ripple animasyonu
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rippleId = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-8), { id: rippleId, x, y }]);
  };

  const resetTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(duration);
    setClickCount(0);
    setRipples([]);
  };

  // CPS (Clicks Per Second) Hesaplaması
  const elapsed = duration - timeLeft;
  const currentCPS = elapsed > 0 ? (clickCount / elapsed).toFixed(1) : "0.0";
  const finalCPS = (clickCount / duration).toFixed(1);

  // CPS Seviyesi
  const getRank = (cpsVal: number) => {
    if (cpsVal >= 12) return { title: "⚡ Tanrısal Refleks (Butterfly / Drag Click)", badge: "badge-error", desc: "Espor arenasının zirvesindesin! İnanılmaz parmak hızlanması." };
    if (cpsVal >= 9) return { title: "🐆 Çita (Jitter Click Ustası)", badge: "badge-primary", desc: "Çok hızlı tıklama kabiliyeti. PVP ve FPS oyunlarında büyük avantaj." };
    if (cpsVal >= 7) return { title: "🐇 Hızlı Tavşan (Gamer Hızı)", badge: "badge-secondary", desc: "Ortalamanın belirgin şekilde üstünde harika bir refleks." };
    if (cpsVal >= 5) return { title: "🚶 Standart Kullanıcı (Ofis Hızı)", badge: "badge-accent", desc: "Günlük kullanım ve standart oyunlar için gayet doğal tempo." };
    return { title: "🐢 Kaplumbağa (Tembel Tık)", badge: "badge-neutral", desc: "Parmaklarını biraz ısıtıp tekrar dene!" };
  };

  const rank = getRank(parseFloat(finalCPS));

  return (
    <div className="space-y-6">
      {/* 1. ÜST KONTROL BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-3xl bg-base-100 border border-base-300 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge badge-primary badge-sm font-mono font-bold">
              Fare Tıklama Hızı (CPS)
            </span>
            <span className="badge badge-neutral badge-sm font-mono">
              Süre: {duration}sn
            </span>
          </div>
          <h2 className="text-xl font-black text-base-content flex items-center gap-2">
            <span>Fare Tıklama Hız Testi (Clicks Per Second)</span>
          </h2>
          <p className="text-xs text-base-content/70">
            Tıklama alanına ilk bastığınız anda süre başlar. Belirlenen sürede olabildiğince hızlı tıklayın.
          </p>
        </div>

        {/* Süre ve Sıfırlama */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="join">
            {[5, 10].map((d) => (
              <button
                key={d}
                disabled={isActive}
                onClick={() => {
                  setDuration(d);
                  setTimeLeft(d);
                  resetTest();
                }}
                className={`join-item btn btn-xs font-mono ${
                  duration === d ? "btn-primary font-bold" : "btn-ghost border border-base-content/10"
                }`}
              >
                {d}sn Test
              </button>
            ))}
          </div>

          <button
            onClick={() => setSoundEnabled((p) => !p)}
            className={`btn btn-xs font-mono rounded-xl ${
              soundEnabled ? "btn-ghost text-primary" : "btn-ghost text-base-content/40"
            }`}
            title="Tıklama sesi"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={resetTest}
            className="btn btn-xs btn-error btn-outline font-mono gap-1 rounded-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* 2. CANLI İSTATİSTİK ROZETLERİ */}
      <div className="grid grid-cols-3 gap-3 font-mono">
        <div className="p-4 rounded-2xl bg-base-100 border border-base-300 text-center space-y-0.5 shadow-sm">
          <span className="text-[10px] text-base-content/60 uppercase">Kalan Süre</span>
          <div className="text-3xl font-black text-secondary flex items-center justify-center gap-1">
            <Timer className="w-5 h-5 text-secondary opacity-70" />
            <span>{timeLeft}s</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-base-100 border border-base-300 text-center space-y-0.5 shadow-sm">
          <span className="text-[10px] text-base-content/60 uppercase">Anlık CPS</span>
          <div className="text-3xl font-black text-primary flex items-center justify-center gap-1">
            <Flame className="w-5 h-5 text-primary opacity-70" />
            <span>{isActive ? currentCPS : isFinished ? finalCPS : "0.0"}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-base-100 border border-base-300 text-center space-y-0.5 shadow-sm">
          <span className="text-[10px] text-base-content/60 uppercase">Toplam Tıklama</span>
          <div className="text-3xl font-black text-accent">
            {clickCount}
          </div>
        </div>
      </div>

      {/* 3. DEV TIKLAMA HEDEF ALANI */}
      {!isFinished ? (
        <div
          onMouseDown={handleClickArea}
          onContextMenu={(e) => e.preventDefault()}
          className="p-12 sm:p-20 rounded-3xl bg-base-100 border-4 border-dashed border-primary/40 hover:border-primary transition-all flex flex-col items-center justify-center text-center space-y-4 select-none cursor-pointer shadow-lg relative overflow-hidden group min-h-[320px]"
        >
          {/* Tıklama Dalgaları (Ripples) */}
          {ripples.map((r) => (
            <span
              key={r.id}
              className="absolute w-20 h-20 rounded-full bg-primary/30 pointer-events-none animate-ping"
              style={{ left: r.x - 40, top: r.y - 40 }}
            />
          ))}

          <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center shadow-inner group-hover:scale-110 group-active:scale-95 transition-transform">
            <MousePointer className="w-10 h-10" />
          </div>

          <div className="space-y-1 relative z-10 pointer-events-none">
            <h3 className="text-2xl sm:text-3xl font-black text-base-content">
              {isActive ? "HIZLI TIKLA!" : "TIKLAMAYA BAŞLA"}
            </h3>
            <p className="text-xs text-base-content/60">
              {isActive
                ? "Süre bitene kadar farenin sol tuşuna art arda bas!"
                : "İlk tıklamanızla birlikte süre otomatik başlayacaktır."}
            </p>
          </div>
        </div>
      ) : (
        /* 4. SONUÇ RAPORU (TEST BİTİNCE) */
        <div className="p-8 rounded-3xl bg-base-100 border border-base-300 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className={`badge ${rank.badge} font-mono font-bold text-xs uppercase p-3`}>
              {rank.title}
            </span>
            <h3 className="text-4xl font-black text-base-content font-mono pt-2">
              {finalCPS} CPS
            </h3>
            <p className="text-xs text-base-content/70 max-w-md mx-auto">
              {rank.desc}
            </p>
          </div>

          {/* Skor Kartları */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300 space-y-0.5">
              <span className="text-base-content/50 text-[10px]">Toplam Tıklama</span>
              <div className="text-2xl font-bold text-primary">{clickCount}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300 space-y-0.5">
              <span className="text-base-content/50 text-[10px]">Test Süresi</span>
              <div className="text-2xl font-bold text-secondary">{duration} sn</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300 space-y-0.5 col-span-2 sm:col-span-1">
              <span className="text-base-content/50 text-[10px]">Ortalama Hız</span>
              <div className="text-2xl font-bold text-success">{finalCPS} CPS</div>
            </div>
          </div>

          <div>
            <button
              onClick={resetTest}
              className="btn btn-primary font-mono px-8 rounded-xl shadow-md gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Yeniden Tıkla</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. TIKLAMA TEKNİKLERİ REHBERİ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300 space-y-1">
          <span className="font-bold text-base-content flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-primary" />
            Normal Click (5-7 CPS)
          </span>
          <p className="text-[11px] text-base-content/70 leading-relaxed">
            Standart tek parmak basışı. Nişan almayı bozmaz ve bileği yormaz.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300 space-y-1">
          <span className="font-bold text-base-content flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-warning" />
            Jitter Click (9-12 CPS)
          </span>
          <p className="text-[11px] text-base-content/70 leading-relaxed">
            Ön kol kaslarını titreterek parmağın düğme üzerinde hızla sekmesi tekniği.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300 space-y-1">
          <span className="font-bold text-base-content flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-secondary" />
            Butterfly Click (12-16 CPS)
          </span>
          <p className="text-[11px] text-base-content/70 leading-relaxed">
            İşaret ve orta parmağın aynı sol tık butonuna sırayla vurması tekniği.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300 space-y-1">
          <span className="font-bold text-base-content flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Drag Click (20+ CPS)
          </span>
          <p className="text-[11px] text-base-content/70 leading-relaxed">
            Parmağın tuş üstünde sürtünmeyle kaydırılarak mikrosaniye sekmeleri yaratması.
          </p>
        </div>
      </div>
    </div>
  );
}
