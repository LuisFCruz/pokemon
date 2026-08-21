import {
  IGenerationGateway,
  PokeApiGenerationDetailDTO,
  PokeApiGenerationListDTO,
} from "../../ports/IGenerationGateway";
import { PokeApiNamedResource } from "../../ports/IPokemonGateway";
import { GatewayError } from "../../shared/errors/GatewayError";
import { NotFoundError } from "../../shared/errors/NotFoundError";

export class PokeApiGenerationAdapter implements IGenerationGateway {
  private readonly baseUrl: string;

  constructor(baseUrl: string = "https://pokeapi.co/api/v2") {
    this.baseUrl = baseUrl;
  }

  async getGenerationList(): Promise<PokeApiGenerationListDTO> {
    try {
      const response = await fetch(`${this.baseUrl}/generation`, {
        headers: { "Content-Type": "application/json" },
      });

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
        `Failed to fetch generation list from PokeAPI: ${message}`,
      );
    }
  }

  async getGenerationDetail(
    idOrName: string | number,
  ): Promise<PokeApiGenerationDetailDTO> {
    const key = String(idOrName).toLowerCase().trim();

    try {
      const response = await fetch(`${this.baseUrl}/generation/${key}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 404) {
        throw new NotFoundError(
          `Generation '${idOrName}' not found in PokeAPI.`,
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
        `Failed to fetch generation details from PokeAPI: ${message}`,
      );
    }
  }

  async getGenerationDetailsInParallel(
    items: PokeApiNamedResource[],
  ): Promise<PokeApiGenerationDetailDTO[]> {
    const detailPromises = items.map((item) => {
      const identifier = this.extractIdOrName(item);
      return this.getGenerationDetail(identifier);
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
