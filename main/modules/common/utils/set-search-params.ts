import { unref } from "vue";
import type { Router } from "vue-router";

import { filterOutFalsyEntries } from "../../../core/main.js";

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
      ...filterOutFalsyEntries({ object: data }),
    },
  });
};
