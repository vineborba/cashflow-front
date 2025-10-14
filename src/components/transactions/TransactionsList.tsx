import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import { useTransactions } from "@app/hooks/useTransactions";
import { formatMonetaryValue } from "@app/utils/formatMonetaryValue";

import { TransactionsListHeader } from "./TransactionListHeader";
import { TransactionIcon } from "./TransactionIcon";
import { Pagination } from "../Pagination";
import { TagsList } from "./TagsList";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";

type TransactionListItemProps = Transaction & {
  onDelete: (id: string, description: string) => void;
};

function TransactionListItem({
  id,
  date,
  description,
  tags,
  type,
  value,
  onDelete,
}: TransactionListItemProps) {
  const isIncome = type === "income";
  const formatedValue = formatMonetaryValue(value);
  const formattedDate = new Date(date).toLocaleDateString("pt-BR");

  return (
    <li className="grid grid-cols-5 gap-1 border border-b-0 border-gray-300 p-2 last:rounded-b-lg last:border-b md:py-3">
      <div className="my-auto inline-flex items-center gap-2">
        <TransactionIcon tag={tags[0]} type={type} />
        <p className="text-left text-xs break-all md:text-sm lg:text-base">
          {description}
        </p>
      </div>
      <div className="my-auto">
        <TagsList tags={tags} className="text-center sm:text-left" />
      </div>
      <p className="my-auto text-right text-xs sm:text-left md:text-sm lg:text-base">
        {formattedDate}
      </p>
      <p
        className={`my-auto text-right text-xs lg:text-base ${isIncome ? "before:content['+'] text-green-600" : ""}`}
      >
        {isIncome ? "+" + formatedValue : formatedValue}
      </p>
      <div className="my-auto flex justify-end">
        <button
          onClick={() => onDelete(id, description)}
          className="flex items-center justify-center rounded-md p-1 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
          title="Excluir transação"
        >
          <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>
    </li>
  );
}

type TransactionsListProps = {
  description: string;
  range: string;
  type: string;
  tag: string;
};

export function TransactionsList({
  description,
  range,
  type,
  tag,
}: TransactionsListProps) {
  const [page, setPage] = useState(1);
  const { transactions, pagination, deleteTransaction } = useTransactions({
    page,
    description,
    range,
    type,
    tag,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    transactionId: string;
    transactionDescription: string;
  }>({
    isOpen: false,
    transactionId: "",
    transactionDescription: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: string, transactionDescription: string) => {
    setDeleteDialog({
      isOpen: true,
      transactionId: id,
      transactionDescription,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.transactionId) return;

    setIsDeleting(true);
    try {
      await deleteTransaction(deleteDialog.transactionId);
      setDeleteDialog({
        isOpen: false,
        transactionId: "",
        transactionDescription: "",
      });
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({
      isOpen: false,
      transactionId: "",
      transactionDescription: "",
    });
  };

  useEffect(() => {
    setPage(1);
  }, [description, range, type, tag]);

  if (!transactions.length) {
    return (
      <article className="rounded-lg border border-gray-300 p-12">
        <p className="text-center text-gray-500">
          Oops! Parece que não há nenhuma transação registrada no momento!
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
        title="Excluir transação"
        description="Tem certeza de que deseja excluir esta transação? Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos."
        resourceName={deleteDialog.transactionDescription}
        isLoading={isDeleting}
      />

      <TransactionsListHeader />
      <ul>
        {transactions.map((transaction) => (
          <TransactionListItem
            key={transaction.id}
            id={transaction.id}
            date={transaction.date}
            description={transaction.description}
            tags={transaction.tags}
            type={transaction.type}
            value={transaction.value}
            onDelete={handleDeleteClick}
          />
        ))}
      </ul>
      <Pagination
        currentPage={page}
        pageCount={pagination.pages}
        onPageChange={setPage}
      />
    </>
  );
}
