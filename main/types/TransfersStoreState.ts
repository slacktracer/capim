import type { Transfer } from "../core/main.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type TransfersStoreState = {
  transfers: AsyncDataState<Transfer[]>;
};
