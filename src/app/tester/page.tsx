"use client";

import { useState, useEffect } from "react";
import KeyboardTester from "@/components/tools/KeyboardTester";
import KeyboardSpeedTester from "@/components/tools/KeyboardSpeedTester";
import MouseTester from "@/components/tools/MouseTester";
import MouseSpeedTester from "@/components/tools/MouseSpeedTester";
import GamepadTester from "@/components/tools/GamepadTester";
import {
  Keyboard,
  MousePointer,
  Gamepad2,
  Sparkles,
  Zap,
  Timer,
  Activity,
  Flame,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";

type TesterTab = "keyboard" | "keyboard_speed" | "mouse" | "mouse_speed" | "gamepad";

interface ToolCard {
  id: TesterTab;
  title: string;
  badge: string;
  badgeColor: string;
  category: "Klavye" | "Fare" | "Gamepad";
  description: string;
  icon: typeof Keyboard;
  features: string[];
}

const TOOL_CARDS: ToolCard[] = [
  {
    id: "keyboard",
    title: "Klavye Donanım & Rollover (NKRO)",
    badge: "Anti-Ghosting",
    badgeColor: "badge-primary",
    category: "Klavye",
    description: "Tüm klavye tuşlarının donanımsal çalışırlığı, N-Key Rollover (aynı anda basılan tuş rekoru) ve mekanik switch sesleri.",
    icon: Keyboard,
    features: ["Türkçe Q & ANSI", "NKRO Eşzamanlı Tuş", "Mekanik Ses Efekti", "Kısayol Kalkanı"],
  },
  {
    id: "keyboard_speed",
    title: "Klavye Yazma Hız Testi (WPM)",
    badge: "Daktilo Benchmark",
    badgeColor: "badge-secondary",
    category: "Klavye",
    description: "15, 30 ve 60 saniyelik sürelerde daktilo hızınızı (WPM), dakika başına karakteri (CPM) ve doğruluk yüzdenizi ölçün.",
    icon: Flame,
    features: ["15s/30s/60s Modu", "Türkçe & İngilizce", "Canlı Doğruluk %", "Hız Karnesi"],
  },
  {
    id: "mouse",
    title: "Fare Donanım & Sensör Testi",
    badge: "Polling Rate & Debounce",
    badgeColor: "badge-accent",
    category: "Fare",
    description: "Sol, Sağ, Orta, Yan tuşlar, tekerlek kaydırma, hatalı çift tıklama (switch chatter) ve 1000Hz polling rate analizi.",
    icon: MousePointer,
    features: ["5 Buton Tespiti", "Tekerlek Delta Yönü", "Çift Tık Hata Dedektörü", "Canlı Hz Ölçümü"],
  },
  {
    id: "mouse_speed",
    title: "Fare Tıklama Hız Testi (CPS)",
    badge: "Clicks Per Second",
    badgeColor: "badge-warning",
    category: "Fare",
    description: "5 veya 10 saniyede saniye başına kaç tıklama (CPS) yapabildiğinizi ölçün; Normal, Jitter veya Butterfly klik seviyenizi görün.",
    icon: Zap,
    features: ["5s & 10s Test", "Canlı CPS Sayacı", "Jitter/Butterfly Rehberi", "Refleks Karnesi"],
  },
  {
    id: "gamepad",
    title: "Gamepad & Joystick Testi",
    badge: "W3C Gamepad API",
    badgeColor: "badge-info",
    category: "Gamepad",
    description: "Xbox, PlayStation (DualSense/DS4) veya USB kolların 17 butonu, 2D analog drift/ölü bölge radarı ve çift motorlu titreşimi.",
    icon: Gamepad2,
    features: ["W3C Gamepad API", "2D Drift Radarı", "Tetik Basınç Barı", "Titreşim (Rumble) Testi"],
  },
];

export default function TesterPage() {
  const [activeTab, setActiveTab] = useState<TesterTab>("keyboard");

  // URL parametresinden doğrudan araç seçme (?tab=keyboard_speed vb.)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get("tab") as TesterTab;
        if (tab && TOOL_CARDS.some((c) => c.id === tab)) {
          setActiveTab(tab);
        }
      }
    } catch {}
  }, []);

  const activeCard = TOOL_CARDS.find((c) => c.id === activeTab) || TOOL_CARDS[0];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8 pb-20">
      {/* 1. ÜST BAŞLIK & AÇIKLAMA */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Donanım Giriş & Performans Test Laboratuvarı</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
          Giriş Cihazları Test <span className="text-secondary">Laboratuvarı</span>
        </h1>

        <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
          Klavye, fare ve oyun kollarınızı tarayıcınızda donanımsal olarak test edin; tuş algılama,
          N-Key Rollover, yazma hızı (WPM), tıklama hızı (CPS), çift tık mikroswitch hataları ve analog joystick drift ölçümlerini gerçekleştirin.
        </p>
      </div>

      {/* 2. GÖRSEL ARAÇ SEÇİM KARTLARI (KOLAY SEÇİM EKRANI) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60">
            Kullanmak İstediğiniz Testi Seçin:
          </span>
          <span className="text-xs font-mono text-base-content/40">
            {TOOL_CARDS.length} Test Modülü
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TOOL_CARDS.map((card) => {
            const isSelected = activeTab === card.id;
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                onClick={() => setActiveTab(card.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 select-none ${
                  isSelected
                    ? "bg-base-100 border-secondary shadow-md ring-2 ring-secondary/30 scale-[1.02]"
                    : "bg-base-100/70 border-base-300 hover:border-base-content/30 hover:bg-base-100"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-secondary text-secondary-content shadow-xs"
                          : "bg-base-200 text-base-content/70"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`badge ${card.badgeColor} badge-xs font-mono font-bold text-[9px]`}>
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-xs sm:text-sm font-bold leading-snug transition-colors ${
                        isSelected ? "text-secondary font-black" : "text-base-content"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-base-content/60 line-clamp-2 mt-1 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1 border-t border-base-content/5">
                  {card.features.slice(0, 2).map((feat, fIdx) => (
                    <span key={fIdx} className="badge badge-neutral badge-xs font-mono text-[9px]">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. AKTİF ARAÇ ÇALIŞMA ALANI */}
      <div className="p-1 sm:p-2 bg-base-200/40 rounded-3xl border border-base-300">
        {activeTab === "keyboard" && <KeyboardTester />}
        {activeTab === "keyboard_speed" && <KeyboardSpeedTester />}
        {activeTab === "mouse" && <MouseTester />}
        {activeTab === "mouse_speed" && <MouseSpeedTester />}
        {activeTab === "gamepad" && <GamepadTester />}
      </div>
    </div>
  );
}
