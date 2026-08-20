"use client";

import React, { useState, useMemo } from "react";
import { useGetLocationList, LocationCard } from "@/client/entities/location";
import { Pagination } from "@/client/features";
import { Spinner, Button } from "@/client/shared/ui";

export const LocationsPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading, isError, error, refetch } = useGetLocationList({
    page,
    limit,
  });

  const filteredLocations = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((loc) => {
      const term = searchTerm.toLowerCase().trim();
      return (
        loc.name.toLowerCase().includes(term) ||
        (loc.region && loc.region.toLowerCase().includes(term)) ||
        String(loc.id).includes(term)
      );
    });
  }, [data, searchTerm]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-4 shadow-sm">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Buscar por nome da localização ou região..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          />
          <svg
            className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400"
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
        </div>

        <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
          Exibindo {filteredLocations.length} localizações
        </div>
      </div>

      {/* Main Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <Spinner size="lg" />
          <span className="text-sm font-semibold text-zinc-500">
            Carregando localizações...
          </span>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 p-8 text-center bg-red-50 dark:bg-red-950/20 rounded-3xl border border-red-200 dark:border-red-900/40">
          <p className="text-sm font-bold text-red-600 dark:text-red-400">
            {error?.message || "Ocorreu um erro ao carregar as localizações."}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Tentar novamente
          </Button>
        </div>
      ) : filteredLocations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredLocations.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 text-sm font-medium">
          Nenhuma localização encontrada para os critérios informados.
        </div>
      )}

      {/* Pagination */}
      {data && (
        <Pagination
          currentPage={data.page}
          totalPages={data.totalPages}
          limit={limit}
          onPageChange={(p) => setPage(p)}
          onLimitChange={handleLimitChange}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
