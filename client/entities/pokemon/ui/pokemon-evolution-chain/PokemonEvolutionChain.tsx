import React from "react";
import Image from "next/image";
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
    isOpen
  );

  const evolutions = evolutionsData?.evolutions || [];

  return (
    <div className="w-full space-y-1.5 pt-1.5 border-t border-zinc-100 dark:border-zinc-800/80">
      <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
        Cadeia de Evolução
      </h4>

      {isLoading ? (
        <div className="flex items-center justify-center p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl gap-2 text-zinc-400">
          <Spinner size="sm" />
          <span className="text-[11px] font-medium">Carregando evoluções...</span>
        </div>
      ) : evolutions.length > 0 ? (
        <div className="flex items-center justify-around gap-1.5 overflow-x-auto p-2 bg-zinc-50/70 dark:bg-zinc-800/40 rounded-xl border border-zinc-100 dark:border-zinc-800/60 scrollbar-none">
          {evolutions.map((evoStage, idx) => {
            const isCurrent = evoStage.id === currentPokemonId;
            return (
              <React.Fragment key={evoStage.id}>
                {idx > 0 && (
                  <div className="text-zinc-300 dark:text-zinc-600 font-bold text-xs">
                    ➔
                  </div>
                )}
                <div
                  className={`flex flex-col items-center p-1.5 rounded-lg transition-all ${
                    isCurrent
                      ? "bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-red-500/50 scale-105"
                      : "opacity-75 hover:opacity-100"
                  }`}
                >
                  {evoStage.image ? (
                    <Image
                      src={evoStage.image}
                      alt={evoStage.name}
                      width={44}
                      height={44}
                      className="object-contain drop-shadow"
                      unoptimized
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[9px] text-zinc-400">
                      Sem img
                    </div>
                  )}
                  <span className="text-[9px] font-bold text-zinc-400 mt-0.5">
                    #{String(evoStage.id).padStart(3, "0")}
                  </span>
                  <span className="text-[11px] font-extrabold capitalize text-zinc-800 dark:text-zinc-200">
                    {evoStage.name}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl text-center text-[11px] text-zinc-400 font-medium">
          Este Pokémon não possui evoluções registradas.
        </div>
      )}
    </div>
  );
};
