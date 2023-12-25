import { core } from "../../../core/core.js";
import { useCommonStore } from "../use-common-store.js";

export const areSearchParamsUpToDate = ({
  newSearchParams,
}: {
  newSearchParams: Record<string, string>;
}) => {
  const { router } = useCommonStore();

  return Object.keys(
    core.filterOutFalsyEntries({ object: newSearchParams }),
  ).every((key) => router.currentRoute?.query?.[key] === newSearchParams[key]);
};
