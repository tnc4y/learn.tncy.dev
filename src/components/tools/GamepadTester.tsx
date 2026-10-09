"use client";

import { useState, useEffect, useRef } from "react";
import {
  Gamepad2,
  RotateCcw,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle,
  Vibrate,
  Radio,
  Sliders,
  Play,
  Layers,
  Compass,
} from "lucide-react";

interface GamepadState {
  id: string;
  index: number;
  connected: boolean;
  timestamp: number;
  mapping: string;
  buttons: { pressed: boolean; value: number }[];
  axes: number[];
}

const BUTTON_LABELS = [
  { id: 0, xbox: "A", ps: "✕ Cross", name: "Aksiyon Alt" },
  { id: 1, xbox: "B", ps: "○ Circle", name: "Aksiyon Sağ" },
  { id: 2, xbox: "X", ps: "□ Square", name: "Aksiyon Sol" },
  { id: 3, xbox: "Y", ps: "△ Triangle", name: "Aksiyon Üst" },
  { id: 4, xbox: "LB", ps: "L1", name: "Sol Üst Bumper" },
  { id: 5, xbox: "RB", ps: "R1", name: "Sağ Üst Bumper" },
  { id: 6, xbox: "LT", ps: "L2", name: "Sol Analog Tetik" },
  { id: 7, xbox: "RT", ps: "R2", name: "Sağ Analog Tetik" },
  { id: 8, xbox: "Back / View", ps: "Share / Create", name: "Geri / Seç" },
  { id: 9, xbox: "Start / Menu", ps: "Options", name: "Başlat / Menü" },
  { id: 10, xbox: "LS / L3", ps: "L3 Click", name: "Sol Çubuk Tık" },
  { id: 11, xbox: "RS / R3", ps: "R3 Click", name: "Sağ Çubuk Tık" },
  { id: 12, xbox: "D-Pad Yukarı", ps: "D-Pad Yukarı", name: "Yön Tuşu Yukarı" },
  { id: 13, xbox: "D-Pad Aşağı", ps: "D-Pad Aşağı", name: "Yön Tuşu Aşağı" },
  { id: 14, xbox: "D-Pad Sol", ps: "D-Pad Sol", name: "Yön Tuşu Sol" },
  { id: 15, xbox: "D-Pad Sağ", ps: "D-Pad Sağ", name: "Yön Tuşu Sağ" },
  { id: 16, xbox: "Guide / Xbox", ps: "PS Home", name: "Ana Sayfa / Logo" },
];

