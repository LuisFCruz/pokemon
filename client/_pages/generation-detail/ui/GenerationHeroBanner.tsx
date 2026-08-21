import React from "react";

import { GenerationDetailDomain } from "@/client/entities/generation";
import { Badge } from "@/client/shared/ui";

export interface GenerationHeroBannerProps {
  generation: GenerationDetailDomain;
}

export const GenerationHeroBanner: React.FC<GenerationHeroBannerProps> = ({
  generation,
}) => {
  return (
    <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-500/10 via-rose-500/10 to-orange-500/10 dark:from-red-950/30 dark:via-rose-950/30 dark:to-orange-950/30 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-black tracking-widest text-red-500 uppercase">
              {generation.romanName}
            </span>
            {generation.mainRegion && (
              <Badge
                variant="default"
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 capitalize border-none font-bold"
              >
                📍 Região Principal: {generation.mainRegion}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white capitalize">
            {generation.name.replace("-", " ")}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
            Explorando os {generation.speciesCount} Pokémons e{" "}
            {generation.movesCount} novos golpes introduzidos nesta geração.
          </p>
        </div>

        {/* Version Games Badges */}
        {generation.versionGroups.length > 0 && (
          <div className="flex flex-col gap-1.5 md:items-end">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Jogos de Estreia:
            </span>
            <div className="flex flex-wrap md:justify-end gap-1.5">
              {generation.versionGroups.map((game) => (
                <span
                  key={game}
                  className="px-3 py-1 text-xs font-extrabold bg-white/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 rounded-xl shadow-sm capitalize border border-zinc-200/50 dark:border-zinc-700/50"
                >
                  {game}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
