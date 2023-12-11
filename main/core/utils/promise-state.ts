const blank: unique symbol = Symbol("blank");
const fulfilled: unique symbol = Symbol("fulfilled");
const pending: unique symbol = Symbol("pending");
const rejected: unique symbol = Symbol("rejected");

export const promiseState = {
  blank,
  fulfilled,
  pending,
  rejected,
} as const;
