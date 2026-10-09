"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";
import {
  X,
  BookOpen,
  Cpu,
  HelpCircle,
  Layers,
  Terminal,
  Wrench,
  TrendingUp,
  ArrowRight,
  FolderGit2,
  Keyboard,
} from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [mobileDrawerTab, setMobileDrawerTab] = useState<"nav" | "curriculum">("nav");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Navbar
        onToggleSidebar={() => setIsMobileDrawerOpen((prev) => !prev)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1 flex flex-col">{children}</main>

      {/* Mobil Çekmece (Sidebar Drawer) */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-80 max-w-[85vw] h-full bg-base-100 shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            {/* Üst Başlık & Sekmeler */}
            <div className="p-3 border-b border-base-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center p-0.5 bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                  <Image
                    src="/logo.png"
                    alt="learn.tncy.dev Logo"
                    width={28}
                    height={28}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-1 bg-base-200 p-0.5 rounded-lg text-xs font-mono">
                <button
                  onClick={() => setMobileDrawerTab("nav")}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    mobileDrawerTab === "nav"
                      ? "bg-base-100 text-primary shadow-xs"
                      : "text-base-content/60"
                  }`}
                >
                  Menü
                </button>
                <button
                  onClick={() => setMobileDrawerTab("curriculum")}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    mobileDrawerTab === "curriculum"
                      ? "bg-base-100 text-primary shadow-xs"
                      : "text-base-content/60"
                  }`}
                >
                  Dersler
                </button>
              </div>
            </div>

              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="btn btn-ghost btn-xs btn-square"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* İçerik */}
            <div className="flex-1 overflow-y-auto">
              {mobileDrawerTab === "nav" ? (
                <div className="p-4 space-y-5 text-sm">
                  {/* Eğitim Grubu */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-base-content/50 px-1">
                      Eğitim & Müfredat
                    </span>
                    <div className="space-y-1">
                      <Link
                        href="/courses"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-base-200 text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span>Tüm Kurslar Kataloğu</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-base-content/40" />
                      </Link>

                      <Link
                        href="/cheatsheet"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-base-200 text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2.5">
                          <Cpu className="w-4 h-4 text-accent" />
                          <span>Hızlı Başvuru (Cheatsheet)</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-base-content/40" />
                      </Link>

                      <Link
                        href="/interview"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-base-200 text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2.5">
                          <HelpCircle className="w-4 h-4 text-info" />
                          <span>Teknik Mülakat & Flashcards</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-base-content/40" />
                      </Link>

                      <Link
                        href="/blog"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-base-200 text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4 text-emerald-500" />
                          <span>Mühendislik Blogu</span>
                        </div>
                        <span className="badge badge-success badge-xs font-mono">Yeni</span>
                      </Link>
                    </div>
                  </div>

                  {/* Laboratuvar Grubu */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-base-content/50 px-1">
                      Laboratuvar & Araçlar
                    </span>
                    <div className="space-y-1">
                      <Link
                        href="/boards"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-base-200 text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2.5">
                          <Layers className="w-4 h-4 text-warning" />
                          <span>Geliştirme Kartları & Pinout</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-base-content/40" />
                      </Link>

                      <Link
                        href="/playground"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-base-200 text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2.5">
                          <Terminal className="w-4 h-4 text-secondary" />
                          <span>Kendin Dene (Playground)</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-base-content/40" />
                      </Link>

                      <Link
                        href="/tools"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-base-200 text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2.5">
                          <Wrench className="w-4 h-4 text-warning" />
                          <span>Mühendislik Hesaplayıcıları</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-base-content/40" />
                      </Link>

                      <Link
                        href="/tester"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-base-200 text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2.5">
                          <Keyboard className="w-4 h-4 text-cyan-500" />
                          <span>Giriş Test Laboratuvarı</span>
                        </div>
                        <span className="badge badge-accent badge-xs font-mono">Yeni</span>
                      </Link>

                      <Link
                        href="/projects"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-base-200 text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2.5">
                          <FolderGit2 className="w-4 h-4 text-emerald-500" />
                          <span>Donanım Proje Atölyesi</span>
                        </div>
                        <span className="badge badge-success badge-xs font-mono">Yeni</span>
                      </Link>

                      <Link
                        href="/guides"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-base-200 text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2.5">
                          <Terminal className="w-4 h-4 text-secondary" />
                          <span>Nasıl Yapılır & Kılavuzlar</span>
                        </div>
                        <span className="badge badge-secondary badge-xs font-mono">Cookbook</span>
                      </Link>
                    </div>
                  </div>

                  {/* İlerleme */}
                  <div className="pt-2 border-t border-base-content/10">
                    <Link
                      href="/progress"
                      onClick={() => setIsMobileDrawerOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-success/10 text-success text-xs font-bold"
                    >
                      <div className="flex items-center gap-2.5">
                        <TrendingUp className="w-4 h-4" />
                        <span>Kişisel İlerleme & Rozetler</span>
                      </div>
                      <span className="badge badge-success badge-xs font-mono">Yerel</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <Sidebar onSelectLesson={() => setIsMobileDrawerOpen(false)} />
                </div>
              )}
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
