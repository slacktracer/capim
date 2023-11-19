export const makeDebouncedAddAriaSelectedAttribute = ({
  delay,
}: {
  delay: number;
}) => {
  let timer: ReturnType<typeof setTimeout>;

  return ({
    listItem,
    previouslySelectedListItem,
  }: {
    listItem: HTMLLIElement;
    previouslySelectedListItem?: HTMLLIElement;
  }) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      if (previouslySelectedListItem?.hasAttribute("aria-selected")) {
        previouslySelectedListItem.removeAttribute("aria-selected");
      }

      listItem.setAttribute("aria-selected", "true");

      const [combobox] = listItem.parentNode?.parentNode?.children ?? [];

      if (combobox instanceof HTMLInputElement) {
        combobox.setAttribute("aria-activedescendant", listItem.id);
      }
    }, delay);
  };
};
