import type { Router } from "vue-router";

import type { OperationsStoreState } from "./OperationsStoreState.js";

export type GetInitialOperationsStoreState = ({
  router,
}: {
  router: Router;
}) => OperationsStoreState;
