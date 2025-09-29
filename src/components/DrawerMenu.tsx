import { useState } from "react";
import { NavLink } from "react-router";
import { X, Menu, CreditCard, DollarSign, Home, PieChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "@app/contexts/Auth";
import posthog from "posthog-js";

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

export function DrawerMenu() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, signOut, user } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <header className="flex w-full p-2 sm:hidden">
      <button
        className="relative z-50 ml-auto cursor-pointer p-4"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X /> : <Menu />}
      </button>

      {open && (
        <nav className="absolute top-0 right-0 bottom-0 left-0 z-40 flex flex-col gap-4 bg-white shadow-md transition-transform duration-300 ease-in-out">
          <h2 className="mb-4 w-full border-b border-slate-300 p-4 text-3xl">
            Olá, <strong>{user!.name}</strong>
          </h2>
          {routes.map(({ location, label, Icon }) => (
            <NavLink
              to={location}
              key={location}
              onClick={() => {
                posthog.capture("Navigation", { location, label });
                setOpen(false);
              }}
              className="flex flex-row items-center gap-4 px-4"
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={32}
                    className={isActive ? "stroke-2" : "stroke-1"}
                  />
                  <span
                    className={`text-xl ${isActive ? "stroke-3 font-bold" : "font-normal"}`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
          <div className="mt-auto flex w-full border-t border-gray-300 py-2">
            <button
              className="mx-auto cursor-pointer px-8 py-4 text-center text-2xl font-semibold"
              onClick={signOut}
            >
              Sair
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
