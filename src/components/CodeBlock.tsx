"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  caption?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language = "code",
  caption,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is unavailable
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`rounded-xl overflow-hidden border border-base-300 bg-[#1e1e2e] text-[#cdd6f4] shadow-sm font-mono ${className}`}
    >
      {/* Kod Başlığı & Kontroller */}
      <div className="px-4 py-2 bg-base-300/40 border-b border-white/10 text-xs flex items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-2 text-base-content/70 truncate">
          <div className="flex items-center gap-1.5 shrink-0 opacity-70">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          {caption ? (
            <span className="truncate text-xs text-base-content/80 font-mono font-medium">
              {caption}
            </span>
          ) : (
            <span className="text-[11px] text-base-content/50 uppercase tracking-wider font-semibold">
              {language}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {caption && (
            <span className="uppercase text-[10px] tracking-wider text-primary font-bold px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
              {language}
            </span>
          )}

          <button
            onClick={handleCopy}
            className={`btn btn-xs gap-1 transition-all font-mono text-[11px] ${
              copied
                ? "btn-success text-white"
                : "btn-ghost border border-white/10 hover:border-white/20 text-base-content/70 hover:text-base-content"
            }`}
            title="Kodu Panoya Kopyala"
            aria-label="Kodu Panoya Kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Kod İçeriği */}
      <pre className="p-4 text-xs sm:text-sm overflow-x-auto leading-relaxed select-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}
