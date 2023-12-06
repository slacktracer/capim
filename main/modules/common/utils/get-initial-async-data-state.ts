import type { AsyncDataState } from "../../../types/AsyncDataState.js";

export const getInitialAsyncDataState = <T>(
  { dataShape } = { dataShape: <T>[] },
): AsyncDataState<T> => ({
  data: dataShape,
  error: false,
  loading: false,
  ready: false,
  retrievedAt: undefined,
  state: "pending",
});
