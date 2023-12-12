import type { Ref } from "vue";

// type X<T, U extends keyof T> = T[U] extends Date ? U : never;

export type UseLiveDistanceToNow = (input: {
  object: Record<string, any>;
  propertyName: string;
}) => Ref<string>;
