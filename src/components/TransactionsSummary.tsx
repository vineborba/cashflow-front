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
    <li className="flex flex-row gap-2 items-center">
      <div className="p-2 rounded-full bg-cyan-200">Icone</div>
      <div className="grow flex flex-col">
        <p className="font-bold text-base">{title}</p>
        <p className="text-sm text-slate-600">{date}</p>
      </div>
      <p className="font-bold text-lg">{formatMonetaryValue(value)}</p>
    </li>
  );
}

type TransactionsListProps = {
  transactions: Transaction[];
};

export function TransactionsSummary({ transactions }: TransactionsListProps) {
  return (
    <article className="p-4 border border-slate-300 flex flex-col gap-2 rounded-lg">
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
