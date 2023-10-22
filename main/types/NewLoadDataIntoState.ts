import type { AsyncDataState } from "./AsyncDataState.js";

export type NewLoadDataIntoState = <Data>(options: {
  functionToCall: () => Promise<{ data: Data; retrievedAt: Date }>;
  stateToUpdate: AsyncDataState<Data>;
}) => void;
