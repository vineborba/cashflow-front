import { Link } from "react-router";
import { CheckCircle, Mail } from "lucide-react";

import { Button } from "@app/components/Button";

export default function PostSignUp() {
  return (
    <article className="mx-auto max-w-xs self-center border border-gray-100 p-6 shadow-sm md:mt-20 md:max-w-md">
      <div className="mb-6 text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Conta criada com sucesso!
        </h1>
        <p className="text-sm text-gray-600">
          Sua conta foi criada no CashFlow
        </p>
      </div>

      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start">
          <Mail className="mt-0.5 mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
          <div>
            <h3 className="mb-1 text-sm font-semibold text-blue-900">
              Verifique seu e-mail
            </h3>
            <p className="text-sm leading-relaxed text-blue-800">
              Enviamos um link de verificação para seu e-mail. Clique no link
              para ativar sua conta e começar a usar o CashFlow.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></span>
          <span>Verifique sua caixa de entrada e spam</span>
        </div>
        <div className="flex items-center">
          <span className="mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></span>
          <span>O link de verificação expira em 24 horas</span>
        </div>
        <div className="flex items-center">
          <span className="mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></span>
          <span>Após verificar, você poderá fazer login</span>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Link to="/sign-in" replace className="block">
          <Button size="full" variant="secondary">
            Voltar para o login
          </Button>
        </Link>
      </div>
    </article>
  );
}
