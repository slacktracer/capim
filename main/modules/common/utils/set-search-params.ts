import { unref } from "vue";
import type { Router } from "vue-router";

import { core } from "../../../core/core.js";

export const setSearchParams = ({
  data,
  replace = false,
  router,
}: {
  data: Record<string, unknown>;
  replace?: boolean;
  router: Router;
}) => {
  const currentRoute = unref(router.currentRoute);

  const currentSearchParams = currentRoute.query;

  const newSearchParams = core.filterOutFalsyEntries({ object: data });

  const searchParamsAreUpToDate = Object.keys(newSearchParams).every(
    (key) => currentSearchParams[key] === newSearchParams[key],
  );

  if (!searchParamsAreUpToDate) {
    router[replace ? "replace" : "push"]({
      path: currentRoute.path,
      query: {
        ...currentRoute.query,
        ...core.filterOutFalsyEntries({ object: data }),
      },
    });
  }
};
