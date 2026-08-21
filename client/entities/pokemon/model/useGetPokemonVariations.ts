import { useQuery } from "@tanstack/react-query";

import { pokemonApi } from "../api/pokemonApi";

export function useGetPokemonVariations(
  pokemonId: number | string | undefined,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["pokemon", "variations", pokemonId],
    queryFn: () => pokemonApi.getPokemonVariations(pokemonId!),
    enabled: enabled && Boolean(pokemonId),
    staleTime: 1000 * 60 * 10, // Cache de 10 minutos
  });
}
