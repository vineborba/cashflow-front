import {
  Select as HSelect,
  Field,
  Label,
  Description,
} from "@headlessui/react";
import type { SelectProps as HSelectProps } from "@headlessui/react";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  label: string;
  error?: string;
} & HSelectProps;

export function Select({ label, error, options, ...rest }: SelectProps) {
  return (
    <Field>
      <Label className="text-sm text-gray-700">{label}</Label>
      <HSelect
        {...rest}
        className="block w-full rounded-md border! border-gray-500 px-2 py-1"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="leading-6">
            {opt.label}
          </option>
        ))}
      </HSelect>
      {!!error && (
        <Description className="text-xs text-red-500">{error}</Description>
      )}
    </Field>
  );
}
