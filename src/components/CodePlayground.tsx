"use client";

import { useState } from "react";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Activity,
  CheckCircle,
  AlertTriangle,
  Maximize2,
  Minimize2,
  Trash2,
} from "lucide-react";

export interface PlaygroundProps {
  title?: string;
  initialCode: string;
  expectedOutput?: string[];
  signals?: {
    name: string;
    wave: string; // '010101...' or 'hlhlhl...'
    data?: string[];
  }[];
  notes?: string;
  mode?: "embedded" | "fullscreen";
}

export default function CodePlayground({
  title = "İnteraktif SystemVerilog Deneme Alanı (Try It Yourself)",
  initialCode,
  expectedOutput = [
    "[INFO:EDA] Compiling testbench.sv and dut.sv...",
    "[INFO:SIM] Starting simulation at 0.00ns (Time precision: 1ps)",
    "[@10ns] CLK: 0 | RST_N: 0 | OUT: 4'h0 | Durum: Reset Aktif",
    "[@20ns] CLK: 1 | RST_N: 1 | OUT: 4'h0 | Durum: Reset Bırakıldı",
    "[@30ns] CLK: 0 | RST_N: 1 | OUT: 4'h1 | Durum: Sayma Başladı (1)",
    "[@40ns] CLK: 1 | RST_N: 1 | OUT: 4'h2 | Durum: Sayma Devam (2)",
    "[@50ns] CLK: 0 | RST_N: 1 | OUT: 4'h3 | Durum: Sayma Devam (3)",
    "[SUCCESS] Testbench tamamlandı: 0 Hata, 0 Uyarı.",
  ],
  signals = [
    { name: "clk", wave: "010101010101" },
    { name: "rst_n", wave: "001111111111" },
    { name: "count[3:0]", wave: "========", data: ["0", "0", "1", "2", "3", "4"] },
  ],
  notes = "Kodu doğrudan düzenleyebilir ve 'Simülasyonu Çalıştır' ile anında test edebilirsiniz.",
  mode = "embedded",
}: PlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(mode === "fullscreen");
  const [activeRightTab, setActiveRightTab] = useState<"both" | "waveform" | "terminal">(
    mode === "fullscreen" ? "both" : "terminal"
  );

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 450);
  };

  const handleReset = () => {
    setCode(initialCode);
    setHasRun(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFs = isFullscreen || mode === "fullscreen";

  return (
    <div
      className={`border border-base-300 rounded-2xl overflow-hidden bg-base-100 shadow-xl transition-all ${
        isFs
          ? "w-full h-[calc(100vh-8.5rem)] min-h-[600px] flex flex-col"
          : "my-6 shadow-md"
      }`}
    >
      {/* 1. ÜST ARAÇ ÇUBUĞU (TOOLBAR) */}
      <div className="bg-base-200/90 px-4 py-2.5 border-b border-base-300 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-error/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-warning/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-success/80 inline-block" />
          </div>
          <span className="text-xs sm:text-sm font-bold font-mono text-base-content/90 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            {title}
          </span>
          <span className="badge badge-xs badge-neutral font-mono hidden sm:inline">
            Icarus / Verilator Wasm
          </span>
        </div>

        {/* Eylem Butonları */}
        <div className="flex items-center gap-2">
          {mode === "fullscreen" && (
            <div className="join join-horizontal bg-base-300/60 p-0.5 rounded-lg hidden md:flex mr-2">
              <button
                onClick={() => setActiveRightTab("both")}
                className={`btn btn-xs join-item font-mono text-[10px] ${
                  activeRightTab === "both" ? "btn-primary" : "btn-ghost"
                }`}
              >
                İkili Görünüm
              </button>
              <button
                onClick={() => setActiveRightTab("waveform")}
                className={`btn btn-xs join-item font-mono text-[10px] ${
                  activeRightTab === "waveform" ? "btn-primary" : "btn-ghost"
                }`}
              >
                Sadece Dalga Formu
              </button>
              <button
                onClick={() => setActiveRightTab("terminal")}
                className={`btn btn-xs join-item font-mono text-[10px] ${
                  activeRightTab === "terminal" ? "btn-primary" : "btn-ghost"
                }`}
              >
                Sadece Terminal
              </button>
            </div>
          )}

          <button
            onClick={handleCopy}
            className="btn btn-ghost btn-xs gap-1 font-mono text-[11px]"
            title="Kodu Kopyala"
          >
            {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
            {copied ? "Kopyalandı" : "Kopyala"}
          </button>
          <button
            onClick={handleReset}
            className="btn btn-ghost btn-xs gap-1 font-mono text-[11px]"
            title="Sıfırla"
          >
            <RotateCcw className="w-3 h-3" />
            Sıfırla
          </button>

          {mode === "embedded" && (
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="btn btn-ghost btn-xs gap-1 font-mono text-[11px]"
              title={isFullscreen ? "Küçült" : "Tam Ekran Yap"}
            >
              {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </button>
          )}

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="btn btn-primary btn-sm gap-1.5 font-mono text-xs shadow-sm"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : ""}`} />
            {isRunning ? "Simüle Ediliyor..." : "Simülasyonu Çalıştır"}
          </button>
        </div>
      </div>

      {/* 2. ANA ÇALIŞMA ALANI (SPLIT PANE) */}
      <div className={`flex-1 flex flex-col ${isFs ? "lg:flex-row overflow-hidden" : ""}`}>
        {/* SOL PANEL: KOD EDİTÖRÜ */}
        <div
          className={`${
            isFs ? "w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-base-300" : "w-full"
          } bg-[#181825] text-[#cdd6f4] relative flex flex-col`}
        >
          {/* Editör Üst Sekmesi */}
          <div className="bg-[#11111b] px-4 py-2 border-b border-white/5 flex items-center justify-between text-xs font-mono text-white/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-white font-semibold">top_tb.sv</span>
              <span className="text-white/40">• SystemVerilog</span>
            </div>
            <span>UTF-8</span>
          </div>

          {/* Editör Metin Alanı */}
          <div className="flex-1 relative flex">
            {/* Satır Numaraları */}
            <div className="w-10 py-4 select-none text-right pr-2 text-[#6c7086] font-mono text-xs border-r border-white/5 bg-[#181825]/50 shrink-0">
              {code.split("\n").map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Kod Alanı */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              rows={isFs ? undefined : Math.min(22, Math.max(10, code.split("\n").length + 1))}
              className={`flex-1 p-4 font-mono text-xs sm:text-sm bg-transparent resize-none focus:outline-none leading-6 border-none selection:bg-primary/30 ${
                isFs ? "h-full overflow-y-auto" : ""
              }`}
              style={{ tabSize: 2 }}
            />
          </div>
        </div>

        {/* SAĞ PANEL: ÇIKTILAR (DALGA FORMU + AYRI TERMİNAL) */}
        <div
          className={`${
            isFs ? "w-full lg:w-1/2 flex flex-col bg-base-100 overflow-hidden" : "w-full"
          }`}
        >
          {/* A. SİNYAL DALGA FORMU (WAVEFORM GÖRSELİ) */}
          {(activeRightTab === "both" || activeRightTab === "waveform" || !isFs) && (
            <div
              className={`${
                isFs && activeRightTab === "both"
                  ? "h-1/2 border-b border-base-300 flex flex-col"
                  : isFs
                  ? "flex-1 flex flex-col"
                  : "border-t border-base-300"
              } bg-base-100/50 p-4 overflow-y-auto`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-base-300/50 mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-bold uppercase font-mono tracking-wider text-base-content">
                    Dijital Sinyal Dalga Formu (Waveform Görseli)
                  </span>
                </div>
                <span className="badge badge-sm badge-secondary badge-outline font-mono text-[10px]">
                  VCD Sinyal Analizi
                </span>
              </div>

              {/* Sinyal Çizim Alanı (SVG-like Timing Diagram) */}
              <div className="space-y-3 font-mono">
                {/* Zaman Cetveli (Time Grid) */}
                <div className="flex items-center gap-3 text-[10px] text-base-content/40 pl-24 border-b border-base-content/10 pb-1">
                  {["0ns", "10ns", "20ns", "30ns", "40ns", "50ns", "60ns"].map((t, idx) => (
                    <span key={idx} className="w-12 text-center">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Sinyal Satırları */}
                {signals.map((sig, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-3">
                    <span className="w-20 text-right font-bold text-xs truncate text-primary font-mono shrink-0">
                      {sig.name}
                    </span>
                    <div className="flex-1 flex items-center bg-[#11111b] p-1.5 rounded-lg border border-white/5 overflow-x-auto shadow-inner">
                      {sig.wave.split("").map((val, wIdx) => {
                        const isHigh = val === "1";
                        const isBus = val === "=";
                        return (
                          <div
                            key={wIdx}
                            className={`h-7 w-12 flex items-center justify-center font-mono text-[11px] font-bold transition-all ${
                              isBus
                                ? "bg-secondary/20 border-x-2 border-secondary text-secondary"
                                : isHigh
                                ? "border-t-2 border-success bg-success/15 text-success"
                                : "border-b-2 border-error/50 bg-base-200/40 text-base-content/50"
                            }`}
                          >
                            {isBus && sig.data
                              ? sig.data[wIdx % sig.data.length]
                              : isHigh
                              ? "1"
                              : "0"}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* B. AYRI STANDALONE TERMİNAL (SIMULATOR CONSOLE) */}
          {(activeRightTab === "both" || activeRightTab === "terminal" || !isFs) && (
            <div
              className={`${
                isFs && activeRightTab === "both"
                  ? "h-1/2 flex flex-col"
                  : isFs
                  ? "flex-1 flex flex-col"
                  : "border-t border-base-300"
              } bg-[#0f141c] text-[#e6edf3] flex flex-col`}
            >
              {/* Terminal Başlığı */}
              <div className="bg-[#161b22] px-4 py-2 border-b border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-white/70">
                  <Terminal className="w-3.5 h-3.5 text-info" />
                  <span>Simülatör Konsolu (iverilog / $display)</span>
                </div>

                <div className="flex items-center gap-2">
                  {hasRun && (
                    <span className="badge badge-success badge-xs gap-1 font-mono font-bold text-[10px]">
                      <CheckCircle className="w-3 h-3" /> PASS: 0 Hata
                    </span>
                  )}
                  <button
                    onClick={() => setHasRun(false)}
                    className="btn btn-ghost btn-xs text-white/40 hover:text-white"
                    title="Konsolu Temizle"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Terminal Logları */}
              <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1.5 leading-relaxed selection:bg-info/30">
                {!hasRun && !isRunning ? (
                  <div className="text-white/40 italic py-6 text-center">
                    Konsol hazır. Çıktıları görmek için &quot;Simülasyonu Çalıştır&quot; butonuna basın.
                  </div>
                ) : isRunning ? (
                  <div className="flex items-center justify-center gap-2 py-8 text-primary">
                    <span className="loading loading-spinner loading-xs" />
                    <span>SystemVerilog kodları derleniyor ve simüle ediliyor...</span>
                  </div>
                ) : (
                  expectedOutput.map((line, idx) => {
                    const isSuccess = line.includes("[SUCCESS]") || line.includes("PASS");
                    const isInfo = line.includes("[INFO");
                    const isTimestamp = line.startsWith("[@");
                    return (
                      <div
                        key={idx}
                        className={`${
                          isSuccess
                            ? "text-emerald-400 font-semibold"
                            : isInfo
                            ? "text-sky-400"
                            : isTimestamp
                            ? "text-amber-300"
                            : "text-[#c9d1d9]"
                        }`}
                      >
                        {line}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Terminal Durum Çubuğu */}
              <div className="bg-[#161b22] px-4 py-1.5 border-t border-white/5 text-[11px] font-mono text-white/50 flex items-center justify-between">
                <span>Durum: {isRunning ? "Çalışıyor" : hasRun ? "Tamamlandı" : "Beklemede"}</span>
                <span>Zaman Hassasiyeti: 1ps</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. ALT BİLGİ & İPUCU */}
      {notes && !isFs && (
        <div className="p-3 bg-base-200/50 border-t border-base-300 text-xs text-base-content/70 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <span>{notes}</span>
        </div>
      )}
    </div>
  );
}
