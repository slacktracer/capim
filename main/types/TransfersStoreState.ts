import type { Transfer } from "../core/types/Transfer.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type TransfersStoreState = {
  transfers: AsyncDataState<Transfer[]>;
};
