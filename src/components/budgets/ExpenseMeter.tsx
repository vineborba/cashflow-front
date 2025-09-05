const widths = [
  "w-0",
  "w-[5%]",
  "w-[10%]",
  "w-[15%]",
  "w-[20%]",
  "w-[25%]",
  "w-[30%]",
  "w-[35%]",
  "w-[40%]",
  "w-[45%]",
  "w-[50%]",
  "w-[55%]",
  "w-[60%]",
  "w-[65%]",
  "w-[70%]",
  "w-[75%]",
  "w-[80%]",
  "w-[85%]",
  "w-[90%]",
  "w-[95%]",
  "w-[100%]",
];

export function ExpenseMeter({ total }: { total: number }) {
  const truncatedTotal = Math.trunc(Math.min(total, 100) / 5);

  function getExpenseMeterColor() {
    if (total < 50) return "bg-green-500";
    if (total < 75) return "bg-yellow-500";
    return "bg-red-500";
  }

  return (
    <div className="h-2 w-full rounded-full bg-gray-200">
      <div
        className={`h-full rounded-full ${getExpenseMeterColor()} ${widths[truncatedTotal]}`}
      />
    </div>
  );
}
