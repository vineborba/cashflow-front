import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";

import { getErrorMessage, setFormError } from "@app/utils/errorHandling";

import { Button } from "@app/components/Button";
import { Input } from "@app/components/Input";
import { AccountActivatedDialog } from "@app/components/auth/AccountActivatedDialog";

import { useAuth } from "@app/contexts/Auth";
import { useLoader } from "@app/contexts/Loader";

import { authService } from "@app/services/auth.service";

const signInSchema = v.object({
  email: v.pipe(
    v.string("E-mail é obrigatório"),
    v.nonEmpty("E-mail é obrigatório"),
    v.email("Digite um e-mail válido"),
  ),
  password: v.pipe(
    v.string("Senha é obrigatória"),
    v.nonEmpty("Senha é obrigatória"),
    v.minLength(6, "Senha deve ter pelo menos 6 caracteres"),
  ),
});

type SignInForm = v.InferOutput<typeof signInSchema>;

export function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { signIn } = useAuth();
  const { addLoader, removeLoader } = useLoader();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<SignInForm>({
    resolver: valibotResolver(signInSchema),
    mode: "onChange",
  });

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

  async function onSubmit(data: SignInForm) {
    addLoader("sign-in");
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      console.error("Failed to sign in", error);
      const errorMessage = getErrorMessage(error, "E-mail ou senha incorretos");
      setFormError(setError, ["email", "password"], errorMessage);
    }
    removeLoader("sign-in");
  }

  return (
    <>
      <article className="mx-auto max-w-xs self-center border border-gray-100 p-4 shadow-sm md:mt-20 md:max-w-sm">
        <h1 className="text-center text-2xl font-bold">CashFlow</h1>
        <h2 className="mb-4 text-center text-sm">
          Entre agora e comece a controlar suas finanças!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="E-mail"
            placeholder="Seu e-mail"
            type="email"
            error={errors.email?.message}
            {...register("email", {
              onChange: () => {
                if (errors.email?.type === "manual") {
                  clearErrors(["email", "password"]);
                }
              },
            })}
          />
          <Input
            label="Senha"
            placeholder="Sua senha"
            type="password"
            error={errors.password?.message}
            {...register("password", {
              onChange: () => {
                if (errors.password?.type === "manual") {
                  clearErrors(["email", "password"]);
                }
              },
            })}
          />
          <Button type="submit" size="full" disabled={!isValid}>
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
