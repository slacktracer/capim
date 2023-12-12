import type { Ref } from "vue";

// type X<T, U extends keyof T> = T[U] extends Date ? U : never;

export type UseRetrievedAt = (input: {
  dataObject: Record<string, any>;
  datePropertyName: string;
}) => Ref<string>;
