import { useAccounts } from "@app/hooks/useAccounts";
import { ResumeCard } from "@app/components/ResumeCard";

export function AccountsResume() {
  const { accounts } = useAccounts();

  const debts = accounts.filter((acc) => acc.balance < 0);
  const assets = accounts.filter((acc) => acc.balance >= 0);

  const totalInDebt = debts.reduce((acc, curr) => acc + curr.balance, 0);
  const totalInAssets = assets.reduce((acc, curr) => acc + curr.balance, 0);
  const finalBalance = totalInAssets - totalInDebt;

  const cards = [
    {
      title: "Saldo total",
      value: finalBalance,
    },
    {
      title: "Ativos",
      value: totalInAssets,
    },
    {
      title: "Dívidas",
      value: totalInDebt,
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
      {cards.map((c) => (
        <ResumeCard
          key={c.title}
          title={c.title}
          value={c.value}
          className="col-span-2 sm:col-span-1"
        />
      ))}
    </div>
  );
}
