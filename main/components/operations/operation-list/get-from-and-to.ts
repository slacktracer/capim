import type { LocationQuery } from "vue-router";

import { defaultDatetimeRange } from "../../../modules/operations/default-datetime-range.js";

export const getFromAndTo = (locationQuery: LocationQuery) => {
  const from =
    !Array.isArray(locationQuery?.from) && locationQuery.from
      ? locationQuery.from
      : defaultDatetimeRange.from;

  const to =
    !Array.isArray(locationQuery?.to) && locationQuery.to
      ? locationQuery.to
      : defaultDatetimeRange.to;

  return { from, to };
};
