type BudgetListItemProps = {
  isSmallScreen: boolean;
};

export function BudgetsListHeader({ isSmallScreen }: BudgetListItemProps) {
  return (
    <div className="grid grid-cols-5 gap-1 rounded-t-lg border border-b-0 border-gray-300 p-2 md:py-3">
      <p className="my-auto text-left text-xs text-gray-600 md:text-sm lg:text-base">
        Nome
      </p>
      {isSmallScreen ? (
        <div className="flex flex-col gap-1">
          <p className="text-left text-xs text-gray-600 md:text-sm lg:text-base">
            Gastos
          </p>
          <hr className="border-gray-600" />
          <p className="text-left text-xs text-gray-600 md:text-sm lg:text-base">
            Estipulado
          </p>
        </div>
      ) : (
        <>
          <p className="text-left text-xs text-gray-600 md:text-sm lg:text-base">
            Orçamento estipulado
          </p>
          <p className="text-left text-xs text-gray-600 md:text-sm lg:text-base">
            Gastos até o momento
          </p>
        </>
      )}
      <div className="col-span-2 my-auto items-center text-center text-xs text-gray-600 sm:col-span-1 md:grid-cols-1 lg:text-base">
        Progresso
      </div>
      <p className="my-auto text-right text-xs text-gray-600 md:text-sm lg:text-base">
        Ações
      </p>
    </div>
  );
}
