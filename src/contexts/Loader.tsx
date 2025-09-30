import { createContext, use, useState, type PropsWithChildren } from "react";

type LoaderContextValue = {
  addLoader: (loader: string) => void;
  removeLoader: (loader: string) => void;
  isLoading: (loaderId?: string) => boolean;
};

const LoaderContext = createContext<LoaderContextValue | null>(null);

type LoaderProviderProps = PropsWithChildren;

export function LoaderProvider({ children }: LoaderProviderProps) {
  const [loaders, setLoaders] = useState<string[]>([]);

  function addLoader(loaderId: string) {
    setLoaders((prev) => [...prev, loaderId]);
  }

  function removeLoader(loaderId: string) {
    setLoaders((prev) => prev.filter((l) => l !== loaderId));
  }

  function isLoading(loaderId?: string) {
    if (loaderId) {
      return loaders.includes(loaderId);
    }

    return loaders.length > 0;
  }

  const value = {
    isLoading,
    addLoader,
    removeLoader,
  };

  return (
    <LoaderContext.Provider value={value}>
      {isLoading() && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="h-20 w-20 animate-spin rounded-full border-t-2 border-r-2 border-b-2 border-l-2 border-t-green-400 border-r-green-400 border-b-green-300 border-l-green-300" />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => {
  const contextValue = use(LoaderContext);

  if (!contextValue) {
    throw new Error("Using Loader Context outsite its provider");
  }

  return contextValue;
};
