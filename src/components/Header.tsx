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
    <header className="p-2 flex w-full justify-between shrink-0 border border-gray-300">
      <nav className="flex gap-3 mg:gap-4 lg:gap-6 max-w-[1280px] w-full mx-auto">
        {routes.map(({ location, label, Icon }) => (
          <NavLink
            to={location}
            key={location}
            className="flex flex-row gap-1 items-center"
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={20}
                  className={isActive ? "stroke-2" : "stroke-1"}
                />
                <span
                  className={`text-base md:text-lg ${isActive ? "font-bold stroke-3" : "font-normal"}`}
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
