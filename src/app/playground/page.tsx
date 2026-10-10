"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import VSCodePlayground, { WorkspacePresetId } from "@/components/VSCodePlayground";
import {
  Terminal,
  Layers,
  Cpu,
  Globe,
  Code2,
  Bot,
  Hammer,
  Zap,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const presetParam = searchParams.get("preset");

  // Harici Proje ID'lerini Playground Şablonlarına Eşle
  const mapPresetParam = (param: string | null): WorkspacePresetId => {
    if (!param) return "systemverilog-counter";
    if (param.includes("python")) return "python-wasm";
    if (param.includes("ros2")) return "ros2-robotics";
    if (param.includes("web") || param.includes("serial")) return "web-developer";
    if (param.includes("stm32") || param.includes("freertos") || param.includes("can"))
      return "stm32-freertos";
    if (param.includes("alu") || param.includes("riscv")) return "systemverilog-alu";
    return "systemverilog-counter";
  };

  const [activePreset, setActivePreset] = useState<WorkspacePresetId>(
    mapPresetParam(presetParam)
  );

  useEffect(() => {
    if (presetParam) {
      setActivePreset(mapPresetParam(presetParam));
    }
  }, [presetParam]);

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-5 max-w-[1700px] w-full mx-auto space-y-3 pb-16">
      {/* 1. ÜST BAŞLIK & ÖN AYAR BUTONLARI */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-base-200/60 p-3.5 rounded-2xl border border-base-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-base-content">
                Web IDE &amp; Canlı Donanım Simülatörü
              </h1>
              <span className="badge badge-primary badge-xs font-mono">VS Code Web Edition</span>
            </div>
            <p className="text-xs text-base-content/60">
              SystemVerilog 3-Pane (DUT + Testbench + Konsol), Web Canlı Önizleme ve ROS 2 Robotik çalışma alanı.
            </p>
          </div>
        </div>

        {/* Hızlı Ön Ayar Değiştiriciler */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActivePreset("systemverilog-counter")}
            className={`btn btn-xs font-mono text-[11px] rounded-lg ${
              activePreset === "systemverilog-counter"
                ? "btn-primary shadow-xs font-bold"
                : "btn-ghost border border-base-content/10"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            SystemVerilog 3-Pane (Sayaç)
          </button>

          <button
            onClick={() => setActivePreset("systemverilog-alu")}
            className={`btn btn-xs font-mono text-[11px] rounded-lg ${
              activePreset === "systemverilog-alu"
                ? "btn-primary shadow-xs font-bold"
                : "btn-ghost border border-base-content/10"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            SystemVerilog (ALU)
          </button>

          <button
            onClick={() => setActivePreset("web-developer")}
            className={`btn btn-xs font-mono text-[11px] rounded-lg ${
              activePreset === "web-developer"
                ? "btn-primary shadow-xs font-bold"
                : "btn-ghost border border-base-content/10"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-error" />
            Web Canlı Önizleme (HTML/CSS)
          </button>

          <button
            onClick={() => setActivePreset("python-wasm")}
            className={`btn btn-xs font-mono text-[11px] rounded-lg ${
              activePreset === "python-wasm"
                ? "btn-primary shadow-xs font-bold"
                : "btn-ghost border border-base-content/10"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-info" />
            Python 3 (Gerçek Wasm)
          </button>

          <button
            onClick={() => setActivePreset("ros2-robotics")}
            className={`btn btn-xs font-mono text-[11px] rounded-lg ${
              activePreset === "ros2-robotics"
                ? "btn-primary shadow-xs font-bold"
                : "btn-ghost border border-base-content/10"
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-warning" />
            ROS 2 Robotik (Düğüm &amp; RQT)
          </button>

          <button
            onClick={() => setActivePreset("stm32-freertos")}
            className={`btn btn-xs font-mono text-[11px] rounded-lg ${
              activePreset === "stm32-freertos"
                ? "btn-primary shadow-xs font-bold"
                : "btn-ghost border border-base-content/10"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-accent" />
            STM32 &amp; FreeRTOS (C RTOS)
          </button>

          <Link
            href="/projects"
            className="btn btn-outline btn-xs font-mono text-[11px] rounded-lg ml-1"
          >
            <Hammer className="w-3 h-3" />
            Proje Atölyesi
          </Link>
        </div>
      </div>

      {/* 2. VS CODE WEB IDE BİLEŞENİ */}
      <div className="flex-1 min-h-[760px]">
        <VSCodePlayground key={activePreset} initialPresetId={activePreset} />
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-12 text-center text-xs font-mono text-base-content/60">
          VS Code Web Çalışma Alanı Yükleniyor...
        </div>
      }
    >
      <PlaygroundContent />
    </Suspense>
  );
}
