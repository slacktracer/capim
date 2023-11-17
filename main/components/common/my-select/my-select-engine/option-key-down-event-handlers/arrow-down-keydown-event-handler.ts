import { roles } from "../roles.js";
import { getFirstListItem } from "./option-list-traversing/get-first-list-item.js";
import { getNextListItem } from "./option-list-traversing/get-next-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const arrowDownKeydownEventHandler = ({
  target,
}: {
  target: HTMLElement;
}) => {
  const nextListItem = getNextListItem({
    element: target,
  });

  if (nextListItem) {
    goToListItem({ listItem: nextListItem });
  } else {
    const container: HTMLElement | null = target.closest(
      `[data-select-role=${roles.listbox}]`,
    );

    if (container) {
      const firstListItem = getFirstListItem({ container });

      if (firstListItem) {
        goToListItem({ listItem: firstListItem });
      }
    }
  }
};
