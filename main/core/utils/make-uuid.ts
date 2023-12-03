// https://web.archive.org/web/20220820045742/https://medium.com/teads-engineering/generating-uuids-at-scale-on-the-web-2877f529d2a2

export const makeUUID = () => {
  const url = URL.createObjectURL(new Blob());

  return url.substring(url.lastIndexOf("/") + 1);
};
