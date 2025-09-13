import { apiClient } from "./client";

export const transactionsService = {
  listTransactions: async (params: ListTransactionsParams) => {
    const searchParams = new URLSearchParams();

    if (params.description)
      searchParams.append("description", params.description);
    if (params.tag) searchParams.append("tag", params.tag);
    if (params.type) searchParams.append("type", params.type);
    if (params.range) searchParams.append("range", params.range);
    if (params.page) searchParams.append("page", String(params.page));
    if (params.limit) searchParams.append("limit", String(params.limit));

    const response = await apiClient.get("transactions", { searchParams });

    const total = +(response.headers.get("X-Total-Count") || "0");
    const totalPages = +(response.headers.get("X-Total-Pages") || "0");
    const pagination = { total, pages: totalPages };
    const data = await response.json<Transaction[]>();
    return { data, pagination };
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
