import { forwardRef, useState } from "react";
import {
  Input as HInput,
  Label,
  Field,
  Description,
  Button,
} from "@headlessui/react";
import type { InputProps as HInputProps } from "@headlessui/react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  label?: string;
  error?: string;
  containerClassName?: string;
} & HInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(function (
  {
    label,
    error,
    className = "",
    containerClassName = "",
    type = "text",
    ...rest
  },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field className={`relative ${containerClassName}`}>
      {label && <Label className="text-sm text-gray-700">{label}</Label>}
      <HInput
        {...rest}
        ref={ref}
        type={showPassword ? "text" : type}
        className={`block w-full rounded-md border border-gray-500 px-2 py-1 ${type === "password" ? "pr-8" : ""} ${className}`}
      />
      {type === "password" && (
        <Button
          type="button"
          className="absolute right-2 bottom-2 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      )}
      {!!error && (
        <Description className="text-xs text-red-500">{error}</Description>
      )}
    </Field>
  );
});
