"use client";

import { useState, useEffect, useRef } from "react";
import {
  RotateCcw,
  Sparkles,
  Zap,
  Timer,
  Award,
  CheckCircle2,
  Volume2,
  VolumeX,
  Keyboard,
  Flame,
  ArrowRight,
} from "lucide-react";

const WORDS_TR = [
  "kod", "donanım", "bellek", "devre", "işlemci", "fonksiyon", "değişken", "programlama",
  "algoritma", "mikroişlemci", "sistem", "terminal", "çip", "robotik", "sensör", "otonom",
  "döngü", "mantık", "kapı", "hız", "veri", "tablo", "sunucu", "ağ", "arayüz", "yazılım",
  "gömülü", "direnç", "akım", "voltaj", "sinyal", "frekans", "derleyici", "kütüphane",
  "nesne", "sınıf", "metot", "yapı", "bellek", "işaretçi", "dizi", "anahtar", "değer",
  "performans", "güvenlik", "protokol", "bağlantı", "paket", "kaynak", "sonuç", "analiz"
];

const WORDS_EN = [
  "code", "hardware", "memory", "circuit", "processor", "function", "variable", "algorithm",
  "system", "terminal", "chip", "robotics", "sensor", "autonomous", "loop", "logic", "gate",
  "speed", "data", "server", "network", "software", "embedded", "resistor", "current", "voltage",
  "signal", "frequency", "compiler", "library", "object", "class", "method", "struct", "pointer",
  "array", "key", "value", "performance", "security", "protocol", "packet", "source", "result"
];

