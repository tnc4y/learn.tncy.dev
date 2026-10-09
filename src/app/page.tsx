"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight,
  Activity,
  Code2,
  Globe,
} from "lucide-react";
import CodePlayground from "@/components/CodePlayground";
import { LEARNING_TRACKS } from "@/data/tracks";

const CATEGORIES = [
  { id: "all", label: "Tüm Diller & Konular" },
  { id: "Web Geliştirme", label: "Web Geliştirme (HTML/CSS/JS)" },
  { id: "Gömülü Sistemler", label: "Gömülü Sistemler & IoT" },
  { id: "Donanım & FPGA", label: "Donanım Tasarımı & FPGA" },
  { id: "Programlama Dilleri", label: "Programlama Dilleri" },
];

export default function Home() {
  const [selectedCat, setSelectedCat] = useState("all");

  const filteredTracks = LEARNING_TRACKS.filter(
    (t) => selectedCat === "all" || t.category === selectedCat
  );

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO BÖLÜMÜ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-base-200/60 via-base-100 to-base-100 border-b border-base-300 pt-12 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Sol: Karşılama Metni */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Web • Gömülü • Donanım • Yazılım</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-base-content leading-tight">
              Yazılımdan Donanıma <span className="text-primary">Eksiksiz</span> Öğrenme Platformu
            </h1>

            <p className="text-base sm:text-lg text-base-content/70 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              HTML, CSS ve JavaScript&apos;ten Python, Modern C++ ve Rust&apos;a; Arduino ve ESP32&apos;den
              FPGA ve SystemVerilog çip tasarımına kadar uzanan interaktif, uygulamalı kodlama merkezi.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link href="/courses" className="btn btn-primary gap-2 shadow-lg font-mono">
                <BookOpen className="w-4 h-4" />
                Kursları Keşfet
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/playground" className="btn btn-outline gap-2 font-mono">
                <Terminal className="w-4 h-4 text-secondary" />
                Canlı IDE & Simülatör
              </Link>
              <Link href="/boards" className="btn btn-ghost gap-2 font-mono text-xs">
                <Layers className="w-4 h-4 text-warning" />
                Geliştirme Kartları
              </Link>
            </div>

            {/* İstatistik Rozetleri */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto lg:mx-0 border-t border-base-content/10">
              <div>
                <div className="text-2xl font-black font-mono text-primary">11+</div>
                <div className="text-xs text-base-content/60">Dil & Alan</div>
              </div>
              <div>
                <div className="text-2xl font-black font-mono text-secondary">100+</div>
                <div className="text-xs text-base-content/60">Uygulamalı Ders</div>
              </div>
              <div>
                <div className="text-2xl font-black font-mono text-accent">%100</div>
                <div className="text-xs text-base-content/60">Tarayıcıda Çalışma</div>
              </div>
            </div>
          </div>

          {/* Sağ: Canlı İnteraktif Simülatör Önizlemesi */}
          <div className="flex-1 w-full max-w-xl">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/30 blur-xl opacity-50 -z-10" />
              <CodePlayground
                title="Canlı Kod Düzenleyici & Simülatör"
                initialCode={`// 4-Bit Sayıcı ve Testbench
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
    $display("[START] Donanım Simülasyonu Çalışıyor...");
    #12 rst_n = 1;
    #40;
    $display("[FINISH] Test bitti, count = %0d", count);
    $finish;
  end
endmodule`}
                expectedOutput={[
                  "[INFO:SIM] Simulator initialized at 0.00ns",
                  "[START] Donanım Simülasyonu Çalışıyor...",
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

      {/* 2. DİL VE EĞİTİM ALANLARI KATALOĞU (TRACKS GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase font-bold text-primary tracking-wider mb-1">
              Eğitim Kataloğu
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content">
              Öğrenmek İstediğiniz Alanı Seçin
            </h2>
            <p className="text-sm text-base-content/70 mt-1">
              Web teknolojilerinden mikrodenetleyicilere, modern programlama dillerinden FPGA çip tasarımına kadar geniş müfredat.
            </p>
          </div>

          {/* Kategori Filtresi */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`btn btn-xs font-mono text-[11px] whitespace-nowrap rounded-lg ${
                  selectedCat === cat.id
                    ? "btn-primary shadow-xs font-bold"
                    : "btn-ghost border border-base-content/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kartlar Izgarası */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => (
            <div
              key={track.id}
              className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div className="card-body p-6 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase text-base-content/50 font-bold">
                      {track.category}
                    </span>
                    <h3 className="text-xl font-black text-base-content group-hover:text-primary transition-colors">
                      {track.title}
                    </h3>
                  </div>
                  <span className={`badge ${track.colorClass} badge-sm font-mono text-[10px] font-bold`}>
                    {track.badge}
                  </span>
                </div>

                <p className="text-xs text-base-content/75 line-clamp-3 leading-relaxed">
                  {track.description}
                </p>

                {/* Önemli Konu Başlıkları */}
                <div className="space-y-1.5 pt-2 border-t border-base-content/5">
                  <span className="text-[10px] font-mono text-base-content/40 uppercase">
                    Öne Çıkan Başlıklar:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {track.topics.map((t, idx) => (
                      <span key={idx} className="badge badge-neutral badge-xs font-mono text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-5 pt-1 border-t border-base-300/50 bg-base-200/30 flex items-center justify-between">
                <span className="text-xs font-mono text-base-content/60">
                  {track.lessonCount} Ders • {track.level}
                </span>
                <Link
                  href={track.startLessonUrl}
                  className="btn btn-primary btn-xs font-mono text-[11px] gap-1"
                >
                  <span>Derse Başla</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. GELİŞTİRME KARTLARI ANSİKLOPEDİSİ VİTRİNİ */}
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
              <span>Tüm Kartları İncele</span>
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

      {/* 4. PLATFORMUN AVANTAJLARI (FEATURES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content">
            Neden learn.tncy.dev?
          </h2>
          <p className="text-sm text-base-content/70 max-w-xl mx-auto">
            Kuru teoriler yerine, tarayıcıda doğrudan deneyimleyebileceğiniz modern araçlar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-200/60 border border-base-300 shadow-xs hover:border-primary/50 transition-colors">
            <div className="card-body p-6 space-y-2">
              <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-base-content">
                Canlı Kod Düzenleyici & Simülatör
              </h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Her dersin içerisinde doğrudan düzenlenebilir kod editörü, terminal konsolu ve sinyal dalga formları.
              </p>
            </div>
          </div>

          <div className="card bg-base-200/60 border border-base-300 shadow-xs hover:border-secondary/50 transition-colors">
            <div className="card-body p-6 space-y-2">
              <div className="p-2 w-fit rounded-lg bg-secondary/10 text-secondary">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-base-content">
                Uçtan Uca Tam Kapsam
              </h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Web frontend arayüzünden backend dillerine, oradan mikrodenetleyici C ve donanımsal FPGA çip tasarımına tam yolculuk.
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
                Her konunun sonunda kavram yanılgılarını önleyen ve öğrendiklerinizi pekiştiren interaktif soru ve cevap panelleri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ALT ÇAĞRI (CTA) & FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 border-t border-base-300">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-base-200 to-secondary/10 border border-base-content/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-base-content">
              Geliştirici & Mühendislik Yolculuğunuza Başlayın
            </h3>
            <p className="text-xs sm:text-sm text-base-content/70 max-w-xl">
              Web geliştirmeden sistem programlamaya ve donanım tasarımına kadar tüm dünyayı uygulamalı olarak keşfedin.
            </p>
          </div>
          <Link href="/courses" className="btn btn-primary font-mono text-xs px-6 shrink-0">
            Kursları İncele →
          </Link>
        </div>

        <div className="mt-10 py-6 text-center text-xs text-base-content/50 border-t border-base-content/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            learn.<span className="text-primary font-bold">tncy</span>.dev © 2026 • Modern Kodlama & Donanım Platformu
          </div>
          <div className="font-mono text-[11px]">
            Next.js 16 • Tailwind CSS v4 • DaisyUI v5
          </div>
        </div>
      </footer>
    </div>
  );
}
