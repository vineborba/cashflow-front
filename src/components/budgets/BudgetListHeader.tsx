export function BudgetsListHeader() {
  return (
    <div className="grid grid-cols-4 gap-1 rounded-t-lg border border-b-0 border-gray-300 p-2 md:py-3">
      <p className="text-left text-xs text-gray-400 md:text-sm lg:text-base">
        Nome
      </p>
      <p className="text-left text-xs text-gray-400 md:text-sm lg:text-base">
        Orçamento estipulado
      </p>
      <p className="text-left text-xs text-gray-400 md:text-sm lg:text-base">
        Gastos até o momento
      </p>
      <div className="inline-flex items-center gap-1 text-xs text-gray-400 lg:text-base">
        Progresso
      </div>
    </div>
  );
}
