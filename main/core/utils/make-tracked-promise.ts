import type { MakeTrackedPromise } from "../types/MakeTrackedPromise";
import { promiseState } from "./promise-state";

export const makeTrackedPromise: MakeTrackedPromise = ({
  asyncFunction,
  onFulfilled,
  onRejected,
  onSettled,
}) => {
  return {
    get isUndefined() {
      return this.state === promiseState.nil;
    },

    get isFulfilled() {
      return this.state === promiseState.fulfilled;
    },

    get isPending() {
      return this.state === promiseState.pending;
    },

    get isRejected() {
      return this.state === promiseState.rejected;
    },

    get isSettled() {
      return (
        this.state === promiseState.fulfilled ||
        this.state === promiseState.rejected
      );
    },

    reason: undefined,

    run(input) {
      return asyncFunction(input)
        .then((value) => {
          this.state = promiseState.fulfilled;

          this.value = value;

          onFulfilled?.(value);

          return value;
        })
        .catch((reason) => {
          this.state = promiseState.rejected;

          this.reason = reason;

          onRejected?.(reason);

          return reason;
        })
        .finally(() => {
          onSettled?.();
        });
    },

    state: promiseState.nil,

    value: undefined,
  };
};
