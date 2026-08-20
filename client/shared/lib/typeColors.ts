export interface TypeStyle {
  bg: string;
  text: string;
  border: string;
  badgeBg: string;
  gradient: string;
}

export const POKEMON_TYPE_COLORS: Record<string, TypeStyle> = {
  fire: {
    bg: "bg-orange-500/10 dark:bg-orange-500/20",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-500/30",
    badgeBg: "bg-gradient-to-r from-orange-500 to-amber-500 text-white",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
  },
  water: {
    bg: "bg-blue-500/10 dark:bg-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
    badgeBg: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  grass: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
    badgeBg: "bg-gradient-to-r from-emerald-500 to-green-500 text-white",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
  },
  electric: {
    bg: "bg-yellow-500/10 dark:bg-yellow-500/20",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/30",
    badgeBg: "bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-900 font-semibold",
    gradient: "from-amber-400/20 via-yellow-500/10 to-transparent",
  },
  psychic: {
    bg: "bg-pink-500/10 dark:bg-pink-500/20",
    text: "text-pink-600 dark:text-pink-400",
    border: "border-pink-500/30",
    badgeBg: "bg-gradient-to-r from-pink-500 to-rose-500 text-white",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
  },
  ice: {
    bg: "bg-cyan-400/10 dark:bg-cyan-400/20",
    text: "text-cyan-600 dark:text-cyan-300",
    border: "border-cyan-400/30",
    badgeBg: "bg-gradient-to-r from-cyan-400 to-sky-400 text-zinc-900 font-semibold",
    gradient: "from-cyan-400/20 via-sky-400/10 to-transparent",
  },
  dragon: {
    bg: "bg-indigo-600/10 dark:bg-indigo-600/20",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-600/30",
    badgeBg: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white",
    gradient: "from-indigo-600/20 via-violet-600/10 to-transparent",
  },
  dark: {
    bg: "bg-zinc-800/10 dark:bg-zinc-800/40",
    text: "text-zinc-700 dark:text-zinc-300",
    border: "border-zinc-700/30",
    badgeBg: "bg-gradient-to-r from-zinc-700 to-zinc-900 text-white",
    gradient: "from-zinc-700/20 via-zinc-900/10 to-transparent",
  },
  fairy: {
    bg: "bg-fuchsia-400/10 dark:bg-fuchsia-400/20",
    text: "text-fuchsia-600 dark:text-fuchsia-300",
    border: "border-fuchsia-400/30",
    badgeBg: "bg-gradient-to-r from-fuchsia-400 to-pink-400 text-zinc-900 font-semibold",
    gradient: "from-fuchsia-400/20 via-pink-400/10 to-transparent",
  },
  normal: {
    bg: "bg-slate-400/10 dark:bg-slate-400/20",
    text: "text-slate-600 dark:text-slate-400",
    border: "border-slate-400/30",
    badgeBg: "bg-gradient-to-r from-slate-400 to-gray-500 text-white",
    gradient: "from-slate-400/20 via-gray-500/10 to-transparent",
  },
  fighting: {
    bg: "bg-red-700/10 dark:bg-red-700/20",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-700/30",
    badgeBg: "bg-gradient-to-r from-red-600 to-red-800 text-white",
    gradient: "from-red-600/20 via-red-800/10 to-transparent",
  },
  flying: {
    bg: "bg-violet-400/10 dark:bg-violet-400/20",
    text: "text-violet-600 dark:text-violet-300",
    border: "border-violet-400/30",
    badgeBg: "bg-gradient-to-r from-violet-400 to-indigo-400 text-white",
    gradient: "from-violet-400/20 via-indigo-400/10 to-transparent",
  },
  poison: {
    bg: "bg-purple-600/10 dark:bg-purple-600/20",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-600/30",
    badgeBg: "bg-gradient-to-r from-purple-600 to-fuchsia-700 text-white",
    gradient: "from-purple-600/20 via-fuchsia-700/10 to-transparent",
  },
  ground: {
    bg: "bg-amber-700/10 dark:bg-amber-700/20",
    text: "text-amber-800 dark:text-amber-400",
    border: "border-amber-700/30",
    badgeBg: "bg-gradient-to-r from-amber-600 to-yellow-700 text-white",
    gradient: "from-amber-600/20 via-yellow-700/10 to-transparent",
  },
  rock: {
    bg: "bg-stone-600/10 dark:bg-stone-600/20",
    text: "text-stone-700 dark:text-stone-300",
    border: "border-stone-600/30",
    badgeBg: "bg-gradient-to-r from-stone-500 to-yellow-800 text-white",
    gradient: "from-stone-500/20 via-yellow-800/10 to-transparent",
  },
  bug: {
    bg: "bg-lime-500/10 dark:bg-lime-500/20",
    text: "text-lime-600 dark:text-lime-400",
    border: "border-lime-500/30",
    badgeBg: "bg-gradient-to-r from-lime-500 to-emerald-600 text-white",
    gradient: "from-lime-500/20 via-emerald-600/10 to-transparent",
  },
  ghost: {
    bg: "bg-purple-900/10 dark:bg-purple-900/30",
    text: "text-purple-800 dark:text-purple-300",
    border: "border-purple-900/30",
    badgeBg: "bg-gradient-to-r from-purple-800 to-indigo-900 text-white",
    gradient: "from-purple-800/20 via-indigo-900/10 to-transparent",
  },
  steel: {
    bg: "bg-slate-400/10 dark:bg-slate-400/20",
    text: "text-slate-500 dark:text-slate-300",
    border: "border-slate-400/30",
    badgeBg: "bg-gradient-to-r from-slate-400 to-zinc-500 text-white",
    gradient: "from-slate-400/20 via-zinc-500/10 to-transparent",
  },
};

export const DEFAULT_TYPE_STYLE: TypeStyle = {
  bg: "bg-zinc-500/10 dark:bg-zinc-500/20",
  text: "text-zinc-600 dark:text-zinc-400",
  border: "border-zinc-500/30",
  badgeBg: "bg-gradient-to-r from-zinc-500 to-zinc-700 text-white",
  gradient: "from-zinc-500/20 to-transparent",
};

export function getTypeStyle(typeName?: string): TypeStyle {
  if (!typeName) return DEFAULT_TYPE_STYLE;
  return POKEMON_TYPE_COLORS[typeName.toLowerCase()] || DEFAULT_TYPE_STYLE;
}
