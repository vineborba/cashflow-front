import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./global.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/Auth.tsx";
import { LoaderProvider } from "./contexts/Loader.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoaderProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </LoaderProvider>
    </QueryClientProvider>
  </StrictMode>,
);
