import type { ButtonHTMLAttributes } from "react";

type ButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={`rounded-md bg-black text-white py-2 px-4 cursor-pointer font-bold ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
