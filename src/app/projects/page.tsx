"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECT_RECIPES } from "@/data/projectsData";
import {
  Search,
  Clock,
  Layers,
  Terminal,
  Hammer,
  Radio,
  SlidersHorizontal,
  LayoutGrid,
  ListFilter,
  ChevronRight,
  Cpu,
  Bot,
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
              <Link
                href={`/projects/${project.id}`}
                className="relative aspect-16/9 w-full bg-base-300 block overflow-hidden border-b border-base-300"
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
              </Link>

              {/* Kart İçeriği */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <Link
                    href={`/projects/${project.id}`}
                    className="block font-extrabold text-base sm:text-lg text-base-content group-hover:text-primary transition-colors line-clamp-2"
                  >
                    {project.title}
                  </Link>

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
                    <Link
                      href={`/projects/${project.id}`}
                      className="btn btn-sm btn-primary flex-1 font-mono text-xs rounded-xl shadow-xs"
                    >
                      <span>Rehberi Aç</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

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
                <Link
                  href={`/projects/${project.id}`}
                  className="w-24 h-16 rounded-xl overflow-hidden shrink-0 border border-base-300 hidden sm:block block"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
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

                  <Link
                    href={`/projects/${project.id}`}
                    className="block font-extrabold text-base text-base-content hover:text-primary transition-colors"
                  >
                    {project.title}
                  </Link>

                  <p className="text-xs text-base-content/70 line-clamp-1">
                    {project.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/projects/${project.id}`}
                  className="btn btn-sm btn-primary font-mono text-xs rounded-xl"
                >
                  Detaylar &amp; Rehber
                </Link>
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
    </div>
  );
}

