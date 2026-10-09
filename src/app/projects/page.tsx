"use client";

import { useState } from "react";
import { PROJECT_RECIPES, ProjectRecipe } from "@/data/projectsData";
import CodeBlock from "@/components/CodeBlock";
import {
  Sparkles,
  Search,
  Clock,
  Layers,
  CheckCircle2,
  Cpu,
  ChevronDown,
  ChevronUp,
  Terminal,
  ExternalLink,
  Code2,
  FolderGit2,
  Hammer,
  Radio,
  SlidersHorizontal,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Tüm Projeler" },
  { id: "Gömülü IoT", label: "Gömülü IoT & ESP32" },
  { id: "FPGA & RTL", label: "FPGA & SystemVerilog" },
  { id: "Linux & SBC", label: "Raspberry Pi & Linux" },
  { id: "Gömülü C & RTOS", label: "STM32 & FreeRTOS" },
  { id: "Web & Donanım", label: "Web Serial & Donanım" },
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("esp32-weather-station");

  const filteredProjects = PROJECT_RECIPES.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchesDiff = selectedDifficulty === "all" || p.difficulty === selectedDifficulty;
    const matchesSearch =
      searchTerm === "" ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.hardwareBOM.some((b) => b.item.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCat && matchesDiff && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8 pb-24">
      {/* 1. Başlık & Açıklama */}
      <div className="border-b border-base-300 pb-6 space-y-3">
        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
          <Hammer className="w-4 h-4" />
          <span>Uygulamalı Atölye & Proje Tarifleri</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
          Gömülü & Donanım Proje Atölyesi
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 max-w-3xl leading-relaxed">
          Teorik bilgileri somut donanımlara dönüştürün. Malzeme listesi (BOM), bacak bağlantı tabloları,
          çalışmaya hazır kaynak kodlar ve adım adım montaj yönergeleri içeren açık kaynaklı proje kütüphanesi.
        </p>
      </div>

      {/* 2. Filtre ve Arama Çubuğu */}
      <div className="bg-base-200/60 p-4 rounded-2xl border border-base-300 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              placeholder="Proje adı, sensör veya donanım ara (örn. ESP32, OLED, VGA, FreeRTOS, Web Serial)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-sm input-bordered w-full pl-9 text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-base-content/50 hidden sm:block" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="select select-sm select-bordered text-xs focus:outline-none focus:border-primary"
            >
              <option value="all">Tüm Seviyeler</option>
              <option value="Başlangıç">Başlangıç</option>
              <option value="Orta">Orta Seviye</option>
              <option value="İleri Seviye">İleri Seviye</option>
            </select>
          </div>
        </div>

        {/* Kategori Butonları */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`btn btn-xs whitespace-nowrap font-mono text-[11px] rounded-lg ${
                selectedCategory === cat.id
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost border border-base-content/10 text-base-content/80 hover:bg-base-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Proje Listesi */}
      <div className="space-y-6">
        {filteredProjects.map((project) => {
          const isExpanded = expandedProjectId === project.id;

          return (
            <div
              key={project.id}
              className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden"
            >
              {/* Proje Başlık Kartı */}
              <div
                onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                className="p-6 bg-base-200/40 hover:bg-base-200/70 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
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

                  <h3 className="text-xl font-extrabold text-base-content">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed max-w-3xl">
                    {project.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-primary font-bold hidden sm:inline">
                    {isExpanded ? "Detayları Gizle" : "Projeyi İncele"}
                  </span>
                  <div className="btn btn-ghost btn-sm btn-square">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-base-content/60" />
                    )}
                  </div>
                </div>
              </div>

              {/* Genişletilmiş Proje Detayları */}
              {isExpanded && (
                <div className="p-6 border-t border-base-300 space-y-8 animate-in fade-in duration-150">
                  {/* A) Malzeme Listesi (BOM) & Bağlantı Şeması */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Malzeme Listesi */}
                    <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300 space-y-3">
                      <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-primary flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Gereken Donanım & Parça Listesi (BOM)</span>
                      </h4>
                      <div className="space-y-1.5">
                        {project.hardwareBOM.map((bom, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex items-center justify-between p-2 rounded-xl bg-base-100 border border-base-content/5 text-xs font-mono"
                          >
                            <span className="font-bold text-base-content">{bom.item}</span>
                            <div className="flex items-center gap-2">
                              {bom.note && (
                                <span className="text-[10px] text-base-content/50 truncate max-w-[120px]">
                                  {bom.note}
                                </span>
                              )}
                              <span className="badge badge-neutral badge-xs font-mono">
                                {bom.count}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pin Bağlantı Tablosu */}
                    <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300 space-y-3">
                      <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-secondary flex items-center gap-1.5">
                        <Radio className="w-3.5 h-3.5" />
                        <span>Donanım Pin Bağlantı Haritası (Wiring)</span>
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="table table-xs font-mono w-full">
                          <thead>
                            <tr className="text-base-content/60 border-b border-base-300">
                              <th>Bileşen Pini</th>
                              <th>Kart Pini</th>
                              <th>Sinyal Tipi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {project.wiring.map((w, wIdx) => (
                              <tr key={wIdx} className="border-b border-base-300/40">
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
                                        : "badge-info"
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
                  </div>

                  {/* B) Kaynak Kod Bloğu */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-base-content flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-accent" />
                      <span>Proje Kaynak Kodu</span>
                    </h4>
                    <CodeBlock
                      code={project.sourceCode.code}
                      language={project.sourceCode.language}
                      caption={project.sourceCode.caption}
                    />
                  </div>

                  {/* C) Adım Adım Kurulum ve Montaj */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-base-content flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span>Montaj & Çalıştırma Adımları</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.steps.map((st) => (
                        <div
                          key={st.number}
                          className="p-4 rounded-2xl bg-base-200/50 border border-base-300 space-y-1.5"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-primary/15 text-primary font-mono text-xs font-black flex items-center justify-center shrink-0">
                              {st.number}
                            </span>
                            <h5 className="font-bold text-xs text-base-content">
                              {st.title}
                            </h5>
                          </div>
                          <p className="text-xs text-base-content/80 leading-relaxed pl-8">
                            {st.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-base-200/60 border border-base-300 space-y-2">
            <Hammer className="w-10 h-10 text-base-content/30 mx-auto" />
            <h3 className="font-bold text-base">Aradığınız kriterlere uygun proje bulunamadı</h3>
            <p className="text-xs text-base-content/60">
              Filtreleri sıfırlayarak tüm proje tariflerini görüntüleyebilirsiniz.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDifficulty("all");
                setSearchTerm("");
              }}
              className="btn btn-outline btn-xs font-mono mt-2"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
