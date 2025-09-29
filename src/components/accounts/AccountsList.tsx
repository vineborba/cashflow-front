import { useAccounts } from "@app/hooks/useAccounts";
import { accountTypeLabel } from "@app/utils/accountInfo";
import { formatMonetaryValue } from "@app/utils/formatMonetaryValue";

import { AccountIcon } from "./AccountIcon";
import { AccountsListHeader } from "./AccountsListHeader";

type AccountListItemProps = Account;

function AccountListItem({
  balance,
  bank,
  type,
  description,
}: AccountListItemProps) {
  const isNegativeBalance = balance < 0;

  return (
    <li className="grid grid-cols-6 gap-1 border border-b-0 border-gray-300 p-2 last:rounded-b-lg last:border-b md:py-3">
      <div className="col-span-2 my-auto flex flex-row items-center gap-2">
        <AccountIcon type={type} />
        <p className="text-xs md:text-sm lg:text-base">{description}</p>
      </div>
      <p className="my-auto text-center text-xs break-normal md:text-sm lg:text-base">
        {bank}
      </p>
      <p className="my-auto hidden text-center text-xs sm:block md:text-sm lg:text-base">
        {accountTypeLabel[type]}
      </p>
      <p
        className={`col-span-3 my-auto text-right text-xs sm:col-span-2 md:text-sm lg:text-base ${isNegativeBalance ? "text-red-500" : "text-black"}`}
      >
        {formatMonetaryValue(balance)}
      </p>
    </li>
  );
}

export function AccountsList() {
  const { accounts } = useAccounts();

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
          />
        ))}
      </ul>
    </>
  );
}
