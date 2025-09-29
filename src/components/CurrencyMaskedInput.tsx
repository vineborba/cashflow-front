import { forwardRef } from "react";
import CurrencyInput from "react-currency-input-field";
import type { CurrencyInputProps } from "react-currency-input-field";

import { Input } from "./Input";

type CurrencyMaskedInputProps = {
  label: string;
  error?: string;
} & CurrencyInputProps;

export const CurrencyMaskedInput = forwardRef<
  HTMLInputElement,
  CurrencyMaskedInputProps
>(function (props, ref) {
  return <CurrencyInput customInput={Input} ref={ref} {...props} />;
});
