import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import { useBudgets } from "@app/hooks/useBudgets";
import { formatMonetaryValue } from "@app/utils/formatMonetaryValue";

import { ExpenseMeter } from "./ExpenseMeter";
import { BudgetsListHeader } from "./BudgetListHeader";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";

type BudgetListItemProps = Budget & {
  isSmallScreen: boolean;
  onDelete: (id: string, name: string) => void;
};

function BudgetListItem({
  id,
  maxValue,
  name,
  totalExpenses,
  isSmallScreen,
  onDelete,
}: BudgetListItemProps) {
  const total = Math.ceil((totalExpenses / maxValue) * 100);

  return (
    <li className="grid grid-cols-5 gap-1 border border-b-0 border-gray-300 p-2 last:rounded-b-lg last:border-b md:py-3">
      <p className="my-auto text-left text-xs break-all md:text-sm lg:text-base">
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
      <div className="flex justify-end">
        <button
          onClick={() => onDelete(id, name)}
          className="flex items-center justify-center rounded-md p-1 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
          title="Excluir orçamento"
        >
          <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>
    </li>
  );
}

export function BudgetsList() {
  const { budgets, deleteBudget } = useBudgets();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    budgetId: string;
    budgetName: string;
  }>({
    isOpen: false,
    budgetId: "",
    budgetName: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteDialog({
      isOpen: true,
      budgetId: id,
      budgetName: name,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.budgetId) return;

    setIsDeleting(true);
    try {
      await deleteBudget(deleteDialog.budgetId);
      setDeleteDialog({ isOpen: false, budgetId: "", budgetName: "" });
    } catch (error) {
      console.error("Failed to delete budget:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, budgetId: "", budgetName: "" });
  };

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
      <ConfirmDeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Excluir orçamento"
        description="Tem certeza de que deseja excluir este orçamento? Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos."
        resourceName={deleteDialog.budgetName}
        isLoading={isDeleting}
      />

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
            onDelete={handleDeleteClick}
          />
        ))}
      </ul>
    </>
  );
}
