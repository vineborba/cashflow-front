import { apiClient } from "./client";

export const banksService = {
  async listBanks() {
    const data = apiClient.get("banks").json<Bank[]>();

    return data;
  },
};
