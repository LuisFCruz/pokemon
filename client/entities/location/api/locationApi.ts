import axios from "axios";

import {
  GetLocationListParams,
  PaginatedLocationResponse,
} from "../model/types";

export const locationApi = {
  getLocations: async (
    params: GetLocationListParams = {},
  ): Promise<PaginatedLocationResponse> => {
    const { data } = await axios.get<PaginatedLocationResponse>(
      "/api/locations",
      {
        params,
      },
    );
    return data;
  },
};
