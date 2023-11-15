export const makeDebouncedClickInput = ({ delay }: { delay: number }) => {
  let timer: ReturnType<typeof setTimeout>;

  return ({ input }: { input: HTMLInputElement }) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      input.click();
    }, delay);
  };
};
