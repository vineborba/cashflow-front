import { formatMonetaryValue } from "../utils/formatMonetaryValue";

type Transaction = {
  title: string;
  value: number;
  date: string;
  id: string;
};

type ListItemProps = {} & Omit<Transaction, "id">;

function ListItem({ title, value, date }: ListItemProps) {
  return (
    <li className="flex flex-row items-center gap-2">
      <div className="rounded-full bg-cyan-200 p-2">Icone</div>
      <div className="flex grow flex-col">
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm text-slate-600">{date}</p>
      </div>
      <p className="text-lg font-bold">{formatMonetaryValue(value)}</p>
    </li>
  );
}

type TransactionsListProps = {
  transactions: Transaction[];
};

export function TransactionsSummary({ transactions }: TransactionsListProps) {
  return (
    <article className="flex flex-col gap-2 rounded-lg border border-slate-300 p-4">
      <h6 className="text-2xl font-bold">Transações recentes</h6>
      <p className="text-slate-600">Suas últimas atividades financeiras</p>
      <ul className="gap-2">
        {transactions.map((t) => (
          <ListItem key={t.id} date={t.date} title={t.title} value={t.value} />
        ))}
      </ul>
    </article>
  );
}
