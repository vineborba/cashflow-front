import { AccountsSummary } from "../components/AccountsSummary";
import { Button } from "../components/Button";
import { PageTitle } from "../components/PageTitle";
import { ResumeCard } from "../components/ResumeCard";
import { TransactionsSummary } from "../components/TransactionsSummary";

const cards = [
  {
    title: "Saldo total",
    value: 1258025,
  },
  {
    title: "Receita",
    value: 1258025,
  },
  {
    title: "Despesas",
    value: 1258025,
  },
  {
    title: "Economias",
    value: 1258025,
  },
];

export function Home() {
  return (
    <>
      <div className="mb-6 flex w-full flex-row justify-between">
        <PageTitle>Painel</PageTitle>
        <Button>Acionar transação</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
        {cards.map((c) => (
          <ResumeCard key={c.title} title={c.title} value={c.value} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
        <TransactionsSummary />
        <AccountsSummary />
      </div>
    </>
  );
}
