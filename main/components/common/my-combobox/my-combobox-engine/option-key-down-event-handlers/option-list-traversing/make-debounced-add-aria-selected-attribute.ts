export const makeDebouncedAddAriaSelectedAttribute = ({
  delay,
}: {
  delay: number;
}) => {
  let timer: ReturnType<typeof setTimeout>;

  return ({
    listItem,
    noDelay = false,
    previouslySelectedListItem,
  }: {
    listItem: HTMLLIElement;
    noDelay?: boolean;
    previouslySelectedListItem?: HTMLLIElement;
  }) => {
    const addAriaSelectedAttribute = () => {
      if (previouslySelectedListItem?.hasAttribute("aria-selected")) {
        previouslySelectedListItem.removeAttribute("aria-selected");
      }

      listItem.setAttribute("aria-selected", "true");

      const [combobox] = listItem.parentNode?.parentNode?.children ?? [];

      if (combobox instanceof HTMLInputElement) {
        combobox.setAttribute("aria-activedescendant", listItem.id);
      }
    };

    clearTimeout(timer);

    if (noDelay) {
      addAriaSelectedAttribute();

      return;
    }

    timer = setTimeout(addAriaSelectedAttribute, delay);
  };
};
