import { goToFirstListItem } from "./option-list-traversing/go-to-first-list-item";

export const homeKeydownEventHandler = ({
  comboboxContainer,
}: {
  comboboxContainer: HTMLElement;
}) => {
  const [, listbox] = comboboxContainer.children;

  if (listbox instanceof HTMLUListElement) {
    goToFirstListItem({ listbox });
  }
};
