import type { LocationQueryRaw } from "vue-router";

import { useCommonStore } from "../use-common-store.js";

export const setSearchParams = ({
  data,
  replace = false,
}: {
  data: Record<string, string>;
  replace?: boolean;
}) => {
  const { router } = useCommonStore();

  const currentRoute = router.currentRoute;

  const query: LocationQueryRaw = { ...currentRoute.query };

  for (const [key, value] of Object.entries(data)) {
    query[key] = value || undefined;
  }

  router[replace ? "replace" : "push"]({
    path: currentRoute.path,
    query,
  });
};
