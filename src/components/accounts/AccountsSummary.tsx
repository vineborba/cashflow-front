import { useAccounts } from "@app/hooks/useAccounts";
import { formatMonetaryValue } from "@app/utils/formatMonetaryValue";

import { AccountIcon } from "./AccountIcon";

type AccountSummaryItemProps = {} & Omit<Account, "id">;

function AccountSummaryItem({
  type,
  balance,
  bank,
  description,
}: AccountSummaryItemProps) {
  return (
    <li className="flex flex-row items-center gap-2">
      <AccountIcon type={type} />
      <div className="flex grow flex-col">
        <p className="text-sm font-bold md:text-base">{description}</p>
        <p className="text-xs text-slate-600 md:text-sm">{bank}</p>
      </div>
      <p className="text-base font-bold md:text-lg">
        {formatMonetaryValue(balance)}
      </p>
    </li>
  );
}

export function AccountsSummary() {
  const { accounts } = useAccounts();

  if (!accounts.length) {
    return null;
  }

  return (
    <article className="flex flex-col gap-2 rounded-lg border border-slate-300 p-4">
      <h6 className="text-2xl font-bold">Resumo das contas</h6>
      <p className="text-slate-600">Visão geral das suas contas bancárias</p>
      <ul className="space-y-2">
        {accounts.slice(0, 6).map((acc) => (
          <AccountSummaryItem
            key={acc.id}
            balance={acc.balance}
            bank={acc.bank}
            type={acc.type}
            description={acc.description}
          />
        ))}
      </ul>
    </article>
  );
}
