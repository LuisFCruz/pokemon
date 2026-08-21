import { LocationListQueryParams } from "../../domain/Location/Location.types";
import {
  ILocationGateway,
  PokeApiLocationDetailDTO,
  PokeApiLocationListDTO,
} from "../../ports/ILocationGateway";
import { PokeApiNamedResource } from "../../ports/IPokemonGateway";
import { GatewayError } from "../../shared/errors/GatewayError";
import { NotFoundError } from "../../shared/errors/NotFoundError";

export class PokeApiLocationAdapter implements ILocationGateway {
  private readonly baseUrl: string;

  constructor(baseUrl: string = "https://pokeapi.co/api/v2") {
    this.baseUrl = baseUrl;
  }

  async getLocationList(
    params: LocationListQueryParams,
  ): Promise<PokeApiLocationListDTO> {
    const limit = Math.min(Math.max(params.limit ?? 20, 1), 50);
    const offset = Math.max(
      params.offset ?? (params.page ? (params.page - 1) * limit : 0),
      0,
    );

    try {
      const response = await fetch(
        `${this.baseUrl}/location?limit=${limit}&offset=${offset}`,
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

      return await response.json();
    } catch (error: unknown) {
      if (error instanceof GatewayError) throw error;
      const message = error instanceof Error ? error.message : String(error);
      throw new GatewayError(
        `Failed to fetch location list from PokeAPI: ${message}`,
      );
    }
  }

  async getLocationDetail(
    idOrName: string | number,
  ): Promise<PokeApiLocationDetailDTO> {
    const key = String(idOrName).toLowerCase().trim();

    try {
      const response = await fetch(`${this.baseUrl}/location/${key}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 404) {
        throw new NotFoundError(`Location '${idOrName}' not found in PokeAPI.`);
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
        `Failed to fetch location details from PokeAPI: ${message}`,
      );
    }
  }

  async getLocationDetailsInParallel(
    items: PokeApiNamedResource[],
  ): Promise<PokeApiLocationDetailDTO[]> {
    const detailPromises = items.map((item) => {
      const identifier = this.extractIdOrName(item);
      return this.getLocationDetail(identifier);
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
