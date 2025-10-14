export function TransactionsListHeader() {
  return (
    <div className="grid grid-cols-5 gap-1 rounded-t-lg border border-b-0 border-gray-300 p-2 md:py-3">
      <p className="text-left text-xs text-gray-600 md:text-sm lg:text-base">
        Descrição
      </p>
      <p className="text-center text-xs text-gray-600 sm:text-left md:text-sm lg:text-base">
        Categorias
      </p>
      <p className="text-right text-xs text-gray-600 sm:text-left md:text-sm lg:text-base">
        Data
      </p>
      <p className="text-right text-xs text-gray-600 lg:text-base">Valor</p>
      <p className="my-auto text-right text-xs text-gray-600 md:text-sm lg:text-base">
        Ações
      </p>
    </div>
  );
}
