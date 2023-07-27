import type { Transfer } from "../../core/main.js";
import type { TransfersStoreState } from "../../types/TransfersStoreState.js";
import { getInitialAsyncDataState } from "../common/utils/get-initial-async-data-state.js";

export const getInitialTransfersStoreState = (): TransfersStoreState => ({
  transfers: getInitialAsyncDataState<Transfer[]>(),
});
