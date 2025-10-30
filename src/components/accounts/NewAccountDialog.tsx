import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";
import { usePostHog } from "posthog-js/react";

import { useAccounts } from "@app/hooks/useAccounts";
import { useBanks } from "@app/hooks/useBanks";
import { getErrorMessage, setFormError } from "@app/utils/errorHandling";
import { useLoader } from "@app/contexts/Loader";

import { Select } from "../Select";
import { FilterableSelect } from "../FilterableSelect";
import { Button } from "../Button";
import { CurrencyMaskedInput } from "../CurrencyMaskedInput";
import { Input } from "../Input";

const ACCOUNT_TYPES_OPTIONS: { value: AccountType; label: string }[] = [
  { value: "savings", label: "Poupança" },
  { value: "investment", label: "Investimentos" },
  { value: "checking", label: "Conta corrente" },
];

const newAccountSchema = v.object({
  description: v.pipe(
    v.string("Descrição é obrigatória"),
    v.nonEmpty("Descrição é obrigatória"),
    v.minLength(3, "Descrição deve ter pelo menos 3 caracteres"),
    v.maxLength(250, "Descrição deve ter no máximo 250 caracteres"),
  ),
  bank: v.pipe(
    v.string("Banco é obrigatório"),
    v.nonEmpty("Selecione um banco"),
  ),
  type: v.pipe(
    v.string("Tipo de conta é obrigatório"),
    v.nonEmpty("Selecione um tipo de conta"),
  ),
  balance: v.pipe(
    v.string("Saldo é obrigatório"),
    v.nonEmpty("Saldo é obrigatório"),
  ),
});

type NewAccountDialogProps = {
  isOpen: boolean;
  close: () => void;
};

type NewAccountForm = v.InferOutput<typeof newAccountSchema>;

export function NewAccountDialog({ isOpen, close }: NewAccountDialogProps) {
  const { createAccount } = useAccounts();
  const { banks } = useBanks();
  const { addLoader, removeLoader } = useLoader();
  const posthog = usePostHog();

  const banksOptions = banks.map((b) => ({ value: b.code, label: b.name }));

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<NewAccountForm>({
    resolver: valibotResolver(newAccountSchema),
    mode: "onChange",
    defaultValues: {
      type: ACCOUNT_TYPES_OPTIONS[0].value,
      balance: "0",
    },
  });

  const bankValue = watch("bank");

  async function onSubmit(data: NewAccountForm) {
    addLoader("create-account");
    try {
      const { balance, bank: bankCode } = data;
      const formattedBalance = balance
        .replace("R$ ", "")
        .replaceAll(".", "")
        .replace(",", ".");

      await createAccount({
        description: data.description,
        type: data.type as AccountType,
        bankCode,
        balance: +formattedBalance,
      });
      reset();
      close();
    } catch (error) {
      console.error("Failed to create account", error);
      posthog.captureException(error, {
        scope: "Failed to create new account",
      });
      const errorMessage = getErrorMessage(error, "Erro ao criar conta");
      setFormError(
        setError,
        ["description", "bank", "type", "balance"],
        errorMessage,
      );
    }
    removeLoader("create-account");
  }

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-2 md:p-4">
        <DialogPanel className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 md:p-8">
          <DialogTitle className="font-bold">Criar nova conta</DialogTitle>
          <Description>Insira os dados da sua conta bancária</Description>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Descrição"
              placeholder="Como identificar esta conta"
              error={errors.description?.message}
              {...register("description", {
                onChange: () => {
                  if (errors.description?.type === "manual") {
                    clearErrors(["description", "bank", "type", "balance"]);
                  }
                },
              })}
            />
            <FilterableSelect
              options={banksOptions}
              label="Banco"
              placeholder="Digite para buscar um banco..."
              error={errors.bank?.message}
              value={bankValue}
              onChange={(value) => {
                setValue("bank", value);
                if (errors.bank?.type === "manual") {
                  clearErrors(["description", "bank", "type", "balance"]);
                }
              }}
            />
            <Select
              options={ACCOUNT_TYPES_OPTIONS}
              label="Tipo de conta"
              error={errors.type?.message}
              {...register("type", {
                onChange: () => {
                  if (errors.type?.type === "manual") {
                    clearErrors(["description", "bank", "type", "balance"]);
                  }
                },
              })}
            />
            <CurrencyMaskedInput
              label="Saldo"
              prefix="R$ "
              decimalSeparator=","
              groupSeparator="."
              error={errors.balance?.message}
              {...register("balance", {
                onChange: () => {
                  if (errors.balance?.type === "manual") {
                    clearErrors(["description", "bank", "type", "balance"]);
                  }
                },
              })}
            />
            <div className="flex justify-between gap-4">
              <Button onClick={close} variant="secondary">
                Cancelar
              </Button>
              <Button type="submit" disabled={!isValid}>
                Confirmar
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
