import CurrencyInput from "react-currency-input-field";
import type { CurrencyInputProps } from "react-currency-input-field";

import { Input } from "./Input";

type CurrencyMaskedInputProps = {
  label: string;
} & CurrencyInputProps;

export function CurrencyMaskedInput(props: CurrencyMaskedInputProps) {
  return <CurrencyInput customInput={Input} {...props} />;
}
