import { PokeApiPokemonDetailDTO } from "../../ports/IPokemonGateway";

import { PokemonDomain, PokemonStats, PokemonType } from "./Pokemon.types";

export class PokemonMapper {
  static toDomain(dto: PokeApiPokemonDetailDTO, index?: number): PokemonDomain {
    const types: PokemonType[] = dto.types.map((t) => ({
      name: this.capitalize(t.type.name),
    }));

    const dominantType = types.length > 0 ? types[0].name : "Unknown";
    const abilities = dto.abilities.map((a) => this.capitalize(a.ability.name));

    const image =
      dto.sprites.other?.["official-artwork"]?.front_default ||
      dto.sprites.other?.home?.front_default ||
      dto.sprites.front_default ||
      "";

    const statsMap: Record<string, number> = {};
    dto.stats.forEach((s) => {
      statsMap[s.stat.name] = s.base_stat;
    });

    const stats: PokemonStats = {
      hp: statsMap["hp"] ?? 0,
      attack: statsMap["attack"] ?? 0,
      defense: statsMap["defense"] ?? 0,
      specialAttack: statsMap["special-attack"] ?? 0,
      specialDefense: statsMap["special-defense"] ?? 0,
      speed: statsMap["speed"] ?? 0,
    };

    return {
      id: dto.id,
      name: this.capitalize(dto.name),
      index: index ?? dto.id,
      image,
      dominantType,
      types,
      abilities,
      weight: dto.weight,
      height: dto.height,
      baseExperience: dto.base_experience,
      stats,
      isDefault: dto.is_default,
      varietyName: this.capitalize(dto.species?.name || dto.name),
    };
  }

  private static capitalize(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
