import { PokemonDomain } from "../Pokemon/Pokemon.types";

export interface GenerationDomain {
  id: number;
  name: string;
  romanName: string;
  mainRegion: string | null;
  speciesCount: number;
  movesCount: number;
  versionGroups: string[];
}

export interface GenerationDetailDomain extends GenerationDomain {
  pokemons: PokemonDomain[];
}

export interface GenerationListResponse {
  total: number;
  data: GenerationDomain[];
}
