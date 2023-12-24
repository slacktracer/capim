import { core } from "../../../core/core.js";

export const areSearchParamsUpToDate = ({
  currentSearchParams,
  newSearchParams,
}: {
  currentSearchParams: any /* LocationQuery */;
  newSearchParams: Record<string, string>;
}) => {
  return Object.keys(
    core.filterOutFalsyEntries({ object: newSearchParams }),
  ).every((key) => currentSearchParams[key] === newSearchParams[key]);
};
