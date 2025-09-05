import { useTransactions } from "@app/hooks/useTransactions";
import { formatMonetaryValue } from "@app/utils/formatMonetaryValue";

import { TransactionsListHeader } from "./TransactionListHeader";
import { TransactionIcon } from "./TransactionIcon";
import { TagsList } from "./TagsList";

type TransactionListItemProps = Transaction;

function TransactionListItem({
  date,
  description,
  tags,
  type,
  value,
  // id
}: TransactionListItemProps) {
  const isIncome = type === "income";
  const formatedValue = formatMonetaryValue(value);
  const formattedDate = new Date(date).toLocaleDateString("pt-BR");

  return (
    <li className="grid grid-cols-4 gap-1 border border-b-0 border-gray-300 p-2 last:rounded-b-lg last:border-b md:py-3">
      <p className="inline-flex items-center gap-2 text-left text-xs md:text-sm lg:text-base">
        <TransactionIcon tag={tags[0]} type={type} />
        {description}
      </p>
      <TagsList tags={tags} />
      <p className="text-left text-xs md:text-sm lg:text-base">
        {formattedDate}
      </p>
      <p
        className={`text-right text-xs lg:text-base ${isIncome ? "before:content['+'] text-green-500" : ""}`}
      >
        {isIncome ? "+" + formatedValue : formatedValue}
      </p>
    </li>
  );
}

export function TransactionsList() {
  const { transactions } = useTransactions();

  console.log(transactions);

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
          />
        ))}
      </ul>
    </>
  );
}
