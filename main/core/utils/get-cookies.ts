export const getCookies = () =>
  document.cookie === ""
    ? {}
    : document.cookie
        .split(";")
        .map((item) => item.split("="))
        .reduce((cookies: Record<string, any>, tuple) => {
          cookies[decodeURIComponent(tuple[0].trim())] = decodeURIComponent(
            tuple[1].trim(),
          );

          return cookies;
        }, {});
