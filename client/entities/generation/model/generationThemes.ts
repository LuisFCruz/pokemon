export interface GenerationTheme {
  bg: string;
  text: string;
  gradient: string;
}

export const GEN_THEMES: Record<number, GenerationTheme> = {
  1: {
    bg: "bg-red-500",
    text: "text-red-500",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  2: {
    bg: "bg-amber-500",
    text: "text-amber-500",
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
  3: {
    bg: "bg-emerald-500",
    text: "text-emerald-500",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  4: {
    bg: "bg-blue-500",
    text: "text-blue-500",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  5: {
    bg: "bg-slate-700",
    text: "text-slate-600",
    gradient: "from-slate-600/20 to-zinc-700/20",
  },
  6: {
    bg: "bg-pink-500",
    text: "text-pink-500",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  7: {
    bg: "bg-cyan-500",
    text: "text-cyan-500",
    gradient: "from-cyan-500/20 to-sky-500/20",
  },
  8: {
    bg: "bg-purple-500",
    text: "text-purple-500",
    gradient: "from-purple-500/20 to-violet-500/20",
  },
  9: {
    bg: "bg-lime-500",
    text: "text-lime-500",
    gradient: "from-lime-500/20 to-emerald-500/20",
  },
};

export const DEFAULT_GEN_THEME: GenerationTheme = {
  bg: "bg-red-500",
  text: "text-red-500",
  gradient: "from-red-500/20 to-rose-500/20",
};
