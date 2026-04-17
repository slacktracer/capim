import { useCommonStore } from "../use-common-store.js";

export const areSearchParamsUpToDate = ({
  newSearchParams,
}: {
  newSearchParams: Record<string, string>;
}) => {
  const { router } = useCommonStore();

  return Object.keys(newSearchParams).every((key) => {
    const currentValue = router.currentRoute?.query?.[key];

    const newValue = newSearchParams[key];

    if (newValue) {
      return currentValue === newValue;
    }

    const paramIsAlreadyAbsentFromURL = Boolean(currentValue) === false;

    return paramIsAlreadyAbsentFromURL;
  });
};
