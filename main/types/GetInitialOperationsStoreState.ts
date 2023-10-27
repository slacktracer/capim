import type { Router } from "vue-router";

import type { OperationStoreState } from "./OperationsStoreState.js";

export type GetInitialOperationsStoreState = ({
  router,
}: {
  router: Router;
}) => OperationStoreState;
