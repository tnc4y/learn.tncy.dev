"use client";

import { useState } from "react";
import { INTERVIEW_QUESTIONS, InterviewQuestion } from "@/data/interviewData";
import {
  HelpCircle,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  CheckCircle,
  Eye,
  List,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Tüm Sorular" },
  { id: "hardware", label: "Donanım & FPGA" },
  { id: "embedded", label: "Gömülü Sistemler & C" },
  { id: "web", label: "Web Geliştirme" },
  { id: "languages", label: "Sistem & Diller (C++/Rust/Py)" },
];

export default function InterviewPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"flashcard" | "list">("flashcard");
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const filteredQuestions = INTERVIEW_QUESTIONS.filter((q) => {
    const matchesCat = activeCategory === "all" || q.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.detailedAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const currentQuestion: InterviewQuestion | undefined =
    filteredQuestions[currentCardIdx] || filteredQuestions[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIdx((prev) => (prev + 1) % filteredQuestions.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIdx((prev) =>
      prev === 0 ? filteredQuestions.length - 1 : prev - 1
    );
  };

  const toggleAccordion = (id: string) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8 pb-20">
      {/* 1. Üst Başlık & Açıklama */}
      <div className="border-b border-base-300 pb-6 space-y-3">
        <div className="flex items-center gap-2 text-info font-mono text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Teknik Görüşme & Mülakat Simülasyonu</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
              Teknik Mülakat Soru Bankası & Flashcard
            </h1>
            <p className="text-sm sm:text-base text-base-content/70 mt-1">
              Savunma sanayii, çip tasarım, gömülü yazılım ve modern web pozisyonlarında en sık sorulan gerçek teknik mülakat soruları.
            </p>
          </div>

          {/* Görünüm Modu Değiştirici */}
          <div className="flex items-center gap-1 bg-base-200 p-1 rounded-2xl border border-base-300 shrink-0">
            <button
              onClick={() => {
                setViewMode("flashcard");
                setIsFlipped(false);
              }}
              className={`btn btn-xs font-mono text-xs gap-1.5 rounded-xl ${
                viewMode === "flashcard"
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flashcard</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`btn btn-xs font-mono text-xs gap-1.5 rounded-xl ${
                viewMode === "list"
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost text-base-content/70"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Soru Listesi</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Filtreler & Arama Çubuğu */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-base-200/50 border border-base-300">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentCardIdx(0);
                setIsFlipped(false);
              }}
              className={`btn btn-xs sm:btn-sm font-mono text-xs whitespace-nowrap rounded-xl ${
                activeCategory === cat.id
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost border border-base-content/10 text-base-content/75"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Mülakat sorusu ara..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentCardIdx(0);
            }}
            className="input input-sm input-bordered w-full pl-9 pr-3 text-xs focus:border-primary"
          />
        </div>
      </div>

      {/* 3. A) FLASHCARD (BİLGİ KARTI) GÖRÜNÜMÜ */}
      {viewMode === "flashcard" && currentQuestion && (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-150">
          {/* Kart İlerleme Göstergesi */}
          <div className="flex items-center justify-between text-xs font-mono text-base-content/60 px-2">
            <span>
              Soru <strong>{currentCardIdx + 1}</strong> / {filteredQuestions.length}
            </span>
            <span className="flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5" />
              Karta tıklayarak cevabı açın
            </span>
          </div>

          {/* İnteraktif Çevrilebilir 3D Kart */}
          <div
            onClick={() => setIsFlipped((prev) => !prev)}
            className="cursor-pointer min-h-[380px] rounded-3xl p-6 sm:p-8 bg-base-100 border-2 border-base-300 shadow-xl hover:border-primary/40 transition-all flex flex-col justify-between group relative overflow-hidden select-none"
          >
            {/* Üst Rozetler */}
            <div className="flex items-center justify-between gap-2 border-b border-base-content/10 pb-4">
              <span className={`badge ${currentQuestion.categoryColor} badge-sm font-mono font-bold`}>
                {currentQuestion.categoryLabel}
              </span>
              <div className="flex items-center gap-2">
                <span className="badge badge-neutral badge-sm font-mono text-[10px]">
                  {currentQuestion.level}
                </span>
                <span className="badge badge-outline badge-sm font-mono text-[10px] text-primary">
                  {isFlipped ? "Cevap Görünümü" : "Soru Görünümü"}
                </span>
              </div>
            </div>

            {/* Ön Yüz: Soru */}
            {!isFlipped ? (
              <div className="my-auto py-6 space-y-4 text-center sm:text-left">
                <div className="text-xs font-mono uppercase text-base-content/40 tracking-wider font-bold">
                  Mülakat Sorusu:
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-base-content leading-snug group-hover:text-primary transition-colors">
                  {currentQuestion.question}
                </h2>
                <div className="p-3 rounded-xl bg-base-200/60 border border-base-content/5 text-xs text-base-content/70 italic">
                  💡 İpucu: Cevabı ve kilit noktaları görmek için karta dokunun.
                </div>
              </div>
            ) : (
              /* Arka Yüz: Teknik Cevap & Kod */
              <div className="my-auto py-4 space-y-4 text-left animate-in fade-in duration-150">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-success block">
                    Teknik Özet:
                  </span>
                  <p className="text-sm font-bold text-base-content leading-relaxed">
                    {currentQuestion.shortSummary}
                  </p>
                </div>

                {/* Kilit Maddeler */}
                <div className="space-y-1.5 bg-base-200/70 p-3.5 rounded-xl border border-base-content/5 text-xs">
                  <span className="font-bold text-[10px] font-mono uppercase text-base-content/50 block">
                    Kilit Noktalar (Mülakatta Vurgulanacaklar):
                  </span>
                  <ul className="space-y-1 text-base-content/80 list-disc pl-4">
                    {currentQuestion.keyPoints.map((pt, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Varsa Kod Örneği */}
                {currentQuestion.codeSnippet && (
                  <div className="rounded-xl overflow-hidden border border-base-300 bg-[#1e1e2e] text-[#cdd6f4] p-3 text-xs font-mono max-h-36 overflow-y-auto">
                    <pre>
                      <code>{currentQuestion.codeSnippet.snippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Alt Kontrol / Çevirme İpucu */}
            <div className="pt-4 border-t border-base-content/10 flex items-center justify-between text-xs font-mono text-base-content/50">
              <span className="flex items-center gap-1.5 text-primary font-semibold">
                <RotateCw className="w-3.5 h-3.5" />
                {isFlipped ? "Soruya Dön" : "Cevabı Çevir"}
              </span>
              <span>Dokunarak Çevir</span>
            </div>
          </div>

          {/* Önceki & Sonraki Butonları */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={handlePrevCard}
              className="btn btn-outline btn-sm font-mono gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Önceki Soru</span>
            </button>

            <button
              onClick={() => setIsFlipped((prev) => !prev)}
              className="btn btn-ghost btn-sm font-mono text-xs text-primary"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Kartı Çevir</span>
            </button>

            <button
              onClick={handleNextCard}
              className="btn btn-primary btn-sm font-mono gap-1.5 shadow-xs"
            >
              <span>Sonraki Soru</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. B) SORU LİSTESİ (AKORDEON LİSTE) GÖRÜNÜMÜ */}
      {viewMode === "list" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="text-xs font-mono text-base-content/60">
            Toplam {filteredQuestions.length} soru listeleniyor.
          </div>

          <div className="space-y-3">
            {filteredQuestions.map((item) => {
              const isOpen = expandedQuestionId === item.id;

              return (
                <div
                  key={item.id}
                  className="border border-base-300 rounded-2xl bg-base-100 overflow-hidden shadow-xs hover:border-primary/40 transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left hover:bg-base-200/50 transition-colors"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`badge ${item.categoryColor} badge-xs font-mono font-bold`}>
                          {item.categoryLabel}
                        </span>
                        <span className="badge badge-neutral badge-xs font-mono">
                          {item.level}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-base-content">
                        {item.question}
                      </h3>
                      <p className="text-xs text-base-content/70 line-clamp-1">
                        {item.shortSummary}
                      </p>
                    </div>

                    <div className="p-1 rounded-lg bg-base-200 shrink-0 mt-1">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-base-content/60" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-base-content/60" />
                      )}
                    </div>
                  </button>

                  {/* Genişletilmiş Cevap Bölümü */}
                  {isOpen && (
                    <div className="p-5 border-t border-base-300 bg-base-200/30 space-y-4 text-xs sm:text-sm animate-in fade-in duration-150">
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold text-success block mb-1">
                          Teknik Yanıt:
                        </span>
                        <div className="prose prose-sm max-w-none text-base-content/90 whitespace-pre-line leading-relaxed">
                          {item.detailedAnswer}
                        </div>
                      </div>

                      {/* Kilit Noktalar */}
                      <div className="p-3.5 rounded-xl bg-base-100 border border-base-300 space-y-1 text-xs">
                        <span className="font-bold text-[10px] font-mono uppercase text-base-content/50 block">
                          Mülakatta Vurgulanması Gereken Kilit Başlıklar:
                        </span>
                        <ul className="list-disc pl-4 space-y-1 text-base-content/80">
                          {item.keyPoints.map((pt, idx) => (
                            <li key={idx}>{pt}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Kod Parçacığı */}
                      {item.codeSnippet && (
                        <div className="rounded-xl overflow-hidden border border-base-300 bg-[#1e1e2e] text-[#cdd6f4]">
                          <div className="px-3 py-1.5 bg-base-300/40 border-b border-white/10 text-[10px] font-mono uppercase text-base-content/60">
                            {item.codeSnippet.language}
                          </div>
                          <pre className="p-3.5 text-xs font-mono overflow-x-auto leading-relaxed">
                            <code>{item.codeSnippet.snippet}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {filteredQuestions.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-base-200/40 border border-base-300 space-y-2">
          <HelpCircle className="w-8 h-8 text-base-content/30 mx-auto" />
          <h3 className="font-bold text-base text-base-content">Soru Bulunamadı</h3>
          <p className="text-xs text-base-content/60">
            Arama terimlerinizi değiştirerek tekrar deneyebilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
}
