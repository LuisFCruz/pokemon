export interface RegionTheme {
  gradient: string;
  icon: string;
}

export const REGION_THEMES: Record<string, RegionTheme> = {
  kanto: {
    gradient: "from-red-500/20 to-orange-500/20 text-red-500",
    icon: "🌋",
  },
  johto: {
    gradient: "from-amber-500/20 to-yellow-500/20 text-amber-500",
    icon: "🏮",
  },
  hoenn: {
    gradient: "from-emerald-500/20 to-teal-500/20 text-emerald-500",
    icon: "🌊",
  },
  sinnoh: {
    gradient: "from-blue-500/20 to-indigo-500/20 text-blue-500",
    icon: "🏔️",
  },
  unova: {
    gradient: "from-zinc-500/20 to-slate-600/20 text-zinc-500",
    icon: "🏙️",
  },
  kalos: {
    gradient: "from-rose-500/20 to-pink-500/20 text-pink-500",
    icon: "🏰",
  },
  alola: {
    gradient: "from-sky-400/20 to-cyan-500/20 text-cyan-500",
    icon: "🌴",
  },
  galar: {
    gradient: "from-purple-500/20 to-violet-500/20 text-purple-500",
    icon: "⚔️",
  },
  paldea: {
    gradient: "from-lime-500/20 to-emerald-500/20 text-lime-500",
    icon: "🍇",
  },
};

export const DEFAULT_REGION_THEME: RegionTheme = {
  gradient: "from-red-500/20 to-rose-500/20 text-red-500",
  icon: "🗺️",
};
