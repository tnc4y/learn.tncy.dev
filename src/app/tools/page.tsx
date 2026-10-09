"use client";

import { useState } from "react";
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
} from "lucide-react";

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

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<"resistor" | "timer" | "radix">("resistor");

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

  // 2. TİMER / FREKANS BÖLÜCÜ DURUMU
  const [clockFreqMHz, setClockFreqMHz] = useState(16); // 16 MHz (Arduino / AVR)
  const [targetFreqHz, setTargetFreqHz] = useState(1000); // 1 kHz
  const [prescaler, setPrescaler] = useState(64);

  const timerTicks = Math.round((clockFreqMHz * 1000000) / (prescaler * targetFreqHz));
  const actualFreq = (clockFreqMHz * 1000000) / (prescaler * timerTicks);
  const errorPercent = ((actualFreq - targetFreqHz) / targetFreqHz) * 100;

  // 3. RADİX / BİT DÖNÜŞTÜRÜCÜ DURUMU
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
              Geliştirici & Mühendislik Araçları
            </h1>
            <p className="text-sm sm:text-base text-base-content/70 mt-1">
              Direnç renk kodu, mikrokontrolcü saat frekans bölücü ve interaktif ikili sayı dönüştürücüleri.
            </p>
          </div>

          {/* Sekmeler */}
          <div className="flex items-center gap-1 bg-base-200 p-1 rounded-2xl border border-base-300 shrink-0">
            <button
              onClick={() => setActiveTab("resistor")}
              className={`btn btn-xs font-mono text-xs gap-1.5 rounded-xl ${
                activeTab === "resistor"
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Direnç Renk Kodu</span>
            </button>
            <button
              onClick={() => setActiveTab("timer")}
              className={`btn btn-xs font-mono text-xs gap-1.5 rounded-xl ${
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
              className={`btn btn-xs font-mono text-xs gap-1.5 rounded-xl ${
                activeTab === "radix"
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <Binary className="w-3.5 h-3.5" />
              <span>Bit & Radix</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. DİRENÇ RENK KODU HESAPLAYICI */}
      {activeTab === "resistor" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in duration-150">
          {/* Sol: Bant Seçimleri */}
          <div className="space-y-5 bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm">
            <h2 className="font-bold text-base text-base-content flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              <span>4-Bant Renk Seçimi</span>
            </h2>

            {/* 1. Bant */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-base-content/60 font-bold block">
                1. Bant (1. Rakam):
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                {COLOR_CODES.slice(1, 10).map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBand1(idx + 1)}
                    style={{ backgroundColor: c.hex, color: c.text }}
                    className={`p-2 rounded-xl text-xs font-mono font-bold text-center border transition-all ${
                      band1 === idx + 1 ? "ring-2 ring-primary scale-105" : "border-black/20"
                    }`}
                  >
                    {c.name} ({c.val})
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Bant */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-base-content/60 font-bold block">
                2. Bant (2. Rakam):
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                {COLOR_CODES.slice(0, 10).map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBand2(idx)}
                    style={{ backgroundColor: c.hex, color: c.text }}
                    className={`p-2 rounded-xl text-xs font-mono font-bold text-center border transition-all ${
                      band2 === idx ? "ring-2 ring-primary scale-105" : "border-black/20"
                    }`}
                  >
                    {c.name} ({c.val})
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Bant (Çarpan) */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-base-content/60 font-bold block">
                3. Bant (Çarpan Değeri):
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {[0, 1, 2, 3, 4, 5, 6, 10, 11].map((idx) => {
                  const c = COLOR_CODES[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => setBandMult(idx)}
                      style={{ backgroundColor: c.hex, color: c.text }}
                      className={`p-2 rounded-xl text-xs font-mono font-bold text-center border transition-all ${
                        bandMult === idx ? "ring-2 ring-primary scale-105" : "border-black/20"
                      }`}
                    >
                      {c.name} (x{c.mult})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Bant (Tolerans) */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-base-content/60 font-bold block">
                4. Bant (Tolerans):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[1, 2, 10, 11].map((idx) => {
                  const c = COLOR_CODES[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => setBandTol(idx)}
                      style={{ backgroundColor: c.hex, color: c.text }}
                      className={`p-2 rounded-xl text-xs font-mono font-bold text-center border transition-all ${
                        bandTol === idx ? "ring-2 ring-primary scale-105" : "border-black/20"
                      }`}
                    >
                      {c.name} (±%{c.tol})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sağ: Canlı Direnç SVG Görseli & Sonuç */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-base-200/60 border border-base-300 space-y-6 text-center">
              <h3 className="font-mono text-xs uppercase font-bold text-base-content/60">
                Canlı Direnç Görseli
              </h3>

              {/* SVG Direnç Gövdesi */}
              <div className="flex items-center justify-center py-4">
                <svg width="340" height="90" viewBox="0 0 340 90" className="drop-shadow-md">
                  {/* Metal Bacaklar */}
                  <rect x="0" y="42" width="70" height="6" fill="#9ca3af" />
                  <rect x="270" y="42" width="70" height="6" fill="#9ca3af" />
                  {/* Direnç Gövdesi (Bej/Açık Kahve) */}
                  <rect x="70" y="20" width="200" height="50" rx="14" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
                  {/* 1. Bant */}
                  <rect x="100" y="20" width="12" height="50" fill={COLOR_CODES[band1]?.hex} />
                  {/* 2. Bant */}
                  <rect x="130" y="20" width="12" height="50" fill={COLOR_CODES[band2]?.hex} />
                  {/* 3. Bant (Çarpan) */}
                  <rect x="160" y="20" width="12" height="50" fill={COLOR_CODES[bandMult]?.hex} />
                  {/* 4. Bant (Tolerans) */}
                  <rect x="225" y="20" width="12" height="50" fill={COLOR_CODES[bandTol]?.hex} />
                </svg>
              </div>

              {/* Hesaplanan Değer Kartı */}
              <div className="p-6 rounded-2xl bg-base-100 border border-base-300 space-y-2">
                <div className="text-xs font-mono text-base-content/50 uppercase">
                  Hesaplanan Direnç Değeri
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-primary">
                  {formatResistance(rawResistance)}
                </div>
                <div className="text-sm font-mono text-secondary font-bold">
                  Tolerans: ±%{tolerance}
                </div>
                <div className="text-xs font-mono text-base-content/60 pt-2 border-t border-base-content/10">
                  Minimum: {formatResistance(rawResistance * (1 - tolerance / 100))} | Maksimum:{" "}
                  {formatResistance(rawResistance * (1 + tolerance / 100))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TİMER / PRESCALER HESAPLAYICI */}
      {activeTab === "timer" && (
        <div className="max-w-3xl mx-auto space-y-6 bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm animate-in fade-in duration-150">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-base-content flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              <span>Mikrodenetleyici Timer & Frekans Bölücü Hesabı</span>
            </h2>
            <p className="text-xs text-base-content/70">
              Verilen saat frekansı ve prescaler değerine göre sayaç periyot register (ARR / Period) değerini hesaplar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-base-content/60 font-bold">
                MCU Saat Frekansı (MHz):
              </label>
              <select
                value={clockFreqMHz}
                onChange={(e) => setClockFreqMHz(Number(e.target.value))}
                className="select select-sm select-bordered w-full font-mono text-xs"
              >
                <option value={16}>16 MHz (Arduino Uno / AVR)</option>
                <option value={48}>48 MHz (STM32 Cortex-M0)</option>
                <option value={72}>72 MHz (STM32 BluePill)</option>
                <option value={80}>80 MHz (ESP8266)</option>
                <option value={133}>133 MHz (Raspberry Pi Pico)</option>
                <option value={240}>240 MHz (ESP32 Dual-Core)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-base-content/60 font-bold">
                Prescaler (Ön Bölücü):
              </label>
              <select
                value={prescaler}
                onChange={(e) => setPrescaler(Number(e.target.value))}
                className="select select-sm select-bordered w-full font-mono text-xs"
              >
                <option value={1}>1 (Bölme Yok)</option>
                <option value={8}>8</option>
                <option value={64}>64</option>
                <option value={256}>256</option>
                <option value={1024}>1024</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-base-content/60 font-bold">
                Hedef Kesme Hızı (Hz):
              </label>
              <input
                type="number"
                value={targetFreqHz}
                onChange={(e) => setTargetFreqHz(Math.max(1, Number(e.target.value)))}
                className="input input-sm input-bordered w-full font-mono text-xs"
              />
            </div>
          </div>

          {/* Hesaplanan Sonuç */}
          <div className="p-5 rounded-2xl bg-base-200/70 border border-base-300 space-y-3 font-mono">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
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

            <div className="pt-2 text-[11px] text-base-content/70 border-t border-base-content/10">
              💡 <strong>C Kod Örneği:</strong> <code>TIMx-&gt;PSC = {prescaler - 1}; TIMx-&gt;ARR = {timerTicks - 1};</code>
            </div>
          </div>
        </div>
      )}

      {/* 4. RADİX & BİT DÖNÜŞTÜRÜCÜ */}
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

          {/* 8-Bit Toggle Butonları */}
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

          {/* Taban Değerleri Tablosu */}
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
    </div>
  );
}
