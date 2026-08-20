import {
  IPokemonGateway,
  PokeApiNamedResource,
  PokeApiPokemonDetailDTO,
  PokeApiPokemonListDTO,
} from "../../ports/IPokemonGateway";
import { PokemonListQueryParams } from "../../domain/Pokemon/Pokemon.types";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { GatewayError } from "../../shared/errors/GatewayError";

export class PokeApiAdapter implements IPokemonGateway {
  private readonly baseUrl: string;

  constructor(baseUrl: string = "https://pokeapi.co/api/v2") {
    this.baseUrl = baseUrl;
  }

  async getPokemonList(
    params: PokemonListQueryParams,
  ): Promise<PokeApiPokemonListDTO> {
    const limit = Math.min(Math.max(params.limit ?? 20, 1), 50);
    const offset = Math.max(
      params.offset ?? (params.page ? (params.page - 1) * limit : 0),
      0,
    );

    try {
      const response = await fetch(
        `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        throw new GatewayError(
          `PokeAPI returned HTTP ${response.status}: ${response.statusText}`,
          response.status,
        );
      }

      const data: PokeApiPokemonListDTO = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof GatewayError) throw error;
      throw new GatewayError(
        `Failed to fetch pokemon list from PokeAPI: ${error?.message || error}`,
      );
    }
  }

  async getPokemonDetail(
    idOrName: string | number,
  ): Promise<PokeApiPokemonDetailDTO> {
    const key = String(idOrName).toLowerCase().trim();

    try {
      const response = await fetch(`${this.baseUrl}/pokemon/${key}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 404) {
        throw new NotFoundError(`Pokemon '${idOrName}' not found in PokeAPI.`);
      }

      if (!response.ok) {
        throw new GatewayError(
          `PokeAPI returned HTTP ${response.status}: ${response.statusText}`,
          response.status,
        );
      }

      const data: PokeApiPokemonDetailDTO = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof NotFoundError || error instanceof GatewayError) {
        throw error;
      }
      throw new GatewayError(
        `Failed to fetch pokemon details from PokeAPI: ${error?.message || error}`,
      );
    }
  }

  async getPokemonDetailsInParallel(
    items: PokeApiNamedResource[],
  ): Promise<PokeApiPokemonDetailDTO[]> {
    const detailPromises = items.map((item) => {
      const identifier = this.extractIdOrName(item);
      return this.getPokemonDetail(identifier);
    });

    return Promise.all(detailPromises);
  }

  private extractIdOrName(resource: PokeApiNamedResource): string {
    if (resource.url) {
      const parts = resource.url.split("/").filter(Boolean);
      const possibleId = parts[parts.length - 1];
      if (possibleId && !isNaN(Number(possibleId))) {
        return possibleId;
      }
    }
    return resource.name;
  }
}
