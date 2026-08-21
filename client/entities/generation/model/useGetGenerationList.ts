import { useQuery } from "@tanstack/react-query";

import { generationApi } from "../api/generationApi";

import { GenerationListResponse } from "./types";

export function useGetGenerationList() {
  return useQuery<GenerationListResponse, Error>({
    queryKey: ["generations"],
    queryFn: () => generationApi.getGenerations(),
    staleTime: 1000 * 60 * 10, // 10 minutos de cache
  });
}
