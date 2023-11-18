import { getLastListItem } from "./option-list-traversing/get-last-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const endKeydownEventHandler = ({
  comboboxContainer,
}: {
  comboboxContainer: HTMLElement;
}) => {
  const [, listbox] = comboboxContainer.children;

  if (listbox instanceof HTMLUListElement) {
    const lastListItem = getLastListItem({ listbox });

    if (lastListItem) {
      goToListItem({ listItem: lastListItem });
    }
  }
};
