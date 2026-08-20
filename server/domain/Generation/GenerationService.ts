import { IGenerationGateway } from "../../ports/IGenerationGateway";
import { IPokemonGateway } from "../../ports/IPokemonGateway";
import { PokemonMapper } from "../Pokemon/Pokemon.mapper";
import { GenerationMapper } from "./Generation.mapper";
import {
  GenerationDetailDomain,
  GenerationDomain,
  GenerationListResponse,
} from "./Generation.types";

export class GenerationService {
  constructor(
    private readonly generationGateway: IGenerationGateway,
    private readonly pokemonGateway?: IPokemonGateway,
  ) {}

  async getGenerationList(): Promise<GenerationListResponse> {
    const listDTO = await this.generationGateway.getGenerationList();

    const detailDTOs =
      await this.generationGateway.getGenerationDetailsInParallel(listDTO.results);

    // Sort by ID ascending
    const sortedDTOs = detailDTOs.sort((a, b) => a.id - b.id);

    const generations: GenerationDomain[] = sortedDTOs.map((dto, idx) =>
      GenerationMapper.toDomain(dto, idx + 1),
    );

    return {
      total: generations.length,
      data: generations,
    };
  }

  async getGenerationDetail(idOrName: string | number): Promise<GenerationDomain> {
    const dto = await this.generationGateway.getGenerationDetail(idOrName);
    return GenerationMapper.toDomain(dto);
  }

  async getGenerationDetailWithPokemons(
    idOrName: string | number,
  ): Promise<GenerationDetailDomain> {
    const generationDTO =
      await this.generationGateway.getGenerationDetail(idOrName);

    const domain = GenerationMapper.toDomain(generationDTO);

    let pokemons: GenerationDetailDomain["pokemons"] = [];

    if (this.pokemonGateway && generationDTO.pokemon_species.length > 0) {
      // Sort species by ID if possible
      const speciesList = [...generationDTO.pokemon_species];
      
      const pokemonDTOs =
        await this.pokemonGateway.getPokemonDetailsInParallel(speciesList);

      const sortedPokemonDTOs = pokemonDTOs.sort((a, b) => a.id - b.id);

      pokemons = sortedPokemonDTOs.map((dto, idx) =>
        PokemonMapper.toDomain(dto, idx + 1),
      );
    }

    return {
      ...domain,
      pokemons,
    };
  }
}
