"use client";

import { useState } from "react";
import Link from "next/link";
import { DevBoard } from "@/data/boardsData";
import { BoardPinout, BoardPin } from "@/data/pinoutsData";
import { HardwareGuide } from "@/data/guidesData";
import { ProjectRecipe } from "@/data/projectsData";
import BoardIllustration from "@/components/BoardIllustration";
import CodeBlock from "@/components/CodeBlock";
import { InlineMarkdown } from "@/components/MarkdownRenderer";
import {
  Cpu,
  Zap,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Radio,
  Filter,
  Terminal,
  Info,
  Clock,
  Layers,
  ChevronRight,
  ShieldAlert,
  ExternalLink,
  Bot,
  Hammer,
  HardDrive,
  Sparkles,
} from "lucide-react";

interface BoardDetailViewProps {
  board: DevBoard;
  pinout?: BoardPinout;
  guide: HardwareGuide;
  relatedProjects: ProjectRecipe[];
  otherBoards: DevBoard[];
}

export default function BoardDetailView({
  board,
  pinout,
  guide,
  relatedProjects,
  otherBoards,
}: BoardDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"specs" | "pinout" | "guide" | "projects">("specs");
  const [activePin, setActivePin] = useState<BoardPin | null>(null);
  const [pinFilter, setPinFilter] = useState<string>("all");

  const getPinColor = (type: BoardPin["type"]) => {
    switch (type) {
      case "power":
        return "border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20";
      case "gnd":
        return "border-zinc-600 bg-zinc-800 text-zinc-300 hover:bg-zinc-700";
      case "pwm":
        return "border-purple-500/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20";
      case "analog":
        return "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20";
      case "comm":
        return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20";
      case "digital":
        return "border-sky-500/40 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20";
      case "special":
        return "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20";
      default:
        return "border-base-content/20 bg-base-200 text-base-content hover:bg-base-300";
    }
  };

  const getPinTypeBadge = (type: BoardPin["type"]) => {
    switch (type) {
      case "power":
        return { label: "Güç (Power)", color: "badge-error" };
      case "gnd":
        return { label: "Toprak (GND)", color: "badge-neutral" };
      case "pwm":
        return { label: "PWM Çıkışı", color: "badge-secondary" };
      case "analog":
        return { label: "Analog ADC/DAC", color: "badge-warning" };
      case "comm":
        return { label: "Haberleşme (I2C/SPI/UART)", color: "badge-success" };
      case "digital":
        return { label: "Dijital G/Ç (GPIO)", color: "badge-info" };
      case "special":
        return { label: "Özel Fonksiyon", color: "badge-accent" };
      default:
        return { label: type, color: "badge-ghost" };
    }
  };

  const matchesPinFilter = (pin: BoardPin) => {
    if (pinFilter === "all") return true;
    if (pinFilter === "power") return pin.type === "power" || pin.type === "gnd";
    if (pinFilter === "pwm") return pin.type === "pwm";
    if (pinFilter === "analog") return pin.type === "analog";
    if (pinFilter === "comm") return pin.type === "comm";
    if (pinFilter === "digital") return pin.type === "digital";
    return true;
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-32">
      {/* 1. ÜST NAVİGASYON & BREADCRUMBS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-4">
        <div className="text-xs breadcrumbs text-base-content/60">
          <ul>
            <li>
              <Link href="/" className="hover:text-primary">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link href="/boards" className="hover:text-primary">
                Geliştirme Kartları
              </Link>
            </li>
            <li>
              <span className="badge badge-sm badge-ghost font-mono text-[11px]">
                {board.family}
              </span>
            </li>
            <li className="text-primary font-bold truncate max-w-xs sm:max-w-md">
              {board.name}
            </li>
          </ul>
        </div>

        <Link
          href="/boards"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-base-content/70 hover:text-primary transition-colors shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Tüm Kartlara Dön</span>
        </Link>
      </div>

      {/* 2. BLOG-STYLE HERO HEADER */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge badge-primary font-mono text-xs font-bold px-3 py-2.5">
            {board.vendor}
          </span>
          <span className="badge badge-outline font-mono text-xs font-bold px-3 py-2.5">
            {board.family}
          </span>
          {board.badge && (
            <span className="badge badge-secondary font-mono text-xs font-bold px-3 py-2.5">
              {board.badge}
            </span>
          )}
          <span
            className={`badge font-mono text-xs font-bold px-3 py-2.5 ${
              board.difficulty === "Başlangıç"
                ? "badge-success text-success-content"
                : board.difficulty === "Orta"
                ? "badge-warning text-warning-content"
                : "badge-error text-error-content"
            }`}
          >
            {board.difficulty}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-base-content leading-tight">
          {board.name}
        </h1>

        <p className="text-base sm:text-lg text-base-content/80 leading-relaxed max-w-4xl">
          {board.description}
        </p>

        {/* Hızlı Desteklenen Diller & Protokoller */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-base-content/50 uppercase text-[11px]">Diller:</span>
            {board.supportedLanguages.map((lang) => (
              <span key={lang} className="badge badge-sm badge-neutral font-mono text-[11px]">
                {lang}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-base-content/50 uppercase text-[11px]">Protokoller:</span>
            {board.protocols.map((proto) => (
              <span key={proto} className="badge badge-sm badge-outline font-mono text-[11px]">
                {proto}
              </span>
            ))}
          </div>
        </div>

        {/* Sekme Seçici Butonlar (In-Page Navigation) */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("specs")}
            className={`btn btn-sm font-mono text-xs rounded-xl gap-2 ${
              activeTab === "specs"
                ? "btn-primary shadow-md"
                : "btn-outline btn-neutral"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Teknik Özellikler</span>
          </button>

          {pinout && (
            <button
              onClick={() => setActiveTab("pinout")}
              className={`btn btn-sm font-mono text-xs rounded-xl gap-2 ${
                activeTab === "pinout"
                  ? "btn-primary shadow-md"
                  : "btn-outline btn-neutral"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-accent" />
              <span>İnteraktif Pinout Şeması</span>
              <span className="badge badge-accent badge-xs font-mono text-[9px]">Şema</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab("guide")}
            className={`btn btn-sm font-mono text-xs rounded-xl gap-2 ${
              activeTab === "guide"
                ? "btn-primary shadow-md"
                : "btn-outline btn-neutral"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-warning" />
            <span>Kurulum &amp; Flashing Rehberi</span>
          </button>

          {relatedProjects.length > 0 && (
            <button
              onClick={() => setActiveTab("projects")}
              className={`btn btn-sm font-mono text-xs rounded-xl gap-2 ${
                activeTab === "projects"
                  ? "btn-primary shadow-md"
                  : "btn-outline btn-neutral"
              }`}
            >
              <Hammer className="w-3.5 h-3.5 text-secondary" />
              <span>Projeler ({relatedProjects.length})</span>
            </button>
          )}
        </div>
      </header>

      {/* 3. KART GÖRSELİ (BOARD ILLUSTRATION BANNER) */}
      <div className="p-6 rounded-3xl bg-base-200/50 border border-base-300 shadow-sm flex flex-col items-center justify-center">
        <div className="max-w-md w-full">
          <BoardIllustration boardId={board.id} />
        </div>
        <div className="pt-3 text-[11px] font-mono text-base-content/50 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>{board.vendor} • {board.chipset} ({board.architecture})</span>
        </div>
      </div>

      {/* 4. ÖZET TEKNİK İSTATİSTİKLER (GRID CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-base-200/70 border border-base-300 space-y-1">
          <span className="text-[11px] font-mono text-base-content/60 uppercase block">İşlemci / Çekirdek</span>
          <span className="font-bold text-sm text-base-content truncate block">
            {board.chipset}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-base-200/70 border border-base-300 space-y-1">
          <span className="text-[11px] font-mono text-base-content/60 uppercase block">Saat Hızı</span>
          <span className="font-bold text-sm text-secondary truncate block">
            {board.clockSpeed}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-base-200/70 border border-base-300 space-y-1">
          <span className="text-[11px] font-mono text-base-content/60 uppercase block">Bellek (RAM)</span>
          <span className="font-bold text-sm text-accent truncate block">
            {board.ram}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-base-200/70 border border-base-300 space-y-1">
          <span className="text-[11px] font-mono text-base-content/60 uppercase block">Çalışma Voltajı</span>
          <span className="font-bold text-sm text-primary truncate block">
            {board.operatingVoltage}
          </span>
        </div>
      </div>

      {/* 5. SEKME İÇERİKLERİ */}

      {/* SEKME 1: TEKNİK ÖZELLİKLER & AVANTAJLAR */}
      {activeTab === "specs" && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Önerilen Kullanım Alanı */}
          <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 space-y-1.5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-primary font-mono flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              Önerilen Kullanım Alanı ve Proje Uygunluğu:
            </h3>
            <p className="text-sm text-base-content/90 leading-relaxed font-sans">
              {board.bestFor}
            </p>
          </div>

          {/* Avantajlar & Güçlü Yönler */}
          <div className="space-y-3">
            <h3 className="text-lg font-black text-base-content">
              Kartın Öne Çıkan Artıları &amp; Güçlü Yönleri
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {board.pros.map((pro, pIdx) => (
                <div
                  key={pIdx}
                  className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300 flex items-start gap-2.5 text-xs text-base-content/85"
                >
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{pro}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tam Teknik Detay Tablosu (Datasheet Matrix) */}
          <div className="space-y-3">
            <h3 className="text-lg font-black text-base-content">
              Teknik Özellikler Matrisi (Datasheet)
            </h3>
            <div className="rounded-2xl border border-base-300 bg-base-100 overflow-hidden shadow-sm">
              <table className="table table-zebra w-full text-xs font-mono">
                <tbody className="divide-y divide-base-300">
                  <tr>
                    <td className="w-48 font-bold text-base-content/60">Üretici / Ekosistem:</td>
                    <td className="font-bold text-base-content">{board.vendor}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">İşlemci / Çip Modeli:</td>
                    <td className="font-bold text-base-content">{board.chipset}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">İşlemci Mimarisi:</td>
                    <td>{board.architecture}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Saat Frekansı (Clock):</td>
                    <td className="text-secondary font-bold">{board.clockSpeed}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Rastgele Erişimli Bellek (RAM):</td>
                    <td className="text-accent font-bold">{board.ram}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Flash / Program Belleği:</td>
                    <td>{board.flashMemory}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Çalışma / Mantık Gerilimi:</td>
                    <td className="text-primary font-bold">{board.operatingVoltage}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Kullanılabilir GPIO Sayısı:</td>
                    <td>{board.gpioCount} adet genel amaçlı pin</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Donanımsal Protokoller:</td>
                    <td className="text-base-content">{board.protocols.join(" • ")}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Desteklenen Geliştirme Dilleri:</td>
                    <td className="text-base-content">{board.supportedLanguages.join(", ")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SEKME 2: İNTERAKTİF PINOUT ŞEMASI */}
      {activeTab === "pinout" && pinout && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Pin Filtreleri */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-base-200/60 border border-base-300">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-mono text-base-content/60 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Pin Filtrele:
              </span>
              {[
                { id: "all", label: "Tümü" },
                { id: "power", label: "Güç & Toprak" },
                { id: "pwm", label: "PWM" },
                { id: "analog", label: "Analog (ADC)" },
                { id: "comm", label: "Haberleşme" },
                { id: "digital", label: "Dijital GPIO" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPinFilter(f.id)}
                  className={`btn btn-xs font-mono rounded-lg ${
                    pinFilter === f.id
                      ? "btn-primary shadow-xs font-bold"
                      : "btn-ghost border border-base-content/10 text-base-content/70"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-base-content/60">
              Toplam: <strong>{pinout.totalPins} Pin</strong> • <strong>{pinout.operatingVoltage}</strong>
            </div>
          </div>

          {/* İncelenen Pin Paneli (Pin Inspector) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-base-200/80 border border-base-300 shadow-inner">
            {activePin ? (
              <div className="space-y-2 animate-in fade-in duration-150">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="badge badge-neutral font-mono font-bold text-xs">
                      Pin #{activePin.pinNumber}
                    </span>
                    <h4 className="text-base font-extrabold text-base-content font-mono">
                      {activePin.name}
                    </h4>
                  </div>
                  <span
                    className={`badge badge-sm font-mono text-xs ${
                      getPinTypeBadge(activePin.type).color
                    }`}
                  >
                    {getPinTypeBadge(activePin.type).label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-mono text-base-content/50">Fonksiyonlar:</span>
                  {activePin.functions.map((fn, fIdx) => (
                    <span
                      key={fIdx}
                      className="badge badge-outline badge-xs font-mono text-[10px]"
                    >
                      {fn}
                    </span>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-base-content/85 leading-relaxed pt-1 border-t border-base-content/10">
                  {activePin.description}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 text-xs text-base-content/70 py-1">
                <Info className="w-4 h-4 text-primary shrink-0" />
                <span>
                  Donanımsal açıklamaları, alternatif çevre birimlerini ve elektriksel limitleri görmek için aşağıdaki pinlerin üzerine gelin veya dokunun.
                </span>
              </div>
            )}
          </div>

          {/* İki Sütunlu Kart Pin Şeması */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            {/* Sol Header Pinleri */}
            <div className="md:col-span-5 space-y-1.5">
              <div className="text-[11px] font-mono uppercase font-bold text-base-content/50 px-1 mb-2">
                Sol Header ({pinout.leftPins.length} Pin)
              </div>
              {pinout.leftPins.map((pin) => {
                const isMatch = matchesPinFilter(pin);
                const isSelected = activePin?.pinNumber === pin.pinNumber;
                return (
                  <button
                    key={pin.pinNumber}
                    onMouseEnter={() => setActivePin(pin)}
                    onClick={() => setActivePin(pin)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl border text-xs font-mono transition-all text-left ${getPinColor(
                      pin.type
                    )} ${!isMatch ? "opacity-30" : ""} ${
                      isSelected ? "ring-2 ring-primary shadow-md scale-[1.01]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] font-bold opacity-60 w-5">
                        #{pin.pinNumber}
                      </span>
                      <span className="font-bold truncate">{pin.name}</span>
                    </div>
                    <span className="text-[10px] opacity-70 truncate ml-2">
                      {pin.functions[0] || ""}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Merkez Çip / Kart İllüstrasyonu */}
            <div className="md:col-span-2 hidden md:flex flex-col items-center justify-center p-4 rounded-2xl bg-base-300/40 border border-base-300 min-h-[360px] text-center space-y-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-base-content/50 block">
                  MCU ÇEKİRDEK
                </span>
                <span className="text-xs font-mono font-bold text-base-content block truncate max-w-[110px]">
                  {board.chipset}
                </span>
              </div>
              <div className="w-12 h-0.5 bg-base-content/10" />
              <div className="text-[10px] font-mono text-base-content/70">
                <div>{board.clockSpeed}</div>
                <div>{pinout.operatingVoltage} Mantık</div>
              </div>
              <div className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider pt-2">
                {board.vendor}
              </div>
            </div>

            {/* Sağ Header Pinleri */}
            <div className="md:col-span-5 space-y-1.5">
              <div className="text-[11px] font-mono uppercase font-bold text-base-content/50 px-1 mb-2">
                Sağ Header ({pinout.rightPins.length} Pin)
              </div>
              {pinout.rightPins.map((pin) => {
                const isMatch = matchesPinFilter(pin);
                const isSelected = activePin?.pinNumber === pin.pinNumber;
                return (
                  <button
                    key={pin.pinNumber}
                    onMouseEnter={() => setActivePin(pin)}
                    onClick={() => setActivePin(pin)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl border text-xs font-mono transition-all text-left ${getPinColor(
                      pin.type
                    )} ${!isMatch ? "opacity-30" : ""} ${
                      isSelected ? "ring-2 ring-primary shadow-md scale-[1.01]" : ""
                    }`}
                  >
                    <span className="text-[10px] opacity-70 truncate mr-2">
                      {pin.functions[0] || ""}
                    </span>
                    <div className="flex items-center gap-2 truncate justify-end">
                      <span className="font-bold truncate">{pin.name}</span>
                      <span className="text-[10px] font-bold opacity-60 w-5 text-right">
                        #{pin.pinNumber}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Renk Lejantı */}
          <div className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Güç (VCC)
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block" /> Toprak (GND)
            </span>
            <span className="flex items-center gap-1.5 text-purple-400">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> PWM
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Analog (ADC)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Haberleşme (SPI/I2C/UART)
            </span>
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> Dijital GPIO
            </span>
          </div>
        </div>
      )}

      {/* SEKME 3: HIZLI KURULUM & FLASHING REHBERİ */}
      {activeTab === "guide" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-5 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-start gap-3.5">
            <Terminal className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-base text-base-content">
                {guide.title}
              </h3>
              <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed">
                {guide.summary}
              </p>
            </div>
          </div>

          {/* Kılavuz Adımları */}
          <div className="space-y-4">
            {guide.steps.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-base-100 border border-base-300 space-y-3 shadow-xs">
                <h4 className="font-bold text-sm uppercase font-mono tracking-wider text-primary">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed whitespace-pre-line">
                  <InlineMarkdown text={step.description} />
                </p>

                {step.command && (
                  <CodeBlock code={step.command} language="bash" caption="Terminal Komutu" />
                )}

                {step.codeSnippet && (
                  <CodeBlock
                    code={step.codeSnippet.code}
                    language={step.codeSnippet.language}
                    caption={step.codeSnippet.caption}
                  />
                )}

                {step.callout && (
                  <div
                    className={`alert text-xs shadow-xs border ${
                      step.callout.type === "warning"
                        ? "alert-warning bg-warning/10 border-warning/30 text-warning-content"
                        : step.callout.type === "success"
                        ? "alert-success bg-success/10 border-success/30 text-success-content"
                        : "alert-info bg-info/10 border-info/30 text-info-content"
                    }`}
                  >
                    <div>
                      <h5 className="font-bold uppercase tracking-wider text-[11px] mb-0.5">
                        <InlineMarkdown text={step.callout.title} />
                      </h5>
                      <p className="leading-relaxed">
                        <InlineMarkdown text={step.callout.message} />
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEKME 4: BU KARTLA YAPILABİLECEK PROJELER */}
      {activeTab === "projects" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-base-content">
              {board.name} İle Yapabileceğiniz Açık Kaynak Projeler
            </h3>
            <p className="text-xs text-base-content/70 font-mono">
              Bu kartın pinout ve donanım yeteneklerini kullanan tam tarifler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedProjects.map((proj) => (
              <Link
                key={proj.id}
                href={`/projects/${proj.id}`}
                className="group card bg-base-100 border border-base-300 overflow-hidden shadow-xs hover:shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-16/9 w-full bg-base-200 overflow-hidden border-b border-base-300">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="badge badge-primary badge-xs font-mono font-bold shadow-xs">
                      {proj.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-base-content group-hover:text-primary transition-colors line-clamp-2">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-base-content/70 line-clamp-2">
                      {proj.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-base-200 flex items-center justify-between text-xs font-mono text-primary font-bold">
                    <span>Rehberi İncele</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 6. DİĞER GELİŞTİRME KARTLARI */}
      <section className="space-y-6 pt-8 border-t border-base-300">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-base-content">
            Diğer Geliştirme Kartları
          </h2>
          <p className="text-xs text-base-content/60 font-mono">
            Farklı mimariler, mikrodenetleyiciler ve tek kart bilgisayarlar (SBC)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {otherBoards.map((b) => (
            <Link
              key={b.id}
              href={`/boards/${b.id}`}
              className="group card bg-base-100 border border-base-300 p-5 shadow-xs hover:shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <BoardIllustration boardId={b.id} className="mb-2" />
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-primary font-bold">
                      {b.vendor}
                    </span>
                    <h4 className="text-base font-extrabold text-base-content group-hover:text-primary transition-colors">
                      {b.name}
                    </h4>
                  </div>
                  {b.badge && (
                    <span className="badge badge-primary badge-xs font-mono">
                      {b.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-base-content/70 line-clamp-2">
                  {b.description}
                </p>
              </div>

              <div className="pt-3 border-t border-base-200 flex items-center justify-between text-xs font-mono text-primary font-bold">
                <span>Teknik Datasheet</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
