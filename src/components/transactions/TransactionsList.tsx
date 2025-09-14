import { useEffect, useState } from "react";

import { useTransactions } from "@app/hooks/useTransactions";
import { formatMonetaryValue } from "@app/utils/formatMonetaryValue";

import { TransactionsListHeader } from "./TransactionListHeader";
import { TransactionIcon } from "./TransactionIcon";
import { Pagination } from "../Pagination";
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
      <div className="inline-flex items-center gap-2">
        <TransactionIcon tag={tags[0]} type={type} />
        <p className="text-left text-xs md:text-sm lg:text-base">
          {description}
        </p>
      </div>
      <TagsList tags={tags} />
      <p className="my-auto text-left text-xs md:text-sm lg:text-base">
        {formattedDate}
      </p>
      <p
        className={`my-auto text-right text-xs lg:text-base ${isIncome ? "before:content['+'] text-green-600" : ""}`}
      >
        {isIncome ? "+" + formatedValue : formatedValue}
      </p>
    </li>
  );
}

type TransactionsListProps = {
  description: string;
  range: string;
  type: string;
  tag: string;
};

export function TransactionsList({
  description,
  range,
  type,
  tag,
}: TransactionsListProps) {
  const [page, setPage] = useState(1);
  const { transactions, pagination } = useTransactions({
    page,
    description,
    range,
    type,
    tag,
  });

  useEffect(() => {
    setPage(1);
  }, [description, range, type, tag]);

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
      <Pagination
        currentPage={page}
        pageCount={pagination.pages}
        onPageChange={setPage}
      />
    </>
  );
}
