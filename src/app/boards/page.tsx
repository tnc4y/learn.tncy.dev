"use client";

import { useState } from "react";
import { DEV_BOARDS, DevBoard } from "@/data/boardsData";
import {
  Cpu,
  Search,
  Zap,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
  Scale,
  X,
  Check,
  Layers,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Tüm Kartlar" },
  { id: "Microcontroller", label: "Mikrodenetleyici (MCU)" },
  { id: "IoT / Wireless", label: "IoT & Kablosuz" },
  { id: "FPGA", label: "FPGA (Donanım/RTL)" },
  { id: "AI / Edge", label: "Yapay Zeka & Kenar SBC" },
  { id: "Single Board Computer (SBC)", label: "Tek Kart Bilgisayar (SBC)" },
];

export default function BoardsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [activeBoardModal, setActiveBoardModal] = useState<DevBoard | null>(null);
  const [compareBoardIds, setCompareBoardIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const toggleCompare = (boardId: string) => {
    setCompareBoardIds((prev) => {
      if (prev.includes(boardId)) {
        return prev.filter((id) => id !== boardId);
      }
      if (prev.length >= 3) {
        alert("En fazla 3 kartı aynı anda karşılaştırabilirsiniz.");
        return prev;
      }
      return [...prev, boardId];
    });
  };

  const filteredBoards = DEV_BOARDS.filter((board) => {
    const matchesCat =
      selectedCategory === "all" || board.family === selectedCategory;

    const matchesSearch =
      searchTerm === "" ||
      board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.chipset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.architecture.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.bestFor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLang =
      selectedLanguage === "all" ||
      board.supportedLanguages.some((l) =>
        l.toLowerCase().includes(selectedLanguage.toLowerCase())
      );

    return matchesCat && matchesSearch && matchesLang;
  });

  const comparedBoards = DEV_BOARDS.filter((b) => compareBoardIds.includes(b.id));

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8 pb-24">
      {/* 1. Başlık ve Açıklama */}
      <div className="border-b border-base-300 pb-6 space-y-3">
        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Gömülü Sistemler Donanım Kılavuzu</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
          Geliştirme Kartları Ansiklopedisi
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 max-w-3xl leading-relaxed">
          Arduino Uno&apos;dan ESP32&apos;ye, STM32 ARM mimarisinden FPGA kartlarına (Basys 3, DE10-Lite) ve
          NVIDIA Jetson yapay zeka kartlarına kadar tüm gömülü donanım ekosisteminin teknik özellikleri,
          karşılaştırmaları ve kullanım alanları.
        </p>
      </div>

      {/* 2. Filtre ve Arama Çubuğu */}
      <div className="bg-base-200/60 p-4 rounded-2xl border border-base-300 space-y-4">
        {/* Arama Kutusu ve Dil Filtresi */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              placeholder="Kart adı, işlemci, mimari veya kullanım alanı ara (örn. ESP32, FPGA, Artix-7, Jetson)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-sm input-bordered w-full pl-9 text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-base-content/50 hidden sm:block" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="select select-sm select-bordered text-xs focus:outline-none focus:border-primary"
            >
              <option value="all">Tüm Programlama Dilleri</option>
              <option value="C">C / C++</option>
              <option value="MicroPython">MicroPython / Python</option>
              <option value="SystemVerilog">SystemVerilog / Verilog (FPGA)</option>
              <option value="Rust">Rust</option>
              <option value="CUDA">CUDA / AI</option>
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

      {/* 3. Kart Sayacı */}
      <div className="flex items-center justify-between text-xs text-base-content/60 font-mono">
        <span>Bulunan Kart Sayısı: <strong className="text-primary">{filteredBoards.length}</strong></span>
        <span>Kategori: {CATEGORIES.find((c) => c.id === selectedCategory)?.label}</span>
      </div>

      {/* 4. Kart Listesi (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBoards.map((board) => {
          const isSelectedForCompare = compareBoardIds.includes(board.id);

          return (
            <div
              key={board.id}
              className={`card bg-base-100 border shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group ${
                isSelectedForCompare
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-base-300 hover:border-primary/40"
              }`}
            >
              {/* Kart Üst Alanı */}
              <div className="card-body p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                      {board.vendor}
                    </span>
                    <h3 className="text-lg font-extrabold text-base-content group-hover:text-primary transition-colors">
                      {board.name}
                    </h3>
                  </div>
                  {board.badge && (
                    <span className="badge badge-primary badge-sm text-[10px] font-mono font-bold shrink-0">
                      {board.badge}
                    </span>
                  )}
                </div>

                {/* Teknik Özet Tablosu */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-base-200/70 border border-base-content/5 text-[11px] font-mono">
                  <div>
                    <span className="text-base-content/50 block text-[10px]">Çekirdek / Çip:</span>
                    <span className="font-semibold text-base-content truncate block">
                      {board.chipset}
                    </span>
                  </div>
                  <div>
                    <span className="text-base-content/50 block text-[10px]">Saat Hızı:</span>
                    <span className="font-semibold text-secondary">{board.clockSpeed}</span>
                  </div>
                  <div>
                    <span className="text-base-content/50 block text-[10px]">Bellek (RAM):</span>
                    <span className="font-semibold text-base-content">{board.ram}</span>
                  </div>
                  <div>
                    <span className="text-base-content/50 block text-[10px]">Çalışma Voltajı:</span>
                    <span className="font-semibold text-accent">{board.operatingVoltage}</span>
                  </div>
                </div>

                {/* Açıklama */}
                <p className="text-xs text-base-content/75 line-clamp-2 leading-relaxed">
                  {board.description}
                </p>

                {/* Desteklenen Diller */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-mono uppercase text-base-content/50 block">
                    Desteklenen Diller:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {board.supportedLanguages.map((lang, lIdx) => (
                      <span
                        key={lIdx}
                        className="badge badge-xs badge-neutral text-[10px] font-mono"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Avantajlar */}
                <div className="space-y-1 pt-1 border-t border-base-content/5">
                  {board.pros.slice(0, 2).map((pro, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-1.5 text-[11px] text-base-content/70">
                      <CheckCircle2 className="w-3 h-3 text-success shrink-0" />
                      <span className="truncate">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kart Altı: Karşılaştır & Detay Butonları */}
              <div className="px-5 pb-4 pt-2 bg-base-200/30 border-t border-base-300 flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleCompare(board.id)}
                  className={`btn btn-xs font-mono text-[11px] gap-1 ${
                    isSelectedForCompare
                      ? "btn-primary shadow-xs"
                      : "btn-ghost border border-base-content/10 hover:border-primary text-base-content/70"
                  }`}
                >
                  <Scale className="w-3 h-3" />
                  <span>{isSelectedForCompare ? "Seçildi ✓" : "Karşılaştır"}</span>
                </button>

                <button
                  onClick={() => setActiveBoardModal(board)}
                  className="btn btn-outline btn-xs font-mono text-[11px] gap-1"
                >
                  <span>Detaylı İncele</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBoards.length === 0 && (
        <div className="card bg-base-200 p-12 text-center space-y-3">
          <Cpu className="w-10 h-10 text-base-content/30 mx-auto" />
          <h3 className="font-bold text-base text-base-content">
            Aradığınız kriterlere uygun geliştirme kartı bulunamadı
          </h3>
          <p className="text-xs text-base-content/60 max-w-sm mx-auto">
            Filtreleri veya arama terimini temizleyerek tüm kartları tekrar görüntüleyebilirsiniz.
          </p>
          <div>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedLanguage("all");
              }}
              className="btn btn-outline btn-xs"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        </div>
      )}

      {/* 5. TEK KART DETAY MODALI */}
      {activeBoardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="bg-base-100 rounded-3xl border border-base-content/10 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-base-300 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-primary font-bold">
                  {activeBoardModal.vendor} • {activeBoardModal.family}
                </span>
                <h2 className="text-2xl font-black text-base-content">
                  {activeBoardModal.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveBoardModal(null)}
                className="btn btn-ghost btn-sm btn-square"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm">
              <p className="text-base-content/80 leading-relaxed">
                {activeBoardModal.description}
              </p>

              {/* Teknik Özellikler Tablosu */}
              <div className="border border-base-300 rounded-2xl overflow-hidden bg-base-200/50">
                <table className="table table-sm text-xs font-mono">
                  <tbody>
                    <tr className="border-b border-base-300">
                      <td className="font-bold text-base-content/60">İşlemci / Çip:</td>
                      <td className="text-base-content font-bold">{activeBoardModal.chipset}</td>
                    </tr>
                    <tr className="border-b border-base-300">
                      <td className="font-bold text-base-content/60">Mimari:</td>
                      <td>{activeBoardModal.architecture}</td>
                    </tr>
                    <tr className="border-b border-base-300">
                      <td className="font-bold text-base-content/60">Saat Frekansı (Clock):</td>
                      <td className="text-secondary font-bold">{activeBoardModal.clockSpeed}</td>
                    </tr>
                    <tr className="border-b border-base-300">
                      <td className="font-bold text-base-content/60">Bellek (RAM):</td>
                      <td>{activeBoardModal.ram}</td>
                    </tr>
                    <tr className="border-b border-base-300">
                      <td className="font-bold text-base-content/60">Flash / ROM:</td>
                      <td>{activeBoardModal.flashMemory}</td>
                    </tr>
                    <tr className="border-b border-base-300">
                      <td className="font-bold text-base-content/60">Çalışma Gerilimi:</td>
                      <td className="text-accent font-bold">{activeBoardModal.operatingVoltage}</td>
                    </tr>
                    <tr className="border-b border-base-300">
                      <td className="font-bold text-base-content/60">GPIO Sayısı:</td>
                      <td>{activeBoardModal.gpioCount} adet</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-base-content/60">Haberleşme Protokolleri:</td>
                      <td className="text-primary">{activeBoardModal.protocols.join(" • ")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* En Çok Hangi Alanlarda Kullanılır? */}
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-wider text-primary">
                  Önerilen Kullanım Alanı:
                </h4>
                <p className="text-xs text-base-content/90 leading-relaxed">
                  {activeBoardModal.bestFor}
                </p>
              </div>

              {/* Avantajlar */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-base-content/60">
                  Öne Çıkan Artıları:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeBoardModal.pros.map((pro, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-base-200 border border-base-300 flex items-center gap-2 text-xs"
                    >
                      <Zap className="w-3.5 h-3.5 text-warning shrink-0" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-base-300 bg-base-200/50 flex justify-end">
              <button
                onClick={() => setActiveBoardModal(null)}
                className="btn btn-primary btn-sm font-mono text-xs"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. ALT SABİT KARŞILAŞTIRMA ÇUBUĞU (FLOATING COMPARE DOCK) */}
      {compareBoardIds.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-base-100 border border-base-300 shadow-2xl rounded-2xl p-3 flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-150 max-w-xl w-[92vw]">
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono font-bold text-primary">
            <Scale className="w-4 h-4" />
            <span>Karşılaştırma ({compareBoardIds.length}/3):</span>
          </div>

          <div className="flex items-center gap-1.5 flex-1 overflow-x-auto">
            {comparedBoards.map((b) => (
              <span
                key={b.id}
                className="badge badge-neutral badge-sm font-mono text-[10px] gap-1 pr-1 truncate max-w-32"
              >
                <span className="truncate">{b.name}</span>
                <button
                  onClick={() => toggleCompare(b.id)}
                  className="hover:text-error"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              disabled={compareBoardIds.length < 2}
              className="btn btn-primary btn-xs font-mono"
            >
              Karşılaştır
            </button>
            <button
              onClick={() => setCompareBoardIds([])}
              className="btn btn-ghost btn-xs text-base-content/60"
            >
              Temizle
            </button>
          </div>
        </div>
      )}

      {/* 7. YAN YANA KARŞILAŞTIRMA MODALI (SIDE-BY-SIDE COMPARE) */}
      {isCompareModalOpen && comparedBoards.length >= 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="bg-base-100 rounded-3xl border border-base-content/10 shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-base-300 flex items-center justify-between gap-4 sticky top-0 bg-base-100/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-black text-base-content">
                  Kart Karşılaştırma Raporu
                </h2>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="btn btn-ghost btn-sm btn-square"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="table w-full text-xs font-mono">
                <thead>
                  <tr className="bg-base-200 text-base-content uppercase">
                    <th className="w-1/4">Özellik</th>
                    {comparedBoards.map((b) => (
                      <th key={b.id} className="text-left font-bold text-primary">
                        {b.name}
                        <span className="block text-[10px] text-base-content/50 lowercase font-normal">
                          {b.vendor}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300">
                  <tr>
                    <td className="font-bold text-base-content/60">Aile / Kategori</td>
                    {comparedBoards.map((b) => (
                      <td key={b.id}>{b.family}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">İşlemci / Çip</td>
                    {comparedBoards.map((b) => (
                      <td key={b.id} className="font-bold text-base-content">{b.chipset}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Mimari</td>
                    {comparedBoards.map((b) => (
                      <td key={b.id}>{b.architecture}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Saat Hızı (Clock)</td>
                    {comparedBoards.map((b) => (
                      <td key={b.id} className="font-bold text-secondary">{b.clockSpeed}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">RAM Bellek</td>
                    {comparedBoards.map((b) => (
                      <td key={b.id} className="font-bold">{b.ram}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Flash Hafıza</td>
                    {comparedBoards.map((b) => (
                      <td key={b.id}>{b.flashMemory}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Çalışma Voltajı</td>
                    {comparedBoards.map((b) => (
                      <td key={b.id} className="font-bold text-accent">{b.operatingVoltage}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">GPIO Sayısı</td>
                    {comparedBoards.map((b) => (
                      <td key={b.id}>{b.gpioCount} pin</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Haberleşme</td>
                    {comparedBoards.map((b) => (
                      <td key={b.id}>{b.protocols.join(", ")}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">Desteklenen Diller</td>
                    {comparedBoards.map((b) => (
                      <td key={b.id}>{b.supportedLanguages.join(", ")}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-base-content/60">En Uygun Alan</td>
                    {comparedBoards.map((b) => (
                      <td key={b.id} className="font-sans text-[11px] leading-relaxed">
                        {b.bestFor}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-base-300 bg-base-200/50 flex justify-between items-center">
              <span className="text-xs text-base-content/60 font-mono">
                {comparedBoards.length} kart karşılaştırılıyor
              </span>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="btn btn-primary btn-sm font-mono text-xs"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
