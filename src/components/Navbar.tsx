"use client";

import Link from "next/link";
import { Cpu, Terminal, BookOpen, HelpCircle, Search, Menu } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

interface NavbarProps {
  onToggleSidebar?: () => void;
  onOpenSearch?: () => void;
}

export default function Navbar({ onToggleSidebar, onOpenSearch }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-base-300 bg-base-100/90 backdrop-blur-md">
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

          <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-lg group">
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-content transition-all">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-extrabold text-base leading-tight">
                learn.<span className="text-primary">tncy</span>.dev
              </span>
              <span className="text-[10px] text-base-content/60 uppercase font-mono tracking-wider">
                SystemVerilog & Embedded
              </span>
            </div>
          </Link>
        </div>

        {/* Orta Alan: Navigasyon Linkleri */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-1 text-sm font-medium">
            <li>
              <Link href="/tutorial/intro" className="flex items-center gap-1.5 active:bg-primary">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>Dersler</span>
              </Link>
            </li>
            <li>
              <Link href="/playground" className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-secondary" />
                <span>Kendin Dene</span>
                <span className="badge badge-xs badge-secondary font-mono">Live</span>
              </Link>
            </li>
            <li>
              <Link href="/cheatsheet" className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-accent" />
                <span>Hızlı Başvuru</span>
              </Link>
            </li>
            <li>
              <Link href="/tutorial/interview-prep" className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-info" />
                <span>Mülakat Soru Bankası</span>
              </Link>
            </li>
          </ul>
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
