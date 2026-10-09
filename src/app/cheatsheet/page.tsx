import { Cpu, CheckCircle2, XCircle, Terminal, Layers } from "lucide-react";
import Link from "next/link";

export default function CheatsheetPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-10">
      {/* Başlık */}
      <div className="border-b border-base-300 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Hızlı Başvuru Kartı (Cheatsheet)</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
          SystemVerilog Hızlı Başvuru Kılavuzu
        </h1>
        <p className="text-sm text-base-content/70">
          En sık kullanılan veri tipleri, sentezlenebilir bloklar, operatörler ve sistem görevleri özeti.
        </p>
      </div>

      {/* Tablo 1: Veri Tipleri Özeti */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          1. Veri Tipleri Karşılaştırması (2-State vs 4-State)
        </h2>

        <div className="overflow-x-auto border border-base-300 rounded-xl bg-base-100 shadow-xs">
          <table className="table table-zebra w-full text-xs sm:text-sm">
            <thead className="bg-base-200 text-base-content text-xs font-mono uppercase">
              <tr>
                <th>Veri Tipi</th>
                <th>Durum Sayısı</th>
                <th>Bit Genişliği</th>
                <th>Varsayılan Değer</th>
                <th>Kullanım Alanı</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono font-bold text-primary">logic</td>
                <td><span className="badge badge-warning badge-xs">4-Durumlu</span> (0, 1, X, Z)</td>
                <td>1 bit (ölçeklenebilir)</td>
                <td className="font-mono text-error">1&apos;bx (Bilinmeyen)</td>
                <td>Genel RTL ve Testbench sinyalleri (wire/reg yerine)</td>
              </tr>
              <tr>
                <td className="font-mono font-bold text-secondary">bit</td>
                <td><span className="badge badge-success badge-xs">2-Durumlu</span> (0, 1)</td>
                <td>1 bit (ölçeklenebilir)</td>
                <td className="font-mono text-success">1&apos;b0</td>
                <td>Yüksek hızlı testbench uyaranları</td>
              </tr>
              <tr>
                <td className="font-mono font-bold text-secondary">byte</td>
                <td><span className="badge badge-success badge-xs">2-Durumlu</span> (0, 1)</td>
                <td>8 bit (İşaretli)</td>
                <td className="font-mono text-success">8&apos;h00</td>
                <td>Protokol paket baytları, ASCII karakterleri</td>
              </tr>
              <tr>
                <td className="font-mono font-bold text-secondary">int</td>
                <td><span className="badge badge-success badge-xs">2-Durumlu</span> (0, 1)</td>
                <td>32 bit (İşaretli)</td>
                <td className="font-mono text-success">0</td>
                <td>Döngü sayaçları, integer işlemler</td>
              </tr>
              <tr>
                <td className="font-mono font-bold text-secondary">longint</td>
                <td><span className="badge badge-success badge-xs">2-Durumlu</span> (0, 1)</td>
                <td>64 bit (İşaretli)</td>
                <td className="font-mono text-success">0</td>
                <td>64-bit bellek adresleri, 64-bit CPU kayıtları</td>
              </tr>
              <tr>
                <td className="font-mono font-bold text-info">time</td>
                <td><span className="badge badge-warning badge-xs">4-Durumlu</span> (0, 1, X, Z)</td>
                <td>64 bit (İşaretsiz)</td>
                <td className="font-mono text-error">0</td>
                <td>Simülasyon zamanı damgaları ($time)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tablo 2: Sentezlenebilir RTL vs Doğrulama (Verification) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Terminal className="w-5 h-5 text-secondary" />
          2. Sentezlenebilir RTL vs Sadece Doğrulama Yapıları
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-base-200 border border-success/30 shadow-xs">
            <div className="card-body p-4 space-y-3">
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
            <div className="card-body p-4 space-y-3">
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
                <li>• #delay (Örn: #10ns gecikme)</li>
                <li>• initial blokları, $display, $monitor, $finish</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Hızlı Buton */}
      <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-base text-base-content">
            Hemen Bir Konuyu Derinlemesine Öğrenmeye Başlayın
          </h3>
          <p className="text-xs text-base-content/70">
            Adım adım açıklamalar, canlı deneme pencereleri ve alıştırmalarla SystemVerilog&apos;u keşfedin.
          </p>
        </div>
        <Link href="/tutorial/intro" className="btn btn-primary btn-sm font-mono text-xs">
          1. Derse Git: Giriş & Temeller →
        </Link>
      </div>
    </div>
  );
}
