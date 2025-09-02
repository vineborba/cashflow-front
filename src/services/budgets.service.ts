import { apiClient } from "./client";

export const budgetsService = {
  listBudgets: async () => {
    const data = await apiClient.get("budgets").json<Budget[]>();

    return data;
  },

  createBudget: async (budgetData: NewBudget) => {
    const data = await apiClient
      .post("budgets", {
        body: JSON.stringify(budgetData),
      })
      .json<Budget>();

    return data;
  },
};
