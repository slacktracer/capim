export const getCookies = () =>
  document.cookie === ""
    ? {}
    : document.cookie
        .split(";")
        .map((item) => item.split("="))
        .reduce((cookies: Record<string, string>, tuple) => {
          const [key, value] = tuple;

          if (key && value) {
            cookies[decodeURIComponent(key.trim())] = decodeURIComponent(
              value.trim(),
            );
          }

          return cookies;
        }, {});
