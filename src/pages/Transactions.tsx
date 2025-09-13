import { useState } from "react";

import { Button } from "@app/components/Button";
import { PageTitle } from "@app/components/PageTitle";
import { Input } from "@app/components/Input";
import { useTags } from "@app/hooks/useTags";
import { Select } from "@app/components/Select";
import { TransactionsList } from "@app/components/transactions/TransactionsList";
import { NewTransactionDialog } from "@app/components/transactions/NewTransactionDialog";

export function Transactions() {
  const [openDialog, setOpenDialog] = useState(false);
  const [description, setDescription] = useState("");
  const [rangeQuery, setRangeQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");
  const [tagQuery, setTagQuery] = useState("");

  const { tags } = useTags();

  const tagsOptions = [{ value: "", label: "Todas as categorias" }].concat(
    tags.map((tag) => ({
      value: tag.id,
      label: tag.name,
    })),
  );

  const typeOptions = [
    { value: "", label: "Todos os tipos" },
    { value: "income", label: "Receita" },
    { value: "expense", label: "Despesa" },
  ];

  const rangeOptions = [
    { value: "", label: "Qualquer período" },
    { value: "7", label: "Últimos 7 dias" },
    { value: "30", label: "Últimos 30 dias" },
    { value: "60", label: "Últimos 60 dias" },
    { value: "90", label: "Últimos 90 dias" },
    { value: "180", label: "Últimos 180 dias" },
  ];

  function resetFilters() {
    setDescription("");
    setTagQuery("");
    setTypeQuery("");
    setRangeQuery("");
  }

  return (
    <>
      <NewTransactionDialog
        isOpen={openDialog}
        close={() => setOpenDialog(false)}
      />

      <div className="mb-6 flex w-full flex-row justify-between">
        <PageTitle>Transações</PageTitle>
        <Button onClick={() => setOpenDialog(true)}>Adicionar transação</Button>
      </div>

      <section className="mt-6 flex flex-col rounded-2xl border border-gray-300 p-2 lg:px-4">
        <h2 className="mb-2 text-xl font-semibold">Histórico de transações</h2>

        <article className="mt-2 mb-4 flex w-full flex-wrap items-center gap-2">
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            containerClassName="md:max-w-3xs lg:max-w-sm w-full self-stretch"
            className="h-full"
            placeholder="Buscar por descrição"
          />
          <Select
            options={tagsOptions}
            value={tagQuery}
            onChange={(e) => {
              setTagQuery(e.target.value);
            }}
          />
          <Select
            options={typeOptions}
            value={typeQuery}
            onChange={(e) => {
              setTypeQuery(e.target.value);
            }}
          />
          <Select
            options={rangeOptions}
            value={rangeQuery}
            onChange={(e) => {
              setRangeQuery(e.target.value);
            }}
          />
          <Button
            variant="secondary"
            className="grow sm:shrink sm:grow-0 xl:ml-auto"
            onClick={resetFilters}
          >
            Limpar filtros
          </Button>
        </article>
        <TransactionsList
          description={description}
          range={rangeQuery}
          type={typeQuery}
          tag={tagQuery}
        />
      </section>
    </>
  );
}
