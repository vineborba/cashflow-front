import ReactPaginate from "react-paginate";

type PaginationProps = {
  pageCount: number;
  onPageChange: (page: number) => void;
  currentPage?: number;
};

export function Pagination({ pageCount, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      className="my-4 flex flex-row items-center justify-center gap-4 py-2"
      pageCount={pageCount}
      activeClassName="font-bold"
      nextClassName="cursor-pointer p-1"
      previousClassName="cursor-pointer p-1"
      pageClassName="cursor-pointer p-1"
      breakClassName="cursor-pointer p-1"
      previousLabel="< "
      nextLabel=" >"
      breakLabel="..."
      renderOnZeroPageCount={null}
      nextAriaLabel="Próxima página"
      previousAriaLabel="Página anterior"
      onPageChange={(item) => {
        onPageChange(item.selected + 1);
      }}
    />
  );
}
