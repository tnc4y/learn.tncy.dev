"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Cpu,
  Terminal,
  BookOpen,
  HelpCircle,
  Search,
  Menu,
  Layers,
  Wrench,
  TrendingUp,
  ChevronDown,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Code2,
  FolderGit2,
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";

interface NavbarProps {
  onToggleSidebar?: () => void;
  onOpenSearch?: () => void;
}

export default function Navbar({ onToggleSidebar, onOpenSearch }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fare menüden çıkınca hafif gecikmeli kapat (kullanıcı deneyimini pürüzsüzleştirir)
  const handleMouseEnter = (menuName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const closeDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(null);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-base-300 bg-base-100/95 backdrop-blur-md">
      <div className="navbar max-w-7xl mx-auto px-4 gap-2">
        {/* Sol Alan: Mobil Menü Butonu & Logo */}
        <div className="navbar-start gap-2">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="btn btn-ghost btn-square btn-sm lg:hidden"
              aria-label="Menüyü Aç/Kapat"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link
            href="/"
            onClick={closeDropdown}
            className="flex items-center gap-2.5 font-bold tracking-tight text-lg group"
          >
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-content transition-all">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-extrabold text-base leading-tight">
                learn.<span className="text-primary">tncy</span>.dev
              </span>
              <span className="text-[10px] text-base-content/60 uppercase font-mono tracking-wider">
                Yazılım & Donanım
              </span>
            </div>
          </Link>
        </div>

        {/* Orta Alan: Düzenli ve Gruplanmış Açılır Menüler (Hover & Click) */}
        <div className="navbar-center hidden lg:flex">
          <nav className="flex items-center gap-1 text-sm font-medium">
            {/* 1. EĞİTİM MENÜSÜ */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("education")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "education" ? null : "education")
                }
                className={`btn btn-ghost btn-sm font-semibold text-xs gap-1.5 transition-colors ${
                  activeDropdown === "education" ? "bg-base-200 text-primary" : "text-base-content/80"
                }`}
              >
                <GraduationCap className="w-4 h-4 text-primary" />
                <span>Eğitim</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                    activeDropdown === "education" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "education" && (
                <div className="absolute top-full left-0 pt-1.5 z-50 w-96 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-3 bg-base-100 rounded-2xl border border-base-300 shadow-2xl backdrop-blur-md space-y-1">
                    <div className="px-2 py-1 text-[10px] font-mono uppercase font-bold text-base-content/50 border-b border-base-content/5 mb-1 flex items-center justify-between">
                      <span>Öğrenme & Müfredat</span>
                      <span className="badge badge-primary badge-xs">12 Kurs</span>
                    </div>

                    {/* Kurslar */}
                    <Link
                      href="/courses"
                      onClick={closeDropdown}
                      className="p-2.5 rounded-xl hover:bg-base-200/80 transition-colors flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors shrink-0 mt-0.5">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-base-content group-hover:text-primary transition-colors flex items-center justify-between">
                          <span>Tüm Kurslar Kataloğu</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[11px] text-base-content/60 leading-relaxed mt-0.5">
                          Web, Gömülü C, Python, Modern C++, Rust ve FPGA çip tasarımı
                        </p>
                      </div>
                    </Link>

                    {/* Hızlı Başvuru (Cheatsheet) */}
                    <Link
                      href="/cheatsheet"
                      onClick={closeDropdown}
                      className="p-2.5 rounded-xl hover:bg-base-200/80 transition-colors flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-content transition-colors shrink-0 mt-0.5">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-base-content group-hover:text-accent transition-colors flex items-center justify-between">
                          <span>Hızlı Başvuru (Cheatsheet)</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[11px] text-base-content/60 leading-relaxed mt-0.5">
                          Bitwise maskeleme, volatile kuralı, CSS Flexbox/Grid ve özet tablolar
                        </p>
                      </div>
                    </Link>

                    {/* Mülakatlar */}
                    <Link
                      href="/interview"
                      onClick={closeDropdown}
                      className="p-2.5 rounded-xl hover:bg-base-200/80 transition-colors flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-info/10 text-info group-hover:bg-info group-hover:text-info-content transition-colors shrink-0 mt-0.5">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-base-content group-hover:text-info transition-colors flex items-center justify-between">
                          <span>Teknik Mülakat & Bilgi Kartları</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[11px] text-base-content/60 leading-relaxed mt-0.5">
                          25+ kritik mülakat sorusu ve 3D çevrilebilir bilgi kartı simülatörü
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. LABORATUVAR & ARAÇLAR MENÜSÜ */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("lab")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "lab" ? null : "lab")
                }
                className={`btn btn-ghost btn-sm font-semibold text-xs gap-1.5 transition-colors ${
                  activeDropdown === "lab" ? "bg-base-200 text-secondary" : "text-base-content/80"
                }`}
              >
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Laboratuvar & Araçlar</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                    activeDropdown === "lab" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "lab" && (
                <div className="absolute top-full left-0 pt-1.5 z-50 w-96 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-3 bg-base-100 rounded-2xl border border-base-300 shadow-2xl backdrop-blur-md space-y-1">
                    <div className="px-2 py-1 text-[10px] font-mono uppercase font-bold text-base-content/50 border-b border-base-content/5 mb-1 flex items-center justify-between">
                      <span>Uygulama & Donanım Araçları</span>
                      <span className="badge badge-secondary badge-xs">İnteraktif</span>
                    </div>

                    {/* Geliştirme Kartları & Pinout */}
                    <Link
                      href="/boards"
                      onClick={closeDropdown}
                      className="p-2.5 rounded-xl hover:bg-base-200/80 transition-colors flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-warning/10 text-warning group-hover:bg-warning group-hover:text-warning-content transition-colors shrink-0 mt-0.5">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-base-content group-hover:text-warning transition-colors flex items-center justify-between">
                          <span>Geliştirme Kartları & Pinout</span>
                          <span className="badge badge-accent badge-xs font-mono text-[9px]">Yeni</span>
                        </div>
                        <p className="text-[11px] text-base-content/60 leading-relaxed mt-0.5">
                          Arduino, ESP32, Pico bacak şemaları ve teknik yan yana karşılaştırma
                        </p>
                      </div>
                    </Link>

                    {/* Kendin Dene (Playground) */}
                    <Link
                      href="/playground"
                      onClick={closeDropdown}
                      className="p-2.5 rounded-xl hover:bg-base-200/80 transition-colors flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-content transition-colors shrink-0 mt-0.5">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-base-content group-hover:text-secondary transition-colors flex items-center justify-between">
                          <span>Kendin Dene (Playground)</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[11px] text-base-content/60 leading-relaxed mt-0.5">
                          Çok dilli tam ekran kod simülatörü ve sinyal dalga formu analizörü
                        </p>
                      </div>
                    </Link>

                    {/* Mühendislik Hesaplayıcıları */}
                    <Link
                      href="/tools"
                      onClick={closeDropdown}
                      className="p-2.5 rounded-xl hover:bg-base-200/80 transition-colors flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-warning/10 text-warning group-hover:bg-warning group-hover:text-warning-content transition-colors shrink-0 mt-0.5">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-base-content group-hover:text-warning transition-colors flex items-center justify-between">
                          <span>Mühendislik Hesaplayıcıları</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[11px] text-base-content/60 leading-relaxed mt-0.5">
                          Direnç, LED, mantık kapıları ve klavye / fare / gamepad donanım test cihazları
                        </p>
                      </div>
                    </Link>

                    {/* Proje Atölyesi */}
                    <Link
                      href="/projects"
                      onClick={closeDropdown}
                      className="p-2.5 rounded-xl hover:bg-base-200/80 transition-colors flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0 mt-0.5">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-base-content group-hover:text-emerald-500 transition-colors flex items-center justify-between">
                          <span>Donanım Proje Atölyesi</span>
                          <span className="badge badge-success badge-xs font-mono text-[9px]">Yeni</span>
                        </div>
                        <p className="text-[11px] text-base-content/60 leading-relaxed mt-0.5">
                          ESP32 IoT, FPGA VGA Pong, STM32 FreeRTOS ve Web Serial projeleri
                        </p>
                      </div>
                    </Link>

                    {/* Nasıl Yapılır & Kılavuzlar */}
                    <Link
                      href="/guides"
                      onClick={closeDropdown}
                      className="p-2.5 rounded-xl hover:bg-base-200/80 transition-colors flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-content transition-colors shrink-0 mt-0.5">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-base-content group-hover:text-secondary transition-colors flex items-center justify-between">
                          <span>Nasıl Yapılır (Kılavuzlar)</span>
                          <span className="badge badge-secondary badge-xs font-mono text-[9px]">Cookbook</span>
                        </div>
                        <p className="text-[11px] text-base-content/60 leading-relaxed mt-0.5">
                          Arch Linux UEFI, Hyprland & Caelestia, ROS 2 LiDAR haritalama ve flashing
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. İLERLEME (DOĞRUDAN BAĞLANTI) */}
            <Link
              href="/progress"
              onClick={closeDropdown}
              className="btn btn-ghost btn-sm font-semibold text-xs gap-1.5 hover:text-success transition-colors text-base-content/80"
            >
              <TrendingUp className="w-4 h-4 text-success" />
              <span>İlerleme</span>
            </Link>
          </nav>
        </div>

        {/* Sağ Alan: Arama & Tema */}
        <div className="navbar-end gap-2">
          <button
            onClick={onOpenSearch}
            className="btn btn-ghost btn-sm gap-2 border border-base-content/10 hidden sm:flex text-base-content/70 hover:text-base-content"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="text-xs">Derslerde ara...</span>
            <kbd className="kbd kbd-xs font-mono opacity-60">⌘K</kbd>
          </button>

          <button
            onClick={onOpenSearch}
            className="btn btn-ghost btn-sm btn-square sm:hidden"
            aria-label="Ara"
          >
            <Search className="w-4 h-4" />
          </button>

          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
