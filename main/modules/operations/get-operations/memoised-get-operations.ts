import { memoizeWith } from "ramda";

import { getGetOperationsMemoisationKey } from "./get-get-operations-memoisation-key.js";
import { getOperations } from "./get-operations.js";

export const memoisedGetOperations = memoizeWith(
  getGetOperationsMemoisationKey,
  getOperations,
);
