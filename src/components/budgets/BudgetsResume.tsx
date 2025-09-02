import { useBudgets } from "@app/hooks/useBudgets";
import { ResumeCard } from "@app/components/ResumeCard";

export function BudgetsResume() {
  const { budgets } = useBudgets();

  const totalBudget = budgets.reduce((acc, budget) => acc + budget.maxValue, 0);
  const totalExpenses = budgets.reduce(
    (acc, budget) => acc + budget.totalExpenses,
    0,
  );
  const remaining = totalBudget - totalExpenses;

  const cards = [
    {
      title: "Orçamento total",
      value: totalBudget,
    },
    {
      title: "Gastos até agora",
      value: totalExpenses,
    },
    {
      title: "Restante",
      value: remaining,
    },
  ];

  return (
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
  );
}
