import { memoizeWith } from "ramda";

import { getGetOperationsMemoisationKey } from "./get-get-operations-memoisation-key.js";
import { loadOperationsIntoState } from "./load-operations-into-state.js";

export const memoisedGetOperations = memoizeWith(
  getGetOperationsMemoisationKey,
  loadOperationsIntoState,
);
