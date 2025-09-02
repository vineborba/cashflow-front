import { useBudgets } from "@app/hooks/useBudgets";
import { formatMonetaryValue } from "@app/utils/formatMonetaryValue";

import { ExpenseMeter } from "./ExpenseMeter";
import { BudgetsListHeader } from "./BudgetListHeader";

type BudgetListItemProps = Budget;

function BudgetListItem({
  // id,
  maxValue,
  name,
  totalExpenses,
}: BudgetListItemProps) {
  const total = Math.ceil((totalExpenses / maxValue) * 100);
  return (
    <li className="grid grid-cols-4 gap-1 border border-b-0 border-gray-300 p-2 last:rounded-b-lg last:border-b md:py-3">
      <p className="text-left text-xs md:text-sm lg:text-base">{name}</p>
      <p className="text-left text-xs md:text-sm lg:text-base">
        {formatMonetaryValue(maxValue)}
      </p>
      <p className="text-left text-xs md:text-sm lg:text-base">
        {formatMonetaryValue(totalExpenses)}
      </p>
      <div className="inline-flex items-center gap-1 text-xs lg:text-base">
        <ExpenseMeter total={total} />
        {total}%
      </div>
    </li>
  );
}

export function BudgetsList() {
  const { budgets } = useBudgets();

  if (!budgets.length) {
    return (
      <article className="rounded-lg border border-gray-300 p-12">
        <p className="text-center text-gray-500">
          Oops! Parece que não há nenhum orçamento registrado no momento!
        </p>
      </article>
    );
  }

  return (
    <>
      <BudgetsListHeader />
      <ul>
        {budgets.map((budget) => (
          <BudgetListItem
            key={budget.id}
            id={budget.id}
            maxValue={budget.maxValue}
            name={budget.name}
            totalExpenses={budget.totalExpenses}
          />
        ))}
      </ul>
    </>
  );
}
