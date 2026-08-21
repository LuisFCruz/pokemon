import {
  IPokemonGateway,
  PokeApiEvolutionNode,
  PokeApiNamedResource,
} from "../../ports/IPokemonGateway";

import { InvalidGenerationError } from "./Pokemon.errors";
import { PokemonMapper } from "./Pokemon.mapper";
import {
  PaginatedPokemonResponse,
  PokemonDomain,
  PokemonListQueryParams,
} from "./Pokemon.types";

export class PokemonService {
  constructor(private readonly pokemonGateway: IPokemonGateway) {}

  async getPokemonList(
    params: PokemonListQueryParams = {},
  ): Promise<PaginatedPokemonResponse> {
    const limit = Math.min(Math.max(params.limit ?? 20, 1), 50);
    const offset = Math.max(
      params.offset ?? (params.page ? (params.page - 1) * limit : 0),
      0,
    );
    const currentPage = params.page ?? Math.floor(offset / limit) + 1;

    const listDto = await this.pokemonGateway.getPokemonList({
      limit,
      offset,
      page: currentPage,
    });
    const detailsDtoList =
      await this.pokemonGateway.getPokemonDetailsInParallel(listDto.results);

    const pokemonList: PokemonDomain[] = detailsDtoList.map((dto, index) =>
      PokemonMapper.toDomain(dto, offset + index + 1),
    );

    const totalPages = Math.ceil(listDto.count / limit);

    return {
      total: listDto.count,
      page: currentPage,
      limit,
      totalPages,
      next: listDto.next,
      previous: listDto.previous,
      data: pokemonList,
    };
  }

  async getPokemonByIdOrName(
    idOrName: string | number,
  ): Promise<PokemonDomain> {
    if (!idOrName || String(idOrName).trim() === "") {
      throw new InvalidGenerationError(idOrName);
    }
    const detailDto = await this.pokemonGateway.getPokemonDetail(idOrName);
    return PokemonMapper.toDomain(detailDto);
  }

  async getPokemonEvolutions(
    idOrName: string | number,
  ): Promise<PokemonDomain[]> {
    if (!idOrName || String(idOrName).trim() === "") {
      throw new InvalidGenerationError(idOrName);
    }

    const speciesDto = await this.pokemonGateway.getPokemonSpecies(idOrName);
    const chainDto = await this.pokemonGateway.getEvolutionChain(
      speciesDto.evolution_chain.url,
    );

    const speciesList = this.extractSpeciesSequence(chainDto.chain);
    const detailsDtoList =
      await this.pokemonGateway.getPokemonDetailsInParallel(speciesList);

    return detailsDtoList.map((dto) => PokemonMapper.toDomain(dto));
  }

  async getPokemonVariations(
    idOrName: string | number,
  ): Promise<PokemonDomain[]> {
    if (!idOrName || String(idOrName).trim() === "") {
      throw new InvalidGenerationError(idOrName);
    }

    const speciesDto = await this.pokemonGateway.getPokemonSpecies(idOrName);
    if (!speciesDto.varieties || speciesDto.varieties.length === 0) {
      const defaultDetail =
        await this.pokemonGateway.getPokemonDetail(idOrName);
      return [PokemonMapper.toDomain(defaultDetail)];
    }

    const resources: PokeApiNamedResource[] = speciesDto.varieties.map(
      (v) => v.pokemon,
    );

    const detailsDtoList =
      await this.pokemonGateway.getPokemonDetailsInParallel(resources);

    return detailsDtoList.map((dto) => PokemonMapper.toDomain(dto));
  }

  private extractSpeciesSequence(
    node: PokeApiEvolutionNode,
  ): PokeApiNamedResource[] {
    const result: PokeApiNamedResource[] = [node.species];
    if (node.evolves_to && node.evolves_to.length > 0) {
      for (const subNode of node.evolves_to) {
        result.push(...this.extractSpeciesSequence(subNode));
      }
    }
    return result;
  }
}
