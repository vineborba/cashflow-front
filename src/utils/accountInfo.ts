import { PiggyBank, ChartLineIcon, Banknote } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const accountTypeToIcon: Record<AccountType, LucideIcon> = {
  checking: Banknote,
  savings: PiggyBank,
  investment: ChartLineIcon,
};

export const accountTypeBackgroundColor: Record<AccountType, string> = {
  checking: "bg-cyan-500",
  savings: "bg-emerald-500",
  investment: "bg-yellow-500",
};

export const accountTypeLabel: Record<AccountType, string> = {
  checking: "Conta corrente",
  investment: "Investimentos",
  savings: "Poupança",
};