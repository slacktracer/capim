import { CoreError } from "../errors/core-error";
import type { MakeTrackedAsyncFunction } from "../types/MakeTrackedAsyncFunction";

export const makeTrackedAsyncFunction: MakeTrackedAsyncFunction =
  ({ asyncFunction, state }) =>
  async (...input) => {
    state.ready = false;

    state.error = false;

    state.loading = true;

    state.state = "pending";

    await asyncFunction(...input)
      .then((data) => {
        state.data = data;

        state.ready = true;

        state.retrievedAt = new Date();

        state.state = "fulfilled";
      })

      .catch((reason: unknown) => {
        state.state = "rejected";

        if (reason instanceof CoreError) {
          state.error = { data: reason.data, message: reason.message };

          return;
        }

        if (reason instanceof Error) {
          state.error = { message: reason.message };
        }
      })

      .finally(() => {
        state.loading = false;
      });
  };
