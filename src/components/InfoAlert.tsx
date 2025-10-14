import type { ReactNode } from "react";
import { Info } from "lucide-react";

interface InfoAlertProps {
  children: ReactNode;
  className?: string;
}

export function InfoAlert({ children, className = "" }: InfoAlertProps) {
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-800 ${className} `}
    >
      <Info className="mt-0.5 h-5 w-5 flex-shrink-0" />
      <div className="flex-1 text-sm leading-6">{children}</div>
    </div>
  );
}
