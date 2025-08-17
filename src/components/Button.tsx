import { Button as HButton } from "@headlessui/react";
import type { ButtonProps as HButtonProps } from "@headlessui/react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

const variants = tv({
  base: "rounded-md px-4 py-2 font-bold",
  variants: {
    variant: {
      primary: "bg-black text-white",
      secondary: "bg-white text-black border border-black",
    },
  },
});

type Variants = VariantProps<typeof variants>;

type ButtonProps = Variants & HButtonProps;

export function Button({
  children,
  variant = "primary",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <HButton className={variants({ variant })} type={type} {...rest}>
      {children}
    </HButton>
  );
}
