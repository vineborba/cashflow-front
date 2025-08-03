import type { PropsWithChildren } from "react";

export function PageTitle({ children }: PropsWithChildren) {
  return <h1 className="font-bold text-4xl">{children}</h1>;
}
