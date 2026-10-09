"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HARDWARE_GUIDES, HardwareGuide } from "@/data/guidesData";
import CodeBlock from "@/components/CodeBlock";
import { InlineMarkdown } from "@/components/MarkdownRenderer";
import {
  Terminal,
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  Cpu,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Info,
  Clock,
  Compass,
  Laptop,
  Flame,
  HelpCircle,
  RotateCcw,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Tüm Kılavuzlar" },
  { id: "Geliştirici Ortamı (Arch/Hyprland)", label: "Arch Linux & Hyprland" },
  { id: "Robotik & ROS 2", label: "Robotik & ROS 2" },
  { id: "Flashing & OS", label: "Raspberry Pi & OS İmaj" },
  { id: "Firmware & CLI", label: "ESP32 & Arduino CLI" },
  { id: "Embedded Linux", label: "Gömülü Linux & Kernel" },
];

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [expandedGuideId, setExpandedGuideId] = useState<string | null>("arch-linux-install");
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  // LocalStorage'dan tamamlanan adımları yükle
  useEffect(() => {
    try {
      const stored = localStorage.getItem("guide_completed_steps");
      if (stored) {
        setCompletedSteps(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const toggleStepCompleted = (guideId: string, stepIndex: number) => {
    const key = `${guideId}_step_${stepIndex}`;
    setCompletedSteps((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem("guide_completed_steps", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const copyToClipboard = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCommand(cmd);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch {
      // Fallback
    }
  };

  const filteredGuides = HARDWARE_GUIDES.filter((guide) => {
    const matchesCat = activeCategory === "all" || guide.category === activeCategory;
    const matchesDiff = selectedDifficulty === "all" || guide.difficulty === selectedDifficulty;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      query === "" ||
      guide.title.toLowerCase().includes(query) ||
      guide.summary.toLowerCase().includes(query) ||
      guide.targetHardware.some((hw) => hw.toLowerCase().includes(query)) ||
      guide.steps.some(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          (s.command && s.command.toLowerCase().includes(query))
      );
    return matchesCat && matchesDiff && matchesSearch;
  });

  // Kılavuz adımlarının tamamlanma oranını hesapla
  const getGuideProgress = (guide: HardwareGuide) => {
    const total = guide.steps.length;
    if (total === 0) return 0;
    const completed = guide.steps.filter((_, idx) => completedSteps[`${guide.id}_step_${idx}`]).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* 1. ÜST BAŞLIK ALANI & AÇIKLAMA */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Geliştirici Nasıl Yapılır & Kılavuzlar (Cookbook)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
          Adım Adım Donanım & Sistem <span className="text-secondary">Rehberleri</span>
        </h1>

        <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
          Kuru teori veya blog yazısı değil; doğrudan terminalde çalıştırabileceğiniz, donanım izinleri (udev),
          UEFI disk bölümleme, Wayland tiling pencere kuralları, ROS 2 robotik haritalama ve firmware yükleme kılavuzları.
        </p>

        {/* Hızlı İstatistik Rozetleri */}
        <div className="flex items-center gap-3 pt-1 flex-wrap text-xs font-mono">
          <span className="badge badge-neutral gap-1.5 p-3">
            <Terminal className="w-3.5 h-3.5 text-success" />
            {HARDWARE_GUIDES.length} Kapsamlı Rehber
          </span>
          <span className="badge badge-neutral gap-1.5 p-3">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            Arch Linux • Hyprland • ROS 2 • Pi 5
          </span>
          <span className="badge badge-neutral gap-1.5 p-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
            İnteraktif Adım Takibi
          </span>
        </div>
      </div>

      {/* 2. ARAMA VE FİLTRELEME ÇUBUĞU */}
      <div className="space-y-4 p-5 rounded-2xl bg-base-200/50 border border-base-300">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Metin Arama */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rehber, donanım veya terminal komutu ara (örn: pacstrap, udev, ros2, cfdisk)..."
              className="input input-sm sm:input-md w-full pl-10 rounded-xl bg-base-100 border-base-300 focus:border-secondary text-xs sm:text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-base-content/50 hover:text-base-content"
              >
                Temizle
              </button>
            )}
          </div>

          {/* Zorluk Filtresi */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-base-content/60">Zorluk:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="select select-sm rounded-xl bg-base-100 border-base-300 text-xs font-mono"
            >
              <option value="all">Tüm Seviyeler</option>
              <option value="Başlangıç">Başlangıç</option>
              <option value="Orta">Orta Seviye</option>
              <option value="İleri Seviye">İleri Seviye</option>
            </select>
          </div>
        </div>

        {/* Kategori Düğmeleri */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          <span className="text-xs font-mono text-base-content/60 mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Konu:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`btn btn-xs font-mono rounded-lg whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "btn-secondary shadow-xs font-bold"
                  : "btn-ghost border border-base-content/10 text-base-content/75"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. KILAVUZ LİSTESİ */}
      <div className="space-y-6">
        {filteredGuides.length === 0 ? (
          <div className="card bg-base-100 border border-base-300 p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-base-200 text-base-content/50 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-base-content">Eşleşen Kılavuz Bulunamadı</h3>
            <p className="text-xs text-base-content/60 max-w-md mx-auto">
              Arama kriterlerinizi değiştirin veya tüm konuları görüntülemek için filtreleri sıfırlayın.
            </p>
            <div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                  setSelectedDifficulty("all");
                }}
                className="btn btn-secondary btn-sm font-mono rounded-xl"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          </div>
        ) : (
          filteredGuides.map((guide) => {
            const isExpanded = expandedGuideId === guide.id;
            const progress = getGuideProgress(guide);

            return (
              <div
                key={guide.id}
                id={guide.id}
                className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden transition-all hover:border-secondary/40"
              >
                {/* Kılavuz Kart Başlığı (Tıklanabilir Accordion) */}
                <div
                  onClick={() => setExpandedGuideId(isExpanded ? null : guide.id)}
                  className="p-5 bg-base-200/40 hover:bg-base-200/70 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="badge badge-secondary badge-xs font-mono font-bold">
                        {guide.category}
                      </span>
                      <span className="badge badge-ghost badge-xs font-mono">
                        <Clock className="w-3 h-3 mr-1 opacity-70" />
                        {guide.readTime}
                      </span>
                      <span className="badge badge-outline badge-xs font-mono">
                        {guide.difficulty}
                      </span>
                      {progress > 0 && (
                        <span className="badge badge-success badge-xs font-mono font-bold">
                          %{progress} Tamamlandı
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                      <span>{guide.title}</span>
                    </h2>

                    <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed max-w-3xl">
                      {guide.summary}
                    </p>

                    {/* Hedef Donanım Etiketleri */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] font-mono text-base-content/50 uppercase">Hedef:</span>
                      {guide.targetHardware.map((hw, hIdx) => (
                        <span key={hIdx} className="badge badge-neutral badge-xs font-mono text-[10px]">
                          {hw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <button
                      className="btn btn-secondary btn-sm font-mono rounded-xl gap-1.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedGuideId(isExpanded ? null : guide.id);
                      }}
                    >
                      <span>{isExpanded ? "Daralt" : "Adımları İncele"}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Genişletilmiş Kılavuz Adımları ve Ayrıntıları */}
                {isExpanded && (
                  <div className="p-6 border-t border-base-300 space-y-8 animate-in fade-in duration-200 bg-base-100">
                    {/* İlerleme Çubuğu */}
                    <div className="p-3 rounded-xl bg-base-200/60 border border-base-300 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-base-content/70 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                          Uygulama İlerlemesi ({guide.steps.filter((_, i) => completedSteps[`${guide.id}_step_${i}`]).length} / {guide.steps.length} Adım)
                        </span>
                        <span className="font-bold text-success">%{progress}</span>
                      </div>
                      <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-success h-full transition-all duration-300 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Ön Koşullar Kutusu */}
                    <div className="p-4 rounded-xl bg-base-200/40 border border-base-300 space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-secondary" />
                        Gereksinimler & Ön Koşullar:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-base-content/80">
                        {guide.prerequisites.map((item, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-secondary font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Adımlar Listesi */}
                    <div className="space-y-6">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60">
                        Adım Adım Uygulama Akışı:
                      </h4>

                      {guide.steps.map((step, sIdx) => {
                        const stepKey = `${guide.id}_step_${sIdx}`;
                        const isStepDone = !!completedSteps[stepKey];

                        return (
                          <div
                            key={sIdx}
                            className={`p-5 rounded-2xl border transition-all ${
                              isStepDone
                                ? "bg-success/5 border-success/30"
                                : "bg-base-200/30 border-base-300 hover:border-base-content/20"
                            } space-y-4`}
                          >
                            {/* Adım Başlığı & Tamamlandı Butonu */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <div
                                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                                    isStepDone
                                      ? "bg-success text-success-content shadow-xs"
                                      : "bg-secondary/10 text-secondary border border-secondary/20"
                                  }`}
                                >
                                  {sIdx + 1}
                                </div>
                                <div>
                                  <h3
                                    className={`text-sm sm:text-base font-bold text-base-content ${
                                      isStepDone ? "line-through opacity-80" : ""
                                    }`}
                                  >
                                    {step.title}
                                  </h3>
                                  <p className="text-xs text-base-content/75 leading-relaxed mt-1 whitespace-pre-line">
                                    <InlineMarkdown text={step.description} />
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => toggleStepCompleted(guide.id, sIdx)}
                                className={`btn btn-xs rounded-lg font-mono shrink-0 gap-1 ${
                                  isStepDone
                                    ? "btn-success text-white"
                                    : "btn-ghost border border-base-content/20 text-base-content/60"
                                }`}
                              >
                                {isStepDone ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>Tamamlandı</span>
                                  </>
                                ) : (
                                  <>
                                    <Circle className="w-3 h-3" />
                                    <span>Tamamla</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {/* Hızlı Kopyalanabilir Komut Kutusu */}
                            {step.command && (
                              <div className="rounded-xl overflow-hidden border border-base-300 bg-[#1e1e2e] text-[#cdd6f4] p-3 flex items-center justify-between gap-3 font-mono text-xs shadow-inner">
                                <div className="flex items-center gap-2 truncate flex-1">
                                  <span className="text-emerald-400 select-none font-bold">$</span>
                                  <code className="text-amber-200 truncate">{step.command}</code>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(step.command!)}
                                  className="btn btn-ghost btn-xs text-white/70 hover:text-white shrink-0 gap-1"
                                  title="Komutu kopyala"
                                >
                                  {copiedCommand === step.command ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      <span className="text-[10px] text-emerald-400">Kopyalandı!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span className="text-[10px]">Kopyala</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}

                            {/* Kod / Yapılandırma Bloğu */}
                            {step.codeSnippet && (
                              <CodeBlock
                                code={step.codeSnippet.code}
                                language={step.codeSnippet.language}
                                caption={step.codeSnippet.caption}
                              />
                            )}

                            {/* Uyarı veya Bilgi Kutusu */}
                            {step.callout && (
                              <div
                                className={`p-3.5 rounded-xl text-xs flex items-start gap-3 border ${
                                  step.callout.type === "warning"
                                    ? "bg-warning/10 border-warning/30 text-warning-content"
                                    : step.callout.type === "success"
                                    ? "bg-success/10 border-success/30 text-success-content"
                                    : "bg-info/10 border-info/30 text-info-content"
                                }`}
                              >
                                {step.callout.type === "warning" ? (
                                  <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                                ) : step.callout.type === "success" ? (
                                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                                ) : (
                                  <Info className="w-4 h-4 text-info shrink-0 mt-0.5" />
                                )}
                                <div className="space-y-0.5">
                                  <div className="font-bold text-xs">
                                    <InlineMarkdown text={step.callout.title} />
                                  </div>
                                  <div className="opacity-90 leading-relaxed text-[11px]">
                                    <InlineMarkdown text={step.callout.message} />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. BAĞLANTILI BÖLÜMLER (CROSS-LINKING) */}
      <div className="pt-6 border-t border-base-300 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/boards"
          className="p-5 rounded-2xl bg-base-200/50 border border-base-300 hover:border-warning/50 transition-all group flex flex-col justify-between space-y-3"
        >
          <div className="space-y-1.5">
            <div className="p-2 w-fit rounded-lg bg-warning/10 text-warning group-hover:bg-warning group-hover:text-warning-content transition-colors">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-base-content group-hover:text-warning transition-colors">
              Geliştirme Kartları & Pinout
            </h4>
            <p className="text-xs text-base-content/70 leading-relaxed">
              Raspberry Pi 5, ESP32, Arduino Uno ve FPGA kartlarının detaylı pin şemaları ve teknik donanım karşılaştırması.
            </p>
          </div>
          <div className="inline-flex items-center gap-1 text-xs font-mono font-bold text-warning">
            <span>Kartları İncele</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/tutorial/ros2-intro"
          className="p-5 rounded-2xl bg-base-200/50 border border-base-300 hover:border-secondary/50 transition-all group flex flex-col justify-between space-y-3"
        >
          <div className="space-y-1.5">
            <div className="p-2 w-fit rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-content transition-colors">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-base-content group-hover:text-secondary transition-colors">
              ROS 2 & Robotik Kursu
            </h4>
            <p className="text-xs text-base-content/70 leading-relaxed">
              DDS mimarisi, rclpy düğümleri, LiDAR entegrasyonu, SLAM haritalama ve Nav2 otonom navigasyon müfredatı.
            </p>
          </div>
          <div className="inline-flex items-center gap-1 text-xs font-mono font-bold text-secondary">
            <span>Derse Başla</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/projects"
          className="p-5 rounded-2xl bg-base-200/50 border border-base-300 hover:border-emerald-500/50 transition-all group flex flex-col justify-between space-y-3"
        >
          <div className="space-y-1.5">
            <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Laptop className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-base-content group-hover:text-emerald-500 transition-colors">
              Donanım Proje Atölyesi
            </h4>
            <p className="text-xs text-base-content/70 leading-relaxed">
              ESP32 Hava Durumu İstasyonu, STM32 FreeRTOS, Raspberry Pi Pi-Hole ve FPGA VGA Pong donanım projeleri.
            </p>
          </div>
          <div className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-500">
            <span>Projeleri Gör</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* 5. JSON-LD SCHEMA FOR HOWTO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "learn.tncy.dev Geliştirici Kılavuzları & Nasıl Yapılır",
            description:
              "Arch Linux UEFI kurulumu, Hyprland & Caelestia dotfiles, Raspberry Pi 5 ROS 2 Humble haritalama ve ESP32 flashing adımları.",
            itemListElement: HARDWARE_GUIDES.map((g, idx) => ({
              "@type": "HowTo",
              position: idx + 1,
              name: g.title,
              description: g.summary,
              totalTime: g.readTime,
              step: g.steps.map((s, sIdx) => ({
                "@type": "HowToStep",
                position: sIdx + 1,
                name: s.title,
                text: s.description,
              })),
            })),
          }),
        }}
      />
    </div>
  );
}
