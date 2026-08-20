import React from "react";

export interface PokemonPhysicalStatsProps {
  height: number;
  weight: number;
  baseExperience: number;
}

export const PokemonPhysicalStats: React.FC<PokemonPhysicalStatsProps> = ({
  height,
  weight,
  baseExperience,
}) => {
  return (
    <div className="flex flex-col justify-between gap-2 h-full min-w-[105px]">
      <div className="py-1.5 px-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/60 text-center flex flex-col justify-center flex-1">
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Altura</p>
        <p className="text-xs font-black text-zinc-800 dark:text-zinc-100">
          {height / 10} m
        </p>
      </div>
      <div className="py-1.5 px-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/60 text-center flex flex-col justify-center flex-1">
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Peso</p>
        <p className="text-xs font-black text-zinc-800 dark:text-zinc-100">
          {weight / 10} kg
        </p>
      </div>
      <div className="py-1.5 px-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/60 text-center flex flex-col justify-center flex-1">
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Exp. Base</p>
        <p className="text-xs font-black text-zinc-800 dark:text-zinc-100">
          {baseExperience || "N/A"}
        </p>
      </div>
    </div>
  );
};
