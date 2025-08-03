import { formatMonetaryValue } from "../utils/formatMonetaryValue";

type Account = {
  type: string;
  bank: string;
  balance: number;
  id: string;
};

type AccountSummaryItemProps = {} & Omit<Account, "id">;

function AccountSummaryItem({ type, balance, bank }: AccountSummaryItemProps) {
  return (
    <li className="flex items-center gap-2 flex-row">
      <div className="p-2 rounded-full bg-green-300">icone</div>
      <div className="flex flex-col grow">
        <p className="font-bold text-base">{type}</p>
        <p className="text-sm text-slate-600">{bank}</p>
      </div>
      <p className="font-bold text-lg">{formatMonetaryValue(balance)}</p>
    </li>
  );
}

type AccountSummaryProps = {
  accounts: Account[];
};

export function AccountsSummary({ accounts }: AccountSummaryProps) {
  return (
    <article className="p-4 border border-slate-300 flex flex-col gap-2 rounded-lg">
      <h6 className="text-2xl font-bold">Resumo das contas</h6>
      <p className="text-slate-600">Visão geral das suas contas bancárias</p>
      <ul className="gap-2">
        {accounts.map((acc) => (
          <AccountSummaryItem
            key={acc.id}
            balance={acc.balance}
            bank={acc.bank}
            type={acc.type}
          />
        ))}
      </ul>
    </article>
  );
}
