import { accountTypeLabel } from "../../utils/accountInfo";
import { formatMonetaryValue } from "../../utils/formatMonetaryValue";

import { AccountIcon } from "./AccountIcon";

function AccountListItem({ balance, bank, type, name }: Account) {
  return (
    <li className="grid grid-cols-6 gap-1 border border-b-0 border-gray-300 p-2 first:rounded-t-lg last:rounded-b-lg last:border-b md:py-3">
      <div className="col-span-2 flex flex-row items-center gap-2">
        <AccountIcon type={type} />
        <p className="text-xs md:text-sm lg:text-base">{name}</p>
      </div>
      <p className="text-center text-xs md:text-sm lg:text-base">{bank}</p>
      <p className="text-center text-xs md:text-sm lg:text-base">
        {accountTypeLabel[type]}
      </p>
      <p className="col-span-2 text-right text-xs md:text-sm lg:text-base">
        {formatMonetaryValue(balance)}
      </p>
    </li>
  );
}

type AccountsListProps = {
  accounts: Account[];
};

export function AccountsList({ accounts }: AccountsListProps) {
  return (
    <ul>
      {accounts.map((acc) => (
        <AccountListItem
          key={acc.id}
          id={acc.id}
          balance={acc.balance}
          bank={acc.bank}
          type={acc.type}
          name={acc.name}
        />
      ))}
    </ul>
  );
}
