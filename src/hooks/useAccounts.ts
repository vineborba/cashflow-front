import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { accountsService } from "../services/accounts.service";

export const useAccounts = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error: loadError,
    refetch,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: accountsService.listAccounts,
  });

  const { mutateAsync, error: createError } = useMutation({
    mutationFn: accountsService.createAccount,
    onSuccess: (data) => {
      queryClient.setQueryData<Account[]>(["accounts"], (state) => {
        if (!state) return [data];

        return [...state, data];
      });
    },
  });

  const { mutateAsync: deleteAccount, error: deleteError } = useMutation({
    mutationFn: accountsService.deleteAccount,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Account[]>(["accounts"], (state) => {
        if (!state) return [];

        return state.filter((account) => account.id !== deletedId);
      });
    },
  });

  return {
    accounts: data,
    isLoadingAccounts: isLoading,
    accountsLoadError: loadError,
    refetchAccount: refetch,
    createAccount: mutateAsync,
    createAccountError: createError,
    deleteAccount,
    deleteAccountError: deleteError,
  };
};
