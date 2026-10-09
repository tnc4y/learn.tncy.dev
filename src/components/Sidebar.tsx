"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CURRICULUM } from "@/data/curriculum";
import { Search, ChevronDown, ChevronRight, Terminal } from "lucide-react";

interface SidebarProps {
  onSelectLesson?: () => void;
}

export default function Sidebar({ onSelectLesson }: SidebarProps) {
  const pathname = usePathname();
  const [filterText, setFilterText] = useState("");
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    basics: true,
    "data-types": true,
    arrays: true,
  });

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const filteredModules = CURRICULUM.map((mod) => {
    const matchingLessons = mod.lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(filterText.toLowerCase()) ||
        l.shortTitle.toLowerCase().includes(filterText.toLowerCase()) ||
        l.description.toLowerCase().includes(filterText.toLowerCase())
    );
    return {
      ...mod,
      lessons: matchingLessons,
    };
  }).filter((mod) => filterText === "" || mod.lessons.length > 0);

  const totalLessons = CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <aside className="w-full h-full flex flex-col bg-base-100 border-r border-base-300 select-none">
      {/* Üst Başlık & Arama Çubuğu */}
      <div className="p-3 border-b border-base-300 space-y-2">
        <div className="flex items-center justify-between text-xs text-base-content/70">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-primary">
            Müfredat Ağacı
          </span>
          <span className="badge badge-sm badge-neutral font-mono">{totalLessons} Ders</span>
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Konu veya terim ara..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="input input-xs input-bordered w-full pl-8 pr-2 focus:outline-none focus:border-primary text-xs"
          />
        </div>
      </div>

      {/* Ders Listesi (Kaydırılabilir Alan) */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredModules.map((mod) => {
          const isOpen = filterText !== "" || !!openModules[mod.id];
          const isModuleActive = mod.lessons.some((l) => pathname === `/tutorial/${l.id}`);

          return (
            <div key={mod.id} className="rounded-lg overflow-hidden">
              {/* Modül Başlığı / Akordeon Düğmesi */}
              <button
                onClick={() => toggleModule(mod.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors text-left ${
                  isModuleActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "hover:bg-base-200 text-base-content/90"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-[11px] text-base-content/50 w-4">
                    {mod.number}.
                  </span>
                  <span className="truncate">{mod.title}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px] text-base-content/40 font-mono">
                    ({mod.lessons.length})
                  </span>
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-base-content/40" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-base-content/40" />
                  )}
                </div>
              </button>

              {/* Modülün Dersleri */}
              {isOpen && (
                <ul className="pl-4 pr-1 py-1 space-y-0.5 border-l-2 border-base-300 ml-3.5 my-0.5">
                  {mod.lessons.map((lesson) => {
                    const isActive = pathname === `/tutorial/${lesson.id}`;

                    return (
                      <li key={lesson.id}>
                        <Link
                          href={`/tutorial/${lesson.id}`}
                          onClick={onSelectLesson}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-md text-xs transition-colors group ${
                            isActive
                              ? "bg-primary text-primary-content font-semibold shadow-xs"
                              : "hover:bg-base-200 text-base-content/80 hover:text-base-content"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="truncate">{lesson.shortTitle}</span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {lesson.hasPlayground && (
                              <span
                                title="İnteraktif Deneme Alanı Mevcut"
                                className={`p-0.5 rounded ${
                                  isActive
                                    ? "text-primary-content/80"
                                    : "text-secondary opacity-70 group-hover:opacity-100"
                                }`}
                              >
                                <Terminal className="w-3 h-3" />
                              </span>
                            )}
                            <span
                              className={`text-[9px] uppercase px-1 py-0.2 rounded font-mono ${
                                isActive
                                  ? "bg-primary-content/20 text-primary-content"
                                  : lesson.category === "Design"
                                  ? "bg-info/10 text-info"
                                  : lesson.category === "Verification"
                                  ? "bg-success/10 text-success"
                                  : "bg-base-300 text-base-content/60"
                              }`}
                            >
                              {lesson.category === "Design"
                                ? "RTL"
                                : lesson.category === "Verification"
                                ? "TB"
                                : "SYS"}
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {filteredModules.length === 0 && (
          <div className="p-4 text-center text-xs text-base-content/50">
            Aramanıza uygun konu bulunamadı.
          </div>
        )}
      </div>

      {/* Alt Bilgi & Hızlı İpucu */}
      <div className="p-2.5 border-t border-base-300 bg-base-200/50 text-[11px] text-base-content/60 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-success inline-block"></span>
          RTL: Sentezlenebilir
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-info inline-block"></span>
          TB: Testbench
        </span>
      </div>
    </aside>
  );
}
