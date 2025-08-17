export function transformFormDataToJson<T extends Record<string, unknown>>(
  formData: FormData,
): T {
  const obj: Partial<T> = {};

  formData.forEach((value, key) => {
    const existing = obj[key as keyof T];

    if (existing !== undefined) {
      if (Array.isArray(existing)) {
        (existing as unknown[]).push(value);
      } else {
        obj[key as keyof T] = [
          existing as unknown,
          value,
        ] as unknown as T[keyof T];
      }
    } else {
      obj[key as keyof T] = value as T[keyof T];
    }
  });

  return obj as T;
}
