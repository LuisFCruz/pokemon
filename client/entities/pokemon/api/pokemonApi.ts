import { axiosClient } from "@/client/shared/api";
import { PaginatedPokemonResponse, PokemonListQueryParams } from "../model/types";

export const pokemonApi = {
  getPokemonList: async (params: PokemonListQueryParams): Promise<PaginatedPokemonResponse> => {
    const response = await axiosClient.get<PaginatedPokemonResponse>("/pokemon", {
      params,
    });
    return response.data;
  },
};
