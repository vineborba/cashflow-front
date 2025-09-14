import { NavLink } from "react-router";
import { CreditCard, DollarSign, Home, PieChart, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import { useAuth } from "@app/contexts/Auth";

type Route = {
  label: string;
  location: string;
  Icon: LucideIcon;
};

const routes: Route[] = [
  {
    label: "Painel",
    location: "/",
    Icon: Home,
  },
  {
    label: "Transações",
    location: "/transactions",
    Icon: DollarSign,
  },
  {
    label: "Orçamentos",
    location: "/budgets",
    Icon: PieChart,
  },
  {
    label: "Contas",
    location: "/accounts",
    Icon: CreditCard,
  },
];

export function Header() {
  const { isAuthenticated, signOut, user } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <header className="hidden w-full shrink-0 justify-between border border-gray-300 sm:flex sm:p-2">
      <nav className="mg:gap-4 mx-auto flex w-full max-w-[1280px] gap-3 lg:gap-6">
        {routes.map(({ location, label, Icon }) => (
          <NavLink
            to={location}
            key={location}
            className="flex flex-row items-center gap-1"
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={20}
                  className={isActive ? "stroke-2" : "stroke-1"}
                />
                <span
                  className={`text-xs md:text-base lg:text-lg ${isActive ? "stroke-3 font-bold" : "font-normal"}`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
        <Popover className="relative ml-auto">
          <PopoverButton className="cursor-pointer">
            <User />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom end"
            className="mt-1 flex flex-col rounded-md bg-white shadow-sm"
          >
            <p className="p-2">
              Olá, <strong>{user!.name}!</strong>
            </p>
            <hr className="border-gray-300" />
            <button
              className="cursor-pointer p-2 font-semibold"
              onClick={signOut}
            >
              Sair
            </button>
          </PopoverPanel>
        </Popover>
      </nav>
    </header>
  );
}
