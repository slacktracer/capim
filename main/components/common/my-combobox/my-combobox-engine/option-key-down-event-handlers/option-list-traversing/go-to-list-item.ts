import { makeDebouncedAddAriaSelectedAttribute } from "./make-debounced-add-aria-selected-attribute";

const debouncedAddAriaSelectedAttribute = makeDebouncedAddAriaSelectedAttribute(
  { delay: 50 },
);

let previouslySelectedListItem: HTMLLIElement;

export const goToListItem = ({ listItem }: { listItem: HTMLLIElement }) => {
  listItem.scrollIntoView({ block: "nearest" });

  const listbox = listItem.parentNode;

  if (listbox instanceof HTMLUListElement) {
    previouslySelectedListItem?.classList.remove("aria-selected");
  }

  previouslySelectedListItem = listItem;

  listItem.classList.add("aria-selected");

  debouncedAddAriaSelectedAttribute({ listItem, previouslySelectedListItem });
};
