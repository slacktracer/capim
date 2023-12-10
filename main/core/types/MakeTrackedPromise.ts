import type { PromiseState } from "../utils/promise-state";

export type MakeTrackedPromise = <Input, Output>(input: {
  asyncFunction: (input: Input) => Promise<Output>;
  onFulfilled: (input: Output) => any;
  onRejected: (input: unknown) => any;
  onSettled: () => any;
}) => {
  isUndefined: boolean;
  isFulfilled: boolean;
  isPending: boolean;
  isRejected: boolean;
  isSettled: boolean;
  reason: unknown;
  run: (input: Input) => Promise<Output | unknown>;
  state: PromiseState;
  value: Output | undefined;
};