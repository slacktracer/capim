import type { AsyncDataState } from "./AsyncDataState.js";

export type LoadDataIntoState = <T>(options: {
  functionToCall: () => Promise<T>;
  stateToUpdate: AsyncDataState<T>;
}) => void;
