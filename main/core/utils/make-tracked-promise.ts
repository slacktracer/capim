import type { MakeTrackedPromise } from "../types/MakeTrackedPromise.js";
import { promiseState } from "./promise-state.js";

export const makeTrackedPromise: MakeTrackedPromise = ({
  action,
  asyncFunction,
  onFulfilled,
  onRejected,
  onSettled,
}) => {
  return {
    action,

    get isBlank() {
      return this.state === promiseState.blank;
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
      this.state = promiseState.pending;

      asyncFunction(input)
        .then((value) => {
          this.state = promiseState.fulfilled;

          this.value = value;

          onFulfilled?.(value);
        })

        .catch((reason) => {
          this.state = promiseState.rejected;

          this.reason = reason;

          onRejected?.(reason);
        })

        .finally(() => {
          this.settledAt = new Date();

          onSettled?.();
        });
    },

    settledAt: undefined,

    state: promiseState.blank,

    value: undefined,
  };
};
