import { Input as HInput, Label, Field, Description } from "@headlessui/react";
import type { InputProps as HInputProps } from "@headlessui/react";

type InputProps = { label: string; error?: string } & HInputProps;

export function Input({ label, error, className, ...rest }: InputProps) {
  return (
    <Field>
      <Label className="text-sm text-gray-700">{label}</Label>
      <HInput
        {...rest}
        className={`block w-full rounded-md border! border-gray-500 px-2 py-1 ${className}`}
      />
      {!!error && (
        <Description className="text-xs text-red-500">{error}</Description>
      )}
    </Field>
  );
}
