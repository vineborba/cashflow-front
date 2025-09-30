import { AlertTriangle } from "lucide-react";

import { Button } from "./Button";

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const handleReload = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <AlertTriangle className="mx-auto h-16 w-16 text-red-500" />
        </div>

        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Ops! Algo inesperado aconteceu
        </h1>

        <p className="mb-8 text-gray-600">
          Ocorreu um erro inesperado em nossa aplicação. Por favor, tente
          recarregar a página.
        </p>

        {import.meta.env.DEV && error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
              Detalhes do erro (desenvolvimento)
            </summary>
            <div className="mt-2 rounded-md border border-red-200 bg-red-50 p-3 font-mono text-xs whitespace-pre-wrap text-red-800">
              {error.message}
              {error.stack && (
                <>
                  {"\n\n"}
                  {error.stack}
                </>
              )}
            </div>
          </details>
        )}

        <Button
          onClick={handleReload}
          variant="primary"
          size="full"
          className="mb-4"
        >
          Recarregar página
        </Button>
      </div>
    </div>
  );
}
