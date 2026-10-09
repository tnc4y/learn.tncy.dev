"use client";

import { useState } from "react";
import Link from "next/link";
import { COURSES } from "@/data/curriculum";
import {
  BookOpen,
  Search,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  FileCode2,
  Palette,
  Code2,
  Terminal,
  Layers,
  Zap,
  Activity,
  CheckCircle,
  Bot,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Tüm Kurslar" },
  { id: "Web Geliştirme", label: "Web Geliştirme (HTML/CSS/JS)" },
  { id: "Gömülü Sistemler", label: "Gömülü Sistemler & IoT" },
  { id: "Donanım & FPGA", label: "Donanım & FPGA Tasarımı" },
  { id: "Programlama Dilleri", label: "Sistem & Programlama Dilleri" },
];

export default function CoursesPage() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const toggleCourseExpand = (courseId: string) => {
    setExpandedCourseId((prev) => (prev === courseId ? null : courseId));
  };

  const filteredCourses = COURSES.filter((c) => {
    const matchesCat = selectedCat === "all" || c.category === selectedCat;
    const matchesSearch =
      searchQuery === "" ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.modules.some((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.lessons.some((l) => l.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return matchesCat && matchesSearch;
  });

  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-5 h-5 text-primary" />;
      case "FileCode2":
        return <FileCode2 className="w-5 h-5 text-error" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-info" />;
      case "Code2":
        return <Code2 className="w-5 h-5 text-warning" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-success" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-accent" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-warning" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-secondary" />;
      case "Bot":
        return <Bot className="w-5 h-5 text-warning" />;
      default:
        return <BookOpen className="w-5 h-5 text-primary" />;
    }
  };

  const totalAllLessons = COURSES.reduce(
    (acc, c) => acc + c.modules.reduce((a, m) => a + m.lessons.length, 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* 1. BAŞLIK & AÇIKLAMA */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ayrık Müfredat Kataloğu</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-base-content">
          Tüm Eğitim Kursları & Alanlar
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
          Her kurs birbirinden tamamen bağımsız olarak kurgulanmıştır. İster web geliştirmeden başlayın,
          ister doğrudan FPGA donanım tasarımına veya gömülü sistem C kodlamasına geçiş yapın.
        </p>

        {/* İstatistikler */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-base-content/60">
          <span className="badge badge-neutral badge-sm">{COURSES.length} Ayrı Kurs</span>
          <span className="badge badge-neutral badge-sm">{totalAllLessons} Toplam Ders</span>
          <span className="badge badge-neutral badge-sm">4 Temel Kategori</span>
        </div>
      </div>

      {/* 2. FİLTRELEME & ARAMA ÇUBUĞU */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-base-200/50 border border-base-300">
        {/* Kategori Sekmeleri */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`btn btn-xs sm:btn-sm font-mono text-xs whitespace-nowrap rounded-xl ${
                selectedCat === cat.id
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost border border-base-content/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Arama Kutusu */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Kurs veya konu ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-sm input-bordered w-full pl-9 pr-3 text-xs focus:border-primary"
          />
        </div>
      </div>

      {/* 3. KURSLAR LİSTESİ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);
          const firstLesson = course.modules[0]?.lessons[0];
          const isExpanded = expandedCourseId === course.id;

          return (
            <div
              key={course.id}
              className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div className="card-body p-6 space-y-4">
                {/* Üst Başlık & Rozetler */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-base-200 group-hover:bg-primary/10 transition-colors">
                      {getCourseIcon(course.icon)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-base-content/50 font-bold block">
                        {course.category}
                      </span>
                      <h2 className="text-xl font-black text-base-content group-hover:text-primary transition-colors">
                        {course.title}
                      </h2>
                    </div>
                  </div>
                  <span className={`badge ${course.color} badge-sm font-mono text-[10px] font-bold shrink-0`}>
                    {course.badge}
                  </span>
                </div>

                <p className="text-xs text-base-content/75 leading-relaxed line-clamp-2">
                  {course.description}
                </p>

                {/* Modül Özeti */}
                <div className="space-y-2 pt-2 border-t border-base-content/5">
                  <div className="flex items-center justify-between text-xs font-mono text-base-content/60">
                    <span>
                      {course.modules.length} Modül • {totalLessons} Ders
                    </span>
                    <button
                      onClick={() => toggleCourseExpand(course.id)}
                      className="text-primary hover:underline flex items-center gap-1 font-semibold"
                    >
                      {isExpanded ? (
                        <>
                          <span>Kapat</span>
                          <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <span>Müfredat</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Genişletilmiş Modül & Ders Ağacı */}
                  {isExpanded && (
                    <div className="p-3 rounded-xl bg-base-200/50 space-y-3 max-h-60 overflow-y-auto text-xs animate-in fade-in duration-150">
                      {course.modules.map((mod) => (
                        <div key={mod.id} className="space-y-1.5">
                          <div className="font-bold text-[11px] text-base-content flex items-center gap-1.5">
                            <span className="font-mono text-primary">{mod.number}.</span>
                            <span>{mod.title}</span>
                          </div>
                          <ul className="pl-4 space-y-1 border-l-2 border-base-300">
                            {mod.lessons.map((lesson) => (
                              <li key={lesson.id}>
                                <Link
                                  href={`/tutorial/${lesson.id}`}
                                  className="text-[11px] text-base-content/70 hover:text-primary transition-colors flex items-center justify-between group/lesson"
                                >
                                  <span className="truncate">{lesson.title}</span>
                                  <span className="text-[9px] font-mono opacity-50 shrink-0 ml-2">
                                    {lesson.readTime}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Alt Butonlar */}
              <div className="px-6 pb-5 pt-2 border-t border-base-300/50 bg-base-200/20 flex items-center justify-between gap-3">
                <button
                  onClick={() => toggleCourseExpand(course.id)}
                  className="btn btn-ghost btn-xs font-mono text-xs"
                >
                  Detaylar
                </button>

                {firstLesson && (
                  <Link
                    href={`/tutorial/${firstLesson.id}`}
                    className="btn btn-primary btn-sm font-mono text-xs gap-1.5 shadow-xs"
                  >
                    <span>Kursa Başla</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-base-200/30 border border-base-300 space-y-3">
          <BookOpen className="w-8 h-8 text-base-content/30 mx-auto" />
          <h3 className="font-bold text-base text-base-content">Kurs Bulunamadı</h3>
          <p className="text-xs text-base-content/60 max-w-sm mx-auto">
            Arama kriterlerinize uygun ders veya konu eşleşmedi. Farklı bir arama terimi deneyebilirsiniz.
          </p>
          <button
            onClick={() => {
              setSelectedCat("all");
              setSearchQuery("");
            }}
            className="btn btn-outline btn-xs font-mono"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}
    </div>
  );
}
