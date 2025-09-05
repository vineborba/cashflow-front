import { useState } from "react";

import { Button } from "@app/components/Button";
import { PageTitle } from "@app/components/PageTitle";
import { Input } from "@app/components/Input";
import { useTags } from "@app/hooks/useTags";
import { Select } from "@app/components/Select";
import { TransactionsList } from "@app/components/transactions/TransactionsList";

export function Transactions() {
  const [openDialog, setOpenDialog] = useState(false);
  const [query, setQuery] = useState("");

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

  return (
    <>
      <div className="mb-6 flex w-full flex-row justify-between">
        <PageTitle>Transações</PageTitle>
        <Button onClick={() => setOpenDialog(true)}>Adicionar transação</Button>
      </div>

      <section className="mt-6 flex flex-col rounded-2xl border border-gray-300 p-2 lg:px-4">
        <h2 className="mb-2 text-xl font-semibold">Histórico de transações</h2>

        <article className="mt-2 mb-4 flex w-full flex-wrap items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            containerClassName="md:max-w-3xs lg:max-w-sm w-full self-stretch"
            className="h-full"
            placeholder="Buscar por descrição"
          />
          <Select options={tagsOptions} />
          <Select options={typeOptions} />
          <Select options={rangeOptions} />
          <div className="space-x-2 xl:ml-auto">
            <Button className="">Filtrar</Button>
            <Button variant="secondary">Limpar filtros</Button>
          </div>
        </article>
        <TransactionsList />
      </section>
    </>
  );
}
