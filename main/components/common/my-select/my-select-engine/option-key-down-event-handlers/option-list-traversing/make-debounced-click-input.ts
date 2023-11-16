export const makeDebouncedClickInput = ({ delay }: { delay: number }) => {
  let timer: ReturnType<typeof setTimeout>;

  return ({ label }: { label: HTMLLabelElement }) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      label.click();
    }, delay);
  };
};
