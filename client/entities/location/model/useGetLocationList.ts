import { useQuery } from "@tanstack/react-query";
import { locationApi } from "../api/locationApi";
import {
  GetLocationListParams,
  PaginatedLocationResponse,
} from "./types";

export function useGetLocationList(params: GetLocationListParams = {}) {
  return useQuery<PaginatedLocationResponse, Error>({
    queryKey: ["locations", params],
    queryFn: () => locationApi.getLocations(params),
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
}
