import { unref } from "vue";
import type { Router } from "vue-router";

import { core } from "../../../core/core.js";

export const setSearchParams = ({
  data,
  router,
}: {
  data: Record<string, unknown>;
  router: Router;
}) => {
  const currentRoute = unref(router.currentRoute);

  return router.push({
    path: currentRoute.path,
    query: {
      ...currentRoute.query,
      ...core.filterOutFalsyEntries({ object: data }),
    },
  });
};
