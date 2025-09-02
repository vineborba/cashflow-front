import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";

import { Button } from "@app/components/Button";
import { Input } from "@app/components/Input";
import { AccountActivatedDialog } from "@app/components/AccountActivatedDialog";

import { useAuth } from "@app/contexts/Auth";
import { useLoader } from "@app/contexts/Loader";

import { authService } from "@app/services/auth.service";
import { transformFormDataToJson } from "@app/utils/transformFormDataToJson";

type SignInForm = {
  email: string;
  password: string;
};

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { signIn } = useAuth();
  const { addLoader, removeLoader } = useLoader();

  async function activateAccount(token: string) {
    addLoader("account-ativate");
    try {
      await authService.activateAccount(token);
      setIsOpen(true);
    } catch (error) {
      console.error("Failed to ativate account", error);
    }
    removeLoader("account-ativate");
  }

  useEffect(() => {
    const activateToken = searchParams.get("activate");
    if (activateToken) {
      activateAccount(activateToken);
      setSearchParams((prev) => {
        prev.delete("activate");
        return prev;
      });
    }
  }, [activateAccount, searchParams, setSearchParams]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = transformFormDataToJson<SignInForm>(formData);
    await signIn(data.email, data.password);
  }

  return (
    <>
      <article className="mx-auto max-w-xs self-center border border-gray-100 p-4 shadow-sm md:mt-20 md:max-w-sm">
        <h1 className="text-center text-2xl font-bold">CashFlow</h1>
        <h2 className="mb-4 text-center text-sm">
          Entre agora e comece a controlar suas finanças!
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            name="email"
            label="E-mail"
            placeholder="Seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            label="Senha"
            placeholder="Sua senha"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button type="submit" size="full" disabled={!email || !password}>
            Confirmar
          </Button>
          <span className="block text-center">
            Não possui conta?{" "}
            <Link to="/sign-up" className="font-semibold text-green-600">
              Crie uma!
            </Link>
          </span>
        </form>
      </article>

      <AccountActivatedDialog isOpen={isOpen} close={() => setIsOpen(false)} />
    </>
  );
}
