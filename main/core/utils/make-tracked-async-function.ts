import { CoreError } from "../errors/core-error";
import type { MakeTrackedAsyncFunction } from "../types/MakeTrackedAsyncFunction";

export const makeTrackedAsyncFunction: MakeTrackedAsyncFunction =
  ({ asyncFunction, state }) =>
  async (...input) => {
    state.ready = false;

    state.error = false;

    state.loading = true;

    await asyncFunction(...input)
      .then((data) => {
        state.data = data;

        state.ready = true;

        state.retrievedAt = new Date();
      })

      .catch((reason: unknown) => {
        if (reason instanceof CoreError) {
          state.error = { data: reason.data, message: reason.message };
        }
      })

      .finally(() => {
        state.loading = false;
      });
  };
