import React from "react";

import { PokemonStats } from "../../model/types";

export interface PokemonBaseStatsProps {
  stats: PokemonStats;
}

export const PokemonBaseStats: React.FC<PokemonBaseStatsProps> = ({
  stats,
}) => {
  const statsList = [
    { label: "HP", value: stats.hp, max: 255 },
    { label: "Ataque", value: stats.attack, max: 190 },
    { label: "Defesa", value: stats.defense, max: 230 },
    { label: "Atq. Esp.", value: stats.specialAttack, max: 194 },
    { label: "Def. Esp.", value: stats.specialDefense, max: 230 },
    { label: "Velocidade", value: stats.speed, max: 200 },
  ];

  return (
    <div className="w-full">
      <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
        Estatísticas Base
      </h4>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {statsList.map((stat) => {
          const percentage = Math.min(
            Math.round((stat.value / stat.max) * 100),
            100,
          );
          return (
            <div key={stat.label} className="space-y-0.5">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-zinc-500 dark:text-zinc-400">
                  {stat.label}
                </span>
                <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                  {stat.value}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    percentage > 60
                      ? "bg-emerald-500"
                      : percentage > 35
                        ? "bg-amber-500"
                        : "bg-rose-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
