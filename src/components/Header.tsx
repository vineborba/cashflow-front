import { NavLink } from "react-router";
import { CreditCard, DollarSign, Home, PieChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
  return (
    <header className="flex w-full shrink-0 justify-between border border-gray-300 p-2">
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
      </nav>
    </header>
  );
}
