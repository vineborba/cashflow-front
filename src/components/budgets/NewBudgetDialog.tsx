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

import { useBudgets } from "@app/hooks/useBudgets";
import { useTags } from "@app/hooks/useTags";
import { getErrorMessage, setFormError } from "@app/utils/errorHandling";
import { useLoader } from "@app/contexts/Loader";

import { Button } from "../Button";
import { CurrencyMaskedInput } from "../CurrencyMaskedInput";
import { Input } from "../Input";
import { Listbox } from "../Listbox";

const newBudgetSchema = v.object({
  name: v.pipe(
    v.string("Nome é obrigatório"),
    v.nonEmpty("Nome é obrigatório"),
    v.minLength(1, "Nome deve ter pelo menos 1 caracter"),
    v.maxLength(60, "Deve ter no máximo 60 caracteres"),
  ),
  maxValue: v.pipe(
    v.string("Valor máximo é obrigatório"),
    v.nonEmpty("Valor máximo é obrigatório"),
  ),
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

type NewBudgetDialogProps = {
  isOpen: boolean;
  close: () => void;
};

type NewBudgetForm = v.InferOutput<typeof newBudgetSchema>;

export function NewBudgetDialog({ isOpen, close }: NewBudgetDialogProps) {
  const { tags } = useTags();
  const { createBudget } = useBudgets();
  const { addLoader, removeLoader } = useLoader();

  const tagsOptions = tags.map((t) => ({ id: t.id, label: t.name }));

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<NewBudgetForm>({
    resolver: valibotResolver(newBudgetSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      maxValue: "0",
      tags: [],
    },
  });

  async function onSubmit(data: NewBudgetForm) {
    addLoader("create-budget");
    try {
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
      reset();
      close();
    } catch (error) {
      console.error("Failed to create budget", error);
      const errorMessage = getErrorMessage(error, "Erro ao criar orçamento");
      setFormError(setError, ["name", "maxValue", "tags"], errorMessage);
    }
    removeLoader("create-budget");
  }

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-2 md:p-4">
        <DialogPanel className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 md:p-8">
          <DialogTitle className="font-bold">Criar novo orçamento</DialogTitle>
          <Description>Insira os dados do seu orçamento</Description>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nome"
              placeholder="Como identificar este orçamento"
              error={errors.name?.message}
              {...register("name", {
                onChange: () => {
                  if (errors.name?.type === "manual") {
                    clearErrors(["name", "maxValue", "tags"]);
                  }
                },
              })}
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
                      clearErrors(["name", "maxValue", "tags"]);
                    }
                  }}
                />
              )}
            />
            <CurrencyMaskedInput
              label="Valor máximo"
              prefix="R$ "
              decimalSeparator=","
              groupSeparator="."
              error={errors.maxValue?.message}
              {...register("maxValue", {
                onChange: () => {
                  if (errors.maxValue?.type === "manual") {
                    clearErrors(["name", "maxValue", "tags"]);
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
