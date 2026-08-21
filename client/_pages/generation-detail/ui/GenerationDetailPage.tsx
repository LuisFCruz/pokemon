"use client";

import Link from "next/link";
import React, { useState, useMemo } from "react";

import { useGetGenerationDetail } from "@/client/entities/generation";
import { PokemonDomain } from "@/client/entities/pokemon";
import { PokemonSearch, PokemonTypeFilter } from "@/client/features";
import { Spinner, Button, Badge } from "@/client/shared/ui";
import { PokemonGrid, PokemonDetailModal } from "@/client/widgets";

export interface GenerationDetailPageProps {
  id: string;
}

export const GenerationDetailPage: React.FC<GenerationDetailPageProps> = ({
  id,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDomain | null>(
    null,
  );

  const {
    data: generation,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetGenerationDetail(id);

  const filteredPokemons = useMemo(() => {
    if (!generation?.pokemons) return [];
    return generation.pokemons.filter((pokemon) => {
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
  }, [generation, searchTerm, selectedType]);

  return (
    <div className="flex flex-col gap-6">
      {/* Back Button */}
      <div>
        <Link
          href="/generations"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm"
        >
          ← Voltar para Gerações
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
          <Spinner size="lg" />
          <span className="text-sm font-semibold text-zinc-500">
            Carregando Pokémons da geração...
          </span>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 p-8 text-center bg-red-50 dark:bg-red-950/20 rounded-3xl border border-red-200 dark:border-red-900/40">
          <p className="text-sm font-bold text-red-600 dark:text-red-400">
            {error?.message || "Ocorreu um erro ao carregar esta geração."}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Tentar novamente
          </Button>
        </div>
      ) : generation ? (
        <>
          {/* Generation Hero Banner */}
          <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-500/10 via-rose-500/10 to-orange-500/10 dark:from-red-950/30 dark:via-rose-950/30 dark:to-orange-950/30 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-black tracking-widest text-red-500 uppercase">
                    {generation.romanName}
                  </span>
                  {generation.mainRegion && (
                    <Badge
                      variant="default"
                      className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 capitalize border-none font-bold"
                    >
                      📍 Região Principal: {generation.mainRegion}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white capitalize">
                  {generation.name.replace("-", " ")}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
                  Explorando os {generation.speciesCount} Pokémons e{" "}
                  {generation.movesCount} novos golpes introduzidos nesta
                  geração.
                </p>
              </div>

              {/* Version Games Badges */}
              {generation.versionGroups.length > 0 && (
                <div className="flex flex-col gap-1.5 md:items-end">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Jogos de Estreia:
                  </span>
                  <div className="flex flex-wrap md:justify-end gap-1.5">
                    {generation.versionGroups.map((game) => (
                      <span
                        key={game}
                        className="px-3 py-1 text-xs font-extrabold bg-white/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 rounded-xl shadow-sm capitalize border border-zinc-200/50 dark:border-zinc-700/50"
                      >
                        {game}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search & Filter Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-4 shadow-sm">
            <PokemonSearch value={searchTerm} onChange={setSearchTerm} />
            <PokemonTypeFilter
              selectedType={selectedType}
              onSelectType={setSelectedType}
            />
          </div>

          {/* Pokemons Grid */}
          <PokemonGrid
            pokemons={filteredPokemons}
            isLoading={false}
            isError={false}
            onSelectPokemon={(p) => setSelectedPokemon(p)}
          />

          {/* Pokemon Detail Modal */}
          <PokemonDetailModal
            pokemon={selectedPokemon}
            isOpen={Boolean(selectedPokemon)}
            onClose={() => setSelectedPokemon(null)}
          />
        </>
      ) : null}
    </div>
  );
};
