import {
  HandPlatter,
  Car,
  HeartPulse,
  House,
  BookOpenText,
  Drill,
  SquareStack,
  Clapperboard,
  TvMinimalPlay,
  BanknoteArrowDown,
  BanknoteArrowUp,
} from "lucide-react";

import { normalizeString } from "@app/utils/normalizeString";

const COMMON_ICONS = {
  alimentacao: {
    Icon: HandPlatter,
    color: "bg-amber-100 text-amber-700",
    bgColor: "bg-amber-100",
  },
  transporte: {
    Icon: Car,
    color: "text-fuchsia-700",
    bgColor: "bg-fuchsia-100",
  },
  saude: {
    Icon: HeartPulse,
    color: "text-pink-700",
    bgColor: "bg-pink-100",
  },
  moradia: {
    Icon: House,
    color: "text-teal-700",
    bgColor: "bg-teal-100",
  },
  lazer: {
    Icon: Clapperboard,
    color: "text-cyan-700",
    bgColor: "bg-cyan-100",
  },
  educacao: {
    Icon: BookOpenText,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  servicos: {
    Icon: Drill,
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
  },
  outros: {
    Icon: SquareStack,
    color: "text-gray-700",
    bgColor: "bg-gray-100",
  },
  streaming: {
    Icon: TvMinimalPlay,
    color: "text-violet-700",
    bgColor: "bg-violet-100",
  },
  expense: {
    Icon: BanknoteArrowDown,
    color: "text-red-700",
    bgColor: "bg-red-100",
  },
  income: {
    Icon: BanknoteArrowUp,
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
};

type IconKey = keyof typeof COMMON_ICONS;

export function TransactionIcon({
  tag,
  type,
}: {
  tag: string;
  type: TransactionType;
}) {
  const normalizedTag = normalizeString(tag.toLowerCase());
  const { Icon, color, bgColor } =
    COMMON_ICONS[normalizedTag as IconKey] ?? COMMON_ICONS[type];

  return (
    <div className={`p-1 ${bgColor} rounded-full`}>
      <Icon className={`h-4 w-4 md:h-6 md:w-6 ${color}`} />
    </div>
  );
}
