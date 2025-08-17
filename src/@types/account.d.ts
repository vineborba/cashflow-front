type AccountType = "savings" | "investment" | "checking";

type NewAccount = {
  bankCode: string;
  balance: number;
  description: string;
  type: AccountType;
};

type Account = {
  id: string;
  updatedAt: string;
  createdAt: string;
  bank: string;
  bankCode: string;
  description: string;
  type: AccountType;
  balance: number;
};
