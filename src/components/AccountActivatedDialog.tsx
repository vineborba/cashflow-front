import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button } from "./Button";

type AccountActivatedDialogProps = {
  isOpen: boolean;
  close: () => void;
};

export function AccountActivatedDialog({
  isOpen,
  close,
}: AccountActivatedDialogProps) {
  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md space-y-4 rounded-lg border border-gray-200 bg-white p-4 md:p-8">
          <DialogTitle className="font-bold">Conta ativada!</DialogTitle>
          <Description>
            Agora você pode entrar e começar a controlar suas finanças de forma
            simples e efetiva!
          </Description>
          <Button className="mx-auto block" onClick={close}>
            Certo!
          </Button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
