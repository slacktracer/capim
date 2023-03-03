import type { AsyncDataState } from "./AsyncDataState.js";

export type GetInitialAsyncDataState = <T>(options?: {
  dataShape: T;
}) => AsyncDataState<T>;
