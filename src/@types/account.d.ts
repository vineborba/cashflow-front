type AccountType = "savings" | "investment" | "checking"

type Account = {
  type: AccountType;
  bank: string;
  name: string;
  balance: number;
  id: string;
};
