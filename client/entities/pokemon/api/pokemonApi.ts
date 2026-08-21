import { axiosClient } from "@/client/shared/api";

import {
  PaginatedPokemonResponse,
  PokemonDomain,
  PokemonListQueryParams,
} from "../model/types";

export const pokemonApi = {
  getPokemonList: async (
    params: PokemonListQueryParams,
  ): Promise<PaginatedPokemonResponse> => {
    const response = await axiosClient.get<PaginatedPokemonResponse>(
      "/pokemon",
      {
        params,
      },
    );
    return response.data;
  },

  getPokemonEvolutions: async (
    id: number | string,
  ): Promise<{ evolutions: PokemonDomain[] }> => {
    const response = await axiosClient.get<{ evolutions: PokemonDomain[] }>(
      `/pokemon/${id}/evolutions`,
    );
    return response.data;
  },

  getPokemonVariations: async (
    id: number | string,
  ): Promise<{ variations: PokemonDomain[] }> => {
    const response = await axiosClient.get<{ variations: PokemonDomain[] }>(
      `/pokemon/${id}/variations`,
    );
    return response.data;
  },
};
