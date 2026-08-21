import React from "react";

export interface PokemonAbilitiesProps {
  abilities: string[];
}

export const PokemonAbilities: React.FC<PokemonAbilitiesProps> = ({
  abilities,
}) => {
  if (!abilities || abilities.length === 0) return null;

  return (
    <div className="w-full">
      <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
        Habilidades
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {abilities.map((ability) => (
          <span
            key={ability}
            className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 capitalize"
          >
            {ability.replace("-", " ")}
          </span>
        ))}
      </div>
    </div>
  );
};
