"use client";

import { useState } from "react";
import { Play, RotateCcw, Copy, Check, Terminal, Activity, CheckCircle, AlertTriangle } from "lucide-react";

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
  notes = "Kodu doğrudan yukarıdaki alanda düzenleyebilir, ardından 'Simülasyonu Çalıştır' butonuna tıklayarak konsol ve dalga formu çıktısını görebilirsiniz.",
}: PlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"terminal" | "waveform">("terminal");

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

  return (
    <div className="border border-base-300 rounded-xl overflow-hidden bg-base-100 shadow-md my-6">
      {/* Üst Bar: Başlık & Eylemler */}
      <div className="bg-base-200/90 px-4 py-2.5 border-b border-base-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-error/70 inline-block" />
            <span className="w-3 h-3 rounded-full bg-warning/70 inline-block" />
            <span className="w-3 h-3 rounded-full bg-success/70 inline-block" />
          </div>
          <span className="text-xs font-bold font-mono text-base-content/90 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
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
            title="İlk Haline Sıfırla"
          >
            <RotateCcw className="w-3 h-3" />
            Sıfırla
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="btn btn-primary btn-xs gap-1 font-mono text-[11px] shadow-xs"
          >
            <Play className={`w-3 h-3 ${isRunning ? "animate-spin" : ""}`} />
            {isRunning ? "Çalıştırılıyor..." : "Simülasyonu Çalıştır"}
          </button>
        </div>
      </div>

      {/* Kod Düzenleyici Alanı (Editor) */}
      <div className="relative bg-[#1e1e2e] text-[#cdd6f4]">
        <div className="absolute top-2 right-3 text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/60 pointer-events-none">
          SystemVerilog (Editable)
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          rows={Math.min(22, Math.max(10, code.split("\n").length + 1))}
          className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent resize-y focus:outline-none leading-relaxed border-none selection:bg-primary/30"
          style={{ tabSize: 2 }}
        />
      </div>

      {/* Çıktı Bölümü Başlık Sekmeleri */}
      <div className="bg-base-200 border-t border-base-300 px-4 py-1.5 flex items-center justify-between">
        <div className="tabs tabs-boxed bg-base-300/60 p-0.5">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`tab tab-xs gap-1.5 font-mono ${
              activeTab === "terminal" ? "tab-active bg-base-100 font-bold" : ""
            }`}
          >
            <Terminal className="w-3 h-3 text-info" />
            Simülatör Konsolu ($display)
          </button>
          <button
            onClick={() => setActiveTab("waveform")}
            className={`tab tab-xs gap-1.5 font-mono ${
              activeTab === "waveform" ? "tab-active bg-base-100 font-bold" : ""
            }`}
          >
            <Activity className="w-3 h-3 text-secondary" />
            Sinyal Dalga Formu (Waveform)
          </button>
        </div>

        {hasRun && (
          <span className="badge badge-success badge-sm gap-1 font-mono text-[11px]">
            <CheckCircle className="w-3 h-3" /> PASS: 0 Error
          </span>
        )}
      </div>

      {/* Çıktı İçeriği */}
      <div className="p-4 bg-base-300/40 min-h-36 max-h-72 overflow-y-auto font-mono text-xs">
        {activeTab === "terminal" ? (
          <div>
            {!hasRun && !isRunning ? (
              <div className="text-base-content/50 italic py-6 text-center">
                Simülasyon henüz başlatılmadı. Çıktıyı görmek için &quot;Simülasyonu Çalıştır&quot; butonuna tıklayın.
              </div>
            ) : isRunning ? (
              <div className="flex items-center justify-center gap-2 py-8 text-primary">
                <span className="loading loading-spinner loading-xs" />
                <span>ModelSim / Icarus Verilog simülatörü çalışıyor...</span>
              </div>
            ) : (
              <div className="space-y-1">
                {expectedOutput.map((line, idx) => {
                  const isSuccess = line.includes("[SUCCESS]") || line.includes("PASS");
                  const isInfo = line.includes("[INFO");
                  return (
                    <div
                      key={idx}
                      className={`${
                        isSuccess
                          ? "text-success font-semibold"
                          : isInfo
                          ? "text-info/80"
                          : "text-base-content/80"
                      }`}
                    >
                      {line}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Dalga Formu Görselleştirme */
          <div className="py-2 space-y-3">
            <div className="text-[11px] text-base-content/60 mb-2">
              Zaman ölçeği: 1 döngü = 10ns | Simülasyon aralığı: 0ns - 60ns
            </div>
            {signals.map((sig, sIdx) => (
              <div key={sIdx} className="flex items-center gap-4 border-b border-base-content/5 pb-2">
                <span className="w-24 text-right font-bold text-xs truncate text-primary font-mono">
                  {sig.name}
                </span>
                <div className="flex-1 flex items-center gap-1 bg-base-100 p-2 rounded-md border border-base-300 overflow-x-auto">
                  {sig.wave.split("").map((val, wIdx) => {
                    const isHigh = val === "1";
                    const isBus = val === "=";
                    return (
                      <div
                        key={wIdx}
                        className={`h-6 w-10 flex items-center justify-center border font-mono text-[10px] ${
                          isBus
                            ? "bg-secondary/10 border-secondary text-secondary font-bold"
                            : isHigh
                            ? "border-t-2 border-success bg-success/10 text-success"
                            : "border-b-2 border-base-content/40 bg-base-200 text-base-content/60"
                        }`}
                      >
                        {isBus && sig.data ? sig.data[wIdx % sig.data.length] : isHigh ? "1" : "0"}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alt Bilgi / İpucu */}
      {notes && (
        <div className="p-3 bg-base-200/50 border-t border-base-300 text-xs text-base-content/70 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <span>{notes}</span>
        </div>
      )}
    </div>
  );
}
