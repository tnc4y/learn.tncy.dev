"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { COURSES } from "@/data/curriculum";
import { BLOG_POSTS } from "@/data/blogData";
import { Search, X, ArrowRight, BookOpen } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allLessons = COURSES.flatMap((course) =>
    course.modules.flatMap((m) =>
      m.lessons.map((l) => ({
        type: "lesson" as const,
        id: l.id,
        url: `/tutorial/${l.id}`,
        title: l.title,
        shortTitle: l.shortTitle,
        description: l.description,
        badge: course.shortTitle,
        badgeColor: course.color,
        subtitle: `Modül ${m.number}: ${m.title}`,
      }))
    )
  );

  const allBlogs = BLOG_POSTS.map((b) => ({
    type: "blog" as const,
    id: b.slug,
    url: `/blog/${b.slug}`,
    title: b.title,
    shortTitle: b.title,
    description: b.excerpt,
    badge: "Blog",
    badgeColor: b.categoryColor,
    subtitle: `${b.category} • ${b.readTime}`,
  }));

  const allItems = [...allBlogs, ...allLessons];

  const filtered = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.shortTitle.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.badge.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (url: string) => {
    onClose();
    setQuery("");
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-xl bg-base-100 rounded-2xl shadow-2xl border border-base-content/10 overflow-hidden flex flex-col max-h-[75vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Arama Girişi */}
        <div className="p-3.5 border-b border-base-300 flex items-center gap-3">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            type="text"
            placeholder="Konu, anahtar kelime veya dil ara (örn. HTML, Arduino, Python, pointer)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="btn btn-ghost btn-xs btn-square"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sonuçlar Listesi */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-base-content/5">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={`${item.type}-${item.id}`}
                onClick={() => handleSelect(item.url)}
                className="w-full text-left p-3 hover:bg-base-200/80 rounded-lg flex items-center justify-between group transition-colors"
              >
                <div className="space-y-1 pr-2 truncate">
                  <div className="flex items-center gap-2">
                    <span className={`badge ${item.badgeColor} badge-xs font-mono font-bold`}>
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-mono text-base-content/50">
                      {item.subtitle}
                    </span>
                    <span className="font-semibold text-xs sm:text-sm text-base-content group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-base-content/60 truncate">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-base-content/30 group-hover:text-primary shrink-0 transition-transform group-hover:translate-x-1" />
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-base-content/50">
              &quot;{query}&quot; için arama sonucu bulunamadı.
            </div>
          )}
        </div>

        {/* Alt Bilgi */}
        <div className="p-2.5 bg-base-200/50 border-t border-base-300 flex items-center justify-between text-[11px] text-base-content/50 px-4">
          <span>Seçmek için tıkla</span>
          <kbd className="kbd kbd-xs font-mono">ESC ile kapat</kbd>
        </div>
      </div>
    </div>
  );
}
