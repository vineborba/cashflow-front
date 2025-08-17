import { authService } from "@app/services/auth.service";
import { userService } from "@app/services/user.service";
import {
  createContext,
  use,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

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

  async function loadUser() {
    try {
      const userData = await userService.loadUserData();
      setUser(userData);
    } catch (error) {
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
    isAuthenticated: initialLoad || !!user,
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
