import React from "react";
import Image from "next/image";
import { Spinner } from "@/client/shared/ui";
import { useGetPokemonVariations } from "../../model/useGetPokemonVariations";
import { PokemonTypeBadge } from "../pokemon-type-badge/PokemonTypeBadge";

export interface PokemonVariationsProps {
  currentPokemonId: number;
  isOpen: boolean;
}

export const PokemonVariations: React.FC<PokemonVariationsProps> = ({
  currentPokemonId,
  isOpen,
}) => {
  const { data: variationsData, isLoading } = useGetPokemonVariations(
    currentPokemonId,
    isOpen
  );

  const variations = variationsData?.variations || [];

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl gap-3 text-zinc-400">
          <Spinner size="sm" />
          <span className="text-xs font-medium">Carregando variações...</span>
        </div>
      ) : variations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[240px] overflow-y-auto p-1.5 scrollbar-thin">
          {variations.map((variant) => {
            const isCurrent = variant.id === currentPokemonId;
            return (
              <div
                key={variant.name}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                  isCurrent
                    ? "bg-red-500/10 border-red-500/50 dark:bg-red-950/30 shadow-md ring-1 ring-red-500/30"
                    : "bg-zinc-50/80 dark:bg-zinc-800/40 border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:shadow-sm"
                }`}
              >
                {variant.image ? (
                  <Image
                    src={variant.image}
                    alt={variant.name}
                    width={56}
                    height={56}
                    className="object-contain drop-shadow-md flex-shrink-0"
                    unoptimized
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-zinc-200 dark:bg-zinc-700 flex flex-shrink-0 items-center justify-center text-[10px] text-zinc-400">
                    Sem img
                  </div>
                )}
                <div className="flex flex-col min-w-0 flex-1 gap-1">
                  <span className="text-xs font-black capitalize text-zinc-900 dark:text-zinc-100 truncate">
                    {variant.name.replace("-", " ")}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {variant.types.map((t) => (
                      <PokemonTypeBadge key={t.name} type={t.name} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl text-center text-xs text-zinc-400 font-medium">
          Este Pokémon possui apenas a sua forma padrão.
        </div>
      )}
    </div>
  );
};
