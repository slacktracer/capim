import { core } from "../../../core/core.js";
import { useCommonStore } from "../use-common-store.js";

export const setSearchParams = ({
  data,
  replace = false,
}: {
  data: Record<string, unknown>;
  replace?: boolean;
}) => {
  const { router } = useCommonStore();

  const currentRoute = router.currentRoute;

  router[replace ? "replace" : "push"]({
    path: currentRoute.path,
    query: {
      ...currentRoute.query,
      ...core.filterOutFalsyEntries({ object: data }),
    },
  });
};
