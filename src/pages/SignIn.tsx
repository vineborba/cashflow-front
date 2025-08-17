import { Link, Navigate } from "react-router";

import { Button } from "@app/components/Button";
import { Input } from "@app/components/Input";

import { useAuth } from "@app/contexts/Auth";
import { transformFormDataToJson } from "@app/utils/transformFormDataToJson";

type SignInForm = {
  email: string;
  password: string;
};

export function SignIn() {
  const { signIn, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

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
          <Input name="email" label="E-mail" />
          <Input name="password" label="Senha" />
          <Button type="submit" size="full">
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
    </>
  );
}
