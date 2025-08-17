import { apiClient } from "./client";

export const accountsService = {
  async listAccounts() {
    const data = await apiClient.get("accounts").json<Account[]>();

    return data;
  },

  async createAccount(newAccount: NewAccount) {
    const data = await apiClient
      .post("accounts", { body: JSON.stringify(newAccount) })
      .json<Account>();

    return data;
  },
};
