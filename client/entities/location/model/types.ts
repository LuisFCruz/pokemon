export interface LocationDomain {
  id: number;
  name: string;
  region: string | null;
  gameGenerations: string[];
  areas: string[];
}

export interface GetLocationListParams {
  page?: number;
  limit?: number;
}

export interface PaginatedLocationResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  next: string | null;
  previous: string | null;
  data: LocationDomain[];
}