export default function KeyboardSpeedTester() {
  const [lang, setLang] = useState<"TR" | "EN">("TR");
  const [duration, setDuration] = useState<number>(30); // 15, 30, 60
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [wordList, setWordList] = useState<string[]>([]);
  const [currentWordIdx, setCurrentWordIdx] = useState<number>(0);
  const [currentInput, setCurrentInput] = useState<string>("");

  const [correctChars, setCorrectChars] = useState<number>(0);
  const [incorrectChars, setIncorrectChars] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Kelime havuzunu karıştır
  const generateWords = (language: "TR" | "EN") => {
    const source = language === "TR" ? WORDS_TR : WORDS_EN;
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    // 150 kelimelik akıcı liste
    const longList = [...shuffled, ...shuffled, ...shuffled];
    setWordList(longList);
    setCurrentWordIdx(0);
    setCurrentInput("");
  };

  useEffect(() => {
    generateWords(lang);
  }, [lang]);

  // Ses sentezleme
  const playClick = () => {
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
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {}
  };

  // Zamanlayıcı
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Testi ilk tuş vuruşunda otomatik başlat
    if (!isActive && !isFinished) {
      setIsActive(true);
      setTimeLeft(duration);
    }

    if (isFinished) return;

    playClick();

    // Boşluk basıldıysa kelime kontrolü yap
    if (val.endsWith(" ")) {
      const trimmed = val.trim();
      const target = wordList[currentWordIdx];

      if (trimmed === target) {
        setCorrectWords((prev) => prev + 1);
        setCorrectChars((prev) => prev + target.length + 1);
      } else {
        setIncorrectChars((prev) => prev + trimmed.length + 1);
      }

      setCurrentWordIdx((prev) => prev + 1);
      setCurrentInput("");
    } else {
      setCurrentInput(val);
    }
  };

  const resetTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(duration);
    setCorrectChars(0);
    setIncorrectChars(0);
    setCorrectWords(0);
    generateWords(lang);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  // İstatistik hesaplamaları
  const timeElapsed = duration - timeLeft;
  const minutes = timeElapsed > 0 ? timeElapsed / 60 : 1 / 60;
  const wpm = Math.max(0, Math.round(correctChars / 5 / minutes));
  const cpm = Math.max(0, Math.round(correctChars / minutes));
  const totalTyped = correctChars + incorrectChars;
  const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

  // Hız Rütbesi
  const getRank = (score: number) => {
    if (score >= 90) return { title: "Daktilo Ustası / Espor", badge: "badge-error", desc: "İnanılmaz refleks ve parmak hızı!" };
    if (score >= 70) return { title: "Profesyonel Yazılımcı", badge: "badge-primary", desc: "Çok hızlı ve akıcı yazma kabiliyeti." };
    if (score >= 50) return { title: "Hızlı Klavye Kullanıcısı", badge: "badge-secondary", desc: "Ortalamanın üzerinde harika hız." };
    if (score >= 35) return { title: "Ortalama Daktilo", badge: "badge-accent", desc: "Günlük işler için ideal ve kararlı tempo." };
    return { title: "Başlangıç Seviyesi", badge: "badge-neutral", desc: "Pratik yaparak parmak hafızanı geliştirebilirsin." };
  };

  const rank = getRank(wpm);

  return (
    <div className="space-y-6">
      {/* 1. ÜST KONTROL BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-3xl bg-base-100 border border-base-300 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge badge-secondary badge-sm font-mono font-bold">
              Yazma Hızı (WPM Benchmark)
            </span>
            <span className="badge badge-neutral badge-sm font-mono">
              Süre: {duration}s
            </span>
          </div>
          <h2 className="text-xl font-black text-base-content flex items-center gap-2">
            <span>Klavye Yazma Hız Testi (Words Per Minute)</span>
          </h2>
          <p className="text-xs text-base-content/70">
            Aşağıdaki kutuya yazmaya başladığınızda süre otomatik başlar. Boşluk tuşuyla sonraki kelimeye geçebilirsiniz.
          </p>
        </div>

        {/* Seçenekler */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Süre Seçici */}
          <div className="join">
            {[15, 30, 60].map((d) => (
              <button
                key={d}
                disabled={isActive}
                onClick={() => {
                  setDuration(d);
                  setTimeLeft(d);
                  resetTest();
                }}
                className={`join-item btn btn-xs font-mono ${
                  duration === d ? "btn-secondary font-bold" : "btn-ghost border border-base-content/10"
                }`}
              >
                {d}s
              </button>
            ))}
          </div>

          {/* Dil Seçici */}
          <div className="join">
            <button
              disabled={isActive}
              onClick={() => {
                setLang("TR");
                resetTest();
              }}
              className={`join-item btn btn-xs font-mono ${
                lang === "TR" ? "btn-primary font-bold" : "btn-ghost border border-base-content/10"
              }`}
            >
              Türkçe
            </button>
            <button
              disabled={isActive}
              onClick={() => {
                setLang("EN");
                resetTest();
              }}
              className={`join-item btn btn-xs font-mono ${
                lang === "EN" ? "btn-primary font-bold" : "btn-ghost border border-base-content/10"
              }`}
            >
              English
            </button>
          </div>

          {/* Ses Butonu */}
          <button
            onClick={() => setSoundEnabled((p) => !p)}
            className={`btn btn-xs font-mono rounded-xl ${
              soundEnabled ? "btn-ghost text-secondary" : "btn-ghost text-base-content/40"
            }`}
            title="Tuş vuruş sesi"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
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

      {/* 2. CANLI İSTATİSTİK ROZETLERİ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-4 rounded-2xl bg-base-100 border border-base-300 text-center space-y-0.5 shadow-sm">
          <span className="text-[10px] text-base-content/60 uppercase">Kalan Süre</span>
          <div className="text-3xl font-black text-secondary flex items-center justify-center gap-1">
            <Timer className="w-5 h-5 text-secondary opacity-70" />
            <span>{timeLeft}s</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-base-100 border border-base-300 text-center space-y-0.5 shadow-sm">
          <span className="text-[10px] text-base-content/60 uppercase">Hız (WPM)</span>
          <div className="text-3xl font-black text-primary flex items-center justify-center gap-1">
            <Flame className="w-5 h-5 text-primary opacity-70" />
            <span>{wpm}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-base-100 border border-base-300 text-center space-y-0.5 shadow-sm">
          <span className="text-[10px] text-base-content/60 uppercase">Doğruluk</span>
          <div className="text-3xl font-black text-success">
            %{accuracy}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-base-100 border border-base-300 text-center space-y-0.5 shadow-sm">
          <span className="text-[10px] text-base-content/60 uppercase">Karakter / Dk</span>
          <div className="text-3xl font-black text-accent">
            {cpm}
          </div>
        </div>
      </div>

      {/* 3. KELİME AKIŞI KUTUSU & GİRİŞ ALANI */}
      {!isFinished ? (
        <div className="p-6 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-5">
          {/* Kelimeler Vitrini */}
          <div className="p-5 rounded-2xl bg-base-200/50 border border-base-300 min-h-[100px] flex flex-wrap gap-2.5 items-center font-mono text-base sm:text-lg select-none">
            {wordList.slice(currentWordIdx, currentWordIdx + 18).map((word, idx) => {
              const isCurrent = idx === 0;

              return (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded-xl transition-all ${
                    isCurrent
                      ? "bg-secondary text-secondary-content font-bold shadow-md scale-105"
                      : "text-base-content/60 opacity-80"
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Yazma Girdi Kutusu */}
          <div className="space-y-2">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              disabled={isFinished}
              placeholder={isActive ? "Yazmaya devam edin..." : "Testi başlatmak için buraya yazmaya başlayın..."}
              autoFocus
              className="input input-lg w-full rounded-2xl font-mono text-lg bg-base-200/60 border-2 border-base-300 focus:border-secondary shadow-inner text-center"
            />
            <div className="text-center text-[11px] font-mono text-base-content/50">
              İpucu: Her kelimeden sonra <strong>[SPACE]</strong> (Boşluk) tuşuna basarak ilerleyin.
            </div>
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
            <h3 className="text-3xl font-black text-base-content font-mono pt-2">
              {wpm} WPM ({cpm} Karakter / Dk)
            </h3>
            <p className="text-xs text-base-content/70 max-w-md mx-auto">
              {rank.desc}
            </p>
          </div>

          {/* Skor Kartları */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300 space-y-0.5">
              <span className="text-base-content/50 text-[10px]">Doğru Kelime</span>
              <div className="text-xl font-bold text-success">{correctWords}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300 space-y-0.5">
              <span className="text-base-content/50 text-[10px]">Doğruluk Oranı</span>
              <div className="text-xl font-bold text-primary">%{accuracy}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300 space-y-0.5">
              <span className="text-base-content/50 text-[10px]">Doğru Karakter</span>
              <div className="text-xl font-bold text-secondary">{correctChars}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300 space-y-0.5">
              <span className="text-base-content/50 text-[10px]">Hatalı Vuruş</span>
              <div className="text-xl font-bold text-error">{incorrectChars}</div>
            </div>
          </div>

          <div>
            <button
              onClick={resetTest}
              className="btn btn-secondary font-mono px-8 rounded-xl shadow-md gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Yeniden Test Et</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
