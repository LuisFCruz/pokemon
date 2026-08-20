import { IGenerationGateway } from "../../ports/IGenerationGateway";
import { GenerationMapper } from "./Generation.mapper";
import {
  GenerationDomain,
  GenerationListResponse,
} from "./Generation.types";

export class GenerationService {
  constructor(private readonly generationGateway: IGenerationGateway) {}

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
}
