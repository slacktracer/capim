import type { MakeTrackedAsyncFunctionState } from "../types/MakeTrackedAsyncFunctionState";

export const makeTrackedAsyncFunctionState: MakeTrackedAsyncFunctionState = (
  { data, ready } = { data: undefined },
) => ({
  data,
  error: false,
  loading: false,
  ready: ready ?? false,
  retrievedAt: undefined,
  state: "pending",
});
