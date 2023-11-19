import { goToLastListItem } from "./option-list-traversing/go-to-last-list-item";

export const endKeydownEventHandler = ({
  comboboxContainer,
}: {
  comboboxContainer: HTMLElement;
}) => {
  const [, listbox] = comboboxContainer.children;

  if (listbox instanceof HTMLUListElement) {
    goToLastListItem({ listbox });
  }
};
