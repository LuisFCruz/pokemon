import { ILocationGateway } from "../../ports/ILocationGateway";
import { LocationMapper } from "./Location.mapper";
import {
  LocationDomain,
  LocationListQueryParams,
  PaginatedLocationResponse,
} from "./Location.types";

export class LocationService {
  constructor(private readonly locationGateway: ILocationGateway) {}

  async getLocationList(
    params: LocationListQueryParams = {},
  ): Promise<PaginatedLocationResponse> {
    const limit = Math.min(Math.max(params.limit ?? 20, 1), 50);
    const page = Math.max(params.page ?? 1, 1);
    const offset = (page - 1) * limit;

    const listDTO = await this.locationGateway.getLocationList({
      limit,
      offset,
    });

    const detailDTOs =
      await this.locationGateway.getLocationDetailsInParallel(listDTO.results);

    const locations: LocationDomain[] = detailDTOs.map((dto, idx) =>
      LocationMapper.toDomain(dto, offset + idx + 1),
    );

    const totalPages = Math.ceil(listDTO.count / limit);

    return {
      total: listDTO.count,
      page,
      limit,
      totalPages,
      next: listDTO.next,
      previous: listDTO.previous,
      data: locations,
    };
  }

  async getLocationDetail(idOrName: string | number): Promise<LocationDomain> {
    const dto = await this.locationGateway.getLocationDetail(idOrName);
    return LocationMapper.toDomain(dto);
  }
}
