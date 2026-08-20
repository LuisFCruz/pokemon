import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { pokemonApi } from "../api/pokemonApi";
import { PokemonListQueryParams } from "./types";

export function useGetPokemonList(params: PokemonListQueryParams = { page: 1, limit: 20 }) {
  return useQuery({
    queryKey: ["pokemon", "list", params],
    queryFn: () => pokemonApi.getPokemonList(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
  });
}
