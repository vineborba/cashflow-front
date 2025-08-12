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

const transactions = [
  { id: "1", title: "salário", date: "25/03/2025", value: 10000 },
  { id: "2", title: "mercado", date: "25/03/2025", value: 10 },
  { id: "3", title: "café", date: "25/03/2025", value: 100 },
  { id: "4", title: "bar", date: "25/03/2025", value: 1000000 },
  {
    id: "5",
    title: "pagamento de dividendos",
    date: "25/03/2025",
    value: 10000,
  },
];

const accounts: Account[] = [
  {
    id: "1",
    name: "abab",
    bank: "Banco do Brasil",
    balance: 100000,
    type: "checking",
  },
  {
    id: "2",
    name: "abab",
    bank: "Banco Itaú",
    balance: 1000000,
    type: "savings",
  },
  {
    id: "3",
    name: "abab",
    bank: "Banco Inter",
    balance: -100000,
    type: "checking",
  },
  {
    id: "4",
    name: "abab",
    bank: "Nubank",
    balance: 100000,
    type: "investment",
  },
  { id: "5", name: "abab", bank: "Sicredi", balance: 100000, type: "checking" },
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
        <TransactionsSummary transactions={transactions} />
        <AccountsSummary accounts={accounts} />
      </div>
    </>
  );
}
