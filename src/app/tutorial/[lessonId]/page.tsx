import { notFound } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import CodePlayground from "@/components/CodePlayground";
import QuizExercise from "@/components/QuizExercise";
import { getLessonById, getAdjacentLessons, CURRICULUM } from "@/data/curriculum";
import { LESSONS_DATA } from "@/data/lessonsData";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  BarChart,
  Info,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Terminal,
} from "lucide-react";

export function generateStaticParams() {
  const allLessons = CURRICULUM.flatMap((m) => m.lessons);
  return allLessons.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lookup = getLessonById(lessonId);

  if (!lookup) {
    notFound();
  }

  const { lesson, module } = lookup;
  const content = LESSONS_DATA[lessonId];
  const { prev, next } = getAdjacentLessons(lessonId);

  return (
    <div className="flex-1 flex max-w-7xl w-full mx-auto">
      {/* Sol Sütun: Masaüstü Sabit Kenar Menüsü */}
      <div className="hidden lg:block w-72 shrink-0 border-r border-base-300 min-h-[calc(100vh-4rem)] sticky top-16 h-[calc(100vh-4rem)]">
        <Sidebar />
      </div>

      {/* Orta Sütun: Ana Ders İçeriği */}
      <div className="flex-1 min-w-0 px-4 sm:px-8 py-8 max-w-4xl">
        {/* Ekmek Kırıntısı (Breadcrumbs) */}
        <div className="text-xs breadcrumbs text-base-content/60 mb-4">
          <ul>
            <li>
              <Link href="/">Ana Sayfa</Link>
            </li>
            <li>
              <span>Modül {module.number}: {module.title}</span>
            </li>
            <li className="text-primary font-medium">{lesson.shortTitle}</li>
          </ul>
        </div>

        {/* Ders Başlık Alanı */}
        <div className="border-b border-base-300 pb-6 mb-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-primary badge-outline text-xs font-mono font-semibold">
              Modül {module.number}
            </span>
            <span className="badge badge-ghost text-xs flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" /> {lesson.readTime}
            </span>
            <span className="badge badge-ghost text-xs flex items-center gap-1 font-mono">
              <BarChart className="w-3 h-3" /> {lesson.difficulty}
            </span>
            <span
              className={`badge text-xs font-mono ${
                lesson.category === "Design"
                  ? "badge-info"
                  : lesson.category === "Verification"
                  ? "badge-success"
                  : "badge-neutral"
              }`}
            >
              {lesson.category === "Design"
                ? "Sentezlenebilir RTL"
                : lesson.category === "Verification"
                ? "Doğrulama (Testbench)"
                : "Çekirdek Sistem"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
            {lesson.title}
          </h1>

          <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
            {content?.subtitle || lesson.description}
          </p>
        </div>

        {/* Ders İçerik Bölümleri */}
        {content ? (
          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-base-content/90">
            {content.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-base-content tracking-tight">
                  {sec.title}
                </h2>

                <div className="prose prose-sm max-w-none space-y-3 text-base-content/80 whitespace-pre-line leading-relaxed">
                  {sec.content}
                </div>

                {/* İpucu / Dikkat Kutuları (Callouts) */}
                {sec.callout && (
                  <div
                    className={`alert shadow-xs my-4 border ${
                      sec.callout.type === "info"
                        ? "alert-info bg-info/10 border-info/30 text-info-content"
                        : sec.callout.type === "warning"
                        ? "alert-warning bg-warning/10 border-warning/30 text-warning-content"
                        : sec.callout.type === "success"
                        ? "alert-success bg-success/10 border-success/30 text-success-content"
                        : "alert-neutral bg-base-200 border-base-content/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {sec.callout.type === "info" ? (
                        <Info className="w-5 h-5 text-info shrink-0 mt-0.5" />
                      ) : sec.callout.type === "warning" ? (
                        <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                      ) : sec.callout.type === "success" ? (
                        <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      ) : (
                        <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-1">
                          {sec.callout.title}
                        </h4>
                        <p className="text-xs leading-relaxed">{sec.callout.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Kod Bloğu */}
                {sec.code && (
                  <div className="my-4 rounded-xl overflow-hidden border border-base-300 bg-[#1e1e2e] text-[#cdd6f4]">
                    {sec.code.caption && (
                      <div className="px-4 py-2 bg-base-300/40 border-b border-white/10 text-xs font-mono text-base-content/70 flex items-center justify-between">
                        <span>{sec.code.caption}</span>
                        <span className="uppercase text-[10px] tracking-wider text-primary">
                          {sec.code.language}
                        </span>
                      </div>
                    )}
                    <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed">
                      <code>{sec.code.snippet}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}

            {/* Canlı "Kendin Dene" (Playground) */}
            {content.playground && (
              <div className="my-10">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-base-content">
                    İnteraktif Kod Düzenleyici & Simülatör
                  </h3>
                </div>
                <CodePlayground {...content.playground} />
              </div>
            )}

            {/* Bölüm Sonu Testi (Quiz) */}
            {content.quiz && <QuizExercise quiz={content.quiz} />}
          </div>
        ) : (
          /* Henüz detaylı içerik girilmemiş dersler için zengin şablon */
          <div className="space-y-6">
            <div className="alert alert-info bg-info/10 border-info/30">
              <Info className="w-5 h-5 text-info" />
              <div>
                <h4 className="font-bold text-xs">Müfredat Hazırlık Aşamasında</h4>
                <p className="text-xs">
                  Bu dersin interaktif içerikleri ve simülasyon kodları ChipVerify
                  müfredatına uygun olarak oluşturulmaktadır. Aşağıda temel kod taslağını
                  ve deneme alanını inceleyebilirsiniz.
                </p>
              </div>
            </div>

            <CodePlayground
              title={`${lesson.title} - Canlı Deneme Alanı`}
              initialCode={`// ${lesson.title}
// learn.tncy.dev SystemVerilog Örnek Şablonu

module example_module;
  initial begin
    $display("[START] ${lesson.title} dersi simülasyonu çalıştı!");
    #10;
    $display("[INFO] Modül kategorisi: ${lesson.category}");
    $display("[FINISH] Test tamamlandı.");
  end
endmodule`}
              expectedOutput={[
                `[START] ${lesson.title} dersi simülasyonu çalıştı!`,
                `[@10ns] Modül kategorisi: ${lesson.category}`,
                "[FINISH] Test tamamlandı.",
                "[SUCCESS] Simülasyon hatasız bitti.",
              ]}
            />
          </div>
        )}

        {/* Alt Gezinme Butonları (Önceki & Sonraki Ders) */}
        <div className="mt-12 pt-6 border-t border-base-300 flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={`/tutorial/${prev.id}`}
              className="btn btn-outline btn-sm sm:btn-md gap-2 normal-case font-normal text-left"
            >
              <ChevronLeft className="w-4 h-4" />
              <div className="hidden sm:block">
                <div className="text-[10px] text-base-content/50 uppercase">Önceki Ders</div>
                <div className="text-xs font-bold truncate max-w-44">{prev.shortTitle}</div>
              </div>
              <span className="sm:hidden text-xs">Önceki</span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/tutorial/${next.id}`}
              className="btn btn-primary btn-sm sm:btn-md gap-2 normal-case font-normal text-right shadow-sm"
            >
              <div className="hidden sm:block">
                <div className="text-[10px] text-primary-content/70 uppercase">Sonraki Ders</div>
                <div className="text-xs font-bold truncate max-w-44">{next.shortTitle}</div>
              </div>
              <span className="sm:hidden text-xs">Sonraki</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
