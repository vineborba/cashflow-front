import {
  Listbox as HListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Field,
  Label,
  Description,
} from "@headlessui/react";
import type { ListboxProps as HListboxProps } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

type Option = {
  id: string;
  label: string;
};

type ListboxProps = {
  options: Option[];
  label?: string;
  error?: string;
  emptyStateMessage?: string;
} & HListboxProps;

export function Listbox({
  label,
  error,
  options,
  multiple,
  emptyStateMessage = "Selecione um valor",
  ...rest
}: ListboxProps) {
  function formatValue(value: Option | Option[]) {
    if (!Array.isArray(value)) {
      return value.label || emptyStateMessage;
    }

    if (value.length === 0) {
      return emptyStateMessage;
    }

    if (value.length <= 2) {
      return value.map((v) => v.label).join(", ");
    }

    return (
      value
        .slice(0, 2)
        .map((v) => v.label)
        .join(", ") + `, +${value.length - 2}`
    );
  }

  return (
    <Field>
      {label && <Label className="text-sm text-gray-700">{label}</Label>}
      <HListbox multiple={multiple} {...rest}>
        <ListboxButton className="block w-full rounded-md border border-gray-500 px-2 py-1 text-left">
          {({ value }) => <>{formatValue(value)}</>}
        </ListboxButton>
        <ListboxOptions
          className="w-61 rounded-lg border border-gray-400 bg-white"
          anchor="bottom start"
        >
          {options.map((opt) => (
            <ListboxOption
              key={opt.id}
              value={opt}
              className="border-b border-gray-400 first:border-t-0 last:border-b-0 data-[focus]:bg-black/10"
            >
              {({ selected }) => (
                <div className="inline-flex items-center gap-2 px-2 py-1 leading-6">
                  {selected && <Check size={16} />}
                  {opt.label}
                </div>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
        <ChevronDown className="relative bottom-6 z-50 mr-2 ml-auto h-4 w-4" />
      </HListbox>
      {!!error && (
        <Description className="text-xs text-red-500">{error}</Description>
      )}
    </Field>
  );
}
