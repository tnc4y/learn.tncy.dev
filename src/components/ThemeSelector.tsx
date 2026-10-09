"use client";

import { useSyncExternalStore } from "react";
import { Palette } from "lucide-react";

const THEMES = [
  { id: "dark", name: "Dark (Karanlık)" },
  { id: "light", name: "Light (Aydınlık)" },
  { id: "night", name: "Night (Gece)" },
  { id: "cyberpunk", name: "Cyberpunk" },
  { id: "synthwave", name: "Synthwave" },
  { id: "forest", name: "Forest (Orman)" },
  { id: "corporate", name: "Corporate" },
  { id: "retro", name: "Retro" },
];

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("theme") || "dark";
}

function getServerSnapshot() {
  return "dark";
}

export default function ThemeSelector() {
  const currentTheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const changeTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2">
        <Palette className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline text-xs font-mono capitalize">{currentTheme}</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-50 w-52 p-2 shadow-xl border border-base-content/10 max-h-80 overflow-y-auto"
      >
        <li className="menu-title text-xs uppercase tracking-wider text-base-content/60 px-3 py-1">
          Tema Seçimi
        </li>
        {THEMES.map((theme) => (
          <li key={theme.id}>
            <button
              onClick={() => changeTheme(theme.id)}
              className={`flex items-center justify-between text-xs py-2 ${
                currentTheme === theme.id ? "active font-bold" : ""
              }`}
            >
              <span>{theme.name}</span>
              <span
                data-theme={theme.id}
                className="inline-block w-4 h-4 rounded-full border border-base-content/20 bg-primary"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
