export interface LocationDomain {
  id: number;
  name: string;
  region: string | null;
  gameGenerations: string[];
  areas: string[];
}

export interface LocationListQueryParams {
  limit?: number;
  offset?: number;
  page?: number;
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
