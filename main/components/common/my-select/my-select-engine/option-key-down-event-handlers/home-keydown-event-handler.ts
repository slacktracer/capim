import { roles } from "../roles.js";
import { getFirstListItem } from "./option-list-traversing/get-first-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const homeKeydownEventHandler = ({
  target,
}: {
  target: HTMLElement;
}) => {
  const container: HTMLElement | null = target.closest(
    `[data-select-role=${roles.listbox}]`,
  );

  if (container) {
    const firstListItem = getFirstListItem({ container });

    if (firstListItem) {
      goToListItem({ listItem: firstListItem });
    }
  }
};
