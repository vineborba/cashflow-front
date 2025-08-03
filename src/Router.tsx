import { Routes, Route, Outlet } from "react-router";

import { Home } from "./pages/Home";
import { Transactions } from "./pages/Transactions";
import { Budgets } from "./pages/Budgets";
import { Accounts } from "./pages/Accounts";

function RootLayout() {
  return (
    <section className="flex grow flex-col max-w-[1280px] w-full mx-auto py-8 px-2 md:px-6">
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
