import axios from "axios";
import { GenerationListResponse } from "../model/types";

export const generationApi = {
  getGenerations: async (): Promise<GenerationListResponse> => {
    const { data } = await axios.get<GenerationListResponse>("/api/generations");
    return data;
  },
};
