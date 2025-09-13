import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { transactionsService } from "../services/transactions.service";

export const useTransactions = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error: loadError,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: transactionsService.listTransactions,
  });

  const { mutateAsync, error: createError } = useMutation({
    mutationFn: transactionsService.createTransaction,
    onSuccess: (data) => {
      queryClient.setQueryData<Transaction[]>(["transactions"], (state) => {
        if (!state) return [data];

        return [data, ...state];
      });
    },
  });

  return {
    transactions: data,
    isLoadingTransactions: isLoading,
    transactionsLoadError: loadError,
    refetchTransactions: refetch,
    createTransaction: mutateAsync,
    createTransactionError: createError,
  };
};
