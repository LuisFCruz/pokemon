import { PokemonListQueryParams } from "../domain/Pokemon/Pokemon.types";

export interface PokeApiNamedResource {
  name: string;
  url: string;
}

export interface PokeApiPokemonListDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiNamedResource[];
}

export interface PokeApiPokemonAbility {
  ability: PokeApiNamedResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokeApiPokemonType {
  slot: number;
  type: PokeApiNamedResource;
}

export interface PokeApiPokemonStat {
  base_stat: number;
  effort: number;
  stat: PokeApiNamedResource;
}

export interface PokeApiPokemonSprites {
  front_default: string | null;
  other?: {
    "official-artwork"?: {
      front_default?: string | null;
    };
    home?: {
      front_default?: string | null;
    };
  };
}

export interface PokeApiPokemonDetailDTO {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  is_default: boolean;
  abilities: PokeApiPokemonAbility[];
  types: PokeApiPokemonType[];
  stats: PokeApiPokemonStat[];
  sprites: PokeApiPokemonSprites;
  species: PokeApiNamedResource;
}

export interface PokeApiVarietyItem {
  is_default: boolean;
  pokemon: PokeApiNamedResource;
}

export interface PokeApiSpeciesDTO {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
  varieties?: PokeApiVarietyItem[];
}

export interface PokeApiEvolutionNode {
  species: PokeApiNamedResource;
  evolves_to: PokeApiEvolutionNode[];
}

export interface PokeApiEvolutionChainDTO {
  id: number;
  chain: PokeApiEvolutionNode;
}

export interface IPokemonGateway {
  getPokemonList(
    params: PokemonListQueryParams,
  ): Promise<PokeApiPokemonListDTO>;
  getPokemonDetail(idOrName: string | number): Promise<PokeApiPokemonDetailDTO>;
  getPokemonDetailsInParallel(
    items: PokeApiNamedResource[],
  ): Promise<PokeApiPokemonDetailDTO[]>;
  getPokemonSpecies(idOrName: string | number): Promise<PokeApiSpeciesDTO>;
  getEvolutionChain(
    chainUrlOrId: string | number,
  ): Promise<PokeApiEvolutionChainDTO>;
}
