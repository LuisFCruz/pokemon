import { IPokemonGateway } from "../../ports/IPokemonGateway";
import {
  PaginatedPokemonResponse,
  PokemonDomain,
  PokemonListQueryParams,
} from "./Pokemon.types";
import { PokemonMapper } from "./Pokemon.mapper";
import { InvalidGenerationError } from "./Pokemon.errors";

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
}
