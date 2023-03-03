import type { AsyncDataState } from "../types/AsyncDataState.js";

export const getInitialAsyncDataState = <T>(): AsyncDataState<T> => ({
  data: <T>[],
  error: false,
  loading: false,
  ready: false,
  retrievedAt: undefined,
});
