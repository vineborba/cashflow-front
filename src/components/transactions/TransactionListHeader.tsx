export function TransactionsListHeader() {
  return (
    <div className="grid grid-cols-4 gap-1 rounded-t-lg border border-b-0 border-gray-300 p-2 md:py-3">
      <p className="text-left text-xs text-gray-400 md:text-sm lg:text-base">
        Descrição
      </p>
      <p className="text-left text-xs text-gray-400 md:text-sm lg:text-base">
        Categorias
      </p>
      <p className="text-left text-xs text-gray-400 md:text-sm lg:text-base">
        Data
      </p>
      <p className="text-right text-xs text-gray-400 lg:text-base">Valor</p>
    </div>
  );
}
