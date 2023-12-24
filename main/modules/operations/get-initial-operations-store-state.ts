import { lightFormat, startOfMonth } from "date-fns/fp";

import type { GetInitialOperationsStoreState } from "../../types/GetInitialOperationsStoreState.js";

export const getInitialOperationsStoreState: GetInitialOperationsStoreState =
  () => ({
    datetimeRange: [lightFormat("yyyy-MM-dd", startOfMonth(new Date())), ""],
    promises: {},
  });
