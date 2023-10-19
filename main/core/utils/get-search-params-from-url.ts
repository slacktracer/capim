export const getSearchParamsFromURL = () => {
  const url = new URL(window.location.href);

  const searchParamsObject: Record<string, string> = {};

  for (const [key, value] of url.searchParams.entries()) {
    searchParamsObject[key] = value;
  }

  return searchParamsObject;
};
