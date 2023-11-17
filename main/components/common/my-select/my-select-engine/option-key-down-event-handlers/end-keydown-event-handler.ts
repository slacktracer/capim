import { roles } from "../roles.js";
import { getLastListItem } from "./option-list-traversing/get-last-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const endKeydownEventHandler = ({ target }: { target: HTMLElement }) => {
  const container: HTMLElement | null = target.closest(
    `[data-select-role=${roles.listbox}]`,
  );

  if (container) {
    const lastListItem = getLastListItem({ container });

    if (lastListItem) {
      goToListItem({ listItem: lastListItem });
    }
  }
};
