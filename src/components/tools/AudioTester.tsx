"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Radio,
  Play,
  Square,
  Activity,
  Sliders,
  Sparkles,
  Info,
  CheckCircle2,
  Headphones,
  RotateCcw,
} from "lucide-react";

type AudioSubTab = "stereo" | "frequency" | "bass" | "microphone";

export default function AudioTester() {
  const [activeSubTab, setActiveSubTab] = useState<AudioSubTab>("stereo");

  // Web Audio Context referansı
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // ----------------------------------------------------
  // 1. STEREO HOPARLÖR TESTİ STATE
  // ----------------------------------------------------
  const [playingChannel, setPlayingChannel] = useState<"left" | "right" | "both" | null>(null);
  const stereoOscRef = useRef<OscillatorNode | null>(null);
  const stereoGainRef = useRef<GainNode | null>(null);

  const stopStereoSound = useCallback(() => {
    if (stereoOscRef.current) {
      try {
        stereoOscRef.current.stop();
        stereoOscRef.current.disconnect();
      } catch {}
      stereoOscRef.current = null;
    }
    setPlayingChannel(null);
  }, []);

  const playStereoChannel = useCallback((channel: "left" | "right" | "both", freq = 440) => {
    stopStereoSound();
    const ctx = getAudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Yumuşak ses açılma / fade-in
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05);

    if (panner) {
      if (channel === "left") panner.pan.setValueAtTime(-1.0, ctx.currentTime);
      else if (channel === "right") panner.pan.setValueAtTime(1.0, ctx.currentTime);
      else panner.pan.setValueAtTime(0.0, ctx.currentTime);

      osc.connect(gain);
      gain.connect(panner);
      panner.connect(ctx.destination);
    } else {
      // PannerNode desteği olmayan tarayıcılarda fallback
      osc.connect(gain);
      gain.connect(ctx.destination);
    }

    osc.start();
    stereoOscRef.current = osc;
    stereoGainRef.current = gain;
    setPlayingChannel(channel);
  }, [getAudioContext, stopStereoSound]);

  // ----------------------------------------------------
  // 2. FREKANS SÜPÜRME (SWEEP) STATE
  // ----------------------------------------------------
  const [frequency, setFrequency] = useState<number>(440);
  const [isTonePlaying, setIsTonePlaying] = useState<boolean>(false);
  const [isSweeping, setIsSweeping] = useState<boolean>(false);
  const sweepOscRef = useRef<OscillatorNode | null>(null);
  const sweepGainRef = useRef<GainNode | null>(null);
  const sweepIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopTone = useCallback(() => {
    if (sweepOscRef.current) {
      try {
        sweepOscRef.current.stop();
        sweepOscRef.current.disconnect();
      } catch {}
      sweepOscRef.current = null;
    }
    if (sweepIntervalRef.current) {
      clearInterval(sweepIntervalRef.current);
      sweepIntervalRef.current = null;
    }
    setIsTonePlaying(false);
    setIsSweeping(false);
  }, []);

  const startTone = useCallback((freq: number) => {
    stopTone();
    const ctx = getAudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    sweepOscRef.current = osc;
    sweepGainRef.current = gain;
    setIsTonePlaying(true);
  }, [getAudioContext, stopTone]);

  const handleFrequencyChange = (newFreq: number) => {
    setFrequency(newFreq);
    if (sweepOscRef.current && audioCtxRef.current) {
      sweepOscRef.current.frequency.setValueAtTime(newFreq, audioCtxRef.current.currentTime);
    }
  };

  const startAutoSweep = () => {
    stopTone();
    const ctx = getAudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    let cur = 20;
    osc.frequency.setValueAtTime(cur, ctx.currentTime);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    sweepOscRef.current = osc;
    setIsTonePlaying(true);
    setIsSweeping(true);

    sweepIntervalRef.current = setInterval(() => {
      cur = Math.round(cur * 1.05 + 5);
      if (cur >= 20000) {
        stopTone();
      } else {
        setFrequency(cur);
        if (sweepOscRef.current && audioCtxRef.current) {
          sweepOscRef.current.frequency.setValueAtTime(cur, audioCtxRef.current.currentTime);
        }
      }
    }, 50);
  };

  // ----------------------------------------------------
  // 3. MİKROFON TESTİ & CANLI FFT SPEKTRUM STATE
  // ----------------------------------------------------
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [isLoopbackEnabled, setIsLoopbackEnabled] = useState<boolean>(false);
  const [micError, setMicError] = useState<string | null>(null);

  const micStreamRef = useRef<MediaStream | null>(null);
  const micAnalyserRef = useRef<AnalyserNode | null>(null);
  const micVisualizerCanvasRef = useRef<HTMLCanvasElement>(null);
  const micAnimFrameRef = useRef<number | null>(null);
  const micLoopbackNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const stopMicrophone = useCallback(() => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (micAnimFrameRef.current) {
      cancelAnimationFrame(micAnimFrameRef.current);
      micAnimFrameRef.current = null;
    }
    setIsMicActive(false);
    setMicVolume(0);
    setIsLoopbackEnabled(false);
  }, []);

  const startMicrophone = async () => {
    stopMicrophone();
    setMicError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false },
      });
      micStreamRef.current = stream;

      const ctx = getAudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;

      source.connect(analyser);
      micAnalyserRef.current = analyser;
      micLoopbackNodeRef.current = source;
      setIsMicActive(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const drawVisualizer = () => {
        if (!analyser) return;
        analyser.getByteFrequencyData(dataArray);

        // Ortalama ses seviyesi (Volume RMS)
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = Math.round((sum / bufferLength / 255) * 100);
        setMicVolume(avg);

        // Canvas çizimi
        const canvas = micVisualizerCanvasRef.current;
        if (canvas) {
          const cCtx = canvas.getContext("2d");
          if (cCtx) {
            cCtx.fillStyle = "#11111b";
            cCtx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2;
            let barX = 0;

            for (let i = 0; i < bufferLength; i++) {
              const barHeight = (dataArray[i] / 255) * canvas.height;

              // Yeşil - Sarı - Kırmızı gradyan
              const r = Math.min(255, (i / bufferLength) * 350);
              const g = Math.max(80, 255 - (dataArray[i] / 255) * 100);
              cCtx.fillStyle = `rgb(${r}, ${g}, 150)`;

              cCtx.fillRect(barX, canvas.height - barHeight, barWidth - 1, barHeight);
              barX += barWidth;
            }
          }
        }

        micAnimFrameRef.current = requestAnimationFrame(drawVisualizer);
      };

      micAnimFrameRef.current = requestAnimationFrame(drawVisualizer);
    } catch (err) {
      setMicError("Mikrofon izni reddedildi veya cihaz bulunamadı.");
      console.error(err);
    }
  };

  const toggleLoopback = () => {
    if (!isMicActive || !micLoopbackNodeRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    if (!isLoopbackEnabled) {
      micLoopbackNodeRef.current.connect(ctx.destination);
      setIsLoopbackEnabled(true);
    } else {
      try {
        micLoopbackNodeRef.current.disconnect(ctx.destination);
      } catch {}
      setIsLoopbackEnabled(false);
    }
  };

  // Sekme değiştiğinde tüm sesleri temizle
  useEffect(() => {
    return () => {
      stopStereoSound();
      stopTone();
      stopMicrophone();
    };
  }, [activeSubTab, stopStereoSound, stopTone, stopMicrophone]);

  return (
    <div className="space-y-6">
      {/* Üst Alt Sekmeler */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-base-300">
        <button
          onClick={() => setActiveSubTab("stereo")}
          className={`btn btn-sm font-mono text-xs rounded-xl gap-2 transition-all ${
            activeSubTab === "stereo"
              ? "btn-primary shadow-xs font-bold text-white"
              : "btn-ghost border border-base-content/10 text-base-content/75"
          }`}
        >
          <Headphones className="w-3.5 h-3.5" />
          <span>Stereo Hoparlör (Sol / Sağ)</span>
        </button>

        <button
          onClick={() => setActiveSubTab("frequency")}
          className={`btn btn-sm font-mono text-xs rounded-xl gap-2 transition-all ${
            activeSubTab === "frequency"
              ? "btn-primary shadow-xs font-bold text-white"
              : "btn-ghost border border-base-content/10 text-base-content/75"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Frekans Süpürme (20Hz - 20kHz)</span>
        </button>

        <button
          onClick={() => setActiveSubTab("bass")}
          className={`btn btn-sm font-mono text-xs rounded-xl gap-2 transition-all ${
            activeSubTab === "bass"
              ? "btn-primary shadow-xs font-bold text-white"
              : "btn-ghost border border-base-content/10 text-base-content/75"
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Subwoofer & Bas Titreşimi</span>
        </button>

        <button
          onClick={() => setActiveSubTab("microphone")}
          className={`btn btn-sm font-mono text-xs rounded-xl gap-2 transition-all ${
            activeSubTab === "microphone"
              ? "btn-primary shadow-xs font-bold text-white"
              : "btn-ghost border border-base-content/10 text-base-content/75"
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Mikrofon & Spektrum Ölçer</span>
        </button>
      </div>

      {/* =======================================================
          1. STEREO HOPARLÖR TESTİ
          ======================================================= */}
      {activeSubTab === "stereo" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300">
            <h3 className="font-bold text-base text-base-content flex items-center gap-2">
              <Headphones className="w-4 h-4 text-primary" />
              <span>Stereo Kanal Ayrımı (Left & Right Channel Test)</span>
            </h3>
            <p className="text-xs text-base-content/70 mt-1">
              Kulaklığınızın veya hoparlörlerinizin Sol (L) ve Sağ (R) kanallarının doğru takıldığını ve kablo temasında sorun olmadığını doğrulayın.
            </p>
          </div>

          {/* İnteraktif Kulaklık / Hoparlör Görseli */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* SOL KANAL */}
            <div
              className={`p-6 rounded-2xl border transition-all text-center space-y-4 ${
                playingChannel === "left"
                  ? "bg-primary/10 border-primary ring-2 ring-primary/30 shadow-lg"
                  : "bg-base-100 border-base-300 hover:border-primary/40"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto text-xl font-black font-mono shadow-xs">
                L
              </div>
              <div>
                <h4 className="font-bold text-lg text-base-content">Sol Hoparlör (Left)</h4>
                <p className="text-xs text-base-content/60 font-mono">Pan: -1.0 • 440 Hz Sinüs</p>
              </div>
              <div>
                {playingChannel === "left" ? (
                  <button
                    onClick={stopStereoSound}
                    className="btn btn-error btn-sm font-mono text-xs rounded-xl gap-2 text-white"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Durdur</span>
                  </button>
                ) : (
                  <button
                    onClick={() => playStereoChannel("left")}
                    className="btn btn-primary btn-sm font-mono text-xs rounded-xl gap-2 text-white"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Sol Kanalı Çal</span>
                  </button>
                )}
              </div>
            </div>

            {/* SAĞ KANAL */}
            <div
              className={`p-6 rounded-2xl border transition-all text-center space-y-4 ${
                playingChannel === "right"
                  ? "bg-secondary/10 border-secondary ring-2 ring-secondary/30 shadow-lg"
                  : "bg-base-100 border-base-300 hover:border-secondary/40"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mx-auto text-xl font-black font-mono shadow-xs">
                R
              </div>
              <div>
                <h4 className="font-bold text-lg text-base-content">Sağ Hoparlör (Right)</h4>
                <p className="text-xs text-base-content/60 font-mono">Pan: +1.0 • 440 Hz Sinüs</p>
              </div>
              <div>
                {playingChannel === "right" ? (
                  <button
                    onClick={stopStereoSound}
                    className="btn btn-error btn-sm font-mono text-xs rounded-xl gap-2 text-white"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Durdur</span>
                  </button>
                ) : (
                  <button
                    onClick={() => playStereoChannel("right")}
                    className="btn btn-secondary btn-sm font-mono text-xs rounded-xl gap-2 text-white"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Sağ Kanalı Çal</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Ortak / Merkez Buton */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => (playingChannel === "both" ? stopStereoSound() : playStereoChannel("both"))}
              className={`btn btn-sm font-mono text-xs rounded-xl gap-2 ${
                playingChannel === "both" ? "btn-error text-white font-bold" : "btn-neutral text-white"
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{playingChannel === "both" ? "Merkez Sesi Durdur" : "Her İki Kanalı Birlikte Çal (Merkez)"}</span>
            </button>
          </div>
        </div>
      )}

      {/* =======================================================
          2. FREKANS SÜPÜRME (20Hz - 20.000Hz)
          ======================================================= */}
      {activeSubTab === "frequency" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300">
            <h3 className="font-bold text-base text-base-content flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <span>Duyulabilir Frekans Aralığı & Sinyal Jeneratörü</span>
            </h3>
            <p className="text-xs text-base-content/70 mt-1">
              İnsan kulağının ortalama duyma sınırı 20 Hz ile 20.000 Hz arasındadır. Slider ile tonu değiştirebilir veya otomatik süpürme (sweep) başlatabilirsiniz.
            </p>
          </div>

          {/* Frekans Ekranı & Kontrol */}
          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 text-center space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-base-content/60 uppercase">Oynatılan Frekans</span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-primary flex items-center justify-center gap-2">
                <span>{frequency.toLocaleString()}</span>
                <span className="text-2xl text-primary/70">Hz</span>
              </div>
              <span className="badge badge-ghost font-mono text-xs">
                {frequency < 100
                  ? "Sub-bass (Derin Bas)"
                  : frequency < 300
                  ? "Bas (Düşük Frekans)"
                  : frequency < 2000
                  ? "Midrange (Orta Frekans / Vokal)"
                  : frequency < 6000
                  ? "Tiz (High Mid)"
                  : "Ultra Tiz (Üst Harmonikler)"}
              </span>
            </div>

            {/* Slider */}
            <div className="space-y-2 max-w-xl mx-auto">
              <input
                type="range"
                min="20"
                max="20000"
                step="10"
                value={frequency}
                onChange={(e) => handleFrequencyChange(Number(e.target.value))}
                className="range range-primary w-full"
              />
              <div className="flex justify-between text-[11px] font-mono text-base-content/50">
                <span>20 Hz</span>
                <span>250 Hz</span>
                <span>1.000 Hz</span>
                <span>5.000 Hz</span>
                <span>20.000 Hz</span>
              </div>
            </div>

            {/* Hazır Frekans Kısayolları */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {[
                { label: "60 Hz (Bas)", val: 60 },
                { label: "120 Hz (Davul)", val: 120 },
                { label: "440 Hz (A4 Nota)", val: 440 },
                { label: "1 kHz (Referans)", val: 1000 },
                { label: "5 kHz (Tiz)", val: 5000 },
                { label: "10 kHz (Zil)", val: 10000 },
                { label: "15 kHz (İnce)", val: 15000 },
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => handleFrequencyChange(item.val)}
                  className={`btn btn-xs font-mono rounded-lg ${
                    frequency === item.val
                      ? "btn-primary text-white font-bold"
                      : "btn-ghost border border-base-content/10 text-base-content/75"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Çalma / Süpürme Butonları */}
            <div className="flex items-center justify-center gap-3 pt-3">
              {isTonePlaying && !isSweeping ? (
                <button
                  onClick={stopTone}
                  className="btn btn-error btn-sm font-mono text-xs rounded-xl gap-2 text-white shadow-sm"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Sesi Kes</span>
                </button>
              ) : (
                <button
                  onClick={() => startTone(frequency)}
                  disabled={isSweeping}
                  className="btn btn-primary btn-sm font-mono text-xs rounded-xl gap-2 text-white shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Tetikle ({frequency} Hz)</span>
                </button>
              )}

              {isSweeping ? (
                <button
                  onClick={stopTone}
                  className="btn btn-error btn-sm font-mono text-xs rounded-xl gap-2 text-white"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Süpürmeyi Durdur</span>
                </button>
              ) : (
                <button
                  onClick={startAutoSweep}
                  className="btn btn-secondary btn-sm font-mono text-xs rounded-xl gap-2 text-white"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Otomatik 20Hz - 20kHz Süpürme</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          3. SUBWOOFER & BAS TİTREŞİMİ
          ======================================================= */}
      {activeSubTab === "bass" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300">
            <h3 className="font-bold text-base text-base-content flex items-center gap-2">
              <Radio className="w-4 h-4 text-warning" />
              <span>Subwoofer & Düşük Frekans Rezonans Testi</span>
            </h3>
            <p className="text-xs text-base-content/70 mt-1">
              Hoparlör gövdesindeki cızırtıları, plastik rezonanslarını ve derin bas sürücüsünün (Woofer) sınırlarını test edin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { freq: 35, title: "35 Hz (Sub-Bass)", desc: "Çoğu küçük hoparlörün çalmakta zorlandığı derin titreşim frekansı." },
              { freq: 55, title: "55 Hz (Kick / Vurucu Bas)", desc: "Elektronik müzik kick'lerinin ve gövde vuruşunun ana tonu." },
              { freq: 80, title: "80 Hz (Üst Bas)", desc: "Masaüstü hoparlörlerin zengin bas hissi verdiği rezonans bölgesi." },
            ].map((b) => (
              <div
                key={b.freq}
                className="p-5 rounded-2xl bg-base-100 border border-base-300 text-center space-y-3 hover:border-warning/50 transition-all"
              >
                <div className="text-2xl font-black font-mono text-warning">{b.title}</div>
                <p className="text-xs text-base-content/70 leading-relaxed">{b.desc}</p>
                <div>
                  {isTonePlaying && frequency === b.freq ? (
                    <button
                      onClick={stopTone}
                      className="btn btn-error btn-xs font-mono rounded-lg text-white gap-1"
                    >
                      <Square className="w-3 h-3 fill-current" />
                      <span>Durdur</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setFrequency(b.freq);
                        startTone(b.freq);
                      }}
                      className="btn btn-warning btn-xs font-mono rounded-lg gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{b.freq} Hz Titret</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =======================================================
          4. MİKROFON & CANLI SPEKTRUM ÖLÇER
          ======================================================= */}
      {activeSubTab === "microphone" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300">
            <h3 className="font-bold text-base text-base-content flex items-center gap-2">
              <Mic className="w-4 h-4 text-primary" />
              <span>Mikrofon Girişi & Canlı FFT Frekans Spektrumu</span>
            </h3>
            <p className="text-xs text-base-content/70 mt-1">
              Mikrofonunuzun donanımsal ses algılama hassasiyetini, tepe dB seviyesini ve gerçek zamanlı ses spektrumunu test edin.
            </p>
          </div>

          {micError && (
            <div className="alert alert-error text-xs rounded-xl shadow-xs text-white font-medium">
              <span>{micError}</span>
            </div>
          )}

          {/* Mikrofon Kontrol Paneli */}
          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    isMicActive ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-base-200 text-base-content/50"
                  }`}
                >
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-base-content">
                    {isMicActive ? "Mikrofon Dinleniyor..." : "Mikrofon Kapalı"}
                  </h4>
                  <p className="text-xs text-base-content/60">
                    {isMicActive ? "Konuşun veya ses çıkararak çubukları gözlemleyin" : "Testi başlatmak için butona basın"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isMicActive ? (
                  <>
                    <button
                      onClick={toggleLoopback}
                      className={`btn btn-sm font-mono text-xs rounded-xl gap-2 ${
                        isLoopbackEnabled
                          ? "btn-secondary text-white font-bold"
                          : "btn-ghost border border-base-content/20 text-base-content/80"
                      }`}
                      title="Kendi sesinizi anında kulaklığa geri verin"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>{isLoopbackEnabled ? "Loopback Açık (Canlı Dinleme)" : "Geri Dinleme (Loopback)"}</span>
                    </button>

                    <button
                      onClick={stopMicrophone}
                      className="btn btn-error btn-sm font-mono text-xs rounded-xl gap-2 text-white"
                    >
                      <MicOff className="w-3.5 h-3.5" />
                      <span>Kapat</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={startMicrophone}
                    className="btn btn-primary btn-sm font-mono text-xs rounded-xl gap-2 text-white shadow-sm"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Mikrofon Testini Başlat</span>
                  </button>
                )}
              </div>
            </div>

            {/* Canlı Ses Seviyesi İlerleme Çubuğu */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-base-content/70">Anlık Giriş Seviyesi (Volume Meter)</span>
                <span className="font-bold text-primary">{micVolume}%</span>
              </div>
              <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-75 rounded-full ${
                    micVolume > 85 ? "bg-error" : micVolume > 60 ? "bg-warning" : "bg-success"
                  }`}
                  style={{ width: `${Math.min(100, micVolume * 1.5)}%` }}
                />
              </div>
            </div>

            {/* FFT Spektrum Görselleştirici (Canvas) */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-base-content/60">Canlı Frekans Spektrumu (20 Hz - 8.000 Hz)</div>
              <canvas
                ref={micVisualizerCanvasRef}
                width={720}
                height={160}
                className="w-full h-[160px] rounded-xl border border-base-content/10 bg-[#11111b] block"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
