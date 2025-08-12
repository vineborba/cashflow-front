import { Routes, Route, Outlet } from "react-router";

import { Home } from "./pages/Home";
import { Transactions } from "./pages/Transactions";
import { Budgets } from "./pages/Budgets";
import { Accounts } from "./pages/Accounts";

function RootLayout() {
  return (
    <section className="mx-auto flex w-full max-w-[1280px] grow flex-col px-2 py-8 md:px-6">
      <Outlet />
    </section>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="accounts" element={<Accounts />} />
      </Route>
    </Routes>
  );
}
