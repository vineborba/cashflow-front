import { forwardRef, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  Field,
  Label,
  Description,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type FilterableSelectProps = {
  options: Option[];
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const FilterableSelect = forwardRef<
  HTMLInputElement,
  FilterableSelectProps
>(function (
  {
    label,
    error,
    options,
    placeholder = "Selecione uma opção...",
    value,
    onChange,
  },
  ref,
) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option: Option) =>
          option.label.toLowerCase().includes(query.toLowerCase()),
        );

  const selectedOption = options.find((opt: Option) => opt.value === value);

  const handleChange = (option: Option | null) => {
    const newValue = option?.value || "";
    setQuery("");
    onChange?.(newValue);
  };

  return (
    <Field className="w-full self-stretch md:w-fit">
      {label && <Label className="text-sm text-gray-700">{label}</Label>}
      <Combobox value={selectedOption} onChange={handleChange}>
        <div className="relative">
          <ComboboxInput
            ref={ref}
            className="block h-full w-full rounded-md border border-gray-500 px-2 py-1 pr-8 leading-6!"
            displayValue={(option: Option) => option?.label || ""}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </ComboboxButton>
        </div>
        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full max-w-2xs overflow-auto rounded-md border border-gray-200 bg-white shadow-lg md:max-w-md">
          {filteredOptions.length === 0 && query !== "" ? (
            <div className="px-3 py-2 text-sm text-gray-500">
              Nenhuma opção encontrada.
            </div>
          ) : (
            filteredOptions.map((option: Option) => (
              <ComboboxOption
                key={option.value}
                value={option}
                className="cursor-pointer px-3 py-2 text-sm select-none hover:bg-blue-500 hover:text-white data-[selected]:bg-blue-500 data-[selected]:text-white"
              >
                {option.label}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
      {!!error && (
        <Description className="text-xs text-red-500">{error}</Description>
      )}
    </Field>
  );
});
