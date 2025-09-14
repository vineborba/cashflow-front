import { AccountsSummary } from "@app/components/accounts/AccountsSummary";
import { TransactionsSummary } from "@app/components/transactions/TransactionsSummary";
import { PageTitle } from "@app/components/PageTitle";

export function Home() {
  return (
    <>
      <div className="mb-6 flex w-full flex-row justify-between">
        <PageTitle>Painel</PageTitle>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
        <TransactionsSummary />
        <AccountsSummary />
      </div>
    </>
  );
}
