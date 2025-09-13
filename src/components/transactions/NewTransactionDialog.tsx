import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

import { useTags } from "@app/hooks/useTags";
import { useAccounts } from "@app/hooks/useAccounts";
import { useTransactions } from "@app/hooks/useTransactions";
import { transformFormDataToJson } from "@app/utils/transformFormDataToJson";

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

type NewTransactionDialogProps = {
  isOpen: boolean;
  close: () => void;
};

type NewTransactionForm = {
  description: string;
  type: TransactionType;
  account: string;
  amount: string;
  tags: { id: string; label: string }[];
};

export function NewTransactionDialog({
  isOpen,
  close,
}: NewTransactionDialogProps) {
  const { createTransaction } = useTransactions();
  const { accounts } = useAccounts();
  const { tags } = useTags();

  const [date, setDate] = useState(new Date());

  const tagsOptions = tags.map((t) => ({ id: t.id, label: t.name }));
  const accountsOptions = accounts.map((a) => ({
    value: a.id,
    label: a.description,
  }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = transformFormDataToJson<NewTransactionForm>(formData);
    const {
      amount,
      description,
      account: accountId,
      tags: formTags,
      type,
    } = data;
    const mappedTags = formTags.map((t) => t.id);
    const formattedAmount = amount
      .replace("R$ ", "")
      .replaceAll(".", "")
      .replace(",", ".");

    await createTransaction({
      description,
      type,
      date,
      accountId,
      tags: mappedTags,
      value: +formattedAmount,
    });

    setDate(new Date());
    close();
  }

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-2 md:p-4">
        <DialogPanel className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 md:p-8">
          <DialogTitle className="font-bold">Registrar transação</DialogTitle>
          <Description>Insira os dados da sua tranasção</Description>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              name="description"
              label="Descrição"
              placeholder="Como identificar esta transação"
            />
            <Select
              options={TRANSACTION_TYPE_OPTIONS}
              label="Tipo de transação"
              name="type"
              defaultValue={TRANSACTION_TYPE_OPTIONS[0].value}
            />
            <Select options={accountsOptions} label="Conta" name="account" />
            <CurrencyMaskedInput
              label="Valor"
              name="amount"
              prefix="R$ "
              defaultValue={0}
              decimalSeparator=","
              groupSeparator="."
            />
            <DatePicker
              selected={date}
              onChange={(newDate) => setDate(newDate ?? new Date())}
              label="Data"
            />

            <Listbox
              options={tagsOptions}
              label="Categorias"
              name="tags"
              multiple
              emptyStateMessage="Selecione uma categoria"
            />
            <div className="flex justify-between gap-4">
              <Button onClick={close} variant="secondary">
                Cancelar
              </Button>
              <Button type="submit">Confirmar</Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
