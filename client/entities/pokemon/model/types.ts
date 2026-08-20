export interface PokemonType {
  name: string;
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonDomain {
  id: number;
  name: string;
  index?: number;
  image: string;
  dominantType: string;
  types: PokemonType[];
  abilities: string[];
  weight: number;
  height: number;
  baseExperience: number;
  stats: PokemonStats;
  isDefault: boolean;
  varietyName: string;
}

export interface PokemonListQueryParams {
  limit?: number;
  offset?: number;
  page?: number;
}

export interface PaginatedPokemonResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  next: string | null;
  previous: string | null;
  data: PokemonDomain[];
}
