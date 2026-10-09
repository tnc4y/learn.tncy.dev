"use client";

import { useState } from "react";
import {
  Cpu,
  CheckCircle2,
  XCircle,
  Terminal,
  Layers,
  Code2,
  Palette,
  FileCode2,
  Zap,
  Globe,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const TABS = [
  { id: "hardware", label: "Donanım & FPGA", icon: "Cpu", color: "badge-primary" },
  { id: "web", label: "Web Geliştirme", icon: "FileCode2", color: "badge-error" },
  { id: "embedded", label: "Gömülü Sistemler & C", icon: "Layers", color: "badge-accent" },
  { id: "languages", label: "Programlama Dilleri", icon: "Code2", color: "badge-info" },
];

export default function CheatsheetPage() {
  const [activeTab, setActiveTab] = useState("hardware");

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
      {/* 1. Üst Başlık */}
      <div className="border-b border-base-300 pb-6 space-y-3">
        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
          <Terminal className="w-4 h-4" />
          <span>Hızlı Başvuru Kartı (Cheatsheet)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
          Tüm Alanlar İçin Hızlı Başvuru Rehberi
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 max-w-3xl leading-relaxed">
          Sık kullanılan sözdizimleri, formüller, veri tipleri, register maskeleme teknikleri ve mimari kuralları tek sayfada özet halinde bulun.
        </p>

        {/* Sekmeler */}
        <div className="flex items-center gap-2 pt-3 overflow-x-auto pb-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn btn-sm font-mono text-xs whitespace-nowrap rounded-xl transition-all ${
                activeTab === tab.id
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost border border-base-content/10 text-base-content/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. DONANIM & FPGA SEKMESİ */}
      {activeTab === "hardware" && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Tablo 1: Veri Tipleri */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <span>1. SystemVerilog Veri Tipleri Karşılaştırması</span>
            </h2>

            <div className="overflow-x-auto border border-base-300 rounded-xl bg-base-100 shadow-xs">
              <table className="table table-zebra w-full text-xs sm:text-sm">
                <thead className="bg-base-200 text-base-content text-xs font-mono uppercase">
                  <tr>
                    <th>Veri Tipi</th>
                    <th>Durum Sayısı</th>
                    <th>Bit Genişliği</th>
                    <th>Varsayılan</th>
                    <th>Kullanım Alanı</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-mono font-bold text-primary">logic</td>
                    <td><span className="badge badge-warning badge-xs font-mono">4-Durumlu</span> (0, 1, X, Z)</td>
                    <td>1 bit (ölçeklenebilir)</td>
                    <td className="font-mono text-error">1&apos;bx</td>
                    <td>Genel RTL ve Testbench sinyalleri (reg/wire yerine)</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold text-secondary">bit</td>
                    <td><span className="badge badge-success badge-xs font-mono">2-Durumlu</span> (0, 1)</td>
                    <td>1 bit (ölçeklenebilir)</td>
                    <td className="font-mono text-success">1&apos;b0</td>
                    <td>Yüksek hızlı testbench uyaranları</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold text-secondary">byte</td>
                    <td><span className="badge badge-success badge-xs font-mono">2-Durumlu</span> (0, 1)</td>
                    <td>8 bit (İşaretli)</td>
                    <td className="font-mono text-success">8&apos;h00</td>
                    <td>Protokol paket baytları, ASCII karakterleri</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold text-secondary">int</td>
                    <td><span className="badge badge-success badge-xs font-mono">2-Durumlu</span> (0, 1)</td>
                    <td>32 bit (İşaretli)</td>
                    <td className="font-mono text-success">0</td>
                    <td>Döngü sayaçları, integer matematik</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold text-secondary">longint</td>
                    <td><span className="badge badge-success badge-xs font-mono">2-Durumlu</span> (0, 1)</td>
                    <td>64 bit (İşaretli)</td>
                    <td className="font-mono text-success">0</td>
                    <td>64-bit bellek adresleri ve kayıtları</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tablo 2: Sentezlenebilir RTL vs Doğrulama */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Terminal className="w-5 h-5 text-secondary" />
              <span>2. Sentezlenebilir RTL vs Sadece Doğrulama Yapıları</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card bg-base-200 border border-success/30 shadow-xs">
                <div className="card-body p-5 space-y-3">
                  <div className="flex items-center gap-2 text-success font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Sentezlenebilir RTL (Fiziksel Çipe Dönüşür)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-base-content/80 font-mono">
                    <li>• always_comb (Kombinasyonel Mantık)</li>
                    <li>• always_ff @(posedge clk) (Flip-Flop / Ardışıl)</li>
                    <li>• always_latch (Mandal Mantığı)</li>
                    <li>• logic, enum, struct (Paketlenmiş tipler)</li>
                    <li>• assign (Sürekli Atamalar)</li>
                    <li>• unique case, priority if</li>
                    <li>• interface, modport</li>
                  </ul>
                </div>
              </div>

              <div className="card bg-base-200 border border-info/30 shadow-xs">
                <div className="card-body p-5 space-y-3">
                  <div className="flex items-center gap-2 text-info font-bold text-sm">
                    <XCircle className="w-4 h-4" />
                    <span>Sadece Testbench / Simülasyonda Çalışır</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-base-content/80 font-mono">
                    <li>• class, virtual methods, inheritance (OOP)</li>
                    <li>• rand, randc, constraint (Kısıtlı Rastgelelik)</li>
                    <li>• covergroup, coverpoint, cross (Kapsama)</li>
                    <li>• mailbox, semaphore, event (IPC)</li>
                    <li>• fork..join_any, fork..join_none</li>
                    <li>• #delay (Örn: #10ns zaman gecikmesi)</li>
                    <li>• initial blokları, $display, $monitor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. WEB GELİŞTİRME SEKMESİ */}
      {activeTab === "web" && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-error" />
              <span>1. CSS Flexbox & Grid Hızlı Referansı</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body p-5 space-y-2">
                  <span className="font-bold text-sm text-primary font-mono">Flexbox (Tek Boyutlu Hizalama)</span>
                  <div className="font-mono text-xs space-y-1.5 text-base-content/80 bg-base-100 p-3 rounded-lg border border-base-300">
                    <div><strong>display: flex;</strong> /* Kapsayıcıyı esnek yap */</div>
                    <div><strong>flex-direction:</strong> row | column;</div>
                    <div><strong>justify-content:</strong> center | space-between | flex-start;</div>
                    <div><strong>align-items:</strong> center | stretch | flex-end;</div>
                    <div><strong>gap:</strong> 1rem; /* Elemanlar arası boşluk */</div>
                    <div><strong>flex:</strong> 1; /* Kalan alanı doldur */</div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body p-5 space-y-2">
                  <span className="font-bold text-sm text-secondary font-mono">CSS Grid (2 Boyutlu Izgara)</span>
                  <div className="font-mono text-xs space-y-1.5 text-base-content/80 bg-base-100 p-3 rounded-lg border border-base-300">
                    <div><strong>display: grid;</strong> /* Izgara modunu aç */</div>
                    <div><strong>grid-template-columns:</strong> repeat(3, 1fr);</div>
                    <div><strong>grid-template-columns:</strong> 250px 1fr;</div>
                    <div><strong>gap:</strong> 1.5rem; /* Satır/sütun boşluğu */</div>
                    <div><strong>grid-column:</strong> span 2; /* 2 sütun kapla */</div>
                    <div><strong>place-items:</strong> center; /* Hem X hem Y merkezle */</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Code2 className="w-5 h-5 text-warning" />
              <span>2. JavaScript Modern Dizi Metotları</span>
            </h2>

            <div className="overflow-x-auto border border-base-300 rounded-xl bg-base-100 shadow-xs">
              <table className="table table-zebra w-full text-xs font-mono">
                <thead className="bg-base-200 text-xs uppercase">
                  <tr>
                    <th>Metot</th>
                    <th>Döndürdüğü Değer</th>
                    <th>Kullanım Amacı & Örnek</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-primary font-bold">.map()</td>
                    <td>Yeni Dizi</td>
                    <td>Elemanları dönüştürür: <code>arr.map(x =&gt; x * 2)</code></td>
                  </tr>
                  <tr>
                    <td className="text-primary font-bold">.filter()</td>
                    <td>Yeni Dizi</td>
                    <td>Koşula uyanları süzer: <code>arr.filter(x =&gt; x &gt; 10)</code></td>
                  </tr>
                  <tr>
                    <td className="text-primary font-bold">.reduce()</td>
                    <td>Tekil Değer</td>
                    <td>Toplam veya birikim hesabı: <code>arr.reduce((acc, x) =&gt; acc + x, 0)</code></td>
                  </tr>
                  <tr>
                    <td className="text-primary font-bold">.find()</td>
                    <td>Eleman / undefined</td>
                    <td>Koşula uyan ilk elemanı bulur: <code>arr.find(x =&gt; x.id === 5)</code></td>
                  </tr>
                  <tr>
                    <td className="text-primary font-bold">.some() / .every()</td>
                    <td>Boolean (true/false)</td>
                    <td>En az biri / hepsi koşulu sağlıyor mu testi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. GÖMÜLÜ SİSTEMLER SEKMESİ */}
      {activeTab === "embedded" && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Layers className="w-5 h-5 text-accent" />
              <span>1. Gömülü C: Bitwise Register Maskeleme Formülleri</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-base-200 border border-base-300 space-y-2">
                <span className="badge badge-success badge-sm font-mono font-bold">Bit Set Et (1 Yap)</span>
                <p className="text-xs text-base-content/70">Diğer bitleri bozmadan ilgili pini HIGH yapar:</p>
                <code className="text-xs font-mono font-bold text-success block bg-base-100 p-2 rounded">
                  REG |= (1 &lt;&lt; PIN);
                </code>
              </div>

              <div className="p-4 rounded-xl bg-base-200 border border-base-300 space-y-2">
                <span className="badge badge-error badge-sm font-mono font-bold">Bit Clear Et (0 Yap)</span>
                <p className="text-xs text-base-content/70">Diğer bitleri bozmadan ilgili pini LOW yapar:</p>
                <code className="text-xs font-mono font-bold text-error block bg-base-100 p-2 rounded">
                  REG &amp;= ~(1 &lt;&lt; PIN);
                </code>
              </div>

              <div className="p-4 rounded-xl bg-base-200 border border-base-300 space-y-2">
                <span className="badge badge-warning badge-sm font-mono font-bold">Bit Durumunu Değiştir</span>
                <p className="text-xs text-base-content/70">Toggle (1 ise 0, 0 ise 1 yapar):</p>
                <code className="text-xs font-mono font-bold text-warning block bg-base-100 p-2 rounded">
                  REG ^= (1 &lt;&lt; PIN);
                </code>
              </div>

              <div className="p-4 rounded-xl bg-base-200 border border-base-300 space-y-2">
                <span className="badge badge-info badge-sm font-mono font-bold">Bit Durumunu Oku</span>
                <p className="text-xs text-base-content/70">Pinin 1 mi 0 mı olduğunu test eder:</p>
                <code className="text-xs font-mono font-bold text-info block bg-base-100 p-2 rounded">
                  if (REG &amp; (1 &lt;&lt; PIN))
                </code>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-warning" />
              <span>2. Kesmeler (ISR) ve volatile Kuralı</span>
            </h2>

            <div className="p-5 rounded-2xl bg-base-200 border border-base-300 space-y-3">
              <div className="text-xs sm:text-sm text-base-content/85 leading-relaxed space-y-2">
                <p>
                  <strong>volatile Neden Kullanılır?</strong> Bir değişken donanım kesmesi (ISR) içinde değiştiriliyorsa ve ana döngüde (main/loop) okunuyorsa, derleyici optimizasyonunun değişkeni register&apos;a sabitleyip güncellemeyi kaçırmasını önlemek için <code className="text-primary font-mono font-bold">volatile uint8_t flag = 0;</code> olarak tanımlanmalıdır.
                </p>
                <p>
                  <strong>Altın ISR Kuralı:</strong> Kesme servis rutinleri mümkün olduğunca kısa olmalıdır. Asla ISR içinde <code className="text-error font-mono">delay()</code> veya ağır döngü çalıştırılmamalıdır; sadece bayrak (flag) set edilmeli, işlem ana döngüde yürütülmelidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PROGRAMLAMA DİLLERİ SEKMESİ */}
      {activeTab === "languages" && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Python */}
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-base text-info font-mono">
                  <Code2 className="w-4 h-4" />
                  <span>Python 3 Özet</span>
                </div>
                <div className="text-xs font-mono space-y-2 text-base-content/80">
                  <div># List Comprehension:</div>
                  <code className="block bg-base-100 p-1.5 rounded">[x**2 for x in arr if x &gt; 0]</code>
                  <div># Sözlük (Dictionary):</div>
                  <code className="block bg-base-100 p-1.5 rounded">d = {`{"ad": "ESP32", "ram": 520}`}</code>
                  <div># F-String:</div>
                  <code className="block bg-base-100 p-1.5 rounded">{`f"Cihaz: {d['ad']}"`}</code>
                </div>
              </div>
            </div>

            {/* Modern C++ */}
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-base text-neutral-content font-mono">
                  <Cpu className="w-4 h-4" />
                  <span>Modern C++20 Özet</span>
                </div>
                <div className="text-xs font-mono space-y-2 text-base-content/80">
                  <div>// Tekil Sahiplik (RAII):</div>
                  <code className="block bg-base-100 p-1.5 rounded">auto p = std::make_unique&lt;T&gt;();</code>
                  <div>// Ortak Sahiplik (Ref Count):</div>
                  <code className="block bg-base-100 p-1.5 rounded">auto s = std::make_shared&lt;T&gt;();</code>
                  <div>// Range-based for:</div>
                  <code className="block bg-base-100 p-1.5 rounded">for (const auto&amp; item : vec)</code>
                </div>
              </div>
            </div>

            {/* Rust */}
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-base text-warning font-mono">
                  <Zap className="w-4 h-4" />
                  <span>Rust Sahiplik (Ownership)</span>
                </div>
                <div className="text-xs font-mono space-y-2 text-base-content/80">
                  <div>// Değişken (Varsayılan sabit):</div>
                  <code className="block bg-base-100 p-1.5 rounded">let mut sayac = 0;</code>
                  <div>// Ödünç Alma (Borrowing):</div>
                  <code className="block bg-base-100 p-1.5 rounded">&amp;val (Okuma) | &amp;mut val (Yazma)</code>
                  <div>// Desen Eşleme (Pattern):</div>
                  <code className="block bg-base-100 p-1.5 rounded">match res {`{ Ok(v) => v, Err(e) => 0 }`}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alt Hızlı Aksiyon */}
      <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-base text-base-content">
            Uygulamalı Derslerle Bilgilerinizi Pekiştirin
          </h3>
          <p className="text-xs text-base-content/70">
            Kapsamlı anlatımlar, interaktif kod denemeleri ve soru-cevap testleri içeren kurslara göz atın.
          </p>
        </div>
        <Link href="/courses" className="btn btn-primary btn-sm font-mono text-xs gap-1.5">
          <span>Tüm Kurs Kataloğu</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
