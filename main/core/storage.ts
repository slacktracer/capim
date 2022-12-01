export const storage = {
  getItem: (key: string): null | string => localStorage.getItem(key),

  removeItem: (key: string) => localStorage.removeItem(key),

  setItem: (key: string, value: string): void =>
    localStorage.setItem(key, value),
};
