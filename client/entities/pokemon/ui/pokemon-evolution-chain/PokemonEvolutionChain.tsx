import Image from "next/image";
import React from "react";

import { Spinner } from "@/client/shared/ui";

import { useGetPokemonEvolutions } from "../../model/useGetPokemonEvolutions";

export interface PokemonEvolutionChainProps {
  currentPokemonId: number;
  isOpen: boolean;
}

export const PokemonEvolutionChain: React.FC<PokemonEvolutionChainProps> = ({
  currentPokemonId,
  isOpen,
}) => {
  const { data: evolutionsData, isLoading } = useGetPokemonEvolutions(
    currentPokemonId,
    isOpen,
  );

  const evolutions = evolutionsData?.evolutions || [];

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl gap-3 text-zinc-400">
          <Spinner size="sm" />
          <span className="text-xs font-medium">Carregando evoluções...</span>
        </div>
      ) : evolutions.length > 0 ? (
        <div className="flex items-center justify-around gap-2 overflow-x-auto p-3.5 bg-zinc-50/70 dark:bg-zinc-800/40 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 scrollbar-none">
          {evolutions.map((evoStage, idx) => {
            const isCurrent = evoStage.id === currentPokemonId;
            return (
              <React.Fragment key={evoStage.id}>
                {idx > 0 && (
                  <div className="text-zinc-300 dark:text-zinc-600 font-black text-sm px-1">
                    ➔
                  </div>
                )}
                <div
                  className={`flex flex-col items-center p-3.5 rounded-xl transition-all ${
                    isCurrent
                      ? "bg-white dark:bg-zinc-900 shadow-md ring-2 ring-red-500/50 scale-105"
                      : "bg-white/50 dark:bg-zinc-900/40 opacity-80 hover:opacity-100 hover:scale-102"
                  }`}
                >
                  {evoStage.image ? (
                    <Image
                      src={evoStage.image}
                      alt={evoStage.name}
                      width={64}
                      height={64}
                      className="object-contain drop-shadow-md"
                      unoptimized
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs text-zinc-400">
                      Sem img
                    </div>
                  )}
                  <span className="text-[10px] font-bold text-zinc-400 mt-1.5">
                    #{String(evoStage.id).padStart(3, "0")}
                  </span>
                  <span className="text-xs font-extrabold capitalize text-zinc-800 dark:text-zinc-100">
                    {evoStage.name}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl text-center text-xs text-zinc-400 font-medium">
          Este Pokémon não possui evoluções registradas.
        </div>
      )}
    </div>
  );
};
