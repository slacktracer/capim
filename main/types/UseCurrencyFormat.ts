import type { WritableComputedRef } from "vue";

export type UseCurrencyFormat = (input: {
  object: Record<string, unknown>;
  property: string;
}) => WritableComputedRef<unknown>;
