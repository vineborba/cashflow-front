import RDatePicker, { registerLocale } from "react-datepicker";
import type { DatePickerProps as RDatePickerProps } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";
import { Field, Label } from "@headlessui/react";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

type DatePickerProps = {
  label?: string;
} & RDatePickerProps;

export function DatePicker({ label, ...props }: DatePickerProps) {
  return (
    <Field>
      {label && <Label className="text-sm text-gray-700">{label}</Label>}
      <RDatePicker
        {...props}
        locale="pt-BR"
        className="w-full rounded-md border border-gray-500 px-2 py-1"
        wrapperClassName="w-full"
        dateFormat={"dd/MM/yyyy"}
      />
    </Field>
  );
}
