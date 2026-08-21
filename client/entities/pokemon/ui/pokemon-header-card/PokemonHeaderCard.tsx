import Image from "next/image";
import React from "react";

import { getTypeStyle } from "@/client/shared/lib";

import { PokemonDomain } from "../../model/types";
import { PokemonTypeBadge } from "../pokemon-type-badge/PokemonTypeBadge";

export interface PokemonHeaderCardProps {
  pokemon: PokemonDomain;
}

export const PokemonHeaderCard: React.FC<PokemonHeaderCardProps> = ({
  pokemon,
}) => {
  const typeStyle = getTypeStyle(pokemon.dominantType);

  return (
    <div
      className={`flex-1 w-full h-full rounded-xl p-3 bg-gradient-to-b ${typeStyle.gradient} border ${typeStyle.border} flex flex-col items-center justify-center relative overflow-hidden`}
    >
      {pokemon.image && (
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={115}
          height={115}
          className="object-contain drop-shadow-lg z-10 hover:scale-105 transition-transform"
          unoptimized
        />
      )}

      <div className="flex gap-1.5 mt-2 z-10">
        {pokemon.types.map((t) => (
          <PokemonTypeBadge key={t.name} type={t.name} />
        ))}
      </div>
    </div>
  );
};
