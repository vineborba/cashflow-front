import { Routes, Route, Outlet, useLocation, Navigate } from "react-router";

import { useAuth } from "./contexts/Auth";

import { Header } from "./components/Header";

import { Home } from "./pages/Home";
import { Transactions } from "./pages/Transactions";
import { Budgets } from "./pages/Budgets";
import { Accounts } from "./pages/Accounts";
import { SignIn } from "./pages/SignIn";

function RootLayout() {
  return (
    <>
      <Header />
      <section className="mx-auto flex w-full max-w-[1280px] grow flex-col px-2 py-8 md:px-6">
        <Outlet />
      </section>
    </>
  );
}

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<ProtectedLayout />}>
          <Route index element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="accounts" element={<Accounts />} />
        </Route>
      </Route>
    </Routes>
  );
}
