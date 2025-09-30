import {
  createContext,
  use,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { usePostHog } from "posthog-js/react";

import { authService } from "@app/services/auth.service";
import { userService } from "@app/services/user.service";

import { useLoader } from "./Loader";

type AuthContextValue = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = PropsWithChildren;

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const { addLoader, removeLoader } = useLoader();
  const posthog = usePostHog();

  useEffect(() => {
    if (initialLoad) {
      addLoader("auth");
    } else {
      removeLoader("auth");
    }
  }, [initialLoad]);

  async function loadUser() {
    try {
      const userData = await userService.loadUserData();
      setUser(userData);
    } catch (error) {
      posthog.captureException(error, { scope: "Failed to load user data" });
      setUser(null);
    }
    setInitialLoad(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function signIn(email: string, password: string) {
    await authService.signIn(email, password);
    await loadUser();
  }

  async function signOut() {
    await authService.signOut();
    setUser(null);
  }

  const contextValue = {
    user,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const contextValue = use(AuthContext);

  if (!contextValue) {
    throw new Error("Accessing AuthContext outside its provider.");
  }

  return contextValue;
};
