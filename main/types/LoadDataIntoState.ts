import type { AsyncDataState } from "./AsyncDataState.js";

export type LoadDataIntoState = <Data>(options: {
  functionToCall: () => Promise<Data>;
  stateToUpdate: AsyncDataState<Data>;
}) => void;
