import { useState } from "react";
import { Trash2 } from "lucide-react";

import { useAccounts } from "@app/hooks/useAccounts";
import { accountTypeLabel } from "@app/utils/accountInfo";
import { formatMonetaryValue } from "@app/utils/formatMonetaryValue";

import { AccountIcon } from "./AccountIcon";
import { AccountsListHeader } from "./AccountsListHeader";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";

type AccountListItemProps = Account & {
  onDelete: (id: string, description: string) => void;
};

function AccountListItem({
  id,
  balance,
  bank,
  type,
  description,
  onDelete,
}: AccountListItemProps) {
  const isNegativeBalance = balance < 0;

  return (
    <li className="grid grid-cols-8 gap-1 border border-b-0 border-gray-300 p-2 last:rounded-b-lg last:border-b md:py-3">
      <div className="col-span-2 my-auto flex flex-row items-center gap-2">
        <AccountIcon type={type} />
        <p className="text-xs break-all md:text-sm lg:text-base">
          {description}
        </p>
      </div>
      <p className="col-span-2 my-auto text-center text-xs break-normal sm:col-span-1 md:text-sm lg:text-base">
        {bank}
      </p>
      <p className="my-auto hidden text-center text-xs sm:block md:text-sm lg:text-base">
        {accountTypeLabel[type]}
      </p>
      <p
        className={`col-span-3 my-auto text-right text-xs sm:col-span-3 md:text-sm lg:text-base ${isNegativeBalance ? "text-red-500" : "text-black"}`}
      >
        {formatMonetaryValue(balance)}
      </p>
      <div className="flex justify-end">
        <button
          onClick={() => onDelete(id, description)}
          className="flex items-center justify-center rounded-md p-1 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
          title="Excluir conta"
        >
          <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>
    </li>
  );
}

export function AccountsList() {
  const { accounts, deleteAccount } = useAccounts();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    accountId: string;
    accountDescription: string;
  }>({
    isOpen: false,
    accountId: "",
    accountDescription: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: string, description: string) => {
    setDeleteDialog({
      isOpen: true,
      accountId: id,
      accountDescription: description,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.accountId) return;

    setIsDeleting(true);
    try {
      await deleteAccount(deleteDialog.accountId);
      setDeleteDialog({ isOpen: false, accountId: "", accountDescription: "" });
    } catch (error) {
      console.error("Failed to delete account:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, accountId: "", accountDescription: "" });
  };

  if (!accounts.length) {
    return (
      <article className="rounded-lg border border-gray-300 p-12">
        <p className="text-center text-gray-500">
          Oops! Parece que não há nenhuma conta registrada no momento!
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
        title="Excluir conta"
        description="Tem certeza de que deseja excluir esta conta? Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos."
        resourceName={deleteDialog.accountDescription}
        isLoading={isDeleting}
      />

      <AccountsListHeader />
      <ul>
        {accounts.map((acc) => (
          <AccountListItem
            key={acc.id}
            id={acc.id}
            balance={acc.balance}
            bank={acc.bank}
            type={acc.type}
            description={acc.description}
            onDelete={handleDeleteClick}
          />
        ))}
      </ul>
    </>
  );
}
