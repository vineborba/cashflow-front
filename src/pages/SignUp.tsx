import { Link } from "react-router";
import { useState } from "react";

import { Button } from "@app/components/Button";
import { Input } from "@app/components/Input";

import { transformFormDataToJson } from "@app/utils/transformFormDataToJson";
import { authService } from "@app/services/auth.service";

type SignUpForm = {
  name: string;
  email: string;
  password: string;
};

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const disableButton =
    !email ||
    !name ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = transformFormDataToJson<SignUpForm>(formData);
    await authService.signUp(data.name, data.email, data.password);
  }

  return (
    <>
      <article className="mx-auto max-w-xs self-center border border-gray-100 p-4 shadow-sm md:mt-20 md:max-w-sm">
        <h1 className="text-center text-2xl font-bold">CashFlow</h1>
        <h2 className="mb-4 text-center text-sm">
          Crie sua conta e comece a controlar suas finanças!
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            name="name"
            label="Nome"
            placeholder="Seu nome"
            onChange={(e) => setName(e.target.value)}
          />
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
          <Input
            name="confirm-password"
            label="Confirmar senha"
            placeholder="Confirme sua senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
          <Button type="submit" size="full" disabled={disableButton}>
            Confirmar
          </Button>
          <span className="block text-center">
            Já possui conta?{" "}
            <Link
              to="/sign-in"
              replace
              className="font-semibold text-green-600"
            >
              Acesse agora mesmo!
            </Link>
          </span>
        </form>
      </article>
    </>
  );
}
