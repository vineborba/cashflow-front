export function ExpenseMeter({ total }: { total: number }) {
  function getExpenseMeterColor() {
    if (total < 50) return "bg-green-500";
    if (total < 75) return "bg-yellow-500";
    return "bg-red-500";
  }

  return (
    <div className="h-2 w-full rounded-full bg-gray-200">
      <div
        className={`h-full rounded-full ${getExpenseMeterColor()} ${total ? `w-[${total}%]` : "w-0"}`}
      />
    </div>
  );
}
