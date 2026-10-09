"use client";

import { useState, useEffect } from "react";
import {
  Wrench,
  Cpu,
  Calculator,
  Binary,
  RotateCcw,
  Sparkles,
  Zap,
  Sliders,
  Check,
  Flame,
  Radio,
  Lightbulb,
  Split,
  Layers,
  ArrowRight,
  Code2,
  Keyboard,
  MousePointer,
  Gamepad2,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import KeyboardTester from "@/components/tools/KeyboardTester";
import MouseTester from "@/components/tools/MouseTester";
import GamepadTester from "@/components/tools/GamepadTester";

// Renk kodları tablosu
const COLOR_CODES = [
  { name: "Siyah", hex: "#000000", text: "#ffffff", val: 0, mult: 1, tol: null },
  { name: "Kahverengi", hex: "#8B4513", text: "#ffffff", val: 1, mult: 10, tol: 1 },
  { name: "Kırmızı", hex: "#EF4444", text: "#ffffff", val: 2, mult: 100, tol: 2 },
  { name: "Turuncu", hex: "#F97316", text: "#ffffff", val: 3, mult: 1000, tol: null },
  { name: "Sarı", hex: "#EAB308", text: "#000000", val: 4, mult: 10000, tol: null },
  { name: "Yeşil", hex: "#22C55E", text: "#ffffff", val: 5, mult: 100000, tol: 0.5 },
  { name: "Mavi", hex: "#3B82F6", text: "#ffffff", val: 6, mult: 1000000, tol: 0.25 },
  { name: "Mor", hex: "#A855F7", text: "#ffffff", val: 7, mult: 10000000, tol: 0.1 },
  { name: "Gri", hex: "#6B7280", text: "#ffffff", val: 8, mult: null, tol: 0.05 },
  { name: "Beyaz", hex: "#FFFFFF", text: "#000000", val: 9, mult: null, tol: null },
  { name: "Altın", hex: "#D4AF37", text: "#000000", val: null, mult: 0.1, tol: 5 },
  { name: "Gümüş", hex: "#C0C0C0", text: "#000000", val: null, mult: 0.01, tol: 10 },
];

const E12_VALUES = [
  10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82,
  100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820,
  1000, 1200, 1500, 1800, 2200, 2700, 3300, 3900, 4700, 5600, 6800, 8200,
  10000, 22000, 47000, 100000,
];

function getNearestE12(val: number): number {
  if (val <= 0) return 0;
  return E12_VALUES.reduce((prev, curr) =>
    Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
  );
}

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<
    "resistor" | "led_voltage" | "logic" | "timer" | "radix" | "input_testers"
  >("resistor");
  const [inputSubTab, setInputSubTab] = useState<"keyboard" | "mouse" | "gamepad">("keyboard");

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get("tab");
        if (tabParam === "keyboard") {
          setActiveTab("input_testers");
          setInputSubTab("keyboard");
        } else if (tabParam === "mouse") {
          setActiveTab("input_testers");
          setInputSubTab("mouse");
        } else if (tabParam === "gamepad") {
          setActiveTab("input_testers");
          setInputSubTab("gamepad");
        } else if (tabParam === "input" || tabParam === "input_testers") {
          setActiveTab("input_testers");
        }
      }
    } catch {}
  }, []);

  // 1. DİRENÇ HESAPLAYICI DURUMU
  const [band1, setBand1] = useState(1); // Kahverengi
  const [band2, setBand2] = useState(0); // Siyah
  const [bandMult, setBandMult] = useState(2); // Kırmızı (x100)
  const [bandTol, setBandTol] = useState(10); // Altın (±5%)

  const digit1 = COLOR_CODES[band1]?.val ?? 0;
  const digit2 = COLOR_CODES[band2]?.val ?? 0;
  const multiplier = COLOR_CODES[bandMult]?.mult ?? 1;
  const tolerance = COLOR_CODES[bandTol]?.tol ?? 5;

  const rawResistance = (digit1 * 10 + digit2) * multiplier;

  const formatResistance = (ohms: number) => {
    if (ohms >= 1000000) return `${(ohms / 1000000).toFixed(2)} MΩ`;
    if (ohms >= 1000) return `${(ohms / 1000).toFixed(2)} kΩ`;
    return `${ohms.toFixed(2)} Ω`;
  };

  // 2. LED DİRENCİ & GERİLİM BÖLÜCÜ DURUMU
  const [ledSubTab, setLedSubTab] = useState<"led" | "divider">("led");
  const [ledSupplyV, setLedSupplyV] = useState(5.0);
  const [ledForwardV, setLedForwardV] = useState(2.0); // Kırmızı LED varsayılan
  const [ledCurrentmA, setLedCurrentmA] = useState(20);

  const calculatedLedResistor =
    ledSupplyV > ledForwardV
      ? (ledSupplyV - ledForwardV) / (ledCurrentmA / 1000)
      : 0;
  const nearestE12Resistor = getNearestE12(calculatedLedResistor);
  const ledResistorPowerW =
    ledSupplyV > ledForwardV
      ? (ledSupplyV - ledForwardV) * (ledCurrentmA / 1000)
      : 0;

  // Gerilim Bölücü
  const [dividerVin, setDividerVin] = useState(5.0);
  const [dividerR1, setDividerR1] = useState(1000);
  const [dividerR2, setDividerR2] = useState(2000);

  const dividerVout =
    dividerR1 + dividerR2 > 0
      ? dividerVin * (dividerR2 / (dividerR1 + dividerR2))
      : 0;

  // 3. MANTIK KAPILARI DURUMU
  const [selectedGate, setSelectedGate] = useState<"AND" | "OR" | "XOR" | "NAND" | "NOR" | "XNOR" | "NOT">("AND");
  const [inputA, setInputA] = useState<0 | 1>(1);
  const [inputB, setInputB] = useState<0 | 1>(0);

  const computeGateOutput = (gate: string, a: number, b: number): number => {
    switch (gate) {
      case "AND":
        return a & b;
      case "OR":
        return a | b;
      case "XOR":
        return a ^ b;
      case "NAND":
        return (a & b) === 1 ? 0 : 1;
      case "NOR":
        return (a | b) === 1 ? 0 : 1;
      case "XNOR":
        return (a ^ b) === 1 ? 0 : 1;
      case "NOT":
        return a === 1 ? 0 : 1;
      default:
        return 0;
    }
  };

  const gateOutput = computeGateOutput(selectedGate, inputA, inputB);

  // 4. TİMER / FREKANS BÖLÜCÜ DURUMU
  const [clockFreqMHz, setClockFreqMHz] = useState(16); // 16 MHz (Arduino / AVR)
  const [targetFreqHz, setTargetFreqHz] = useState(1000); // 1 kHz
  const [prescaler, setPrescaler] = useState(64);

  const timerTicks = Math.round((clockFreqMHz * 1000000) / (prescaler * targetFreqHz));
  const actualFreq = (clockFreqMHz * 1000000) / (prescaler * timerTicks);
  const errorPercent = ((actualFreq - targetFreqHz) / targetFreqHz) * 100;

  // 5. RADİX / BİT DÖNÜŞTÜRÜCÜ DURUMU
  const [bits, setBits] = useState<number[]>([0, 0, 1, 0, 1, 0, 1, 0]); // 42 (0x2A)

  const toggleBit = (idx: number) => {
    setBits((prev) => {
      const next = [...prev];
      next[idx] = next[idx] === 1 ? 0 : 1;
      return next;
    });
  };

  const decimalVal = bits.reduce((acc, bit, idx) => acc + bit * Math.pow(2, 7 - idx), 0);
  const hexVal = "0x" + decimalVal.toString(16).toUpperCase().padStart(2, "0");
  const binVal = bits.join("");
  const asciiChar = decimalVal >= 32 && decimalVal <= 126 ? String.fromCharCode(decimalVal) : "Yazdırılamaz";

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8 pb-20">
      {/* 1. Başlık & Araç Seçici */}
      <div className="border-b border-base-300 pb-6 space-y-3">
        <div className="flex items-center gap-2 text-warning font-mono text-xs font-bold uppercase tracking-wider">
          <Wrench className="w-4 h-4" />
          <span>Mühendislik & Donanım Hesaplayıcıları</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
              Geliştirici & Mühendislik Araçları
            </h1>
            <p className="text-sm sm:text-base text-base-content/70 mt-1">
              Direnç renk kodu, LED ön direnci, voltaj bölücü, mantık kapısı simülatörü, timer frekansı ve sayı tabanı dönüştürücüleri.
            </p>
          </div>

          {/* Sekmeler */}
          <div className="flex items-center gap-1 bg-base-200 p-1.5 rounded-2xl border border-base-300 overflow-x-auto shrink-0">
            <button
              onClick={() => setActiveTab("resistor")}
              className={`btn btn-xs font-mono text-xs gap-1.5 rounded-xl whitespace-nowrap ${
                activeTab === "resistor"
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Direnç Renk Kodu</span>
            </button>
            <button
              onClick={() => setActiveTab("led_voltage")}
              className={`btn btn-xs font-mono text-xs gap-1.5 rounded-xl whitespace-nowrap ${
                activeTab === "led_voltage"
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-warning" />
              <span>LED & Voltaj Bölücü</span>
            </button>
            <button
              onClick={() => setActiveTab("logic")}
              className={`btn btn-xs font-mono text-xs gap-1.5 rounded-xl whitespace-nowrap ${
                activeTab === "logic"
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-accent" />
              <span>Mantık Kapıları & Simülatör</span>
            </button>
            <button
              onClick={() => setActiveTab("timer")}
              className={`btn btn-xs font-mono text-xs gap-1.5 rounded-xl whitespace-nowrap ${
                activeTab === "timer"
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Timer / Prescaler</span>
            </button>
            <button
              onClick={() => setActiveTab("radix")}
              className={`btn btn-xs font-mono text-xs gap-1.5 rounded-xl whitespace-nowrap ${
                activeTab === "radix"
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <Binary className="w-3.5 h-3.5" />
              <span>Bit & Radix</span>
            </button>
            <button
              onClick={() => setActiveTab("input_testers")}
              className={`btn btn-xs font-mono text-xs gap-1.5 rounded-xl whitespace-nowrap ${
                activeTab === "input_testers"
                  ? "btn-secondary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <Keyboard className="w-3.5 h-3.5 text-secondary" />
              <span>Giriş Test Cihazları (Klavye/Fare/Gamepad)</span>
              <span className="badge badge-secondary badge-xs font-mono text-[9px]">Yeni</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DİRENÇ RENK KODU HESAPLAYICI                           */}
      {/* ======================================================== */}
      {activeTab === "resistor" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in duration-150">
          <div className="space-y-5 bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm">
            <h2 className="text-xl font-black text-base-content flex items-center gap-2">
              <Sliders className="w-5 h-5 text-primary" />
              <span>4-Bant Renk Seçimi</span>
            </h2>

            {/* 1. Bant */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-base-content/70 flex justify-between">
                <span>1. Hane (Rakam)</span>
                <span className="text-primary">{COLOR_CODES[band1]?.name} ({digit1})</span>
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                {COLOR_CODES.slice(0, 10).map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBand1(idx)}
                    style={{ backgroundColor: c.hex, color: c.text }}
                    className={`h-8 rounded-lg text-xs font-mono font-bold transition-transform flex items-center justify-center border border-black/20 ${
                      band1 === idx ? "scale-110 ring-2 ring-primary shadow-md" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {c.val}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Bant */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-base-content/70 flex justify-between">
                <span>2. Hane (Rakam)</span>
                <span className="text-primary">{COLOR_CODES[band2]?.name} ({digit2})</span>
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                {COLOR_CODES.slice(0, 10).map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBand2(idx)}
                    style={{ backgroundColor: c.hex, color: c.text }}
                    className={`h-8 rounded-lg text-xs font-mono font-bold transition-transform flex items-center justify-center border border-black/20 ${
                      band2 === idx ? "scale-110 ring-2 ring-primary shadow-md" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {c.val}
                  </button>
                ))}
              </div>
            </div>

            {/* Çarpan Bant */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-base-content/70 flex justify-between">
                <span>Çarpan (x10ⁿ)</span>
                <span className="text-secondary">{COLOR_CODES[bandMult]?.name} (x{multiplier})</span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {COLOR_CODES.filter((c) => c.mult !== null).map((c) => {
                  const idx = COLOR_CODES.indexOf(c);
                  return (
                    <button
                      key={idx}
                      onClick={() => setBandMult(idx)}
                      style={{ backgroundColor: c.hex, color: c.text }}
                      className={`h-8 px-2 rounded-lg text-[10px] font-mono font-bold truncate transition-transform border border-black/20 ${
                        bandMult === idx ? "scale-105 ring-2 ring-secondary shadow-md" : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tolerans Bant */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-base-content/70 flex justify-between">
                <span>Tolerans (Hata Payı)</span>
                <span className="text-accent">{COLOR_CODES[bandTol]?.name} (±%{tolerance})</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {COLOR_CODES.filter((c) => c.tol !== null).map((c) => {
                  const idx = COLOR_CODES.indexOf(c);
                  return (
                    <button
                      key={idx}
                      onClick={() => setBandTol(idx)}
                      style={{ backgroundColor: c.hex, color: c.text }}
                      className={`h-8 px-2 rounded-lg text-[10px] font-mono font-bold truncate transition-transform border border-black/20 ${
                        bandTol === idx ? "scale-105 ring-2 ring-accent shadow-md" : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      ±%{c.tol}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sağ: Görsel Direnç & Değer Kartı */}
          <div className="space-y-6">
            <div className="bg-base-100 p-8 rounded-3xl border border-base-300 shadow-sm text-center space-y-6 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm py-8 relative flex items-center justify-center">
                <div className="absolute w-full h-2 bg-zinc-400 rounded-full" />
                <div className="relative w-64 h-16 bg-[#d2b48c] rounded-full border-2 border-[#b59469] shadow-lg flex items-center justify-around px-8 z-10">
                  <div style={{ backgroundColor: COLOR_CODES[band1]?.hex }} className="w-3.5 h-full border-x border-black/20 shadow-xs" />
                  <div style={{ backgroundColor: COLOR_CODES[band2]?.hex }} className="w-3.5 h-full border-x border-black/20 shadow-xs" />
                  <div style={{ backgroundColor: COLOR_CODES[bandMult]?.hex }} className="w-3.5 h-full border-x border-black/20 shadow-xs" />
                  <div style={{ backgroundColor: COLOR_CODES[bandTol]?.hex }} className="w-3.5 h-full border-x border-black/20 shadow-xs ml-4" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-base-content/50 block">
                  Hesaplanan Direnç Değeri
                </span>
                <div className="text-4xl sm:text-5xl font-black text-primary font-mono tracking-tight">
                  {formatResistance(rawResistance)}
                </div>
                <div className="text-sm font-mono text-base-content/70">
                  Tolerans: <strong>±%{tolerance}</strong> ({formatResistance(rawResistance * (1 - tolerance / 100))} - {formatResistance(rawResistance * (1 + tolerance / 100))})
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. LED DİRENCİ & GERİLİM BÖLÜCÜ                           */}
      {/* ======================================================== */}
      {activeTab === "led_voltage" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 border-b border-base-300 pb-3">
            <button
              onClick={() => setLedSubTab("led")}
              className={`btn btn-sm font-mono text-xs rounded-xl ${
                ledSubTab === "led" ? "btn-primary font-bold shadow-xs" : "btn-ghost text-base-content/70"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>1. LED Seri Ön Direnç Hesaplayıcı</span>
            </button>
            <button
              onClick={() => setLedSubTab("divider")}
              className={`btn btn-sm font-mono text-xs rounded-xl ${
                ledSubTab === "divider" ? "btn-secondary font-bold shadow-xs" : "btn-ghost text-base-content/70"
              }`}
            >
              <Split className="w-3.5 h-3.5" />
              <span>2. Gerilim Bölücü (Voltage Divider)</span>
            </button>
          </div>

          {/* A) LED ÖN DİRENCİ */}
          {ledSubTab === "led" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-base-100 p-6 rounded-3xl border border-base-300 space-y-5">
                <h3 className="font-bold text-base text-base-content flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-warning" />
                  <span>Giriş Parametreleri</span>
                </h3>

                {/* Besleme Gerilimi */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-base-content/70 flex justify-between">
                    <span>Kaynak Besleme Gerilimi (Vcc):</span>
                    <span className="text-primary">{ledSupplyV.toFixed(1)} V</span>
                  </label>
                  <div className="flex gap-2">
                    {[3.3, 5.0, 9.0, 12.0].map((v) => (
                      <button
                        key={v}
                        onClick={() => setLedSupplyV(v)}
                        className={`btn btn-xs font-mono rounded-lg ${
                          ledSupplyV === v ? "btn-primary" : "btn-outline border-base-content/20"
                        }`}
                      >
                        {v}V
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    step="0.1"
                    value={ledSupplyV}
                    onChange={(e) => setLedSupplyV(parseFloat(e.target.value))}
                    className="range range-xs range-primary"
                  />
                </div>

                {/* LED İleri Gerilimi */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-base-content/70 flex justify-between">
                    <span>LED İleri Gerilim Düşümü (Vf):</span>
                    <span className="text-warning">{ledForwardV.toFixed(1)} V</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: "Kırmızı", vf: 2.0, color: "bg-red-500 text-white" },
                      { name: "Sarı", vf: 2.1, color: "bg-yellow-500 text-black" },
                      { name: "Yeşil", vf: 2.2, color: "bg-green-500 text-white" },
                      { name: "Mavi", vf: 3.2, color: "bg-blue-500 text-white" },
                      { name: "Beyaz", vf: 3.2, color: "bg-slate-200 text-black" },
                    ].map((l) => (
                      <button
                        key={l.name}
                        onClick={() => setLedForwardV(l.vf)}
                        className={`btn btn-xs font-mono rounded-lg ${l.color} ${
                          ledForwardV === l.vf ? "ring-2 ring-primary shadow-sm" : "opacity-80"
                        }`}
                      >
                        {l.name} ({l.vf}V)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hedef Akım */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-base-content/70 flex justify-between">
                    <span>LED Çalışma Akımı (If):</span>
                    <span className="text-secondary">{ledCurrentmA} mA</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={ledCurrentmA}
                    onChange={(e) => setLedCurrentmA(parseInt(e.target.value))}
                    className="range range-xs range-secondary"
                  />
                </div>
              </div>

              {/* Sonuç Kartı */}
              <div className="bg-base-100 p-8 rounded-3xl border border-base-300 space-y-6 text-center">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase text-base-content/50">Gereken Minimum Direnç:</span>
                  <div className="text-4xl font-black font-mono text-primary">
                    {calculatedLedResistor > 0 ? `${calculatedLedResistor.toFixed(1)} Ω` : "Geçersiz"}
                  </div>
                  <div className="text-xs font-mono text-base-content/70">
                    Önerilen Standart E12 Direnç: <strong className="text-success text-base">{nearestE12Resistor} Ω</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left font-mono text-xs">
                  <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300">
                    <span className="text-[10px] text-base-content/50 block">Direnç Üzerinde Güç (P):</span>
                    <span className="font-bold text-sm text-secondary">{(ledResistorPowerW * 1000).toFixed(1)} mW</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300">
                    <span className="text-[10px] text-base-content/50 block">Önerilen Direnç Tipi:</span>
                    <span className="font-bold text-sm text-accent">1/4 Watt (0.25W)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-xs font-mono text-left">
                  💡 <strong>Ohm Kanunu Formülü:</strong> <code>R = (Vcc - Vf) / If = ({ledSupplyV} - {ledForwardV}) / {(ledCurrentmA / 1000).toFixed(3)}</code>
                </div>
              </div>
            </div>
          )}

          {/* B) GERİLİM BÖLÜCÜ */}
          {ledSubTab === "divider" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-base-100 p-6 rounded-3xl border border-base-300 space-y-5">
                <h3 className="font-bold text-base text-base-content flex items-center gap-2">
                  <Split className="w-4 h-4 text-secondary" />
                  <span>Direnç ve Gerilim Değerleri</span>
                </h3>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-base-content/70">Giriş Gerilimi (Vin):</label>
                  <input
                    type="number"
                    value={dividerVin}
                    onChange={(e) => setDividerVin(parseFloat(e.target.value) || 0)}
                    className="input input-sm input-bordered w-full font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-base-content/70">Üst Direnç R1 (Ohm):</label>
                  <input
                    type="number"
                    value={dividerR1}
                    onChange={(e) => setDividerR1(parseFloat(e.target.value) || 0)}
                    className="input input-sm input-bordered w-full font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-base-content/70">Alt Direnç R2 (Ohm):</label>
                  <input
                    type="number"
                    value={dividerR2}
                    onChange={(e) => setDividerR2(parseFloat(e.target.value) || 0)}
                    className="input input-sm input-bordered w-full font-mono text-xs"
                  />
                </div>

                {/* Hazır Mantık Seviyesi Şablonları */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-mono text-base-content/50 uppercase block">Popüler Şablonlar:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => { setDividerVin(5); setDividerR1(1000); setDividerR2(2000); }}
                      className="btn btn-xs font-mono"
                    >
                      5V → 3.3V (1k / 2k)
                    </button>
                    <button
                      onClick={() => { setDividerVin(12); setDividerR1(10000); setDividerR2(3800); }}
                      className="btn btn-xs font-mono"
                    >
                      12V → 3.3V ADC
                    </button>
                    <button
                      onClick={() => { setDividerVin(12); setDividerR1(10000); setDividerR2(7100); }}
                      className="btn btn-xs font-mono"
                    >
                      12V → 5V Arduino
                    </button>
                  </div>
                </div>
              </div>

              {/* Çıkış Kartı */}
              <div className="bg-base-100 p-8 rounded-3xl border border-base-300 space-y-6 text-center">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase text-base-content/50">Bölücü Çıkış Gerilimi (Vout):</span>
                  <div className="text-5xl font-black font-mono text-secondary">
                    {dividerVout.toFixed(2)} V
                  </div>
                  <div className="text-xs font-mono text-base-content/70">
                    Bölme Oranı: <strong>{(dividerVout / (dividerVin || 1)).toFixed(3)}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300 font-mono text-xs text-left space-y-1">
                  <div><strong>Formül:</strong> <code>Vout = Vin * [ R2 / (R1 + R2) ]</code></div>
                  <div className="text-base-content/70">Vout = {dividerVin} * [ {dividerR2} / ({dividerR1} + {dividerR2}) ]</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. SAYISAL MANTIK KAPILARI & DOĞRULUK TABLOSU            */}
      {/* ======================================================== */}
      {activeTab === "logic" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Kapı Seçim Butonları */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 p-3 rounded-2xl bg-base-200/60 border border-base-300">
            {["AND", "OR", "XOR", "NAND", "NOR", "XNOR", "NOT"].map((gate) => (
              <button
                key={gate}
                onClick={() => setSelectedGate(gate as typeof selectedGate)}
                className={`btn btn-xs sm:btn-sm font-mono rounded-xl ${
                  selectedGate === gate
                    ? "btn-primary shadow-xs font-black"
                    : "btn-ghost border border-base-content/10 text-base-content/75"
                }`}
              >
                {gate}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Sol: İnteraktif Girişler ve Canlı Çıkış */}
            <div className="bg-base-100 p-6 rounded-3xl border border-base-300 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-base-content flex items-center gap-2">
                  <Radio className="w-4 h-4 text-primary" />
                  <span>{selectedGate} Kapısı Simülatörü</span>
                </h3>
                <span className="badge badge-accent badge-sm font-mono font-bold">Canlı Mantık</span>
              </div>

              {/* Giriş Anahtarları */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300 space-y-2 text-center">
                  <span className="text-xs font-mono font-bold text-base-content/60">Giriş A</span>
                  <button
                    onClick={() => setInputA(inputA === 1 ? 0 : 1)}
                    className={`w-full py-4 rounded-xl font-mono text-2xl font-black transition-all border ${
                      inputA === 1
                        ? "bg-emerald-500 text-white border-emerald-400 shadow-md ring-2 ring-emerald-300"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700"
                    }`}
                  >
                    {inputA} {inputA === 1 ? "(HIGH)" : "(LOW)"}
                  </button>
                </div>

                {selectedGate !== "NOT" && (
                  <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300 space-y-2 text-center">
                    <span className="text-xs font-mono font-bold text-base-content/60">Giriş B</span>
                    <button
                      onClick={() => setInputB(inputB === 1 ? 0 : 1)}
                      className={`w-full py-4 rounded-xl font-mono text-2xl font-black transition-all border ${
                        inputB === 1
                          ? "bg-emerald-500 text-white border-emerald-400 shadow-md ring-2 ring-emerald-300"
                          : "bg-zinc-800 text-zinc-400 border-zinc-700"
                      }`}
                    >
                      {inputB} {inputB === 1 ? "(HIGH)" : "(LOW)"}
                    </button>
                  </div>
                )}
              </div>

              {/* Çıkış LED / Gösterge */}
              <div className="p-6 rounded-2xl bg-base-200/80 border border-base-300 text-center space-y-2">
                <span className="text-xs font-mono uppercase text-base-content/50">Çıkış (Q):</span>
                <div
                  className={`text-5xl font-mono font-black py-2 rounded-2xl transition-all ${
                    gateOutput === 1
                      ? "text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 shadow-lg"
                      : "text-zinc-500 bg-zinc-900 border border-zinc-800"
                  }`}
                >
                  {gateOutput}
                </div>
                <div className="text-xs font-mono text-base-content/70">
                  {gateOutput === 1 ? "💡 LED Yanıyor (HIGH - Mantık 1)" : "⚫ LED Sönük (LOW - Mantık 0)"}
                </div>
              </div>
            </div>

            {/* Sağ: Doğruluk Tablosu & Kod Eşdeğeri */}
            <div className="space-y-6">
              {/* Doğruluk Tablosu */}
              <div className="bg-base-100 p-6 rounded-3xl border border-base-300 space-y-4">
                <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-base-content/60">
                  Doğruluk Tablosu (Truth Table)
                </h4>

                <div className="overflow-x-auto">
                  <table className="table table-sm font-mono text-xs w-full text-center">
                    <thead>
                      <tr className="bg-base-200 border-b border-base-300">
                        <th>Giriş A</th>
                        {selectedGate !== "NOT" && <th>Giriş B</th>}
                        <th className="text-primary font-bold">Çıkış Q</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedGate === "NOT"
                        ? [0, 1]
                        : [
                            [0, 0],
                            [0, 1],
                            [1, 0],
                            [1, 1],
                          ]
                      ).map((row, idx) => {
                        const a = Array.isArray(row) ? row[0] : row;
                        const b = Array.isArray(row) ? row[1] : 0;
                        const out = computeGateOutput(selectedGate, a, b);
                        const isCurrent =
                          selectedGate === "NOT"
                            ? inputA === a
                            : inputA === a && inputB === b;

                        return (
                          <tr
                            key={idx}
                            className={`border-b border-base-300/40 transition-colors ${
                              isCurrent
                                ? "bg-primary/20 font-bold text-primary"
                                : "hover:bg-base-200/50"
                            }`}
                          >
                            <td>{a}</td>
                            {selectedGate !== "NOT" && <td>{b}</td>}
                            <td className="font-bold">{out}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Kod Eşdeğerleri */}
              <div className="bg-base-100 p-5 rounded-2xl border border-base-300 font-mono text-xs space-y-2">
                <span className="text-[10px] text-base-content/50 uppercase block">Kodlama Karşılıkları:</span>
                <div className="p-2.5 rounded-xl bg-base-200 text-base-content/90 space-y-1">
                  <div><strong>SystemVerilog:</strong> <code>assign Q = {selectedGate === "NOT" ? "~A;" : selectedGate === "AND" ? "A & B;" : selectedGate === "OR" ? "A | B;" : selectedGate === "XOR" ? "A ^ B;" : selectedGate === "NAND" ? "~(A & B);" : selectedGate === "NOR" ? "~(A | B);" : "~(A ^ B);"}</code></div>
                  <div><strong>C / C++:</strong> <code>uint8_t Q = {selectedGate === "NOT" ? "!A;" : selectedGate === "AND" ? "A & B;" : selectedGate === "OR" ? "A | B;" : selectedGate === "XOR" ? "A ^ B;" : selectedGate === "NAND" ? "!(A & B);" : selectedGate === "NOR" ? "!(A | B);" : "!(A ^ B);"}</code></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. TİMER / FREKANS BÖLÜCÜ                                */}
      {/* ======================================================== */}
      {activeTab === "timer" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in duration-150">
          <div className="space-y-5 bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm">
            <h2 className="text-xl font-black text-base-content flex items-center gap-2">
              <Cpu className="w-5 h-5 text-secondary" />
              <span>Mikrodenetleyici Saat Parametreleri</span>
            </h2>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-base-content/70 flex justify-between">
                <span>MCU Kristal Saat Hızı (F_CPU):</span>
                <span className="text-primary">{clockFreqMHz} MHz</span>
              </label>
              <div className="flex gap-2">
                {[8, 16, 72, 84, 133, 240].map((mhz) => (
                  <button
                    key={mhz}
                    onClick={() => setClockFreqMHz(mhz)}
                    className={`btn btn-xs font-mono rounded-lg ${
                      clockFreqMHz === mhz ? "btn-primary" : "btn-outline border-base-content/20"
                    }`}
                  >
                    {mhz}MHz
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="1"
                max="300"
                value={clockFreqMHz}
                onChange={(e) => setClockFreqMHz(parseInt(e.target.value))}
                className="range range-xs range-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-base-content/70 flex justify-between">
                <span>Hedef Kesme (Interrupt) Frekansı:</span>
                <span className="text-secondary">{targetFreqHz} Hz</span>
              </label>
              <div className="flex gap-2">
                {[10, 100, 1000, 10000].map((hz) => (
                  <button
                    key={hz}
                    onClick={() => setTargetFreqHz(hz)}
                    className={`btn btn-xs font-mono rounded-lg ${
                      targetFreqHz === hz ? "btn-secondary" : "btn-outline border-base-content/20"
                    }`}
                  >
                    {hz >= 1000 ? `${hz / 1000}kHz` : `${hz}Hz`}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="1"
                max="50000"
                value={targetFreqHz}
                onChange={(e) => setTargetFreqHz(parseInt(e.target.value))}
                className="range range-xs range-secondary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-base-content/70 flex justify-between">
                <span>Prescaler (Frekans Ön Bölücü):</span>
                <span className="text-accent">{prescaler}</span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                {[1, 8, 64, 128, 256, 512, 1024].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrescaler(p)}
                    className={`btn btn-xs font-mono rounded-lg ${
                      prescaler === p ? "btn-accent font-bold" : "btn-outline border-base-content/20"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-base-100 p-8 rounded-3xl border border-base-300 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-base-content font-mono">
              Hesaplanan Timer Parametreleri
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div>
                <span className="text-base-content/50 block text-[10px]">Timer Sayaç Eşiği (Period):</span>
                <span className="font-bold text-lg text-primary">{timerTicks} tick</span>
              </div>
              <div>
                <span className="text-base-content/50 block text-[10px]">Gerçek Üretilen Frekans:</span>
                <span className="font-bold text-lg text-secondary">{actualFreq.toFixed(2)} Hz</span>
              </div>
              <div>
                <span className="text-base-content/50 block text-[10px]">Zamanlama Hatası:</span>
                <span className={`font-bold text-lg ${Math.abs(errorPercent) > 1 ? "text-error" : "text-success"}`}>
                  %{errorPercent.toFixed(3)}
                </span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-base-content/70 border-t border-base-content/10 font-mono">
              💡 <strong>C Kod Örneği:</strong> <code>TIMx-&gt;PSC = {prescaler - 1}; TIMx-&gt;ARR = {timerTicks - 1};</code>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. RADİX & BİT DÖNÜŞTÜRÜCÜ                               */}
      {/* ======================================================== */}
      {activeTab === "radix" && (
        <div className="max-w-3xl mx-auto space-y-6 bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm animate-in fade-in duration-150">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-base-content flex items-center gap-2">
              <Binary className="w-5 h-5 text-primary" />
              <span>İnteraktif 8-Bit Sayı Tabanı & Bit Operatörleri</span>
            </h2>
            <p className="text-xs text-base-content/70">
              Aşağıdaki bitlere tıklayarak anında Decimal, Hexadecimal ve ASCII karşılıklarını canlı görün.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-base-200/70 border border-base-300 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-base-content/50 px-1">
              <span>MSB (Bit 7)</span>
              <span>LSB (Bit 0)</span>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {bits.map((b, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleBit(idx)}
                  className={`py-3 rounded-xl font-mono text-base font-black transition-all border ${
                    b === 1
                      ? "bg-primary text-primary-content border-primary shadow-sm scale-105"
                      : "bg-base-100 text-base-content/50 border-base-300 hover:border-primary/50"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
            <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300 space-y-1">
              <div className="text-[10px] text-base-content/50 uppercase">Decimal (Onluk)</div>
              <div className="text-2xl font-black text-primary">{decimalVal}</div>
            </div>

            <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300 space-y-1">
              <div className="text-[10px] text-base-content/50 uppercase">Hex (Onaltılık)</div>
              <div className="text-2xl font-black text-secondary">{hexVal}</div>
            </div>

            <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300 space-y-1">
              <div className="text-[10px] text-base-content/50 uppercase">Binary (İkilik)</div>
              <div className="text-lg font-black text-accent truncate">{binVal}</div>
            </div>

            <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300 space-y-1">
              <div className="text-[10px] text-base-content/50 uppercase">ASCII Karakteri</div>
              <div className="text-xl font-black text-base-content truncate">{asciiChar}</div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. GİRİŞ TEST CİHAZLARI (KLAVYE, FARE, GAMEPAD)          */}
      {/* ======================================================== */}
      {activeTab === "input_testers" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Cihaz Seçim Butonları */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-base-200/80 border border-base-300 w-fit overflow-x-auto">
            <button
              onClick={() => setInputSubTab("keyboard")}
              className={`btn btn-xs font-mono gap-1.5 rounded-xl whitespace-nowrap transition-all ${
                inputSubTab === "keyboard"
                  ? "btn-secondary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>⌨️ Klavye & Rollover (NKRO)</span>
            </button>

            <button
              onClick={() => setInputSubTab("mouse")}
              className={`btn btn-xs font-mono gap-1.5 rounded-xl whitespace-nowrap transition-all ${
                inputSubTab === "mouse"
                  ? "btn-secondary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <MousePointer className="w-3.5 h-3.5" />
              <span>🖱️ Fare & Polling Rate (Hz)</span>
            </button>

            <button
              onClick={() => setInputSubTab("gamepad")}
              className={`btn btn-xs font-mono gap-1.5 rounded-xl whitespace-nowrap transition-all ${
                inputSubTab === "gamepad"
                  ? "btn-secondary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>🎮 Gamepad & Joystick (Titreşim)</span>
            </button>
          </div>

          {inputSubTab === "keyboard" && <KeyboardTester />}
          {inputSubTab === "mouse" && <MouseTester />}
          {inputSubTab === "gamepad" && <GamepadTester />}
        </div>
      )}
    </div>
  );
}
