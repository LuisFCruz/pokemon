import { PokeApiNamedResource } from "./IPokemonGateway";

export interface PokeApiGenerationListDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiNamedResource[];
}

export interface PokeApiGenerationDetailDTO {
  id: number;
  name: string;
  main_region: PokeApiNamedResource | null;
  pokemon_species: PokeApiNamedResource[];
  moves: PokeApiNamedResource[];
  version_groups: PokeApiNamedResource[];
  types: PokeApiNamedResource[];
}

export interface IGenerationGateway {
  getGenerationList(): Promise<PokeApiGenerationListDTO>;
  getGenerationDetail(idOrName: string | number): Promise<PokeApiGenerationDetailDTO>;
  getGenerationDetailsInParallel(items: PokeApiNamedResource[]): Promise<PokeApiGenerationDetailDTO[]>;
}
