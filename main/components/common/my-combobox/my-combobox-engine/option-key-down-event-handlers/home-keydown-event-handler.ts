import { getFirstListItem } from "./option-list-traversing/get-first-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const homeKeydownEventHandler = ({
  comboboxContainer,
}: {
  comboboxContainer: HTMLElement;
}) => {
  const [, listbox] = comboboxContainer.children;

  if (listbox instanceof HTMLUListElement) {
    const firstListItem = getFirstListItem({ listbox });

    if (firstListItem) {
      goToListItem({ listItem: firstListItem });
    }
  }
};
