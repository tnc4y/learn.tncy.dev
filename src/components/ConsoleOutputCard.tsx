"use client";

import { Terminal, CheckCircle, Copy, Check } from "lucide-react";
import { useState } from "react";
import CodeBlock from "./CodeBlock";

interface ConsoleOutputCardProps {
  title: string;
  code: string;
  language: string;
  output: string[];
  commandName?: string;
  caption?: string;
}

export default function ConsoleOutputCard({
  title,
  code,
  language,
  output,
  commandName,
  caption,
}: ConsoleOutputCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 my-6">
      {/* 1. Kaynak Kod Bloğu */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-base-content font-mono uppercase tracking-wider">
              {title}
            </h3>
          </div>
          <span className="badge badge-sm badge-neutral font-mono uppercase text-[10px]">
            {language}
          </span>
        </div>

        <CodeBlock
          code={code}
          language={language}
          caption={caption || `${title} Kaynak Kodu`}
        />
      </div>

      {/* 2. Program Çıktısı (stdout Konsolu) */}
      <div className="rounded-xl overflow-hidden border border-base-300 bg-[#0f141c] text-[#e6edf3] font-mono text-xs shadow-md">
        <div className="bg-[#161b22] px-4 py-2 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/80">
            <div className="flex gap-1.5 opacity-60">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            </div>
            <span className="font-semibold text-xs ml-1">
              {commandName || `$ ${language} main`}
            </span>
          </div>

          <span className="badge badge-success badge-xs gap-1 font-mono text-[10px]">
            <CheckCircle className="w-3 h-3" /> Çıkış Kodu: 0 (OK)
          </span>
        </div>

        <div className="p-4 space-y-1.5 overflow-x-auto max-h-64 leading-relaxed">
          {output.map((line, idx) => {
            const isSuccess =
              line.includes("[SUCCESS]") || line.includes("hatasız") || line.includes("0 Hata");
            const isInfo = line.includes("[INFO") || line.includes("[BOOT]") || line.includes("[START]");
            const isAlert = line.includes("UYARISI") || line.includes("[WARN");
            return (
              <div
                key={idx}
                className={`${
                  isSuccess
                    ? "text-emerald-400 font-semibold"
                    : isInfo
                    ? "text-sky-400"
                    : isAlert
                    ? "text-amber-300"
                    : "text-[#c9d1d9]"
                }`}
              >
                {line}
              </div>
            );
          })}
        </div>

        <div className="bg-[#161b22] px-4 py-1.5 border-t border-white/10 text-[11px] text-white/40 flex items-center justify-between">
          <span>Standart Çıktı Akışı (stdout)</span>
          <span>learn.tncy.dev Kod Motoru</span>
        </div>
      </div>
    </div>
  );
}
