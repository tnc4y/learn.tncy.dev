import { notFound } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import CodePlayground from "@/components/CodePlayground";
import QuizExercise from "@/components/QuizExercise";
import { getLessonById, getAdjacentLessons, CURRICULUM } from "@/data/curriculum";
import { LESSONS_DATA } from "@/data/lessonsData";
import LessonCompleteButton from "@/components/LessonCompleteButton";
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
  BookOpen,
  Sparkles,
} from "lucide-react";

export function generateStaticParams() {
  const allLessons = CURRICULUM.flatMap((m) => m.lessons);
  return allLessons.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

// Kursa ve derse özel akıllı varsayılan kod şablonu
function getDynamicFallbackTemplate(courseId: string, lessonTitle: string) {
  switch (courseId) {
    case "html":
      return {
        code: `<!-- ${lessonTitle} -->
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>${lessonTitle}</title>
  <style>
    body { font-family: sans-serif; padding: 20px; line-height: 1.6; }
    .card { background: #f0f4f8; padding: 15px; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>${lessonTitle}</h1>
  <div class="card">
    <p>learn.tncy.dev HTML5 interaktif çalışma alanına hoş geldiniz.</p>
    <button onclick="alert('HTML çalışıyor!')">Bana Tıkla</button>
  </div>
</body>
</html>`,
        output: [
          "[HTML:RENDER] Sayfa DOM ağacı başarıyla oluşturuldu.",
          `[TITLE] ${lessonTitle}`,
          "[READY] Etiketler ve stil kuralları aktif.",
        ],
      };

    case "css":
      return {
        code: `/* ${lessonTitle} */
:root {
  --primary-color: #0284c7;
  --bg-card: #f8fafc;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: var(--bg-card);
  border: 2px solid var(--primary-color);
  transition: transform 0.2s ease;
}

.box:hover {
  transform: translateY(-4px);
}`,
        output: [
          "[CSS:PARSER] 2 Seçici ve 8 kural derlendi.",
          "[LAYOUT] Flexbox ve CSS Değişkenleri uygulandı.",
          "[SUCCESS] Sözdizimi hatası yok.",
        ],
      };

    case "javascript":
      return {
        code: `// ${lessonTitle}
console.log("[START] JavaScript kodu yürütülüyor...");

const veriler = [10, 20, 30, 40, 50];
const kareler = veriler.map((n) => n * n);

console.log("Kaynak Dizi:", veriler);
console.log("Kareleri:", kareler);

function selamla(isim) {
  return \`Merhaba \${isim}, learn.tncy.dev JS ortamı hazır!\`;
}

console.log(selamla("Geliştirici"));
console.log("[FINISH] Yürütme başarıyla tamamlandı.");`,
        output: [
          "[START] JavaScript kodu yürütülüyor...",
          "Kaynak Dizi: [10, 20, 30, 40, 50]",
          "Kareleri: [100, 400, 900, 1600, 2500]",
          "Merhaba Geliştirici, learn.tncy.dev JS ortamı hazır!",
          "[FINISH] Yürütme başarıyla tamamlandı.",
        ],
      };

    case "embedded-c":
      return {
        code: `// ${lessonTitle} - Gömülü C (Bare-Metal)
#include <stdint.h>
#include <stdio.h>

#define GPIOA_BASE     (0x40020000UL)
#define GPIOA_MODER    (*(volatile uint32_t *)(GPIOA_BASE + 0x00))
#define GPIOA_ODR      (*(volatile uint32_t *)(GPIOA_BASE + 0x14))

void gpio_init(void) {
  // Pin 5'i çıkış (output: 01) olarak ayarla:
  GPIOA_MODER |= (1 << 10);
}

int main(void) {
  printf("[BOOT] Mikrodenetleyici başlatılıyor...\\n");
  gpio_init();
  printf("[INFO] GPIOA Pin 5 çıkış olarak yapılandırıldı.\\n");
  return 0;
}`,
        output: [
          "[BOOT] Mikrodenetleyici başlatılıyor...",
          "[INFO] GPIOA Pin 5 çıkış olarak yapılandırıldı.",
          "[READY] Register MMIO adresleri başarıyla güncellendi.",
        ],
      };

    case "micropython":
      return {
        code: `# ${lessonTitle} - MicroPython (ESP32 / Pico)
import time
from machine import Pin

led = Pin(2, Pin.OUT)
print("[BOOT] MicroPython REPL hazır.")

for i in range(3):
    led.value(1)
    print(f"[@{i}s] LED AÇIK (HIGH)")
    time.sleep(0.5)
    led.value(0)
    print(f"[@{i}s] LED KAPALI (LOW)")
    time.sleep(0.5)

print("[FINISH] Test döngüsü tamamlandı.")`,
        output: [
          "[BOOT] MicroPython REPL hazır.",
          "[@0s] LED AÇIK (HIGH)",
          "[@0s] LED KAPALI (LOW)",
          "[@1s] LED AÇIK (HIGH)",
          "[@1s] LED KAPALI (LOW)",
          "[FINISH] Test döngüsü tamamlandı.",
        ],
      };

    case "arduino":
      return {
        code: `// ${lessonTitle} - Arduino C++
const int LED_PIN = 13;
const int SENSOR_PIN = A0;

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  Serial.println("[BOOT] Arduino kartı uyandı.");
}

void loop() {
  int sensorValue = analogRead(SENSOR_PIN);
  Serial.print("Sensör Değeri: ");
  Serial.println(sensorValue);
  
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}`,
        output: [
          "[BOOT] Arduino kartı uyandı.",
          "Sensör Değeri: 512",
          "[STATUS] LED Pin 13 HIGH/LOW döngüsü aktif.",
        ],
      };

    case "python":
      return {
        code: `# ${lessonTitle} - Python 3
def ana_program():
    print("[START] Python 3 betiği çalışıyor...")
    
    cihazlar = {
        "ESP32": {"ram_kb": 520, "wifi": True},
        "STM32": {"ram_kb": 128, "wifi": False},
        "Pico W": {"ram_kb": 264, "wifi": True}
    }
    
    for ad, ozellik in cihazlar.items():
        durum = "Kablosuz Var" if ozellik["wifi"] else "Yalnızca Kablolu"
        print(f"• {ad}: {ozellik['ram_kb']}KB RAM | {durum}")
        
    print("[FINISH] Program hatasız bitti.")

if __name__ == "__main__":
    ana_program()`,
        output: [
          "[START] Python 3 betiği çalışıyor...",
          "• ESP32: 520KB RAM | Kablosuz Var",
          "• STM32: 128KB RAM | Yalnızca Kablolu",
          "• Pico W: 264KB RAM | Kablosuz Var",
          "[FINISH] Program hatasız bitti.",
        ],
      };

    case "cpp":
      return {
        code: `// ${lessonTitle} - Modern C++ (C++20)
#include <iostream>
#include <memory>
#include <vector>

class Aygit {
public:
  Aygit(const std::string& ad) : ad_(ad) {
    std::cout << "[INIT] " << ad_ << " oluşturuldu.\\n";
  }
  ~Aygit() {
    std::cout << "[DESTROY] " << ad_ << " bellekten silindi.\\n";
  }
  void calistir() const {
    std::cout << "[RUN] " << ad_ << " yüksek başarımda çalışıyor.\\n";
  }
private:
  std::string ad_;
};

int main() {
  auto dev = std::make_unique<Aygit>("Donanım Modülü");
  dev->calistir();
  return 0;
}`,
        output: [
          "[INIT] Donanım Modülü oluşturuldu.",
          "[RUN] Donanım Modülü yüksek başarımda çalışıyor.",
          "[DESTROY] Donanım Modülü bellekten silindi.",
          "[SUCCESS] 0 Bellek sızıntısı (RAII ile güvenli).",
        ],
      };

    case "rust":
      return {
        code: `// ${lessonTitle} - Rust
fn main() {
    println!("[START] Rust Ownership ve Bellek Güvenliği");
    
    let mesaj = String::from("learn.tncy.dev");
    let uzunluk = uzunluk_hesapla(&mesaj);
    
    println!("Metin: '{}', Uzunluk: {} karakter", mesaj, uzunluk);
    println!("[SUCCESS] %100 Derleme anı bellek garantisi.");
}

fn uzunluk_hesapla(s: &String) -> usize {
    s.len()
}`,
        output: [
          "[START] Rust Ownership ve Bellek Güvenliği",
          "Metin: 'learn.tncy.dev', Uzunluk: 14 karakter",
          "[SUCCESS] %100 Derleme anı bellek garantisi.",
        ],
      };

    default:
      return {
        code: `// ${lessonTitle}
// learn.tncy.dev Donanım & Sistem Şablonu

module example_module;
  initial begin
    $display("[START] ${lessonTitle} simülasyonu çalıştı!");
    #10;
    $display("[INFO] Donanım sinyalleri doğrulandı.");
    $display("[FINISH] Test tamamlandı.");
  end
endmodule`,
        output: [
          `[START] ${lessonTitle} simülasyonu çalıştı!`,
          "[@10ns] Donanım sinyalleri doğrulandı.",
          "[FINISH] Test tamamlandı.",
          "[SUCCESS] Simülasyon hatasız bitti.",
        ],
      };
  }
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

  const { lesson, module, course } = lookup;
  const content = LESSONS_DATA[lessonId];
  const { prev, next } = getAdjacentLessons(lessonId);

  const fallback = getDynamicFallbackTemplate(course.id, lesson.title);

  return (
    <div className="flex-1 flex max-w-7xl w-full mx-auto">
      {/* Sol Sütun: Masaüstü Sabit Kenar Menüsü (Kurs-Özel Filtrelenmiş) */}
      <div className="hidden lg:block w-76 shrink-0 border-r border-base-300 min-h-[calc(100vh-4rem)] sticky top-16 h-[calc(100vh-4rem)]">
        <Sidebar currentCourseId={course.id} />
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
              <Link href="/courses" className="hover:text-primary">
                Kurslar
              </Link>
            </li>
            <li>
              <span className="font-semibold text-primary/90">{course.shortTitle}</span>
            </li>
            <li>
              <span>Modül {module.number}: {module.title}</span>
            </li>
            <li className="text-primary font-bold">{lesson.shortTitle}</li>
          </ul>
        </div>

        {/* Ders Başlık Alanı */}
        <div className="border-b border-base-300 pb-6 mb-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`badge ${course.color} text-xs font-mono font-bold`}>
              {course.shortTitle}
            </span>
            <span className="badge badge-neutral badge-outline text-xs font-mono font-semibold">
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
                  : lesson.category === "Web"
                  ? "badge-error"
                  : lesson.category === "Embedded"
                  ? "badge-primary"
                  : "badge-neutral"
              }`}
            >
              {lesson.category === "Design"
                ? "Sentezlenebilir RTL"
                : lesson.category === "Verification"
                ? "Doğrulama (Testbench)"
                : lesson.category === "Web"
                ? "Web Teknolojisi"
                : lesson.category === "Embedded"
                ? "Gömülü Sistem"
                : "Genel Programlama"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-base-content">
              {lesson.title}
            </h1>
            <div className="shrink-0">
              <LessonCompleteButton lessonId={lesson.id} />
            </div>
          </div>

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
          /* Henüz detaylı metni yazılmamış dersler için dinamik kurs laboratuvarı */
          <div className="space-y-6">
            <div className="alert alert-info bg-info/10 border-info/30">
              <Info className="w-5 h-5 text-info shrink-0" />
              <div className="space-y-1">
                <h4 className="font-bold text-xs">
                  {course.shortTitle} • Müfredat Hazırlık Aşamasında
                </h4>
                <p className="text-xs leading-relaxed">
                  Bu dersin detaylı teorik anlatımları ve kapsamlı testleri hazırlanmaktadır.
                  Aşağıdaki canlı kod alanında ders konusuna ait örnek şablonu inceleyebilir ve
                  kodları doğrudan düzenleyip çalıştırabilirsiniz.
                </p>
              </div>
            </div>

            <CodePlayground
              title={`${lesson.title} - Canlı Deneme Alanı`}
              initialCode={fallback.code}
              expectedOutput={fallback.output}
            />
          </div>
        )}

        {/* Alt Gezinme Butonları (Önceki & Sonraki Ders - Kurs İçi Kapsamlı) */}
        <div className="mt-12 pt-6 border-t border-base-300 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {prev ? (
                <Link
                  href={`/tutorial/${prev.id}`}
                  className="btn btn-outline btn-sm sm:btn-md gap-2 normal-case font-normal text-left"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <div className="hidden sm:block">
                    <div className="text-[10px] text-base-content/50 uppercase font-mono">
                      Önceki Ders
                    </div>
                    <div className="text-xs font-bold truncate max-w-44">{prev.shortTitle}</div>
                  </div>
                  <span className="sm:hidden text-xs">Önceki</span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Dersi Tamamla Butonu */}
            <div className="order-first sm:order-none">
              <LessonCompleteButton lessonId={lesson.id} />
            </div>

            <div>
              {next ? (
                <Link
                  href={`/tutorial/${next.id}`}
                  className="btn btn-primary btn-sm sm:btn-md gap-2 normal-case font-normal text-right shadow-sm"
                >
                  <div className="hidden sm:block">
                    <div className="text-[10px] text-primary-content/70 uppercase font-mono">
                      Sonraki Ders
                    </div>
                    <div className="text-xs font-bold truncate max-w-44">{next.shortTitle}</div>
                  </div>
                  <span className="sm:hidden text-xs">Sonraki</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                /* Kursun son dersine gelindiğinde */
                <Link
                  href="/courses"
                  className="btn btn-success btn-sm sm:btn-md gap-2 normal-case font-normal text-success-content shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Kursu Tamamladın! Diğer Kurslar →</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
