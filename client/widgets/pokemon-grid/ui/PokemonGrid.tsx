import React from "react";
import { PokemonCard, PokemonSkeleton, PokemonDomain } from "@/client/entities/pokemon";
import { Button } from "@/client/shared/ui";

export interface PokemonGridProps {
  pokemons: PokemonDomain[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  onSelectPokemon?: (pokemon: PokemonDomain) => void;
}

export const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemons,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  onSelectPokemon,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6 w-full">
        {Array.from({ length: 8 }).map((_, idx) => (
          <PokemonSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center my-8 rounded-3xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 w-full">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 text-2xl">
          ⚠️
        </div>
        <h3 className="text-lg font-bold text-rose-900 dark:text-rose-200 mb-1">
          Falha ao carregar Pokémons
        </h3>
        <p className="text-sm text-rose-600 dark:text-rose-400 mb-4 max-w-md">
          {errorMessage || "Ocorreu um erro inesperado ao buscar a lista de Pokémons."}
        </p>
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            Tentar Novamente
          </Button>
        )}
      </div>
    );
  }

  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center my-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 w-full">
        <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mb-4 text-3xl">
          🔍
        </div>
        <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-1">
          Nenhum Pokémon encontrado
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
          Tente ajustar seus critérios de busca ou filtros por tipo de elemento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6 w-full">
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          priority={index < 4}
          onClick={onSelectPokemon}
        />
      ))}
    </div>
  );
};
