const fulfilled: unique symbol = Symbol("fulfilled");
const nil: unique symbol = Symbol("nil");
const pending: unique symbol = Symbol("pending");
const rejected: unique symbol = Symbol("rejected");

export const promiseState = {
  fulfilled,
  nil,
  pending,
  rejected,
} as const;

export type PromiseState = (typeof promiseState)[keyof typeof promiseState];
