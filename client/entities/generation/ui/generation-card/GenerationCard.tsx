import React from "react";
import { GenerationDomain } from "../../model/types";
import { Badge } from "@/client/shared/ui";

export interface GenerationCardProps {
  generation: GenerationDomain;
}

const GEN_THEMES: Record<number, { bg: string; text: string; gradient: string }> = {
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

export const GenerationCard: React.FC<GenerationCardProps> = ({ generation }) => {
  const theme = GEN_THEMES[generation.id] || {
    bg: "bg-red-500",
    text: "text-red-500",
    gradient: "from-red-500/20 to-rose-500/20",
  };

  return (
    <div className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
      {/* Background Accent Glow */}
      <div
        className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${theme.gradient} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[11px] font-black tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
            {generation.romanName}
          </span>
          {generation.mainRegion && (
            <Badge
              variant="default"
              className="bg-red-500/10 text-red-600 dark:text-red-400 capitalize border-none font-extrabold"
            >
              📍 Região: {generation.mainRegion}
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-red-500 transition-colors capitalize">
          {generation.name.replace("-", " ")}
        </h3>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex flex-col p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800/60">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">
              Novos Pokémons
            </span>
            <span className="text-lg font-black text-zinc-800 dark:text-zinc-100 mt-0.5">
              +{generation.speciesCount}
            </span>
          </div>

          <div className="flex flex-col p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800/60">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">
              Novos Movimentos
            </span>
            <span className="text-lg font-black text-zinc-800 dark:text-zinc-100 mt-0.5">
              +{generation.movesCount}
            </span>
          </div>
        </div>
      </div>

      {/* Version Groups Footer */}
      {generation.versionGroups.length > 0 && (
        <div className="relative z-10 mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block mb-1.5">
            Jogos da Geração:
          </span>
          <div className="flex flex-wrap gap-1">
            {generation.versionGroups.map((game) => (
              <span
                key={game}
                className="px-2 py-0.5 text-[10px] font-extrabold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md capitalize"
              >
                {game}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
