type TransactionType = "income" | "expense";

type Transaction = {
  id: string;
  value: number;
  description: string;
  date: Date;
  tags: string[];
  type: TransactionType;
};

type NewTransaction = {
  value: number;
  description: string;
  date: Date;
  accountId: string;
  type: TransactionType;
  tags: string[];
};
