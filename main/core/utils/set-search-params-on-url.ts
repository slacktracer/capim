export const setSearchParamsOnURL = (data = {}) => {
  const url = new URL(window.location.href);

  for (const [key, value] of Object.entries(data)) {
    if (value === "") {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value as string);
    }
  }

  history.replaceState({}, "", url.href);

  return url.search;
};
