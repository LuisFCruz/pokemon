"use client";

import React, { useState, useMemo } from "react";
import { PokemonGrid, PokemonDetailModal } from "@/client/widgets";
import {
  PokemonSearch,
  PokemonTypeFilter,
  PokemonPagination,
} from "@/client/features";
import {
  useGetPokemonList,
  PokemonDomain,
} from "@/client/entities/pokemon";

export const PokemonListPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDomain | null>(
    null,
  );

  const { data, isLoading, isError, error, refetch } = useGetPokemonList({
    page,
    limit,
  });

  // Client-side filtering on current page results
  const filteredPokemons = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((pokemon) => {
      const matchesSearch =
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        String(pokemon.id).includes(searchTerm.trim());

      const matchesType = selectedType
        ? pokemon.types.some(
            (t) => t.name.toLowerCase() === selectedType.toLowerCase(),
          )
        : true;

      return matchesSearch && matchesType;
    });
  }, [data, searchTerm, selectedType]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <>
      {/* Features Row: Search & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-4 shadow-sm">
        <PokemonSearch value={searchTerm} onChange={setSearchTerm} />
        <PokemonTypeFilter
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      </div>

      {/* Pokemon Grid Widget */}
      <PokemonGrid
        pokemons={filteredPokemons}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.message}
        onRetry={refetch}
        onSelectPokemon={(p) => setSelectedPokemon(p)}
      />

      {/* Pagination Feature */}
      {data && (
        <PokemonPagination
          currentPage={data.page}
          totalPages={data.totalPages}
          limit={limit}
          onPageChange={(p) => setPage(p)}
          onLimitChange={handleLimitChange}
          isLoading={isLoading}
        />
      )}

      {/* Pokemon Detail Modal Widget */}
      <PokemonDetailModal
        pokemon={selectedPokemon}
        isOpen={Boolean(selectedPokemon)}
        onClose={() => setSelectedPokemon(null)}
      />
    </>
  );
};
