"use client";

import { useState } from "react";
import { DEV_BOARDS, DevBoard } from "@/data/boardsData";
import { BOARD_PINOUTS, BoardPin } from "@/data/pinoutsData";
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
  Info,
  Radio,
  Filter,
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
  const [modalTab, setModalTab] = useState<"specs" | "pinout">("specs");
  const [activePin, setActivePin] = useState<BoardPin | null>(null);
  const [pinFilter, setPinFilter] = useState<string>("all");
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
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {board.badge && (
                      <span className="badge badge-primary badge-sm text-[10px] font-mono font-bold">
                        {board.badge}
                      </span>
                    )}
                    {BOARD_PINOUTS[board.id] && (
                      <span className="badge badge-accent badge-outline badge-xs text-[9px] font-mono font-semibold">
                        Pinout Şeması
                      </span>
                    )}
                  </div>
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
                  onClick={() => {
                    setActiveBoardModal(board);
                    setModalTab("specs");
                    setActivePin(null);
                    setPinFilter("all");
                  }}
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
      {activeBoardModal && (() => {
        const pinout = BOARD_PINOUTS[activeBoardModal.id];

        const getPinColor = (type: BoardPin["type"]) => {
          switch (type) {
            case "power":
              return "border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20";
            case "gnd":
              return "border-zinc-600 bg-zinc-800 text-zinc-300 hover:bg-zinc-700";
            case "pwm":
              return "border-purple-500/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20";
            case "analog":
              return "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20";
            case "comm":
              return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20";
            case "digital":
              return "border-sky-500/40 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20";
            case "special":
              return "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20";
            default:
              return "border-base-content/20 bg-base-200 text-base-content hover:bg-base-300";
          }
        };

        const getPinTypeBadge = (type: BoardPin["type"]) => {
          switch (type) {
            case "power":
              return { label: "Güç (Power)", color: "badge-error" };
            case "gnd":
              return { label: "Toprak (GND)", color: "badge-neutral" };
            case "pwm":
              return { label: "PWM Çıkışı", color: "badge-secondary" };
            case "analog":
              return { label: "Analog ADC/DAC", color: "badge-warning" };
            case "comm":
              return { label: "Haberleşme (I2C/SPI/UART)", color: "badge-success" };
            case "digital":
              return { label: "Dijital G/Ç (GPIO)", color: "badge-info" };
            case "special":
              return { label: "Özel Fonksiyon", color: "badge-accent" };
            default:
              return { label: type, color: "badge-ghost" };
          }
        };

        const matchesPinFilter = (pin: BoardPin) => {
          if (pinFilter === "all") return true;
          if (pinFilter === "power") return pin.type === "power" || pin.type === "gnd";
          if (pinFilter === "pwm") return pin.type === "pwm";
          if (pinFilter === "analog") return pin.type === "analog";
          if (pinFilter === "comm") return pin.type === "comm";
          if (pinFilter === "digital") return pin.type === "digital";
          return true;
        };

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div
              className="bg-base-100 rounded-3xl border border-base-content/10 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Başlığı */}
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

              {/* Sekme Butonları */}
              <div className="flex border-b border-base-300 px-6 bg-base-200/40 gap-2">
                <button
                  onClick={() => setModalTab("specs")}
                  className={`py-3 px-4 text-xs font-mono font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                    modalTab === "specs"
                      ? "border-primary text-primary"
                      : "border-transparent text-base-content/60 hover:text-base-content"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Teknik Özellikler</span>
                </button>
                {pinout && (
                  <button
                    onClick={() => setModalTab("pinout")}
                    className={`py-3 px-4 text-xs font-mono font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                      modalTab === "pinout"
                        ? "border-primary text-primary"
                        : "border-transparent text-base-content/60 hover:text-base-content"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-accent" />
                    <span>İnteraktif Pinout Şeması</span>
                    <span className="badge badge-accent badge-xs font-mono text-[9px]">Yeni</span>
                  </button>
                )}
              </div>

              {/* SEKME 1: TEKNİK ÖZELLİKLER */}
              {modalTab === "specs" && (
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
              )}

              {/* SEKME 2: İNTERAKTİF PINOUT ŞEMASI */}
              {modalTab === "pinout" && pinout && (
                <div className="p-6 space-y-6 text-sm">
                  {/* Pin Filtreleri */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-base-200/60 border border-base-300">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-mono text-base-content/60 mr-1 flex items-center gap-1">
                        <Filter className="w-3.5 h-3.5" /> Filtrele:
                      </span>
                      {[
                        { id: "all", label: "Tümü" },
                        { id: "power", label: "Güç & Toprak" },
                        { id: "pwm", label: "PWM" },
                        { id: "analog", label: "Analog (ADC)" },
                        { id: "comm", label: "Haberleşme" },
                        { id: "digital", label: "Dijital GPIO" },
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setPinFilter(f.id)}
                          className={`btn btn-xs font-mono rounded-lg ${
                            pinFilter === f.id
                              ? "btn-primary shadow-xs font-bold"
                              : "btn-ghost border border-base-content/10 text-base-content/70"
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>

                    <div className="text-xs font-mono text-base-content/60">
                      Toplam: <strong>{pinout.totalPins} Pin</strong> • <strong>{pinout.operatingVoltage}</strong>
                    </div>
                  </div>

                  {/* İncelenen Pin Paneli (Pin Inspector) */}
                  <div className="p-4 rounded-2xl bg-base-200/80 border border-base-300 shadow-inner">
                    {activePin ? (
                      <div className="space-y-2 animate-in fade-in duration-150">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="badge badge-neutral font-mono font-bold text-xs">
                              Pin #{activePin.pinNumber}
                            </span>
                            <h4 className="text-base font-extrabold text-base-content font-mono">
                              {activePin.name}
                            </h4>
                          </div>
                          <span
                            className={`badge badge-sm font-mono text-xs ${
                              getPinTypeBadge(activePin.type).color
                            }`}
                          >
                            {getPinTypeBadge(activePin.type).label}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-mono text-base-content/50">Fonksiyonlar:</span>
                          {activePin.functions.map((fn, fIdx) => (
                            <span
                              key={fIdx}
                              className="badge badge-outline badge-xs font-mono text-[10px]"
                            >
                              {fn}
                            </span>
                          ))}
                        </div>

                        <p className="text-xs text-base-content/80 leading-relaxed pt-1 border-t border-base-content/10">
                          {activePin.description}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5 text-xs text-base-content/60 py-1">
                        <Info className="w-4 h-4 text-primary shrink-0" />
                        <span>
                          Donanımsal açıklamaları ve elektriksel limitleri görmek için aşağıdaki herhangi bir pinin üzerine gelin veya dokunun.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* İki Sütunlu Kart Pin Şeması */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    {/* Sol Header Pinleri */}
                    <div className="md:col-span-5 space-y-1.5">
                      <div className="text-[11px] font-mono uppercase font-bold text-base-content/50 px-1 mb-2">
                        Sol Header ({pinout.leftPins.length} Pin)
                      </div>
                      {pinout.leftPins.map((pin) => {
                        const isMatch = matchesPinFilter(pin);
                        const isSelected = activePin?.pinNumber === pin.pinNumber;
                        return (
                          <button
                            key={pin.pinNumber}
                            onMouseEnter={() => setActivePin(pin)}
                            onClick={() => setActivePin(pin)}
                            className={`w-full flex items-center justify-between p-2 rounded-xl border text-xs font-mono transition-all text-left ${getPinColor(
                              pin.type
                            )} ${!isMatch ? "opacity-30" : ""} ${
                              isSelected ? "ring-2 ring-primary shadow-md scale-[1.01]" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-[10px] font-bold opacity-60 w-5">
                                #{pin.pinNumber}
                              </span>
                              <span className="font-bold truncate">{pin.name}</span>
                            </div>
                            <span className="text-[10px] opacity-70 truncate ml-2">
                              {pin.functions[0] || ""}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Merkez Çip / Kart İllüstrasyonu */}
                    <div className="md:col-span-2 hidden md:flex flex-col items-center justify-center p-4 rounded-2xl bg-base-300/40 border border-base-300 min-h-[360px] text-center space-y-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                        <Radio className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-base-content/50 block">
                          MCU ÇEKİRDEK
                        </span>
                        <span className="text-xs font-mono font-bold text-base-content block truncate max-w-[110px]">
                          {activeBoardModal.chipset}
                        </span>
                      </div>
                      <div className="w-12 h-0.5 bg-base-content/10" />
                      <div className="text-[10px] font-mono text-base-content/70">
                        <div>{activeBoardModal.clockSpeed}</div>
                        <div>{pinout.operatingVoltage} Mantık</div>
                      </div>
                      <div className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider pt-2">
                        {activeBoardModal.vendor}
                      </div>
                    </div>

                    {/* Sağ Header Pinleri */}
                    <div className="md:col-span-5 space-y-1.5">
                      <div className="text-[11px] font-mono uppercase font-bold text-base-content/50 px-1 mb-2">
                        Sağ Header ({pinout.rightPins.length} Pin)
                      </div>
                      {pinout.rightPins.map((pin) => {
                        const isMatch = matchesPinFilter(pin);
                        const isSelected = activePin?.pinNumber === pin.pinNumber;
                        return (
                          <button
                            key={pin.pinNumber}
                            onMouseEnter={() => setActivePin(pin)}
                            onClick={() => setActivePin(pin)}
                            className={`w-full flex items-center justify-between p-2 rounded-xl border text-xs font-mono transition-all text-left ${getPinColor(
                              pin.type
                            )} ${!isMatch ? "opacity-30" : ""} ${
                              isSelected ? "ring-2 ring-primary shadow-md scale-[1.01]" : ""
                            }`}
                          >
                            <span className="text-[10px] opacity-70 truncate mr-2">
                              {pin.functions[0] || ""}
                            </span>
                            <div className="flex items-center gap-2 truncate justify-end">
                              <span className="font-bold truncate">{pin.name}</span>
                              <span className="text-[10px] font-bold opacity-60 w-5 text-right">
                                #{pin.pinNumber}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Renk Lejantı (Color Legend) */}
                  <div className="p-3 rounded-xl bg-base-200/40 border border-base-300 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono">
                    <span className="flex items-center gap-1.5 text-rose-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Güç (VCC)
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block" /> Toprak (GND)
                    </span>
                    <span className="flex items-center gap-1.5 text-purple-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> PWM
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Analog (ADC)
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Haberleşme (SPI/I2C/UART)
                    </span>
                    <span className="flex items-center gap-1.5 text-sky-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> Dijital GPIO
                    </span>
                  </div>
                </div>
              )}

              {/* Alt Buton */}
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
        );
      })()}

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
