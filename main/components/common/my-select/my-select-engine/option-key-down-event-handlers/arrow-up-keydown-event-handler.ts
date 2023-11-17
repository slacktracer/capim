import { roles } from "../roles.js";
import { getLastListItem } from "./option-list-traversing/get-last-list-item.js";
import { getPreviousListItem } from "./option-list-traversing/get-previous-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const arrowUpKeydownEventHandler = ({
  target,
}: {
  target: HTMLElement;
}) => {
  const previousListItem = getPreviousListItem({
    element: target,
  });

  if (previousListItem) {
    goToListItem({ listItem: previousListItem });
  } else {
    const container: HTMLElement | null = target.closest(
      `[data-select-role=${roles.listbox}]`,
    );

    if (container) {
      const lastListItem = getLastListItem({ container });

      if (lastListItem) {
        goToListItem({ listItem: lastListItem });
      }
    }
  }
};
