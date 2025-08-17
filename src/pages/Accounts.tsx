import { useState } from "react";

import { AccountsList } from "@app/components/accounts/AccountsList";
import { Button } from "@app/components/Button";
import { PageTitle } from "@app/components/PageTitle";
import { ResumeCard } from "@app/components/ResumeCard";
import { NewAccountDialog } from "@app/components/accounts/NewAccountDialog";

const cards = [
  {
    title: "Saldo total",
    value: 1000000,
  },
  {
    title: "Ativos",
    value: 123123213,
  },
  {
    title: "Dividas",
    value: 123123,
  },
];

export function Accounts() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <NewAccountDialog
        isOpen={openDialog}
        close={() => setOpenDialog(false)}
      />
      <div className="mb-6 flex w-full flex-row justify-between">
        <PageTitle>Contas</PageTitle>
        <Button onClick={() => setOpenDialog(true)}>Acionar conta</Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        {cards.map((c) => (
          <ResumeCard
            key={c.title}
            title={c.title}
            value={c.value}
            className="first:col-span-2 md:first:col-span-1"
          />
        ))}
      </div>

      <section className="mt-6 flex flex-col rounded-2xl border border-gray-300 p-2 lg:px-4">
        <h2 className="mb-2 text-xl font-semibold">
          Gerencie suas contas bancárias
        </h2>

        <AccountsList />
      </section>
    </>
  );
}
