import { apiClient } from "./client";

export const transactionsService = {
  listTransactions: async () => {
    const data = await apiClient.get("transactions").json<Transaction[]>();
    return data;
  },

  createTransaction: async (newTransaction: NewTransaction) => {
    const data = await apiClient
      .post("transactions", {
        json: newTransaction,
      })
      .json<Transaction>();

    return data;
  },
};
