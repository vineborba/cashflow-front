import { budgetsService } from "@app/services/budgets.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBudgets = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error: loadError,
    refetch,
  } = useQuery({
    queryKey: ["budgets"],
    queryFn: budgetsService.listBudgets,
  });

  const { mutateAsync, error: createError } = useMutation({
    mutationFn: budgetsService.createBudget,
    onSuccess: (data) => {
      queryClient.setQueryData<Budget[]>(["budgets"], (state) => {
        if (!state) return [data];

        return [...state, data];
      });
    },
  });

  return {
    budgets: data,
    isLoadingBudgets: isLoading,
    budgetsLoadError: loadError,
    refetchBudgets: refetch,
    createBudget: mutateAsync,
    createBudgetError: createError,
  };
};
