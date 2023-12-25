import { areSearchParamsUpToDate } from "../../../modules/common/utils/are-search-params-up-to-date.js";
import { setSearchParams } from "../../../modules/common/utils/set-search-params.js";
import { getOperations } from "./get-operations.js";

export const search = ({ from, to }: { from: string; to: string }) => {
  const searchParamsAreUpToDate = areSearchParamsUpToDate({
    newSearchParams: { from, to },
  });

  if (!searchParamsAreUpToDate) {
    setSearchParams({
      data: { from, to },
    });

    return;
  }

  return getOperations({
    bypassLocalCache: true,
    from,
    to,
  });
};
