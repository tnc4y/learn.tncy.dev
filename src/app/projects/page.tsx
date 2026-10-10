"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECT_RECIPES, ProjectRecipe } from "@/data/projectsData";
import CodeBlock from "@/components/CodeBlock";
import {
  Search,
  Clock,
  Layers,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Code2,
  Hammer,
  Radio,
  SlidersHorizontal,
  LayoutGrid,
  ListFilter,
  X,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Cpu,
  Bot,
  Wifi,
  Monitor,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Tüm Projeler" },
  { id: "Robotik & ROS 2", label: "Robotik & ROS 2" },
  { id: "FPGA & RTL", label: "FPGA & SystemVerilog" },
  { id: "Gömülü IoT", label: "Gömülü IoT & ESP32" },
  { id: "Linux & SBC", label: "Raspberry Pi & Linux" },
  { id: "Gömülü C & RTOS", label: "STM32 & FreeRTOS" },
  { id: "Web & Donanım", label: "Web Serial & Donanım" },
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeModalProject, setActiveModalProject] = useState<ProjectRecipe | null>(null);
  const [modalTab, setModalTab] = useState<"bom" | "wiring" | "code" | "steps">("bom");

  const filteredProjects = PROJECT_RECIPES.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchesDiff = selectedDifficulty === "all" || p.difficulty === selectedDifficulty;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      p.title.toLowerCase().includes(searchLower) ||
      p.summary.toLowerCase().includes(searchLower) ||
      p.tags.some((t) => t.toLowerCase().includes(searchLower)) ||
      p.hardwareBOM.some((b) => b.item.toLowerCase().includes(searchLower));

    return matchesCat && matchesDiff && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8 pb-28">
      {/* 1. ÜST HERO BÖLÜMÜ */}
      <div className="relative rounded-3xl bg-linear-to-br from-base-200/90 via-base-200/50 to-primary/5 p-6 sm:p-10 border border-base-300 shadow-sm overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono text-xs font-bold uppercase tracking-wider">
            <Hammer className="w-3.5 h-3.5" />
            <span>Açık Kaynak Donanım &amp; Robotik Laboratuvarı</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-base-content leading-tight">
            Gömülü &amp; Robotik <span className="text-primary">Proje Atölyesi</span>
          </h1>

          <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
            Teorik bilgileri çalışan silikon ve donanımlara dönüştürün. Malzeme listeleri (BOM), 
            sinyal seviyeli pin bağlantı haritaları, üretime hazır kaynak kodlar ve adım adım montaj 
            rehberleri içeren uygulamalı proje kataloğu.
          </p>

          {/* İstatistik Rozetleri */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-xl bg-base-100/80 border border-base-300 font-bold text-base-content flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-primary" /> {PROJECT_RECIPES.length} Kapsamlı Proje
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-base-100/80 border border-base-300 font-bold text-base-content flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-secondary" /> ROS 2 &amp; FPGA &amp; STM32
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-base-100/80 border border-base-300 font-bold text-base-content flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-accent" /> Canlı Web IDE Entegre
            </span>
          </div>
        </div>
      </div>

      {/* 2. FİLTRELEME & ARAMA ÇUBUĞU */}
      <div className="bg-base-200/60 p-4 rounded-2xl border border-base-300 space-y-4 backdrop-blur-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              placeholder="Proje adı, etiket veya parça ara (örn: ROS 2, LiDAR, FPGA, ESP32, CAN Bus, OLED)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-sm input-bordered w-full pl-10 text-xs focus:outline-none focus:border-primary rounded-xl"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-base-content/50 hover:text-base-content"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-base-content/50 hidden sm:block" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="select select-sm select-bordered text-xs focus:outline-none focus:border-primary rounded-xl"
            >
              <option value="all">Tüm Seviyeler</option>
              <option value="Başlangıç">Başlangıç</option>
              <option value="Orta">Orta Seviye</option>
              <option value="İleri Seviye">İleri Seviye</option>
            </select>

            {/* Görünüm Değiştirici (Grid / List) */}
            <div className="join border border-base-300 rounded-xl overflow-hidden bg-base-100">
              <button
                onClick={() => setViewMode("grid")}
                className={`join-item btn btn-xs btn-ghost px-2.5 ${
                  viewMode === "grid" ? "btn-active bg-primary/20 text-primary" : "text-base-content/60"
                }`}
                title="Grid Görünümü"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`join-item btn btn-xs btn-ghost px-2.5 ${
                  viewMode === "list" ? "btn-active bg-primary/20 text-primary" : "text-base-content/60"
                }`}
                title="Liste Görünümü"
              >
                <ListFilter className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Kategori Filtre Hapları */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? PROJECT_RECIPES.length
                : PROJECT_RECIPES.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-xs whitespace-nowrap font-mono text-[11px] rounded-xl transition-all ${
                  selectedCategory === cat.id
                    ? "btn-primary shadow-xs font-bold"
                    : "btn-ghost border border-base-content/10 text-base-content/80 hover:bg-base-300"
                }`}
              >
                {cat.label}
                <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. PROJE LİSTELEME EKRANI */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-200 overflow-hidden flex flex-col group"
            >
              {/* Proje Banner Görseli */}
              <div
                onClick={() => {
                  setActiveModalProject(project);
                  setModalTab("bom");
                }}
                className="relative aspect-16/9 w-full bg-base-300 cursor-pointer overflow-hidden border-b border-base-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Rozet Katmanı */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="badge badge-primary badge-xs font-mono font-bold shadow-xs">
                    {project.category}
                  </span>
                  <span
                    className={`badge badge-xs font-mono font-bold shadow-xs ${
                      project.difficulty === "Başlangıç"
                        ? "badge-success text-success-content"
                        : project.difficulty === "Orta"
                        ? "badge-warning text-warning-content"
                        : "badge-error text-error-content"
                    }`}
                  >
                    {project.difficulty}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-2.5">
                  <span className="badge badge-neutral/90 backdrop-blur-md badge-xs font-mono text-[10px] text-white flex items-center gap-1 shadow-xs">
                    <Clock className="w-3 h-3 text-primary" /> {project.estimatedTime}
                  </span>
                </div>
              </div>

              {/* Kart İçeriği */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3
                    onClick={() => {
                      setActiveModalProject(project);
                      setModalTab("bom");
                    }}
                    className="font-extrabold text-base sm:text-lg text-base-content group-hover:text-primary transition-colors cursor-pointer line-clamp-2"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs text-base-content/70 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Etiketler */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-base-200 text-base-content/70 font-mono text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Alt Donanım İstatistikleri & Butonlar */}
                <div className="pt-3 border-t border-base-200 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-base-content/60">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3 text-primary" />
                      {project.hardwareBOM.length} Parça (BOM)
                    </span>
                    <span className="flex items-center gap-1">
                      <Radio className="w-3 h-3 text-secondary" />
                      {project.wiring.length} Pin Hattı
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveModalProject(project);
                        setModalTab("bom");
                      }}
                      className="btn btn-sm btn-primary flex-1 font-mono text-xs rounded-xl shadow-xs"
                    >
                      <span>Rehberi Aç</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {project.playgroundPresetId && (
                      <Link
                        href={`/playground?preset=${project.playgroundPresetId}`}
                        className="btn btn-sm btn-outline btn-neutral px-3 rounded-xl font-mono text-xs"
                        title="Web IDE'de Kodu Aç"
                      >
                        <Terminal className="w-3.5 h-3.5 text-primary" />
                        <span className="hidden sm:inline">IDE</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Kompakt Liste Görünümü */
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card bg-base-100 border border-base-300 p-4 sm:p-5 shadow-xs hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4 flex-1">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-24 h-16 rounded-xl object-cover shrink-0 border border-base-300 cursor-pointer hidden sm:block"
                  onClick={() => {
                    setActiveModalProject(project);
                    setModalTab("bom");
                  }}
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge badge-primary badge-xs font-mono font-bold">
                      {project.category}
                    </span>
                    <span className="badge badge-outline badge-xs font-mono">
                      {project.difficulty}
                    </span>
                    <span className="badge badge-ghost badge-xs font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {project.estimatedTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => {
                      setActiveModalProject(project);
                      setModalTab("bom");
                    }}
                    className="font-extrabold text-base text-base-content hover:text-primary transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs text-base-content/70 line-clamp-1">
                    {project.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setActiveModalProject(project);
                    setModalTab("bom");
                  }}
                  className="btn btn-sm btn-primary font-mono text-xs rounded-xl"
                >
                  Detaylar
                </button>
                {project.playgroundPresetId && (
                  <Link
                    href={`/playground?preset=${project.playgroundPresetId}`}
                    className="btn btn-sm btn-outline btn-neutral font-mono text-xs rounded-xl"
                  >
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    IDE
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Arama Sonucu Bulunamadı */}
      {filteredProjects.length === 0 && (
        <div className="p-16 text-center rounded-3xl bg-base-200/50 border border-base-300 space-y-3">
          <Hammer className="w-12 h-12 text-base-content/30 mx-auto" />
          <h3 className="font-bold text-lg">Aradığınız kriterlere uygun proje bulunamadı</h3>
          <p className="text-xs text-base-content/60 max-w-md mx-auto">
            Farklı arama kelimeleri deneyebilir veya filtreleri sıfırlayarak tüm robotik ve gömülü proje kataloğuna göz atabilirsiniz.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedDifficulty("all");
              setSearchTerm("");
            }}
            className="btn btn-primary btn-sm font-mono mt-3 rounded-xl"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}

      {/* 4. PROJE DETAY MODAL / DRAWER */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-base-100 border border-base-300 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Üst Başlık & Kapat Butonu */}
            <div className="p-5 sm:p-6 border-b border-base-300 bg-base-200/50 flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="badge badge-primary badge-xs font-mono font-bold">
                    {activeModalProject.category}
                  </span>
                  <span className="badge badge-outline badge-xs font-mono">
                    {activeModalProject.difficulty}
                  </span>
                  <span className="badge badge-ghost badge-xs font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {activeModalProject.estimatedTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-base-content">
                  {activeModalProject.title}
                </h2>
                <p className="text-xs sm:text-sm text-base-content/70 max-w-3xl leading-relaxed">
                  {activeModalProject.summary}
                </p>
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="btn btn-ghost btn-sm btn-square rounded-xl shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Sekmeleri */}
            <div className="px-6 pt-3 bg-base-200/30 border-b border-base-300 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setModalTab("bom")}
                className={`px-3 py-2 text-xs font-mono font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  modalTab === "bom"
                    ? "border-primary text-primary"
                    : "border-transparent text-base-content/60 hover:text-base-content"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Malzeme Listesi (BOM) ({activeModalProject.hardwareBOM.length})
              </button>

              <button
                onClick={() => setModalTab("wiring")}
                className={`px-3 py-2 text-xs font-mono font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  modalTab === "wiring"
                    ? "border-primary text-primary"
                    : "border-transparent text-base-content/60 hover:text-base-content"
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                Bağlantı Şeması (Wiring) ({activeModalProject.wiring.length})
              </button>

              <button
                onClick={() => setModalTab("code")}
                className={`px-3 py-2 text-xs font-mono font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  modalTab === "code"
                    ? "border-primary text-primary"
                    : "border-transparent text-base-content/60 hover:text-base-content"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Kaynak Kod ({activeModalProject.sourceCode.language})
              </button>

              <button
                onClick={() => setModalTab("steps")}
                className={`px-3 py-2 text-xs font-mono font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  modalTab === "steps"
                    ? "border-primary text-primary"
                    : "border-transparent text-base-content/60 hover:text-base-content"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Adım Adım Montaj ({activeModalProject.steps.length})
              </button>
            </div>

            {/* Modal Gövde İçeriği */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Sekme A: Malzeme Listesi */}
              {modalTab === "bom" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-primary flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      Gereken Donanım &amp; Parça Listesi (Bill of Materials)
                    </h4>
                    <span className="text-[11px] font-mono text-base-content/50">
                      Toplam {activeModalProject.hardwareBOM.length} ana bileşen
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalProject.hardwareBOM.map((bom, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-base-200/50 border border-base-300 flex items-center justify-between gap-3 font-mono text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-base-content">{bom.item}</div>
                          {bom.note && (
                            <div className="text-[11px] text-base-content/60">{bom.note}</div>
                          )}
                        </div>
                        <span className="badge badge-neutral badge-sm font-mono shrink-0">
                          {bom.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sekme B: Bağlantı Şeması */}
              {modalTab === "wiring" && (
                <div className="space-y-4">
                  <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-secondary flex items-center gap-1.5">
                    <Radio className="w-4 h-4" />
                    Donanım Pin Bağlantı Haritası (Wiring Matrix)
                  </h4>

                  <div className="overflow-x-auto rounded-2xl border border-base-300">
                    <table className="table table-sm font-mono w-full">
                      <thead className="bg-base-200/80">
                        <tr className="text-base-content/70">
                          <th>Bileşen / Modül Pini</th>
                          <th>Mikrodenetleyici / FPGA Pini</th>
                          <th>Sinyal Tipi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeModalProject.wiring.map((w, wIdx) => (
                          <tr key={wIdx} className="border-b border-base-300/40 hover:bg-base-200/30">
                            <td className="font-bold text-base-content">{w.from}</td>
                            <td className="text-primary font-bold">{w.to}</td>
                            <td>
                              <span
                                className={`badge badge-xs text-[9px] font-mono ${
                                  w.type === "Power"
                                    ? "badge-error"
                                    : w.type === "GND"
                                    ? "badge-neutral"
                                    : w.type === "I2C"
                                    ? "badge-success"
                                    : w.type === "SPI"
                                    ? "badge-warning"
                                    : w.type === "UART"
                                    ? "badge-info"
                                    : w.type === "CAN"
                                    ? "badge-accent"
                                    : "badge-primary"
                                }`}
                              >
                                {w.type}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sekme C: Kaynak Kod */}
              {modalTab === "code" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-base-content flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-accent" />
                      {activeModalProject.sourceCode.caption}
                    </h4>
                  </div>
                  <CodeBlock
                    code={activeModalProject.sourceCode.code}
                    language={activeModalProject.sourceCode.language}
                    caption={activeModalProject.sourceCode.caption}
                  />
                </div>
              )}

              {/* Sekme D: Adım Adım Montaj */}
              {modalTab === "steps" && (
                <div className="space-y-4">
                  <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-base-content flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Montaj, Yapılandırma ve Çalıştırma Adımları
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeModalProject.steps.map((st) => (
                      <div
                        key={st.number}
                        className="p-4 rounded-2xl bg-base-200/50 border border-base-300 space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-primary/15 text-primary font-mono text-xs font-black flex items-center justify-center shrink-0">
                            {st.number}
                          </span>
                          <h5 className="font-bold text-xs text-base-content">{st.title}</h5>
                        </div>
                        <p className="text-xs text-base-content/80 leading-relaxed pl-8">
                          {st.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Alt Aksiyon Çubuğu */}
            <div className="p-4 sm:p-5 border-t border-base-300 bg-base-200/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-base-content/60">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>learn.tncy.dev Açık Kaynak Proje Kılavuzu</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {activeModalProject.playgroundPresetId && (
                  <Link
                    href={`/playground?preset=${activeModalProject.playgroundPresetId}`}
                    className="btn btn-sm btn-primary flex-1 sm:flex-initial font-mono text-xs rounded-xl shadow-xs"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>Web IDE'de Çalıştır (VS Code)</span>
                  </Link>
                )}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="btn btn-sm btn-outline btn-neutral font-mono text-xs rounded-xl"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
