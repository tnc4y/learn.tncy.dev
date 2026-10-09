"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";
import { X } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

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
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-xs">
          <div className="w-80 max-w-[85vw] h-full bg-base-100 shadow-2xl flex flex-col">
            <div className="p-3 border-b border-base-300 flex items-center justify-between">
              <span className="font-bold text-xs uppercase font-mono text-primary">
                Ders Menüsü
              </span>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="btn btn-ghost btn-xs btn-square"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Sidebar onSelectLesson={() => setIsMobileDrawerOpen(false)} />
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
