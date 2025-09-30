import { useState } from "react";

import { AccountsList } from "@app/components/accounts/AccountsList";
import { Button } from "@app/components/Button";
import { PageTitle } from "@app/components/PageTitle";
import { NewAccountDialog } from "@app/components/accounts/NewAccountDialog";
import { AccountsResume } from "@app/components/accounts/AccountsResume";

export default function Accounts() {
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

      <AccountsResume />

      <section className="mt-6 flex flex-col rounded-2xl border border-gray-300 p-2 lg:px-4">
        <h2 className="mb-2 text-xl font-semibold">
          Gerencie suas contas bancárias
        </h2>

        <AccountsList />
      </section>
    </>
  );
}
