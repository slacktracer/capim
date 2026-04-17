import type { LocationQuery } from "vue-router";

export const getFromAndTo = (locationQuery: LocationQuery) => {
  const from =
    !Array.isArray(locationQuery?.from) && locationQuery.from
      ? locationQuery.from
      : "";

  const to =
    !Array.isArray(locationQuery?.to) && locationQuery.to
      ? locationQuery.to
      : "";

  return { from, to };
};
