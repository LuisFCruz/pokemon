import axios from "axios";

import { GenerationDetailDomain, GenerationListResponse } from "../model/types";

export const generationApi = {
  getGenerations: async (): Promise<GenerationListResponse> => {
    const { data } =
      await axios.get<GenerationListResponse>("/api/generations");
    return data;
  },

  getGenerationDetail: async (
    idOrName: string | number,
  ): Promise<GenerationDetailDomain> => {
    const { data } = await axios.get<GenerationDetailDomain>(
      `/api/generations/${idOrName}`,
    );
    return data;
  },
};
