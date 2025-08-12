import type { PropsWithChildren } from "react";

export function PageTitle({ children }: PropsWithChildren) {
  return <h1 className="text-4xl font-bold">{children}</h1>;
}
