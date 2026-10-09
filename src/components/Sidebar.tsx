"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { COURSES, getLessonById } from "@/data/curriculum";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Terminal,
  BookOpen,
  Check,
  CheckCircle2,
  Cpu,
  Code2,
  Zap,
  Palette,
  FileCode2,
  Activity,
  Layers,
  ArrowRight,
} from "lucide-react";

interface SidebarProps {
  currentCourseId?: string;
  onSelectLesson?: () => void;
}

export default function Sidebar({ currentCourseId, onSelectLesson }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Aktif dersi URL'den tespit et
  const activeLessonId = pathname?.startsWith("/tutorial/")
    ? pathname.replace("/tutorial/", "").split("/")[0]
    : "";

  // Dersi arayarak kursu otomatik bul
  const lessonLookup = activeLessonId ? getLessonById(activeLessonId) : null;
  const initialCourseId = currentCourseId || lessonLookup?.course.id || "systemverilog";

  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId);
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Tamamlanan dersleri localStorage'dan yükle
  useEffect(() => {
    const loadProgress = () => {
      try {
        const stored = localStorage.getItem("completed_lessons");
        if (stored) setCompletedLessons(JSON.parse(stored));
      } catch {}
    };
    loadProgress();
    window.addEventListener("learn_progress_updated", loadProgress);
    return () => window.removeEventListener("learn_progress_updated", loadProgress);
  }, []);

  // URL değiştikçe ilgili kursu otomatik seç
  useEffect(() => {
    if (lessonLookup?.course.id) {
      setSelectedCourseId(lessonLookup.course.id);
      // İlgili modülü de otomatik aç
      setOpenModules((prev) => ({
        ...prev,
        [lessonLookup.module.id]: true,
      }));
    }
  }, [lessonLookup?.course.id, lessonLookup?.module.id]);

  // Seçili Kurs Nesnesi
  const activeCourse =
    COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Kursu Değiştirip İlk Dersine Git
  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsCourseDropdownOpen(false);
    const targetCourse = COURSES.find((c) => c.id === courseId);
    if (targetCourse && targetCourse.modules[0]?.lessons[0]) {
      const firstLesson = targetCourse.modules[0].lessons[0];
      router.push(`/tutorial/${firstLesson.id}`);
      if (onSelectLesson) onSelectLesson();
    }
  };

  // Yalnızca seçili kursun modüllerini filtrele
  const filteredModules = activeCourse.modules
    .map((mod) => {
      const matchingLessons = mod.lessons.filter(
        (l) =>
          l.title.toLowerCase().includes(filterText.toLowerCase()) ||
          l.shortTitle.toLowerCase().includes(filterText.toLowerCase()) ||
          l.description.toLowerCase().includes(filterText.toLowerCase())
      );
      return {
        ...mod,
        lessons: matchingLessons,
      };
    })
    .filter((mod) => filterText === "" || mod.lessons.length > 0);

  const totalCourseLessons = activeCourse.modules.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  );
  const courseLessons = activeCourse.modules.flatMap((m) => m.lessons);
  const completedInCourse = courseLessons.filter((l) => completedLessons.includes(l.id)).length;
  const progressPercent = totalCourseLessons > 0 ? Math.round((completedInCourse / totalCourseLessons) * 100) : 0;

  // Kurs İkon Yardımcısı
  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-4 h-4 text-primary shrink-0" />;
      case "FileCode2":
        return <FileCode2 className="w-4 h-4 text-error shrink-0" />;
      case "Palette":
        return <Palette className="w-4 h-4 text-info shrink-0" />;
      case "Code2":
        return <Code2 className="w-4 h-4 text-warning shrink-0" />;
      case "Terminal":
        return <Terminal className="w-4 h-4 text-success shrink-0" />;
      case "Layers":
        return <Layers className="w-4 h-4 text-accent shrink-0" />;
      case "Zap":
        return <Zap className="w-4 h-4 text-warning shrink-0" />;
      case "Activity":
        return <Activity className="w-4 h-4 text-secondary shrink-0" />;
      default:
        return <BookOpen className="w-4 h-4 text-primary shrink-0" />;
    }
  };

  return (
    <aside className="w-full h-full flex flex-col bg-base-100 border-r border-base-300 select-none">
      {/* 1. KURS SEÇİCİ & BAŞLIK ALANI */}
      <div className="p-3 border-b border-base-300 space-y-2.5 bg-base-200/40">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-[10px] text-primary font-mono">
              {activeCourse.category}
            </span>
            <span className="badge badge-sm badge-neutral font-mono text-[10px]">
              {completedInCourse}/{totalCourseLessons} (%{progressPercent})
            </span>
          </div>

          {/* İlerleme Çubuğu */}
          <div className="w-full bg-base-300 rounded-full h-1 overflow-hidden">
            <div
              className="bg-success h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Kurs Seçim Açılır Menüsü */}
        <div className="relative">
          <button
            onClick={() => setIsCourseDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-2 p-2 rounded-xl bg-base-100 border border-base-300 hover:border-primary/40 shadow-xs transition-all text-left group"
          >
            <div className="flex items-center gap-2 truncate">
              <div className="p-1 rounded-lg bg-base-200 group-hover:bg-primary/10 transition-colors">
                {getCourseIcon(activeCourse.icon)}
              </div>
              <div className="truncate">
                <div className="font-bold text-xs text-base-content truncate">
                  {activeCourse.title}
                </div>
                <div className="text-[10px] text-base-content/60 truncate font-mono">
                  {activeCourse.modules.length} Modül • {activeCourse.badge}
                </div>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-base-content/40 transition-transform shrink-0 ${
                isCourseDropdownOpen ? "rotate-180 text-primary" : ""
              }`}
            />
          </button>

          {/* Kurs Değiştirme Menüsü (Dropdown) */}
          {isCourseDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-base-100 border border-base-300 rounded-2xl shadow-2xl p-2 max-h-96 overflow-y-auto space-y-2 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2 py-1 text-[10px] font-mono uppercase text-base-content/50 font-bold flex items-center justify-between">
                <span>Eğitim Kursları</span>
                <Link
                  href="/courses"
                  className="text-primary hover:underline lowercase tracking-normal"
                >
                  tümü →
                </Link>
              </div>

              {/* Kurs Kategorileri */}
              {["Donanım & FPGA", "Web Geliştirme", "Gömülü Sistemler", "Programlama Dilleri"].map(
                (cat) => {
                  const catCourses = COURSES.filter((c) => c.category === cat);
                  if (catCourses.length === 0) return null;

                  return (
                    <div key={cat} className="space-y-1">
                      <div className="px-2 pt-1 text-[9px] font-mono uppercase text-base-content/40 font-bold">
                        {cat}
                      </div>
                      {catCourses.map((c) => {
                        const isSelected = c.id === selectedCourseId;
                        return (
                          <button
                            key={c.id}
                            onClick={() => handleSelectCourse(c.id)}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all text-left ${
                              isSelected
                                ? "bg-primary text-primary-content font-bold shadow-xs"
                                : "hover:bg-base-200 text-base-content/80"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {getCourseIcon(c.icon)}
                              <span className="truncate">{c.shortTitle}</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <span
                                className={`text-[10px] font-mono ${
                                  isSelected
                                    ? "text-primary-content/80"
                                    : "text-base-content/40"
                                }`}
                              >
                                {c.modules.reduce((a, m) => a + m.lessons.length, 0)} ders
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                }
              )}

              <div className="pt-2 border-t border-base-content/5">
                <Link
                  href="/courses"
                  onClick={() => setIsCourseDropdownOpen(false)}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-primary font-semibold hover:underline font-mono"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Kurs Kataloğunu Aç</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Seçili Kurs İçi Arama Çubuğu */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder={`${activeCourse.shortTitle} derslerinde ara...`}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="input input-xs input-bordered w-full pl-8 pr-2 focus:outline-none focus:border-primary text-xs bg-base-100"
          />
        </div>
      </div>

      {/* 2. DERS LİSTESİ (YALNIZCA SEÇİLİ KURSA AİT MODÜLLER) */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredModules.map((mod) => {
          // Açık/kapalı kontrolü
          const isOpen =
            filterText !== "" ||
            openModules[mod.id] !== false ||
            mod.lessons.some((l) => l.id === activeLessonId);

          const isModuleActive = mod.lessons.some((l) => l.id === activeLessonId);

          return (
            <div key={mod.id} className="rounded-lg overflow-hidden">
              {/* Modül Başlığı / Akordeon Düğmesi */}
              <button
                onClick={() => toggleModule(mod.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors text-left ${
                  isModuleActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "hover:bg-base-200 text-base-content/90"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-[11px] text-base-content/50 w-4">
                    {mod.number}.
                  </span>
                  <span className="truncate">{mod.title}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px] text-base-content/40 font-mono">
                    ({mod.lessons.length})
                  </span>
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-base-content/40" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-base-content/40" />
                  )}
                </div>
              </button>

              {/* Modülün Dersleri */}
              {isOpen && (
                <ul className="pl-4 pr-1 py-1 space-y-0.5 border-l-2 border-base-300 ml-3.5 my-0.5">
                  {mod.lessons.map((lesson) => {
                    const isActive = activeLessonId === lesson.id;

                    return (
                      <li key={lesson.id}>
                        <Link
                          href={`/tutorial/${lesson.id}`}
                          onClick={onSelectLesson}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-md text-xs transition-colors group ${
                            isActive
                              ? "bg-primary text-primary-content font-bold shadow-xs"
                              : "hover:bg-base-200 text-base-content/80 hover:text-base-content"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            {completedLessons.includes(lesson.id) && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                            )}
                            <span className="truncate">{lesson.shortTitle}</span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {lesson.hasPlayground && (
                              <span
                                title="İnteraktif Deneme Alanı"
                                className={`p-0.5 rounded ${
                                  isActive
                                    ? "text-primary-content/90"
                                    : "text-secondary opacity-70 group-hover:opacity-100"
                                }`}
                              >
                                <Terminal className="w-3 h-3" />
                              </span>
                            )}
                            <span
                              className={`text-[9px] uppercase px-1 py-0.2 rounded font-mono ${
                                isActive
                                  ? "bg-primary-content/20 text-primary-content"
                                  : "bg-base-300 text-base-content/60"
                              }`}
                            >
                              {lesson.readTime}
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {filteredModules.length === 0 && (
          <div className="p-4 text-center text-xs text-base-content/50 space-y-2">
            <div>Bu kursta aranan ders bulunamadı.</div>
            {filterText && (
              <button
                onClick={() => setFilterText("")}
                className="btn btn-ghost btn-xs text-primary"
              >
                Aramayı Temizle
              </button>
            )}
          </div>
        )}
      </div>

      {/* 3. ALT BİLGİ & KURS KATALOĞUNA DÖNÜŞ */}
      <div className="p-2.5 border-t border-base-300 bg-base-200/50 flex items-center justify-between text-[11px]">
        <Link
          href="/courses"
          className="flex items-center gap-1 text-base-content/70 hover:text-primary transition-colors font-medium"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Tüm Kurslar</span>
        </Link>
        <span className="text-[10px] font-mono text-base-content/50">
          {activeCourse.badge}
        </span>
      </div>
    </aside>
  );
}
