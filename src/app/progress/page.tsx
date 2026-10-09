"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { COURSES, getLessonById } from "@/data/curriculum";
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  ArrowRight,
  Download,
  Upload,
  Trash2,
  Sparkles,
  Layers,
  Cpu,
  Code2,
  Flame,
  Check,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

export default function ProgressPage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lastLessonId, setLastLessonId] = useState<string | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  // Verileri localStorage'dan yükle
  const loadStoredData = () => {
    try {
      const storedCompleted = localStorage.getItem("completed_lessons");
      if (storedCompleted) {
        setCompletedLessons(JSON.parse(storedCompleted));
      } else {
        setCompletedLessons([]);
      }

      const storedLast = localStorage.getItem("last_opened_lesson");
      if (storedLast) {
        setLastLessonId(storedLast);
      }
    } catch {
      // Hata durumunda
    }
  };

  useEffect(() => {
    loadStoredData();
    window.addEventListener("learn_progress_updated", loadStoredData);
    return () => window.removeEventListener("learn_progress_updated", loadStoredData);
  }, []);

  // Toplam ders sayısı ve hesaplamalar
  const allLessons = COURSES.flatMap((c) => c.modules.flatMap((m) => m.lessons));
  const totalLessonsCount = allLessons.length;
  const completedCount = completedLessons.length;
  const overallPercentage =
    totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

  // Son açılan dersin verisi
  const lastLessonData = lastLessonId ? getLessonById(lastLessonId) : null;

  // Kurs bazlı ilerleme hesaplama
  const courseStats = COURSES.map((course) => {
    const courseLessons = course.modules.flatMap((m) => m.lessons);
    const courseCompleted = courseLessons.filter((l) => completedLessons.includes(l.id));
    const percentage =
      courseLessons.length > 0
        ? Math.round((courseCompleted.length / courseLessons.length) * 100)
        : 0;

    return {
      course,
      total: courseLessons.length,
      completed: courseCompleted.length,
      percentage,
      isFullyCompleted: percentage === 100 && courseLessons.length > 0,
      lessons: courseLessons,
    };
  });

  const fullyCompletedCoursesCount = courseStats.filter((c) => c.isFullyCompleted).length;
  const activeCoursesCount = courseStats.filter((c) => c.completed > 0).length;

  // JSON Dışa Aktarma (Export)
  const handleExport = () => {
    const exportData = {
      appName: "learn.tncy.dev",
      version: 1,
      exportedAt: new Date().toISOString(),
      completedLessons,
      lastOpenedLesson: lastLessonId,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `learn-tncy-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // JSON İçe Aktarma (Import)
  const handleImportSubmit = () => {
    setImportError(null);
    try {
      const parsed = JSON.parse(importJsonText);
      let newLessons: string[] = [];

      if (Array.isArray(parsed)) {
        newLessons = parsed;
      } else if (parsed && Array.isArray(parsed.completedLessons)) {
        newLessons = parsed.completedLessons;
      } else {
        throw new Error("Geçerli bir ders listesi dizisi bulunamadı.");
      }

      // Mevcut listeyle birleştir
      const merged = Array.from(new Set([...completedLessons, ...newLessons]));
      localStorage.setItem("completed_lessons", JSON.stringify(merged));
      if (parsed.lastOpenedLesson) {
        localStorage.setItem("last_opened_lesson", parsed.lastOpenedLesson);
      }

      window.dispatchEvent(new Event("learn_progress_updated"));
      setIsImportModalOpen(false);
      setImportJsonText("");
    } catch (err: unknown) {
      setImportError((err as Error).message || "JSON formatı hatalı.");
    }
  };

  // İlerlemeyi Sıfırlama
  const handleResetProgress = () => {
    localStorage.removeItem("completed_lessons");
    localStorage.removeItem("last_opened_lesson");
    setCompletedLessons([]);
    setLastLessonId(null);
    setIsResetConfirmOpen(false);
    window.dispatchEvent(new Event("learn_progress_updated"));
  };

  // Başarı Rozetleri
  const achievements = [
    {
      id: "first-step",
      title: "İlk Adım",
      desc: "Platformdaki ilk dersini başarıyla tamamla",
      unlocked: completedCount >= 1,
      icon: Flame,
    },
    {
      id: "ten-lessons",
      title: "İstikrarlı Öğrenci",
      desc: "10 farklı dersi başarıyla tamamla",
      unlocked: completedCount >= 10,
      icon: TrendingUp,
    },
    {
      id: "hw-builder",
      title: "Donanım Mimarı",
      desc: "SystemVerilog veya Verilog'dan en az bir ders bitir",
      unlocked: completedLessons.some((id) => id.startsWith("sv-") || id.startsWith("v-")),
      icon: Cpu,
    },
    {
      id: "embedded-eng",
      title: "Gömülü Mühendis",
      desc: "Gömülü C, Arduino veya MicroPython dersi tamamla",
      unlocked: completedLessons.some(
        (id) => id.startsWith("emb-") || id.startsWith("ard-") || id.startsWith("mpy-")
      ),
      icon: Layers,
    },
    {
      id: "web-dev",
      title: "Modern Web Geliştirici",
      desc: "HTML, CSS veya JavaScript dersi tamamla",
      unlocked: completedLessons.some(
        (id) => id.startsWith("html-") || id.startsWith("css-") || id.startsWith("js-")
      ),
      icon: Code2,
    },
    {
      id: "course-grad",
      title: "Kurs Mezunu",
      desc: "Herhangi bir kursun tüm derslerini %100 tamamla",
      unlocked: fullyCompletedCoursesCount >= 1,
      icon: Award,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* 1. ÜST BAŞLIK ALANI */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-base-300">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="badge badge-primary font-mono text-xs font-bold uppercase tracking-wider">
              Kişisel Öğrenme Paneli
            </span>
            <span className="badge badge-ghost font-mono text-xs text-base-content/60">
              Yerel & Ücretsiz (Hesapsız)
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
            Öğrenme İlerlemen
          </h1>
          <p className="text-sm text-base-content/70 mt-1 max-w-2xl leading-relaxed">
            Platformdaki tüm derslerdeki ilerlemeniz tarayıcınızda güvenle tutulur. İstediğiniz zaman yedeğini alabilir veya başka bir cihaza aktarabilirsiniz.
          </p>
        </div>

        {/* Veri Yönetimi Butonları */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExport}
            className="btn btn-outline btn-sm font-mono text-xs gap-1.5"
            title="İlerlemeyi JSON dosyası olarak indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Dışa Aktar</span>
          </button>

          <button
            onClick={() => setIsImportModalOpen(true)}
            className="btn btn-outline btn-sm font-mono text-xs gap-1.5"
            title="Başka bir cihazdan yedek dosyasını yükle"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>İçe Aktar</span>
          </button>

          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="btn btn-ghost btn-sm text-error font-mono text-xs gap-1.5 hover:bg-error/10"
            title="İlerlemeyi sıfırla"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sıfırla</span>
          </button>
        </div>
      </div>

      {/* 2. ANA ÖZET METRİKLERİ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metrik 1: Genel İlerleme */}
        <div className="card bg-base-100 border border-base-300 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-base-content/70 text-xs font-mono mb-2">
            <span>Genel Tamamlanma</span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-3xl font-black text-base-content">
              %{overallPercentage}
            </div>
            <div className="text-xs text-base-content/60 font-mono mt-1">
              {completedCount} / {totalLessonsCount} Ders Tamamlandı
            </div>
          </div>
          <progress
            className="progress progress-primary w-full mt-3 h-2"
            value={overallPercentage}
            max="100"
          />
        </div>

        {/* Metrik 2: Aktif Kurslar */}
        <div className="card bg-base-100 border border-base-300 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-base-content/70 text-xs font-mono mb-2">
            <span>Aktif Çalışılan Kurslar</span>
            <BookOpen className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <div className="text-3xl font-black text-base-content">
              {activeCoursesCount} <span className="text-base font-normal text-base-content/50">/ 11</span>
            </div>
            <div className="text-xs text-base-content/60 font-mono mt-1">
              Farklı uzmanlık alanında ilerleme
            </div>
          </div>
          <div className="text-[11px] font-mono text-secondary pt-2">
            {11 - activeCoursesCount} kurs henüz keşfedilmedi
          </div>
        </div>

        {/* Metrik 3: Tamamlanan Kurslar */}
        <div className="card bg-base-100 border border-base-300 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-base-content/70 text-xs font-mono mb-2">
            <span>Bitirilen Kurslar (%100)</span>
            <Award className="w-4 h-4 text-warning" />
          </div>
          <div>
            <div className="text-3xl font-black text-warning">
              {fullyCompletedCoursesCount}
            </div>
            <div className="text-xs text-base-content/60 font-mono mt-1">
              Tüm modülleri tamamlanan uzmanlıklar
            </div>
          </div>
          <div className="text-[11px] font-mono text-base-content/60 pt-2">
            {fullyCompletedCoursesCount > 0 ? "Tebrikler! Uzmanlık kazandınız." : "İlk kursunu bitirmeye odaklanın!"}
          </div>
        </div>

        {/* Metrik 4: Kazanılan Başarılar */}
        <div className="card bg-base-100 border border-base-300 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-base-content/70 text-xs font-mono mb-2">
            <span>Kazanılan Rozetler</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <div>
            <div className="text-3xl font-black text-accent">
              {achievements.filter((a) => a.unlocked).length} / {achievements.length}
            </div>
            <div className="text-xs text-base-content/60 font-mono mt-1">
              Öğrenme hedefleri tamamlandı
            </div>
          </div>
          <div className="text-[11px] font-mono text-accent pt-2">
            {achievements.filter((a) => !a.unlocked).length} rozet seni bekliyor
          </div>
        </div>
      </div>

      {/* 3. KALDIĞIN YERDEN DEVAM ET KARTI */}
      <div className="card bg-linear-to-r from-primary/10 via-base-200 to-base-100 border border-primary/20 p-6 rounded-3xl shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="badge badge-primary badge-sm font-mono font-bold uppercase tracking-wider">
                Kaldığın Yer
              </span>
              <span className="text-xs font-mono text-base-content/60">
                {lastLessonData ? "Son ziyaret edilen ders" : "Hızlı başlangıç"}
              </span>
            </div>

            {lastLessonData ? (
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-base-content">
                  {lastLessonData.lesson.title}
                </h3>
                <p className="text-xs sm:text-sm text-base-content/70 mt-1 flex flex-wrap items-center gap-2 font-mono">
                  <span className="text-primary font-bold">{lastLessonData.course.title}</span>
                  <span>•</span>
                  <span>Modül {lastLessonData.module.number}: {lastLessonData.module.title}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {lastLessonData.lesson.readTime}
                  </span>
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-base-content">
                  Henüz bir derse başlamadınız
                </h3>
                <p className="text-xs sm:text-sm text-base-content/70 mt-1">
                  11 farklı uzmanlık alanından birini seçerek öğrenmeye hemen başlayabilirsiniz.
                </p>
              </div>
            )}
          </div>

          <div className="shrink-0">
            {lastLessonData ? (
              <Link
                href={`/tutorial/${lastLessonData.lesson.id}`}
                className="btn btn-primary btn-md font-mono text-xs gap-2 shadow-md"
              >
                <span>Dersine Devam Et</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/courses"
                className="btn btn-primary btn-md font-mono text-xs gap-2 shadow-md"
              >
                <span>Kursları İncele & Başla</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 4. BAŞARI ROZETLERİ (ACHIEVEMENTS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-base-content flex items-center gap-2">
            <Award className="w-5 h-5 text-warning" />
            <span>Başarı Rozetleri</span>
          </h2>
          <span className="text-xs font-mono text-base-content/60">
            {achievements.filter((a) => a.unlocked).length} / {achievements.length} Açıldı
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                  ach.unlocked
                    ? "bg-base-100 border-primary/30 shadow-xs ring-1 ring-primary/10"
                    : "bg-base-200/40 border-base-content/10 opacity-50 grayscale"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                    ach.unlocked
                      ? "bg-primary/15 text-primary"
                      : "bg-base-300 text-base-content/40"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-base-content leading-tight">
                    {ach.title}
                  </h4>
                  <p className="text-[10px] text-base-content/60 line-clamp-2">
                    {ach.desc}
                  </p>
                </div>
                <div className="mt-2">
                  {ach.unlocked ? (
                    <span className="badge badge-success badge-xs font-mono text-[9px]">
                      Kazanıldı ✓
                    </span>
                  ) : (
                    <span className="badge badge-neutral badge-xs font-mono text-[9px]">
                      Kilitli
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. KURS BAZLI İLERLEME LİSTESİ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-base-content flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span>Kurs Bazlı İlerleme Durumu</span>
          </h2>
          <span className="text-xs font-mono text-base-content/60">
            11 Uzmanlık Alanı
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courseStats.map((item) => {
            const isExpanded = expandedCourseId === item.course.id;

            return (
              <div
                key={item.course.id}
                className={`card bg-base-100 border transition-all ${
                  item.percentage > 0
                    ? "border-base-300 hover:border-primary/40 shadow-xs"
                    : "border-base-content/10 bg-base-100/60"
                }`}
              >
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`badge ${item.course.color} badge-xs font-mono font-bold`}>
                          {item.course.shortTitle}
                        </span>
                        <span className="text-[10px] font-mono text-base-content/50">
                          {item.course.category}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base text-base-content">
                        {item.course.title}
                      </h3>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-lg font-black font-mono text-base-content block">
                        %{item.percentage}
                      </span>
                      <span className="text-[10px] font-mono text-base-content/60">
                        {item.completed} / {item.total} Ders
                      </span>
                    </div>
                  </div>

                  {/* İlerleme Çubuğu */}
                  <progress
                    className={`progress w-full h-2 ${
                      item.percentage === 100
                        ? "progress-success"
                        : item.percentage > 0
                        ? "progress-primary"
                        : "progress-neutral opacity-30"
                    }`}
                    value={item.percentage}
                    max="100"
                  />

                  {/* Dersleri Listele Butonu & Kursa Git */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() =>
                        setExpandedCourseId(isExpanded ? null : item.course.id)
                      }
                      className="btn btn-ghost btn-xs font-mono text-[11px] text-base-content/70 hover:text-base-content"
                    >
                      {isExpanded ? "Dersleri Gizle ▲" : `Dersleri Listele (${item.total}) ▼`}
                    </button>

                    <Link
                      href={`/tutorial/${item.lessons[0].id}`}
                      className="btn btn-outline btn-xs font-mono text-[11px] gap-1"
                    >
                      <span>{item.percentage > 0 ? "Devam Et" : "Başla"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Genişletilmiş Dersler Listesi */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-base-content/10 space-y-1.5 animate-in fade-in duration-150">
                      {item.lessons.map((lesson) => {
                        const isDone = completedLessons.includes(lesson.id);
                        return (
                          <Link
                            key={lesson.id}
                            href={`/tutorial/${lesson.id}`}
                            className={`flex items-center justify-between p-2 rounded-xl text-xs font-mono transition-colors ${
                              isDone
                                ? "bg-success/10 text-success-content hover:bg-success/15"
                                : "hover:bg-base-200 text-base-content/75"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-base-content/30 shrink-0" />
                              )}
                              <span className={`truncate ${isDone ? "font-semibold" : ""}`}>
                                {lesson.shortTitle}
                              </span>
                            </div>
                            <span className="text-[10px] opacity-60 shrink-0 ml-2">
                              {lesson.readTime}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. MODAL: JSON İÇE AKTAR (IMPORT) */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="bg-base-100 rounded-3xl border border-base-300 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-base-300 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                <h3 className="font-extrabold text-lg text-base-content">
                  İlerlemeyi İçe Aktar
                </h3>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="btn btn-ghost btn-sm btn-square"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-base-content/70 leading-relaxed">
              Daha önce dışa aktardığınız <code>.json</code> yedek dosyasının içeriğini aşağıdaki alana yapıştırarak ders ilerlemenizi geri yükleyebilirsiniz.
            </p>

            <textarea
              rows={6}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='{"completedLessons": ["sv-intro", "html-basics"], ...}'
              className="textarea textarea-bordered w-full font-mono text-xs focus:border-primary"
            />

            {importError && (
              <div className="p-3 rounded-xl bg-error/10 border border-error/30 text-error text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-base-300">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="btn btn-ghost btn-sm font-mono text-xs"
              >
                Vazgeç
              </button>
              <button
                onClick={handleImportSubmit}
                disabled={!importJsonText.trim()}
                className="btn btn-primary btn-sm font-mono text-xs gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>İçe Aktar & Birleştir</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: SIFIRLAMA ONAYI */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="bg-base-100 rounded-3xl border border-error/30 shadow-2xl max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-error">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h3 className="font-extrabold text-base">
                İlerlemeyi Sıfırlamak İstiyor Musunuz?
              </h3>
            </div>

            <p className="text-xs text-base-content/70 leading-relaxed">
              Tamamlanan tüm ders kayıtlarınız bu tarayıcıdan kalıcı olarak silinecektir. Bu işlem geri alınamaz (dışa aktarılmış yedeğiniz yoksa).
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="btn btn-ghost btn-sm font-mono text-xs"
              >
                Vazgeç
              </button>
              <button
                onClick={handleResetProgress}
                className="btn btn-error btn-sm font-mono text-xs gap-1.5 text-white"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Evet, Sıfırla</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
