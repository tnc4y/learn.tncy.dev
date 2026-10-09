import Link from "next/link";
import {
  Cpu,
  Terminal,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight,
  Activity,
  Code2,
} from "lucide-react";
import CodePlayground from "@/components/CodePlayground";
import { CURRICULUM } from "@/data/curriculum";

export default function Home() {
  const totalLessons = CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO BÖLÜMÜ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-base-200/50 via-base-100 to-base-100 border-b border-base-300 pt-12 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Sol: Karşılama Metni */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gömülü Sistemler & Donanım Doğrulama</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-base-content leading-tight">
              Modern <span className="text-primary">SystemVerilog</span> & Çip Tasarım Platformu
            </h1>

            <p className="text-base sm:text-lg text-base-content/70 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              W3Schools&apos;un adım adım öğrenim modelini, ChipVerify&apos;ın endüstri standardı donanım
              müfredatıyla buluşturan interaktif eğitim merkezi. Canlı kod yazın, simüle edin ve
              sinyal dalga formlarını doğrudan tarayıcınızda izleyin.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link href="/tutorial/intro" className="btn btn-primary gap-2 shadow-lg font-mono">
                <BookOpen className="w-4 h-4" />
                Derslere Başla
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/playground" className="btn btn-outline gap-2 font-mono">
                <Terminal className="w-4 h-4 text-secondary" />
                Kendin Dene (Playground)
              </Link>
              <Link href="/cheatsheet" className="btn btn-ghost gap-2 font-mono text-xs">
                <Cpu className="w-4 h-4 text-accent" />
                Hızlı Başvuru Kartı
              </Link>
            </div>

            {/* İstatistik Rozetleri */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto lg:mx-0 border-t border-base-content/10">
              <div>
                <div className="text-2xl font-black font-mono text-primary">14+</div>
                <div className="text-xs text-base-content/60">Kapsamlı Modül</div>
              </div>
              <div>
                <div className="text-2xl font-black font-mono text-secondary">{totalLessons}</div>
                <div className="text-xs text-base-content/60">İnteraktif Ders</div>
              </div>
              <div>
                <div className="text-2xl font-black font-mono text-accent">%100</div>
                <div className="text-xs text-base-content/60">Canlı Simülasyon</div>
              </div>
            </div>
          </div>

          {/* Sağ: Canlı İnteraktif Önizleme */}
          <div className="flex-1 w-full max-w-xl">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/30 blur-xl opacity-50 -z-10" />
              <CodePlayground
                title="Canlı Donanım Önizlemesi (Counter DUT)"
                initialCode={`// 4-Bit Sayaç ve Testbench
module counter_tb;
  logic clk = 0;
  logic rst_n = 0;
  logic [3:0] count;

  always #5 clk = ~clk;

  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) count <= 4'h0;
    else        count <= count + 1'b1;
  end

  initial begin
    $display("[START] Sayaç Simülasyonu Çalışıyor...");
    #12 rst_n = 1;
    #40;
    $display("[FINISH] Test bitti, count = %0d", count);
    $finish;
  end
endmodule`}
                expectedOutput={[
                  "[INFO:SIM] Simulator initialized at 0.00ns",
                  "[START] Sayaç Simülasyonu Çalışıyor...",
                  "[@15ns] CLK Yükselen Kenar: count = 0",
                  "[@25ns] CLK Yükselen Kenar: count = 1",
                  "[@35ns] CLK Yükselen Kenar: count = 2",
                  "[@45ns] CLK Yükselen Kenar: count = 3",
                  "[FINISH] Test bitti, count = 3",
                  "[SUCCESS] 0 Hata, Simülasyon başarıyla tamamlandı.",
                ]}
                signals={[
                  { name: "clk", wave: "010101010101" },
                  { name: "rst_n", wave: "001111111111" },
                  { name: "count[3:0]", wave: "======", data: ["0", "0", "1", "2", "3"] },
                ]}
                notes="'Simülasyonu Çalıştır' butonuna tıklayarak terminal çıktılarını ve saat darbesi dalga formunu canlı görün."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ÖZELLİKLER (FEATURES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content">
            Neden learn.tncy.dev?
          </h2>
          <p className="text-sm text-base-content/70 max-w-xl mx-auto">
            Geleneksel kuru dokümantasyonların aksine, donanım mühendisliği için optimize edilmiş
            modern öğrenme araçları.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-200/60 border border-base-300 shadow-xs hover:border-primary/50 transition-colors">
            <div className="card-body p-6 space-y-2">
              <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-base-content">
                W3Schools Tarzı Canlı Simülatör
              </h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Her dersin içerisinde doğrudan düzenlenebilir kod editörü, konsol logları ve dijital
                sinyal zamanlama dalga formu.
              </p>
            </div>
          </div>

          <div className="card bg-base-200/60 border border-base-300 shadow-xs hover:border-secondary/50 transition-colors">
            <div className="card-body p-6 space-y-2">
              <div className="p-2 w-fit rounded-lg bg-secondary/10 text-secondary">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-base-content">
                ChipVerify Müfredat Kapsamı
              </h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Veri tiplerinden OOP sınıflarına, rastgeleleştirmeden SVA (Assertions) ve UVM
                altyapısına kadar endüstri standardı konular.
              </p>
            </div>
          </div>

          <div className="card bg-base-200/60 border border-base-300 shadow-xs hover:border-accent/50 transition-colors">
            <div className="card-body p-6 space-y-2">
              <div className="p-2 w-fit rounded-lg bg-accent/10 text-accent">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-base-content">
                Kendini Test Et Alıştırmaları
              </h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Her konunun sonunda kavram yanılgılarını önleyen ve öğrendiklerinizi pekiştiren
                interaktif soru ve cevap panelleri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5. GELİŞTİRME KARTLARI ANSİKLOPEDİSİ VİTRİNİ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-base-200 via-base-100 to-warning/5 border border-base-300 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-warning font-mono text-xs font-bold uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" />
                <span>Gömülü Donanım Rehberi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content">
                Geliştirme Kartları Ansiklopedisi
              </h2>
              <p className="text-xs sm:text-sm text-base-content/70 mt-1">
                Arduino Uno&apos;dan ESP32&apos;ye, STM32 ARM mimarisinden FPGA (Basys 3, DE10) ve Jetson AI kartlarına kadar her şey.
              </p>
            </div>
            <Link href="/boards" className="btn btn-warning btn-sm font-mono text-xs shrink-0 gap-1 shadow-sm">
              <span>Tüm Kartları İncele (12+ Kart)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "Arduino Uno", chip: "ATmega328P", tag: "MCU", color: "badge-primary" },
              { name: "ESP32 DevKit", chip: "Dual LX6 240MHz", tag: "IoT", color: "badge-success" },
              { name: "STM32 BluePill", chip: "Cortex-M3 72MHz", tag: "ARM", color: "badge-info" },
              { name: "RPi Pico W", chip: "RP2040 + WiFi", tag: "MicroPython", color: "badge-secondary" },
              { name: "Basys 3 FPGA", chip: "Artix-7 FPGA", tag: "SystemVerilog", color: "badge-warning" },
              { name: "Jetson Nano", chip: "128-Core GPU", tag: "Edge AI", color: "badge-accent" },
            ].map((b, idx) => (
              <Link
                key={idx}
                href="/boards"
                className="p-3 rounded-xl bg-base-100 border border-base-300 hover:border-warning/50 transition-all text-center space-y-1 group"
              >
                <span className={`badge badge-xs font-mono text-[9px] ${b.color}`}>
                  {b.tag}
                </span>
                <div className="font-bold text-xs text-base-content group-hover:text-warning transition-colors truncate">
                  {b.name}
                </div>
                <div className="text-[10px] text-base-content/50 font-mono truncate">
                  {b.chip}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MÜFREDAT MODÜLLERİ (CURRICULUM GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase font-bold text-primary tracking-wider mb-1">
              Ders Haritası
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content">
              SystemVerilog Müfredatı
            </h2>
          </div>
          <Link href="/tutorial/intro" className="btn btn-outline btn-sm font-mono text-xs gap-1">
            <span>Tüm Dersleri Gör</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRICULUM.map((mod) => (
            <div
              key={mod.id}
              className="card bg-base-100 border border-base-300 shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="card-body p-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-primary">
                    Modül {mod.number}
                  </span>
                  <span className="badge badge-sm badge-ghost font-mono">
                    {mod.lessons.length} Ders
                  </span>
                </div>

                <h3 className="font-bold text-base text-base-content">
                  {mod.title}
                </h3>

                <p className="text-xs text-base-content/70 line-clamp-2 leading-relaxed">
                  {mod.description}
                </p>

                <div className="pt-2 border-t border-base-content/5 space-y-1">
                  {mod.lessons.slice(0, 3).map((l) => (
                    <Link
                      key={l.id}
                      href={`/tutorial/${l.id}`}
                      className="text-xs text-base-content/80 hover:text-primary flex items-center justify-between py-0.5 group"
                    >
                      <span className="truncate group-hover:underline">• {l.shortTitle}</span>
                      <ArrowRight className="w-3 h-3 text-base-content/30 group-hover:text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                  {mod.lessons.length > 3 && (
                    <span className="text-[11px] text-base-content/40 italic block pt-0.5">
                      + {mod.lessons.length - 3} ders daha...
                    </span>
                  )}
                </div>
              </div>

              <div className="px-5 pb-4 pt-1">
                <Link
                  href={`/tutorial/${mod.lessons[0].id}`}
                  className="btn btn-primary btn-xs w-full font-mono text-[11px]"
                >
                  Modüle Başla →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ALT ÇAĞRI (CTA) & FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 border-t border-base-300">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-base-200 to-secondary/10 border border-base-content/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-base-content">
              Gömülü Sistemler ve FPGA Kariyerinize Adım Atın
            </h3>
            <p className="text-xs sm:text-sm text-base-content/70 max-w-xl">
              Tasarım (RTL) ve doğrulama (Verification) mühendisliği için gereken temel ve ileri
              düzey yetkinlikleri uygulamalı olarak kazanın.
            </p>
          </div>
          <Link href="/tutorial/intro" className="btn btn-primary font-mono text-xs px-6 shrink-0">
            1. Dersten Başla →
          </Link>
        </div>

        <div className="mt-10 py-6 text-center text-xs text-base-content/50 border-t border-base-content/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            learn.<span className="text-primary font-bold">tncy</span>.dev © 2026 • Açık Kaynak
            SystemVerilog & Donanım Eğitim Platformu
          </div>
          <div className="font-mono text-[11px]">
            Next.js 16 • Tailwind CSS v4 • DaisyUI v5
          </div>
        </div>
      </footer>
    </div>
  );
}
