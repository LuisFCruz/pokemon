import { PokeApiLocationDetailDTO } from "../../ports/ILocationGateway";
import { LocationDomain } from "./Location.types";

export class LocationMapper {
  static toDomain(dto: PokeApiLocationDetailDTO, fallbackId?: number): LocationDomain {
    const gameGenerations = Array.from(
      new Set(
        (dto.game_indices || [])
          .map((gi) => gi.generation?.name)
          .filter(Boolean) as string[],
      ),
    );

    const areas = (dto.areas || []).map((area) => area.name);

    return {
      id: dto.id || fallbackId || 0,
      name: dto.name || "desconhecido",
      region: dto.region ? dto.region.name : null,
      gameGenerations,
      areas,
    };
  }
}
