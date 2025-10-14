import { useNavigate } from "react-router";
import { CreditCard } from "lucide-react";

import { InfoAlert } from "../InfoAlert";
import { Button } from "../Button";

interface NoAccountsGuideProps {
  onCreateAccount?: () => void;
  showCreateButton?: boolean;
}

export function NoAccountsGuide({
  onCreateAccount,
  showCreateButton = true,
}: NoAccountsGuideProps) {
  const navigate = useNavigate();

  const handleNavigateToAccounts = () => {
    navigate("/accounts");
  };

  const handleCreateAccount = onCreateAccount || handleNavigateToAccounts;

  return (
    <InfoAlert className="mb-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          <span className="font-semibold">Primeira vez por aqui?</span>
        </div>
        <p>
          Para começar a registrar suas transações, você precisa primeiro
          cadastrar pelo menos uma conta bancária (conta corrente, poupança,
          etc.). Isso nos ajudará a organizar melhor suas finanças e dar mais
          clareza aos seus gastos.
        </p>
        {showCreateButton && (
          <div className="pt-2">
            <Button
              onClick={handleCreateAccount}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Criar minha primeira conta
            </Button>
          </div>
        )}
      </div>
    </InfoAlert>
  );
}
