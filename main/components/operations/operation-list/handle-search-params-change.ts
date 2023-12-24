import type { LocationQuery } from "vue-router";

import { getFromAndTo } from "./get-from-and-to.js";
import { getOperations } from "./get-operations.js";

export const handleSearchParamsChange = (locationQuery: LocationQuery) => {
  const { from, to } = getFromAndTo(locationQuery);

  const operationListID = getOperations({
    from,
    to,
  });

  return { from, operationListID, to };
};
