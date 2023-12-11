import { lightFormat, startOfMonth } from "date-fns/fp";
import { markRaw } from "vue";

import type { Operation } from "../../core/types/Operation.js";
import type { GetInitialOperationsStoreState } from "../../types/GetInitialOperationsStoreState.js";
import { getInitialAsyncDataState } from "../common/utils/get-initial-async-data-state.js";

export const getInitialOperationsStoreState: GetInitialOperationsStoreState = ({
  router,
}) => ({
  datetimeRange: [lightFormat("yyyy-MM-dd", startOfMonth(new Date())), ""],
  operations: getInitialAsyncDataState<Operation[]>(),
  operationsByDate: [],
  promises: {},
  router: markRaw(router),
});