export default function GamepadTester() {
  const [selectedSlot, setSelectedSlot] = useState<number>(0);
  const [availableGamepads, setAvailableGamepads] = useState<{ index: number; id: string }[]>([]);
  const [gamepadState, setGamepadState] = useState<GamepadState | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [vibrationDuration, setVibrationDuration] = useState<number>(500);
  const [strongMagnitude, setStrongMagnitude] = useState<number>(1.0);
  const [weakMagnitude, setWeakMagnitude] = useState<number>(0.8);
  const [vibrating, setVibrating] = useState<boolean>(false);
  const [hasGamepadSupport, setHasGamepadSupport] = useState<boolean>(true);

  const animationFrameRef = useRef<number | null>(null);

  // Demo modu için sanal animasyon fazı
  const demoPhaseRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined" || !("getGamepads" in navigator)) {
      setHasGamepadSupport(false);
      return;
    }

    const pollGamepads = () => {
      if (isDemoMode) {
        // Sanal demo gamepad verisi üret
        demoPhaseRef.current += 0.03;
        const p = demoPhaseRef.current;
        const simLeftX = Math.sin(p) * 0.85;
        const simLeftY = Math.cos(p) * 0.85;
        const simRightX = Math.sin(p * 1.5) * 0.6;
        const simRightY = Math.cos(p * 1.5) * 0.6;

        const simButtons = Array.from({ length: 17 }, (_, i) => {
          if (i === 0) return { pressed: Math.sin(p * 2) > 0.5, value: Math.max(0, Math.sin(p * 2)) };
          if (i === 6) return { pressed: simLeftX > 0.3, value: Math.abs(simLeftX) };
          if (i === 7) return { pressed: simRightX > 0.3, value: Math.abs(simRightX) };
          if (i === 12) return { pressed: simLeftY < -0.4, value: 1 };
          return { pressed: false, value: 0 };
        });

        setGamepadState({
          id: "Sanal Gamepad Simülatörü (Demo Modu)",
          index: 0,
          connected: true,
          timestamp: performance.now(),
          mapping: "standard",
          buttons: simButtons,
          axes: [simLeftX, simLeftY, simRightX, simRightY],
        });
      } else {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        const activeList: { index: number; id: string }[] = [];

        for (let i = 0; i < gamepads.length; i++) {
          const gp = gamepads[i];
          if (gp && gp.connected) {
            activeList.push({ index: gp.index, id: gp.id });
          }
        }
        setAvailableGamepads(activeList);

        const currentGp = gamepads[selectedSlot] || activeList[0] ? gamepads[activeList[0]?.index] : null;

        if (currentGp && currentGp.connected) {
          setGamepadState({
            id: currentGp.id,
            index: currentGp.index,
            connected: currentGp.connected,
            timestamp: currentGp.timestamp,
            mapping: currentGp.mapping,
            buttons: currentGp.buttons.map((b) => ({ pressed: b.pressed, value: b.value })),
            axes: [...currentGp.axes],
          });
        } else {
          setGamepadState(null);
        }
      }

      animationFrameRef.current = requestAnimationFrame(pollGamepads);
    };

    animationFrameRef.current = requestAnimationFrame(pollGamepads);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDemoMode, selectedSlot]);

  // Titreşim (Dual-Rumble) Testi
  const testVibration = async () => {
    if (typeof navigator === "undefined" || !navigator.getGamepads) return;
    const gamepads = navigator.getGamepads();
    const gp = gamepads[selectedSlot];

    if (gp && (gp as unknown as { vibrationActuator?: { playEffect: Function } }).vibrationActuator) {
      try {
        setVibrating(true);
        const actuator = (gp as unknown as { vibrationActuator: { playEffect: Function } }).vibrationActuator;
        await actuator.playEffect("dual-rumble", {
          startDelay: 0,
          duration: vibrationDuration,
          weakMagnitude,
          strongMagnitude,
        });
      } catch {
        // Vibration call error
      } finally {
        setTimeout(() => setVibrating(false), vibrationDuration);
      }
    } else {
      alert("Bu oyun kolu veya tarayıcı donanımsal titreşim (Haptic Vibration) API'sini desteklemiyor.");
    }
  };

  // Analog Çubuk Değerleri
  const leftStickX = gamepadState?.axes[0] ?? 0;
  const leftStickY = gamepadState?.axes[1] ?? 0;
  const rightStickX = gamepadState?.axes[2] ?? 0;
  const rightStickY = gamepadState?.axes[3] ?? 0;

  const leftStickMag = Math.min(1.0, Math.sqrt(leftStickX * leftStickX + leftStickY * leftStickY));
  const rightStickMag = Math.min(1.0, Math.sqrt(rightStickX * rightStickX + rightStickY * rightStickY));

  return (
    <div className="space-y-6">
      {/* 1. ÜST BAŞLIK VE KONTROL SEÇİM ALANI */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-5 rounded-3xl bg-base-100 border border-base-300 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge badge-warning badge-sm font-mono font-bold">
              Gamepad & Joystick API
            </span>
            {gamepadState ? (
              <span className="badge badge-success badge-sm font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Bağlı: Slot #{gamepadState.index}
              </span>
            ) : (
              <span className="badge badge-error badge-sm font-mono">
                Cihaz Bekleniyor
              </span>
            )}
          </div>
          <h2 className="text-xl font-black text-base-content flex items-center gap-2">
            <span>Oyun Kolu, Tuş Basıncı, Analog Çubuk & Titreşim Testi</span>
          </h2>
          <p className="text-xs text-base-content/70">
            Xbox, PlayStation (DualShock/DualSense), Nintendo Switch Pro veya genel USB/Bluetooth kontrolcünüzü bağlayın.
          </p>
        </div>

        {/* Kontrol Butonları */}
        <div className="flex items-center gap-2 flex-wrap">
          {availableGamepads.length > 1 && (
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(Number(e.target.value))}
              className="select select-xs rounded-xl font-mono bg-base-200 border-base-300"
            >
              {availableGamepads.map((gp) => (
                <option key={gp.index} value={gp.index}>
                  Slot {gp.index}: {gp.id.slice(0, 20)}...
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => setIsDemoMode((p) => !p)}
            className={`btn btn-xs font-mono rounded-xl gap-1 ${
              isDemoMode ? "btn-accent font-bold" : "btn-ghost border border-base-content/10"
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Sanal Demo Modu: {isDemoMode ? "Açık" : "Kapalı"}</span>
          </button>
        </div>
      </div>

      {/* CİHAZ BULUNAMADI UYARISI (Eğer bağlı kol yoksa ve demo kapalıysa) */}
      {!gamepadState && !isDemoMode && (
        <div className="p-8 rounded-3xl bg-base-200/50 border-2 border-dashed border-base-300 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-warning/10 text-warning flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-lg mx-auto">
            <h3 className="text-base font-bold text-base-content">
              Oyun Kolunuzu Bağlayın ve Herhangi Bir Tuşa Basın
            </h3>
            <p className="text-xs text-base-content/70 leading-relaxed">
              Tarayıcı güvenlik kuralları gereği, Gamepad API yalnızca kullanıcı kontrolcü üzerinde bir tuşa
              (A, B, X, Y veya Başlat) bastıktan sonra verileri paylaşmaya başlar.
            </p>
          </div>
          <div className="pt-1">
            <button
              onClick={() => setIsDemoMode(true)}
              className="btn btn-primary btn-sm font-mono rounded-xl gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Cihazım Yok, Simülatörü Başlat</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. AKTİF GAMEPAD GÖRSEL GÖVDESİ & 2D ANALOG KOORDİNATLAR */}
      {gamepadState && (
        <div className="space-y-6">
          {/* Cihaz Başlık Bilgisi */}
          <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 truncate">
              <Gamepad2 className="w-4 h-4 text-warning shrink-0" />
              <span className="font-bold text-base-content truncate">{gamepadState.id}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-base-content/70">
              <span>Haritalama: {gamepadState.mapping || "generic"}</span>
              <span>•</span>
              <span>17 Buton</span>
              <span>•</span>
              <span>4 Eksen</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sol: 2D Analog Joystick Hassasiyet & Drift Göstergesi (5 Kolon) */}
            <div className="lg:col-span-5 space-y-6 p-6 rounded-3xl bg-base-100 border border-base-300 shadow-sm">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-warning" />
                <span>2D Analog Çubuklar & Drift Denetimi</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sol Analog Çubuk */}
                <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300 flex flex-col items-center space-y-3">
                  <div className="text-xs font-mono font-bold text-base-content flex items-center justify-between w-full">
                    <span>SOL STICK (L3)</span>
                    <span className="badge badge-xs badge-neutral font-mono">
                      %{Math.round(leftStickMag * 100)}
                    </span>
                  </div>

                  {/* 2D Çapraz Izgara */}
                  <div className="w-36 h-36 rounded-full border-2 border-base-300 bg-[#1e1e2e] relative shadow-inner flex items-center justify-center overflow-hidden">
                    {/* Eksen çizgileri */}
                    <div className="absolute inset-x-0 h-px bg-white/10" />
                    <div className="absolute inset-y-0 w-px bg-white/10" />
                    {/* Ölü Bölge (Deadzone) Çemberi */}
                    <div className="w-12 h-12 rounded-full border border-dashed border-white/20" />

                    {/* Hareketli Nokta */}
                    <div
                      className="w-5 h-5 rounded-full bg-warning border-2 border-white shadow-lg absolute transition-all duration-75"
                      style={{
                        transform: `translate(${leftStickX * 55}px, ${leftStickY * 55}px)`,
                      }}
                    />
                  </div>

                  <div className="text-[11px] font-mono text-base-content/70 space-y-0.5 text-center">
                    <div>X: {leftStickX.toFixed(4)}</div>
                    <div>Y: {leftStickY.toFixed(4)}</div>
                  </div>
                </div>

                {/* Sağ Analog Çubuk */}
                <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300 flex flex-col items-center space-y-3">
                  <div className="text-xs font-mono font-bold text-base-content flex items-center justify-between w-full">
                    <span>SAĞ STICK (R3)</span>
                    <span className="badge badge-xs badge-neutral font-mono">
                      %{Math.round(rightStickMag * 100)}
                    </span>
                  </div>

                  {/* 2D Çapraz Izgara */}
                  <div className="w-36 h-36 rounded-full border-2 border-base-300 bg-[#1e1e2e] relative shadow-inner flex items-center justify-center overflow-hidden">
                    {/* Eksen çizgileri */}
                    <div className="absolute inset-x-0 h-px bg-white/10" />
                    <div className="absolute inset-y-0 w-px bg-white/10" />
                    {/* Ölü Bölge (Deadzone) Çemberi */}
                    <div className="w-12 h-12 rounded-full border border-dashed border-white/20" />

                    {/* Hareketli Nokta */}
                    <div
                      className="w-5 h-5 rounded-full bg-secondary border-2 border-white shadow-lg absolute transition-all duration-75"
                      style={{
                        transform: `translate(${rightStickX * 55}px, ${rightStickY * 55}px)`,
                      }}
                    />
                  </div>

                  <div className="text-[11px] font-mono text-base-content/70 space-y-0.5 text-center">
                    <div>X: {rightStickX.toFixed(4)}</div>
                    <div>Y: {rightStickY.toFixed(4)}</div>
                  </div>
                </div>
              </div>

              {/* Tetikler (LT / RT Analog Basınç) */}
              <div className="space-y-3 pt-2 border-t border-base-300">
                <span className="text-xs font-mono font-bold text-base-content/70 block">
                  Analog Tetikler (Trigger Pressure):
                </span>
                <div className="space-y-2 text-xs font-mono">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>LT / L2:</span>
                      <span className="font-bold">
                        %{Math.round((gamepadState.buttons[6]?.value ?? 0) * 100)}
                      </span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${(gamepadState.buttons[6]?.value ?? 0) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>RT / R2:</span>
                      <span className="font-bold">
                        %{Math.round((gamepadState.buttons[7]?.value ?? 0) * 100)}
                      </span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-secondary h-full transition-all"
                        style={{ width: `${(gamepadState.buttons[7]?.value ?? 0) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Titreşim (Haptic Vibration) Kontrolü */}
              <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-base-content/80 flex items-center gap-1.5">
                    <Vibrate className="w-4 h-4 text-secondary" />
                    <span>Titreşim (Dual-Rumble) Testi</span>
                  </span>
                  {vibrating && (
                    <span className="badge badge-secondary badge-xs font-mono animate-ping">
                      Titreşiyor
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div>
                    <label className="opacity-70 block mb-1">Ağır Motor: %{Math.round(strongMagnitude * 100)}</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={strongMagnitude}
                      onChange={(e) => setStrongMagnitude(parseFloat(e.target.value))}
                      className="range range-xs range-primary"
                    />
                  </div>
                  <div>
                    <label className="opacity-70 block mb-1">Hafif Motor: %{Math.round(weakMagnitude * 100)}</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={weakMagnitude}
                      onChange={(e) => setWeakMagnitude(parseFloat(e.target.value))}
                      className="range range-xs range-secondary"
                    />
                  </div>
                </div>

                <button
                  onClick={testVibration}
                  className="btn btn-secondary btn-sm w-full font-mono rounded-xl gap-2 shadow-xs"
                >
                  <Vibrate className="w-4 h-4" />
                  <span>Kolu Titret ({vibrationDuration}ms)</span>
                </button>
              </div>
            </div>

            {/* Sağ: 17 Butonluk Canlı Durum Matrisi (7 Kolon) */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-primary" />
                  <span>Tuş Matrisi & Canlı Basınç (Buttons)</span>
                </h3>
                <span className="text-[10px] font-mono text-base-content/40">17 Standart Buton</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                {BUTTON_LABELS.map((b) => {
                  const state = gamepadState.buttons[b.id] || { pressed: false, value: 0 };
                  const isPressed = state.pressed || state.value > 0.1;

                  return (
                    <div
                      key={b.id}
                      className={`p-3 rounded-2xl border transition-all flex flex-col justify-between space-y-1.5 ${
                        isPressed
                          ? "bg-secondary/15 text-secondary border-secondary/50 shadow-md scale-[1.02] ring-1 ring-secondary/30"
                          : "bg-base-200/40 text-base-content/70 border-base-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">
                          {b.xbox}
                        </span>
                        <span className="text-[10px] opacity-60">
                          {b.ps}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[10px] opacity-60 truncate mr-1">{b.name}</span>
                        <span
                          className={`badge badge-xs font-mono ${
                            isPressed ? "badge-secondary font-bold" : "badge-ghost opacity-60"
                          }`}
                        >
                          {state.value > 0 ? state.value.toFixed(2) : "0"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
