import React from "react";
import Image from "next/image";
import { PokemonDomain } from "../../model/types";
import { PokemonTypeBadge } from "../pokemon-type-badge/PokemonTypeBadge";
import { getTypeStyle } from "@/client/shared/lib";

export interface PokemonCardProps {
  pokemon: PokemonDomain;
  priority?: boolean;
  onClick?: (pokemon: PokemonDomain) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, priority = false, onClick }) => {
  const typeStyle = getTypeStyle(pokemon.dominantType);

  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;

  return (
    <div
      onClick={() => onClick?.(pokemon)}
      className={`group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border ${typeStyle.border} p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-zinc-500/10 cursor-pointer flex flex-col justify-between`}
    >
      {/* Background Subtle Ambient Glow */}
      <div
        className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${typeStyle.gradient} blur-2xl opacity-60 transition-opacity group-hover:opacity-100`}
      />

      {/* Header Info: ID & Name */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
            {formattedId}
          </span>
          <h3 className="text-xl font-black capitalize text-zinc-900 dark:text-white tracking-tight group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
            {pokemon.name}
          </h3>
        </div>
        <div className="flex gap-1.5 flex-wrap justify-end">
          {pokemon.types.map((t) => (
            <PokemonTypeBadge key={t.name} type={t.name} />
          ))}
        </div>
      </div>

      {/* Pokemon Visual Artwork */}
      <div className="relative z-10 my-6 flex items-center justify-center h-44">
        {pokemon.image ? (
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={160}
            height={160}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2"
            unoptimized
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 text-xs font-semibold">
            Sem imagem
          </div>
        )}
      </div>

      {/* Footer Info: Base stats snippet */}
      <div className="relative z-10 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1 font-medium">
          <span>HP</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">
            {pokemon.stats.hp}
          </span>
        </div>
        <div className="flex items-center gap-1 font-medium">
          <span>ATQ</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">
            {pokemon.stats.attack}
          </span>
        </div>
        <div className="flex items-center gap-1 font-medium">
          <span>DEF</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">
            {pokemon.stats.defense}
          </span>
        </div>
        <div className="flex items-center gap-1 font-medium">
          <span>VEL</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">
            {pokemon.stats.speed}
          </span>
        </div>
      </div>
    </div>
  );
};
