import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";
import { usePostHog } from "posthog-js/react";

import { Button } from "@app/components/Button";
import { Input } from "@app/components/Input";

import { authService } from "@app/services/auth.service";
import { getErrorMessage, setFormError } from "@app/utils/errorHandling";
import { useLoader } from "@app/contexts/Loader";

const signUpSchema = v.pipe(
  v.object({
    name: v.pipe(
      v.string("Nome é obrigatório"),
      v.nonEmpty("Nome é obrigatório"),
      v.minLength(6, "Nome deve ter pelo menos 6 caracteres"),
      v.maxLength(120, "Nome deve ter no máximo 120 caracteres"),
    ),
    email: v.pipe(
      v.string("E-mail é obrigatório"),
      v.nonEmpty("E-mail é obrigatório"),
      v.email("Digite um e-mail válido"),
      v.minLength(6, "E-mail deve ter pelo menos 6 caracteres"),
      v.maxLength(40, "E-mail deve ter no máximo 40 caracteres"),
    ),
    password: v.pipe(
      v.string("Senha é obrigatória"),
      v.nonEmpty("Senha é obrigatória"),
      v.minLength(6, "Senha deve ter pelo menos 6 caracteres"),
      v.maxLength(255, "Senha deve ter no máximo 255 caracteres"),
    ),
    confirmPassword: v.pipe(
      v.string("Confirmação de senha é obrigatória"),
      v.nonEmpty("Confirmação de senha é obrigatória"),
    ),
  }),
  v.forward(
    v.check(
      (input) => input.password === input.confirmPassword,
      "As senhas devem ser iguais",
    ),
    ["confirmPassword"],
  ),
);

type SignUpForm = v.InferOutput<typeof signUpSchema>;

const LOADER_ID = "sign-up";

export function SignUp() {
  const { addLoader, removeLoader, isLoading } = useLoader();
  const navigate = useNavigate();
  const posthog = usePostHog();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    resolver: valibotResolver(signUpSchema),
    mode: "onChange",
  });

  async function onSubmit(data: SignUpForm) {
    addLoader(LOADER_ID);
    try {
      await authService.signUp(data.name, data.email, data.password);
    } catch (error) {
      console.error("Failed to sign up", error);
      posthog.captureException(error, { scope: "Failed to sign up" });
      const errorMessage = getErrorMessage(error, "Erro ao criar conta");
      setFormError(
        setError,
        ["name", "email", "password", "confirmPassword"],
        errorMessage,
      );
    }
    removeLoader(LOADER_ID);
    navigate("/sign-up-successful");
  }

  return (
    <>
      <article className="mx-auto max-w-xs self-center border border-gray-100 p-4 shadow-sm md:mt-20 md:max-w-sm">
        <h1 className="text-center text-2xl font-bold">CashFlow</h1>
        <h2 className="mb-4 text-center text-sm">
          Crie sua conta e comece a controlar suas finanças!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nome"
            placeholder="Seu nome"
            error={errors.name?.message}
            {...register("name", {
              onChange: () => {
                if (errors.name?.type === "manual") {
                  clearErrors(["name", "email", "password", "confirmPassword"]);
                }
              },
            })}
          />
          <Input
            label="E-mail"
            placeholder="Seu e-mail"
            type="email"
            error={errors.email?.message}
            {...register("email", {
              onChange: () => {
                if (errors.email?.type === "manual") {
                  clearErrors(["name", "email", "password", "confirmPassword"]);
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
                  clearErrors(["name", "email", "password", "confirmPassword"]);
                }
              },
            })}
          />
          <Input
            label="Confirmar senha"
            placeholder="Confirme sua senha"
            type="password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              onChange: () => {
                if (errors.confirmPassword?.type === "manual") {
                  clearErrors(["name", "email", "password", "confirmPassword"]);
                }
              },
            })}
          />
          <Button
            type="submit"
            size="full"
            disabled={isLoading(LOADER_ID) || !isValid}
          >
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
