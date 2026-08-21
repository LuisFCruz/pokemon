import React from "react";

import { POKEMON_TYPE_COLORS } from "@/client/shared/lib";

export interface PokemonTypeFilterProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

const ALL_TYPES = Object.keys(POKEMON_TYPE_COLORS);

export const PokemonTypeFilter: React.FC<PokemonTypeFilterProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none w-full">
      <button
        onClick={() => onSelectType(null)}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
          selectedType === null
            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md"
            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
        }`}
      >
        Todos os Tipos
      </button>
      {ALL_TYPES.map((type) => {
        const isSelected = selectedType === type;
        const style = POKEMON_TYPE_COLORS[type];
        return (
          <button
            key={type}
            onClick={() => onSelectType(isSelected ? null : type)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
              isSelected
                ? `${style.badgeBg} ring-2 ring-offset-2 ring-red-500/50 shadow-md scale-105`
                : "bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
};
