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

  return router[replace ? "replace" : "push"]({
    path: currentRoute.path,
    query: {
      ...currentRoute.query,
      ...core.filterOutFalsyEntries({ object: data }),
    },
  });
};
