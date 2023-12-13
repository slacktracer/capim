import type { PromiseAction } from "./PromiseAction";
import type { PromiseState } from "./PromiseState.js";

export type TrackedPromise<Input, Output> = {
  action: PromiseAction;
  isBlank: boolean;
  isFulfilled: boolean;
  isPending: boolean;
  isRejected: boolean;
  isSettled: boolean;
  reason: unknown;
  run: (input: Input) => void;
  settledAt: Date | undefined;
  state: PromiseState;
  value: Output | undefined;
};
