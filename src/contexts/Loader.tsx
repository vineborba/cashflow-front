import { GlobalLoader } from "@app/components/GlobalLoader";
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
      {isLoading() && <GlobalLoader />}
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
