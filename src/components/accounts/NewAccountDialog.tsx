import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { useAccounts } from "@app/hooks/useAccounts";
import { useBanks } from "@app/hooks/useBanks";
import { transformFormDataToJson } from "@app/utils/transformFormDataToJson";

import { Select } from "../Select";
import { Button } from "../Button";
import { CurrencyMaskedInput } from "../CurrencyMaskedInput";
import { Input } from "../Input";

const ACCOUNT_TYPES_OPTIONS: { value: AccountType; label: string }[] = [
  { value: "savings", label: "Poupança" },
  { value: "investment", label: "Investimentos" },
  { value: "checking", label: "Conta corrente" },
];

type NewAccountDialogProps = {
  isOpen: boolean;
  close: () => void;
};

type NewAccountForm = {
  description: string;
  type: AccountType;
  balance: string;
  bank: string;
};

export function NewAccountDialog({ isOpen, close }: NewAccountDialogProps) {
  const { createAccount } = useAccounts();
  const { banks } = useBanks();

  const banksOptions = banks.map((b) => ({ value: b.code, label: b.name }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = transformFormDataToJson<NewAccountForm>(formData);
    const { balance, bank: bankCode } = data;
    const formattedBalance = balance
      .replace("R$ ", "")
      .replaceAll(".", "")
      .replace(",", ".");

    await createAccount({ ...data, bankCode, balance: +formattedBalance });
  }

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-2 md:p-4">
        <DialogPanel className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 md:p-8">
          <DialogTitle className="font-bold">Criar nova conta</DialogTitle>
          <Description>Insira os dados da sua conta bancária</Description>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              name="description"
              label="Descrição"
              placeholder="Como identificar esta conta"
            />
            <Select options={banksOptions} label="Banco" name="bank" />
            <Select
              options={ACCOUNT_TYPES_OPTIONS}
              label="Tipo de conta"
              name="type"
              defaultValue={ACCOUNT_TYPES_OPTIONS[0].value}
            />
            <CurrencyMaskedInput
              label="Saldo"
              name="balance"
              prefix="R$ "
              defaultValue={0}
              decimalSeparator=","
              groupSeparator="."
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
