import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostHogProvider, PostHogErrorBoundary } from "posthog-js/react";

import "./global.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/Auth.tsx";
import { LoaderProvider } from "./contexts/Loader.tsx";
import { ErrorFallback } from "./components/ErrorFallback.tsx";

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
} as const;

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <PostHogErrorBoundary fallback={<ErrorFallback />}>
        <QueryClientProvider client={queryClient}>
          <LoaderProvider>
            <AuthProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AuthProvider>
          </LoaderProvider>
        </QueryClientProvider>
      </PostHogErrorBoundary>
    </PostHogProvider>
  </StrictMode>,
);
