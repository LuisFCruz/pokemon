import React from "react";

import { Input } from "@/client/shared/ui";

export interface PokemonSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export const PokemonSearch: React.FC<PokemonSearchProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full max-w-md">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar Pokémon por nome ou #ID..."
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
      />
    </div>
  );
};
