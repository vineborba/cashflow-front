import { Routes, Route, Outlet, useLocation, Navigate } from "react-router";

import { useAuth } from "./contexts/Auth";

import { Header } from "./components/Header";

import { Home } from "./pages/Home";
import { Transactions } from "./pages/Transactions";
import { Budgets } from "./pages/Budgets";
import { Accounts } from "./pages/Accounts";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { useLoader } from "./contexts/Loader";
import { DrawerMenu } from "./components/DrawerMenu";

function RootLayout() {
  return (
    <>
      <Header />
      <DrawerMenu />
      <section className="mx-auto flex w-full max-w-[1280px] grow flex-col px-2 py-2 sm:py-4 md:px-6 md:py-8">
        <Outlet />
      </section>
    </>
  );
}

function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const { isLoading } = useLoader();
  const location = useLocation();

  if (isLoading()) {
    return (
      <div className="relative flex items-center justify-center bg-white">
        <p className="absolute z-60 mx-auto my-auto text-3xl">Loading...</p>
        {/* <Outlet /> */}
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
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
