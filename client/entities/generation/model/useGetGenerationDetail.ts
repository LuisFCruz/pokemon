import { useQuery } from "@tanstack/react-query";
import { generationApi } from "../api/generationApi";
import { GenerationDetailDomain } from "./types";

export function useGetGenerationDetail(idOrName: string | number) {
  return useQuery<GenerationDetailDomain, Error>({
    queryKey: ["generation", idOrName],
    queryFn: () => generationApi.getGenerationDetail(idOrName),
    enabled: Boolean(idOrName),
    staleTime: 1000 * 60 * 10, // 10 minutos de cache
  });
}
