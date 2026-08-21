import { PokeApiGenerationDetailDTO } from "../../ports/IGenerationGateway";

import { GenerationDomain } from "./Generation.types";

const ROMAN_NUMERALS: Record<string, string> = {
  "generation-i": "Gen I",
  "generation-ii": "Gen II",
  "generation-iii": "Gen III",
  "generation-iv": "Gen IV",
  "generation-v": "Gen V",
  "generation-vi": "Gen VI",
  "generation-vii": "Gen VII",
  "generation-viii": "Gen VIII",
  "generation-ix": "Gen IX",
};

export class GenerationMapper {
  static toDomain(
    dto: PokeApiGenerationDetailDTO,
    fallbackId?: number,
  ): GenerationDomain {
    const romanName =
      ROMAN_NUMERALS[dto.name.toLowerCase()] || dto.name.toUpperCase();
    const versionGroups = (dto.version_groups || []).map((vg) =>
      vg.name.replace(/-/g, " "),
    );

    return {
      id: dto.id || fallbackId || 0,
      name: dto.name,
      romanName,
      mainRegion: dto.main_region ? dto.main_region.name : null,
      speciesCount: (dto.pokemon_species || []).length,
      movesCount: (dto.moves || []).length,
      versionGroups,
    };
  }
}
