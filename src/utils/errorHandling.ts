import { ApiError } from "@app/services/client";

export function getErrorMessage(
  error: any,
  fallbackMessage = "Ocorreu um erro inesperado",
): string {
  if (error instanceof ApiError) {
    return error.extractedMessage;
  }

  if (error?.message) {
    return error.message;
  }

  return fallbackMessage;
}

export function setFormError<T extends Record<string, any>>(
  setError: (name: keyof T, error: { type: string; message: string }) => void,
  fields: (keyof T)[],
  message: string,
  type = "manual",
) {
  fields.forEach((field) => {
    setError(field, { type, message });
  });
}
