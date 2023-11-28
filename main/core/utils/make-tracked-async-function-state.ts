import type { MakeTrackedAsyncFunctionState } from "../types/MakeTrackedAsyncFunctionState";

export const makeTrackedAsyncFunctionState: MakeTrackedAsyncFunctionState =
  () => ({
    error: false,
    loading: false,
    ready: false,
    retrievedAt: undefined,
  });
