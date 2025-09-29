import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";

import { useTags } from "@app/hooks/useTags";
import { useAccounts } from "@app/hooks/useAccounts";
import { useTransactions } from "@app/hooks/useTransactions";
import { getErrorMessage, setFormError } from "@app/utils/errorHandling";
import { useLoader } from "@app/contexts/Loader";

import { Select } from "../Select";
import { Button } from "../Button";
import { CurrencyMaskedInput } from "../CurrencyMaskedInput";
import { Input } from "../Input";
import { Listbox } from "../Listbox";
import { DatePicker } from "../DatePicker";

const TRANSACTION_TYPE_OPTIONS: { value: TransactionType; label: string }[] = [
  { value: "expense", label: "Despesa" },
  { value: "income", label: "Receita" },
];

const newTransactionSchema = v.object({
  description: v.pipe(
    v.string("Descrição é obrigatória"),
    v.nonEmpty("Descrição é obrigatória"),
    v.minLength(5, "Descrição deve ter pelo menos 5 caracteres"),
    v.maxLength(120, "Descrição deve ter no máximo 120 caracteres"),
  ),
  type: v.pipe(
    v.string("Tipo de transação é obrigatório"),
    v.nonEmpty("Selecione um tipo de transação"),
  ),
  account: v.pipe(
    v.string("Conta é obrigatória"),
    v.nonEmpty("Selecione uma conta"),
  ),
  amount: v.pipe(
    v.string("Valor é obrigatório"),
    v.nonEmpty("Valor é obrigatório"),
  ),
  date: v.date("Data é obrigatória"),
  tags: v.pipe(
    v.array(
      v.object({
        id: v.string(),
        label: v.string(),
      }),
    ),
    v.minLength(1, "Selecione pelo menos uma categoria"),
  ),
});

type NewTransactionDialogProps = {
  isOpen: boolean;
  close: () => void;
};

type NewTransactionForm = v.InferOutput<typeof newTransactionSchema>;

export function NewTransactionDialog({
  isOpen,
  close,
}: NewTransactionDialogProps) {
  const { createTransaction } = useTransactions();
  const { accounts } = useAccounts();
  const { tags } = useTags();
  const { addLoader, removeLoader } = useLoader();

  const tagsOptions = tags.map((t) => ({ id: t.id, label: t.name }));
  const accountsOptions = accounts.map((a) => ({
    value: a.id,
    label: a.description,
  }));

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<NewTransactionForm>({
    resolver: valibotResolver(newTransactionSchema),
    mode: "onChange",
    defaultValues: {
      description: "",
      type: TRANSACTION_TYPE_OPTIONS[0].value,
      account: "",
      amount: "0",
      date: new Date(),
      tags: [],
    },
  });

  async function onSubmit(data: NewTransactionForm) {
    addLoader("create-transaction");
    try {
      const {
        amount,
        description,
        account: accountId,
        tags: formTags,
        type,
        date,
      } = data;
      const mappedTags = formTags.map((t) => t.id);
      const formattedAmount = amount
        .replace("R$ ", "")
        .replaceAll(".", "")
        .replace(",", ".");

      await createTransaction({
        description,
        type: type as TransactionType,
        date,
        accountId,
        tags: mappedTags,
        value: +formattedAmount,
      });

      reset();
      close();
    } catch (error) {
      console.error("Failed to create transaction", error);
      const errorMessage = getErrorMessage(error, "Erro ao criar transação");
      setFormError(
        setError,
        ["description", "type", "account", "amount", "date", "tags"],
        errorMessage,
      );
    }
    removeLoader("create-transaction");
  }

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-2 md:p-4">
        <DialogPanel className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 md:p-8">
          <DialogTitle className="font-bold">Registrar transação</DialogTitle>
          <Description>Insira os dados da sua tranasção</Description>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Descrição"
              placeholder="Como identificar esta transação"
              error={errors.description?.message}
              {...register("description", {
                onChange: () => {
                  if (errors.description?.type === "manual") {
                    clearErrors([
                      "description",
                      "type",
                      "account",
                      "amount",
                      "date",
                      "tags",
                    ]);
                  }
                },
              })}
            />
            <Select
              options={TRANSACTION_TYPE_OPTIONS}
              label="Tipo de transação"
              error={errors.type?.message}
              {...register("type", {
                onChange: () => {
                  if (errors.type?.type === "manual") {
                    clearErrors([
                      "description",
                      "type",
                      "account",
                      "amount",
                      "date",
                      "tags",
                    ]);
                  }
                },
              })}
            />
            <Select
              options={accountsOptions}
              label="Conta"
              error={errors.account?.message}
              {...register("account", {
                onChange: () => {
                  if (errors.account?.type === "manual") {
                    clearErrors([
                      "description",
                      "type",
                      "account",
                      "amount",
                      "date",
                      "tags",
                    ]);
                  }
                },
              })}
            />
            <CurrencyMaskedInput
              label="Valor"
              prefix="R$ "
              decimalSeparator=","
              groupSeparator="."
              error={errors.amount?.message}
              {...register("amount", {
                onChange: () => {
                  if (errors.amount?.type === "manual") {
                    clearErrors([
                      "description",
                      "type",
                      "account",
                      "amount",
                      "date",
                      "tags",
                    ]);
                  }
                },
              })}
            />
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(newDate) => {
                    field.onChange(newDate ?? new Date());
                    if (errors.date?.type === "manual") {
                      clearErrors([
                        "description",
                        "type",
                        "account",
                        "amount",
                        "date",
                        "tags",
                      ]);
                    }
                  }}
                  label="Data"
                />
              )}
            />

            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Listbox
                  options={tagsOptions}
                  label="Categorias"
                  multiple
                  emptyStateMessage="Selecione uma categoria"
                  error={errors.tags?.message}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    if (errors.tags?.type === "manual") {
                      clearErrors([
                        "description",
                        "type",
                        "account",
                        "amount",
                        "date",
                        "tags",
                      ]);
                    }
                  }}
                />
              )}
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
