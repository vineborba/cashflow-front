export function AccountsListHeader() {
  return (
    <div className="grid grid-cols-6 gap-1 rounded-t-lg border border-b-0 border-gray-300 p-2 md:py-3">
      <p className="col-span-2 text-left text-xs text-gray-400 md:text-sm lg:text-base">
        Descrição
      </p>
      <p className="text-center text-xs text-gray-400 md:text-sm lg:text-base">
        Banco
      </p>
      <p className="hidden text-center text-xs text-gray-400 sm:block md:text-sm lg:text-base">
        Tipo
      </p>
      <p className="col-span-3 text-right text-xs text-gray-400 sm:col-span-2 lg:text-base">
        Saldo
      </p>
    </div>
  );
}
