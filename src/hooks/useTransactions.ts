import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { transactionsService } from "../services/transactions.service";

type TransactionQuery = {
  data: Transaction[];
  pagination: {
    total: number;
    pages: number;
  };
};

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
      queryClient.setQueryData<TransactionQuery>(
        ["transactions", { description, tag, type, range, page, limit }],
        (state) => {
          if (!state)
            return { data: [data], pagination: { total: 1, pages: 1 } };

          return {
            data: [data, ...state.data],
            pagination: {
              total: state.pagination.total + 1,
              pages: Math.ceil((state.pagination.total + 1) / limit),
            },
          };
        },
      );
    },
  });

  const { mutateAsync: deleteTransaction, error: deleteError } = useMutation({
    mutationFn: transactionsService.deleteTransaction,
    onSuccess: () => {
      // Invalidate all transaction queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
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
    deleteTransaction,
    deleteTransactionError: deleteError,
  };
};
