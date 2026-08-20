import {
  IPokemonGateway,
  PokeApiEvolutionChainDTO,
  PokeApiNamedResource,
  PokeApiPokemonDetailDTO,
  PokeApiPokemonListDTO,
  PokeApiSpeciesDTO,
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
    } catch (error: unknown) {
      if (error instanceof GatewayError) throw error;
      const message = error instanceof Error ? error.message : String(error);
      throw new GatewayError(
        `Failed to fetch pokemon list from PokeAPI: ${message}`,
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
    } catch (error: unknown) {
      if (error instanceof NotFoundError || error instanceof GatewayError) {
        throw error;
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new GatewayError(
        `Failed to fetch pokemon details from PokeAPI: ${message}`,
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

  async getPokemonSpecies(
    idOrName: string | number,
  ): Promise<PokeApiSpeciesDTO> {
    const key = String(idOrName).toLowerCase().trim();

    try {
      const response = await fetch(`${this.baseUrl}/pokemon-species/${key}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 404) {
        throw new NotFoundError(`Pokemon species '${idOrName}' not found.`);
      }

      if (!response.ok) {
        throw new GatewayError(
          `PokeAPI returned HTTP ${response.status}: ${response.statusText}`,
          response.status,
        );
      }

      return await response.json();
    } catch (error: unknown) {
      if (error instanceof NotFoundError || error instanceof GatewayError) {
        throw error;
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new GatewayError(
        `Failed to fetch pokemon species from PokeAPI: ${message}`,
      );
    }
  }

  async getEvolutionChain(
    chainUrlOrId: string | number,
  ): Promise<PokeApiEvolutionChainDTO> {
    const url = String(chainUrlOrId).startsWith("http")
      ? String(chainUrlOrId)
      : `${this.baseUrl}/evolution-chain/${chainUrlOrId}`;

    try {
      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 404) {
        throw new NotFoundError(
          `Evolution chain '${chainUrlOrId}' not found.`,
        );
      }

      if (!response.ok) {
        throw new GatewayError(
          `PokeAPI returned HTTP ${response.status}: ${response.statusText}`,
          response.status,
        );
      }

      return await response.json();
    } catch (error: unknown) {
      if (error instanceof NotFoundError || error instanceof GatewayError) {
        throw error;
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new GatewayError(
        `Failed to fetch evolution chain from PokeAPI: ${message}`,
      );
    }
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
