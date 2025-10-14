import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Trash2, AlertTriangle } from "lucide-react";

import { Button } from "./Button";

type ConfirmDeleteDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  resourceName: string;
  isLoading?: boolean;
};

export function ConfirmDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  resourceName,
  isLoading = false,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-2 md:p-4">
        <DialogPanel className="max-w-md space-y-4 rounded-lg border border-gray-200 bg-white p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {title}
            </DialogTitle>
          </div>

          <Description className="text-sm text-gray-600">
            {description}
          </Description>

          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-sm font-medium text-gray-900">{resourceName}</p>
          </div>

          <div className="flex justify-between gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              variant="destructive"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Excluindo...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Excluir
                </div>
              )}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
