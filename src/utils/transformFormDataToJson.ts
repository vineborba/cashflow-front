export function transformFormDataToJson<T extends Record<string, unknown>>(
  formData: FormData,
): T {
  const obj: Partial<T> = {};

  formData.forEach((value, key) => {
    const arrayMatch = key.match(/^(\w+)\[(\d+)\]\[(\w+)\]$/);

    if (arrayMatch) {
      const [, arrayKey, indexStr, prop] = arrayMatch;
      const index = parseInt(indexStr, 10);

      if (!obj[arrayKey as keyof T]) {
        obj[arrayKey as keyof T] = [] as unknown as T[keyof T];
      }

      const array = obj[arrayKey as keyof T] as unknown[];

      if (!array[index]) {
        array[index] = {};
      }

      (array[index] as Record<string, unknown>)[prop] = value;
    } else {
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
    }
  });

  return obj as T;
}
