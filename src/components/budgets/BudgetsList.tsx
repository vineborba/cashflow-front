import { useBudgets } from "@app/hooks/useBudgets";
import { formatMonetaryValue } from "@app/utils/formatMonetaryValue";

import { ExpenseMeter } from "./ExpenseMeter";
import { BudgetsListHeader } from "./BudgetListHeader";
import { useEffect, useState } from "react";

type BudgetListItemProps = Budget & {
  isSmallScreen: boolean;
};

function BudgetListItem({
  // id,
  maxValue,
  name,
  totalExpenses,
  isSmallScreen,
}: BudgetListItemProps) {
  const total = Math.ceil((totalExpenses / maxValue) * 100);

  return (
    <li className="grid grid-cols-4 gap-1 border border-b-0 border-gray-300 p-2 last:rounded-b-lg last:border-b md:py-3">
      <p className="my-auto text-left text-xs md:text-sm lg:text-base">
        {name}
      </p>
      {isSmallScreen ? (
        <div className="flex flex-col gap-1">
          <p className="text-left text-xs md:text-sm lg:text-base">
            {formatMonetaryValue(totalExpenses)}
          </p>
          <hr />
          <p className="text-left text-xs md:text-sm lg:text-base">
            {formatMonetaryValue(maxValue)}
          </p>
        </div>
      ) : (
        <>
          <p className="text-left text-xs md:text-sm lg:text-base">
            {formatMonetaryValue(maxValue)}
          </p>
          <p className="text-left text-xs md:text-sm lg:text-base">
            {formatMonetaryValue(totalExpenses)}
          </p>
        </>
      )}
      <div className="col-span-2 my-auto inline-flex items-center gap-1 pl-6 text-xs sm:col-span-1 sm:pl-0 lg:text-base">
        <ExpenseMeter total={total} />
        {total}%
      </div>
    </li>
  );
}

export function BudgetsList() {
  const { budgets } = useBudgets();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <BudgetsListHeader isSmallScreen={isSmallScreen} />
      <ul>
        {budgets.map((budget) => (
          <BudgetListItem
            key={budget.id}
            id={budget.id}
            maxValue={budget.maxValue}
            name={budget.name}
            totalExpenses={budget.totalExpenses}
            isSmallScreen={isSmallScreen}
          />
        ))}
      </ul>
    </>
  );
}
