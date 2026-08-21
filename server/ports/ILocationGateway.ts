import { LocationListQueryParams } from "../domain/Location/Location.types";

import { PokeApiNamedResource } from "./IPokemonGateway";

export interface PokeApiLocationListDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiNamedResource[];
}

export interface PokeApiLocationDetailDTO {
  id: number;
  name: string;
  region: PokeApiNamedResource | null;
  game_indices: Array<{
    game_index: number;
    generation: PokeApiNamedResource;
  }>;
  areas: PokeApiNamedResource[];
}

export interface ILocationGateway {
  getLocationList(
    params: LocationListQueryParams,
  ): Promise<PokeApiLocationListDTO>;
  getLocationDetail(
    idOrName: string | number,
  ): Promise<PokeApiLocationDetailDTO>;
  getLocationDetailsInParallel(
    items: PokeApiNamedResource[],
  ): Promise<PokeApiLocationDetailDTO[]>;
}
