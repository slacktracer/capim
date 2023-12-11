import type { PromiseState } from "./PromiseState.js";

export type TrackedPromise<Input, Output> = {
  isBlank: boolean;
  isFulfilled: boolean;
  isPending: boolean;
  isRejected: boolean;
  isSettled: boolean;
  reason: unknown;
  retrievedAt: Date | undefined;
  run: (input: Input) => void;
  state: PromiseState;
  value: Output | undefined;
};
