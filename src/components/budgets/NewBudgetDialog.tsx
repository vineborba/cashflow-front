import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { useBudgets } from "@app/hooks/useBudgets";
import { useTags } from "@app/hooks/useTags";
import { transformFormDataToJson } from "@app/utils/transformFormDataToJson";

import { Button } from "../Button";
import { CurrencyMaskedInput } from "../CurrencyMaskedInput";
import { Input } from "../Input";
import { Listbox } from "../Listbox";

type NewBudgetDialogProps = {
  isOpen: boolean;
  close: () => void;
};

type NewBudgetForm = {
  name: string;
  maxValue: string;
  tags: { id: string; label: string }[];
};

export function NewBudgetDialog({ isOpen, close }: NewBudgetDialogProps) {
  const { tags } = useTags();
  const { createBudget } = useBudgets();

  const tagsOptions = tags.map((t) => ({ id: t.id, label: t.name }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = transformFormDataToJson<NewBudgetForm>(formData);
    const { name, maxValue, tags: selectedTags } = data;
    const formattedMaxValue = maxValue
      .replace("R$ ", "")
      .replaceAll(".", "")
      .replace(",", ".");

    await createBudget({
      name,
      tags: selectedTags.map((t) => t.id),
      maxValue: +formattedMaxValue,
    });
    close();
  }

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-2 md:p-4">
        <DialogPanel className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 md:p-8">
          <DialogTitle className="font-bold">Criar novo orçamento</DialogTitle>
          <Description>Insira os dados do seu orçamento</Description>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              name="name"
              label="Nome"
              placeholder="Como identificar este orçamento"
            />
            <Listbox
              options={tagsOptions}
              label="Categorias"
              name="tags"
              multiple
              emptyStateMessage="Selecione uma categoria"
            />
            <CurrencyMaskedInput
              label="Valor máximo"
              name="maxValue"
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
