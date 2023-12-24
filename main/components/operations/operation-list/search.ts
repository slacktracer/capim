import { unref } from "vue";
import type { Router } from "vue-router";

import { areSearchParamsUpToDate } from "../../../modules/common/utils/are-search-params-up-to-date.js";
import { setSearchParams } from "../../../modules/common/utils/set-search-params.js";
import { useOperationsStore } from "../../../modules/operations/use-operations-store.js";
import { getOperations } from "./get-operations.js";

export const search = ({ from, to }: { from: string; to: string }) => {
  const operationsStore = useOperationsStore();

  const currentSearchParams = unref(operationsStore.router.currentRoute)?.query;

  if (currentSearchParams) {
    const searchParamsAreUpToDate = areSearchParamsUpToDate({
      currentSearchParams,
      newSearchParams: { from, to },
    });

    if (!searchParamsAreUpToDate) {
      setSearchParams({
        data: { from, to },
        router: operationsStore.router as Router,
      });

      return;
    }
  }

  return getOperations({
    bypassLocalCache: true,
    from,
    to,
  });
};
