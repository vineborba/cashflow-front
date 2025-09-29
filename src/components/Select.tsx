import {
  Select as HSelect,
  Field,
  Label,
  Description,
} from "@headlessui/react";
import type { SelectProps as HSelectProps } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  label?: string;
  error?: string;
} & HSelectProps;

export function Select({ label, error, options, ...rest }: SelectProps) {
  return (
    <Field className="w-full self-stretch md:w-fit">
      {label && <Label className="text-sm text-gray-700">{label}</Label>}
      <HSelect
        {...rest}
        className="block h-full w-full rounded-md border border-gray-500 px-2 py-1 leading-6!"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="leading-6">
            {opt.label}
          </option>
        ))}
        <ChevronDown className="relative bottom-6 z-50 mr-2 ml-auto h-4 w-4" />
      </HSelect>
      {!!error && (
        <Description className="text-xs text-red-500">{error}</Description>
      )}
    </Field>
  );
}
