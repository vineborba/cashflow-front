import { AccountsList } from "../components/accounts/AccountsList";
import { Button } from "../components/Button";
import { PageTitle } from "../components/PageTitle";
import { ResumeCard } from "../components/ResumeCard";

const cards = [
  {
    title: "Saldo total",
    value: 1000000,
  },
  {
    title: "Ativos",
    value: 123123213,
  },
  {
    title: "Dividas",
    value: 123123,
  },
];

const accounts: Account[] = [
  {
    balance: 123123,
    bank: "Itaú",
    id: crypto.randomUUID(),
    type: "savings",
    name: "Minha poupança",
  },
  {
    balance: 1223,
    bank: "Nubank",
    id: crypto.randomUUID(),
    type: "checking",
    name: "Conta do roxinho",
  },
  {
    balance: 1223,
    bank: "XP",
    id: crypto.randomUUID(),
    type: "investment",
    name: "Investimentos",
  },
];

export function Accounts() {
  return (
    <>
      <div className="mb-6 flex w-full flex-row justify-between">
        <PageTitle>Contas</PageTitle>
        <Button>Acionar conta</Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        {cards.map((c) => (
          <ResumeCard
            key={c.title}
            title={c.title}
            value={c.value}
            className="first:col-span-2 md:first:col-span-1"
          />
        ))}
      </div>

      <section className="mt-6 flex flex-col rounded-2xl border border-gray-300 p-2 lg:px-4">
        <h2 className="mb-2 text-xl font-semibold">
          Gerencie suas contas bancárias
        </h2>

        <AccountsList accounts={accounts} />
      </section>
    </>
  );
}
