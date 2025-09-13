import { useTransactions } from "@app/hooks/useTransactions";
import { formatMonetaryValue } from "@app/utils/formatMonetaryValue";

import { TransactionIcon } from "./TransactionIcon";

type ListItemProps = Omit<Transaction, "id">;

function ListItem({ description, value, date, type, tags }: ListItemProps) {
  const formatedDate = new Date(date).toLocaleDateString("pt-BR");

  return (
    <li className="flex flex-row items-center gap-2">
      <TransactionIcon tag={tags[0]} type={type} />
      <div className="flex grow flex-col">
        <p className="text-sm font-bold md:text-base">{description}</p>
        <p className="text-xs text-slate-600 md:text-sm">{formatedDate}</p>
      </div>
      <p className="text-base font-bold md:text-lg">
        {formatMonetaryValue(value)}
      </p>
    </li>
  );
}

export function TransactionsSummary() {
  const { transactions } = useTransactions({ limit: 6, page: 1 });

  if (!transactions.length) {
    return null;
  }

  return (
    <article className="flex flex-col gap-2 rounded-lg border border-slate-300 p-4">
      <h6 className="text-2xl font-bold">Transações recentes</h6>
      <p className="text-slate-600">Suas últimas atividades financeiras</p>
      <ul className="gap-2">
        {transactions.map((t) => (
          <ListItem
            key={t.id}
            date={t.date}
            description={t.description}
            value={t.value}
            type={t.type}
            tags={t.tags}
          />
        ))}
      </ul>
    </article>
  );
}
