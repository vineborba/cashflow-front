import type { ButtonHTMLAttributes } from "react";

type ButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={`cursor-pointer rounded-md bg-black px-4 py-2 font-bold text-white ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
