import { useState } from "react";

import { Button } from "@app/components/Button";
import { PageTitle } from "@app/components/PageTitle";
import { BudgetsList } from "@app/components/budgets/BudgetsList";
import { BudgetsResume } from "@app/components/budgets/BudgetsResume";
import { NewBudgetDialog } from "@app/components/budgets/NewBudgetDialog";

export function Budgets() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <NewBudgetDialog isOpen={openDialog} close={() => setOpenDialog(false)} />

      <div className="mb-6 flex w-full flex-row justify-between">
        <PageTitle>Contas</PageTitle>
        <Button onClick={() => setOpenDialog(true)}>Criar orçamento</Button>
      </div>

      <BudgetsResume />

      <section className="mt-6 flex flex-col rounded-2xl border border-gray-300 p-2 lg:px-4">
        <h2 className="mb-2 text-xl font-semibold">Seus orçamentos</h2>

        <BudgetsList />
      </section>
    </>
  );
}
