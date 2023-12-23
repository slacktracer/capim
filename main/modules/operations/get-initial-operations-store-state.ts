import { lightFormat, startOfMonth } from "date-fns/fp";
import { markRaw } from "vue";

import type { GetInitialOperationsStoreState } from "../../types/GetInitialOperationsStoreState.js";

export const getInitialOperationsStoreState: GetInitialOperationsStoreState = ({
  router,
}) => ({
  datetimeRange: [lightFormat("yyyy-MM-dd", startOfMonth(new Date())), ""],
  promises: {},
  router: markRaw(router),
});
