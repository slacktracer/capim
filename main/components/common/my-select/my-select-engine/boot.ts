import { makeClickHandler } from "./make-click-handler.js";
import { makeKeydownHandler } from "./make-keydown-handler.js";
import { mouseoverHandler } from "./mouseover-handler.js";
import { roles } from "./roles.js";
import { searchInputKeydownHandler } from "./search-input-keydown-handler.js";
import type { OnOptionSelected } from "./types/OnOptionSelected.js";

export const boot = ({
  filterable,
  mySelectElement,
  onOptionSelected,
}: {
  filterable: boolean;
  mySelectElement: HTMLElement;
  onOptionSelected: OnOptionSelected;
}): (() => void) => {
  const listbox = mySelectElement.querySelector(
    `[data-select-role=${roles.listbox}]`,
  );

  let clickHandler: (event: MouseEvent) => void;

  let keydownHandler: (event: KeyboardEvent) => void;

  if (listbox instanceof HTMLElement) {
    clickHandler = makeClickHandler({ onOptionSelected });

    listbox.addEventListener("click", clickHandler);

    keydownHandler = makeKeydownHandler({ filterable, onOptionSelected });

    listbox.addEventListener("keydown", keydownHandler);

    listbox.addEventListener("mouseover", mouseoverHandler);
  }

  const searchInput = mySelectElement.querySelector(
    `[data-select-role=${roles.search}]`,
  );

  if (searchInput instanceof HTMLInputElement) {
    searchInput.addEventListener("keydown", searchInputKeydownHandler);
  }

  return function shutdown() {
    if (listbox instanceof HTMLElement) {
      listbox.removeEventListener("click", clickHandler);

      listbox.removeEventListener("keydown", keydownHandler);

      listbox.removeEventListener("mouseover", mouseoverHandler);
    }

    if (searchInput instanceof HTMLInputElement) {
      searchInput.removeEventListener("keydown", searchInputKeydownHandler);
    }
  };
};
