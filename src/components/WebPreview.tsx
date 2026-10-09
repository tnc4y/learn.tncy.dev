"use client";

import { useState } from "react";
import {
  Globe,
  Code2,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Terminal,
  CheckCircle,
  Copy,
  Check,
  RefreshCw,
} from "lucide-react";
import CodeBlock from "./CodeBlock";

interface WebPreviewProps {
  title: string;
  code: string;
  language: "html" | "css" | "javascript";
  expectedOutput?: string[];
  description?: string;
}

export default function WebPreview({
  title,
  code,
  language,
  expectedOutput,
  description,
}: WebPreviewProps) {
  const [activeTab, setActiveTab] = useState<"code" | "preview">("preview");
  const [deviceWidth, setDeviceWidth] = useState<"100%" | "768px" | "375px">("100%");
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reloadPreview = () => {
    setIframeKey((prev) => prev + 1);
  };

  // HTML için doğrudan srcDoc
  // CSS için örnek HTML şablonuna gömülü CSS
  const getPreviewDoc = () => {
    if (language === "html") {
      return code;
    }
    if (language === "css") {
      return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 24px;
      margin: 0;
      background: #f8fafc;
      color: #0f172a;
    }
    ${code}
  </style>
</head>
<body>
  <div class="box">
    <h2>CSS Önizleme Bileşeni</h2>
    <p>Yukarıda tanımlanan CSS seçicileri ve kuralları bu bileşene uygulanmıştır.</p>
    <button style="padding: 8px 16px; border-radius: 6px; background: #0284c7; color: white; border: none; cursor: pointer;">
      Örnek Düğme
    </button>
  </div>
</body>
</html>`;
    }
    return "";
  };

  return (
    <div className="border border-base-300 rounded-2xl overflow-hidden bg-base-100 shadow-lg my-6">
      {/* 1. Üst Sekme Başlığı & Görünüm Seçimi */}
      <div className="bg-base-200/90 px-4 py-3 border-b border-base-300 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-error/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-warning/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-success/80 inline-block" />
          </div>
          <span className="text-xs sm:text-sm font-bold font-mono text-base-content/90 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            {title}
          </span>
          <span className="badge badge-xs badge-primary badge-outline font-mono uppercase">
            {language}
          </span>
        </div>

        {/* Görünüm Değiştirici Butonlar */}
        <div className="flex items-center gap-2">
          <div className="join join-horizontal bg-base-300/70 p-0.5 rounded-lg">
            <button
              onClick={() => setActiveTab("preview")}
              className={`btn btn-xs join-item font-mono text-[11px] gap-1.5 ${
                activeTab === "preview" ? "btn-primary font-bold" : "btn-ghost"
              }`}
            >
              {language === "javascript" ? (
                <>
                  <Terminal className="w-3 h-3" />
                  Konsol Çıktısı
                </>
              ) : (
                <>
                  <Monitor className="w-3 h-3" />
                  Tarayıcı Önizlemesi
                </>
              )}
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`btn btn-xs join-item font-mono text-[11px] gap-1.5 ${
                activeTab === "code" ? "btn-primary font-bold" : "btn-ghost"
              }`}
            >
              <Code2 className="w-3 h-3" />
              Kaynak Kod
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="btn btn-ghost btn-xs gap-1 font-mono text-[11px]"
            title="Kodu Kopyala"
          >
            {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
            {copied ? "Kopyalandı" : "Kopyala"}
          </button>
        </div>
      </div>

      {/* 2. Açıklama Bilgisi (Opsiyonel) */}
      {description && (
        <div className="px-4 py-2 bg-base-200/40 border-b border-base-300/50 text-xs text-base-content/70">
          {description}
        </div>
      )}

      {/* 3. İçerik Alanı */}
      {activeTab === "code" ? (
        <div className="p-4 bg-[#1e1e2e]">
          <CodeBlock
            code={code}
            language={language}
            caption={`Ders Şablonu: index.${language === "html" ? "html" : language === "css" ? "css" : "js"}`}
          />
        </div>
      ) : language === "javascript" ? (
        /* JAVASCRIPT: WEB KONSOLU (console.log) */
        <div className="bg-[#0f141c] text-[#e6edf3] font-mono text-xs flex flex-col min-h-[300px]">
          {/* DevTools Konsol Başlığı */}
          <div className="bg-[#161b22] px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs text-white/70">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-warning" />
              <span>Web Geliştirici Konsolu (DevTools Console / console.log)</span>
            </div>
            <span className="badge badge-success badge-xs gap-1 font-mono">
              <CheckCircle className="w-3 h-3" /> 0 Hata
            </span>
          </div>

          {/* Konsol Çıktıları */}
          <div className="p-4 space-y-2 flex-1 overflow-y-auto">
            {expectedOutput && expectedOutput.length > 0 ? (
              expectedOutput.map((line, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 py-0.5 border-b border-white/5 last:border-none font-mono text-xs"
                >
                  <span className="text-white/30 select-none">›</span>
                  <span
                    className={
                      line.includes("[SUCCESS]") || line.includes("başarıyla")
                        ? "text-emerald-400 font-semibold"
                        : line.includes("[START]") || line.includes("Kaynak Dizi")
                        ? "text-sky-400"
                        : "text-[#c9d1d9]"
                    }
                  >
                    {line}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-white/40 italic py-6 text-center">
                console.log çıktıları bu alanda görüntülenir.
              </div>
            )}
          </div>

          {/* Konsol Alt Çubuğu */}
          <div className="bg-[#161b22] px-4 py-1.5 border-t border-white/10 text-[11px] text-white/50 flex items-center justify-between">
            <span>Tarayıcı Ortamı: V8 JavaScript Engine</span>
            <span>DOM API: Hazır</span>
          </div>
        </div>
      ) : (
        /* HTML / CSS: GERÇEK TARAYICI CANLI ÖNİZLEMESİ */
        <div className="bg-base-200/50 flex flex-col">
          {/* Tarayıcı Adres Çubuğu & Cihaz Seçici */}
          <div className="bg-base-300/40 px-4 py-2 border-b border-base-300 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md bg-base-100 rounded-lg px-3 py-1 border border-base-content/10 shadow-xs">
              <span className="text-success text-[10px] font-bold">🔒</span>
              <span className="text-xs font-mono text-base-content/60 truncate">
                https://learn.tncy.dev/web-preview/{language === "html" ? "index.html" : "style.css"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={reloadPreview}
                className="btn btn-ghost btn-xs btn-square text-base-content/70"
                title="Sayfayı Yenile"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <div className="join join-horizontal bg-base-200 p-0.5 rounded-lg border border-base-content/10">
                <button
                  onClick={() => setDeviceWidth("100%")}
                  className={`btn btn-xs join-item ${
                    deviceWidth === "100%" ? "btn-primary btn-active" : "btn-ghost"
                  }`}
                  title="Masaüstü (100%)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeviceWidth("768px")}
                  className={`btn btn-xs join-item ${
                    deviceWidth === "768px" ? "btn-primary btn-active" : "btn-ghost"
                  }`}
                  title="Tablet (768px)"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeviceWidth("375px")}
                  className={`btn btn-xs join-item ${
                    deviceWidth === "375px" ? "btn-primary btn-active" : "btn-ghost"
                  }`}
                  title="Mobil (375px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Iframe Görüntüleme Penceresi */}
          <div className="p-4 flex justify-center bg-base-200/30 overflow-x-auto min-h-[360px]">
            <div
              style={{ width: deviceWidth }}
              className="bg-white rounded-xl shadow-md border border-base-300 overflow-hidden transition-all duration-300 min-h-[340px]"
            >
              <iframe
                key={iframeKey}
                title="Canlı Web Önizlemesi"
                srcDoc={getPreviewDoc()}
                sandbox="allow-scripts"
                className="w-full h-full min-h-[340px] border-none"
              />
            </div>
          </div>

          <div className="px-4 py-1.5 bg-base-200/80 border-t border-base-300 text-[11px] font-mono text-base-content/60 flex items-center justify-between">
            <span>Canlı HTML5 & CSS Tarayıcı DOM Motoru</span>
            <span>Genişlik: {deviceWidth}</span>
          </div>
        </div>
      )}
    </div>
  );
}
