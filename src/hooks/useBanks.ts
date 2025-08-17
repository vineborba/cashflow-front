import { banksService } from "@app/services/banks.service";
import { useQuery } from "@tanstack/react-query";

export const useBanks = () => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["banks"],
    queryFn: banksService.listBanks,
  });

  return {
    banks: data,
    isLoadingBanks: isLoading,
    banksError: error,
  };
};
