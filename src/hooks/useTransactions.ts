import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { transactionsService } from "../services/transactions.service";

export const useTransactions = ({
  description = "",
  tag = "",
  type = "",
  range = "",
  page = 1,
  limit = 10,
}: ListTransactionsParams = {}) => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error: loadError,
    refetch,
  } = useQuery({
    queryKey: ["transactions", { description, tag, type, range, page, limit }],
    queryFn: () =>
      transactionsService.listTransactions({
        description,
        tag,
        type,
        range,
        page,
        limit,
      }),
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
    transactions: data?.data || [],
    pagination: data?.pagination || { total: 0, pages: 0 },
    isLoadingTransactions: isLoading,
    transactionsLoadError: loadError,
    refetchTransactions: refetch,
    createTransaction: mutateAsync,
    createTransactionError: createError,
  };
};
