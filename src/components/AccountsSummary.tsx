import { useAccounts } from "@app/hooks/useAccounts";
import { accountTypeLabel } from "../utils/accountInfo";
import { formatMonetaryValue } from "../utils/formatMonetaryValue";
import { AccountIcon } from "./accounts/AccountIcon";

type AccountSummaryItemProps = {} & Omit<
  Account,
  "createdAt" | "updatedAt" | "bankCode" | "id"
>;

function AccountSummaryItem({
  type,
  balance,
  bank,
  description,
}: AccountSummaryItemProps) {
  return (
    <li className="flex flex-row items-center gap-2">
      <AccountIcon type={type} size={32} />
      <div className="flex grow flex-col">
        <p className="text-base font-bold">{accountTypeLabel[type]}</p>
        <p className="text-sm text-slate-600">
          {description} - {bank}
        </p>
      </div>
      <p className="text-lg font-bold">{formatMonetaryValue(balance)}</p>
    </li>
  );
}

export function AccountsSummary() {
  const { accounts } = useAccounts();
  return (
    <article className="flex flex-col gap-2 rounded-lg border border-slate-300 p-4">
      <h6 className="text-2xl font-bold">Resumo das contas</h6>
      <p className="text-slate-600">Visão geral das suas contas bancárias</p>
      <ul className="gap-2">
        {accounts.map((acc) => (
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
