import Link from "next/link";
import React from "react";

import { Badge } from "@/client/shared/ui";

import { GEN_THEMES, DEFAULT_GEN_THEME } from "../model/generationThemes";
import { GenerationDomain } from "../model/types";

export interface GenerationCardProps {
  generation: GenerationDomain;
}

export const GenerationCard: React.FC<GenerationCardProps> = ({
  generation,
}) => {
  const theme = GEN_THEMES[generation.id] || DEFAULT_GEN_THEME;

  return (
    <Link href={`/generations/${generation.id}`} className="block">
      <div className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden cursor-pointer">
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

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-red-500 transition-colors capitalize">
              {generation.name.replace("-", " ")}
            </h3>
            <span className="text-xs font-bold text-zinc-400 group-hover:text-red-500 transition-colors group-hover:translate-x-1 duration-200">
              Ver Pokémons →
            </span>
          </div>

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
    </Link>
  );
};
