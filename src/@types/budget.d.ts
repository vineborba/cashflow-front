type Budget = {
  id: string;
  name: string;
  maxValue: number;
  totalExpenses: number;
};

type NewBudget = {
  name: string;
  maxValue: number;
  tags: string[];
};
