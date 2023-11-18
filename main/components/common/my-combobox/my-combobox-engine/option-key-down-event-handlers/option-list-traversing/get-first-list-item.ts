export const getFirstListItem = ({
  listbox,
}: {
  listbox: HTMLUListElement;
}): HTMLLIElement | undefined => {
  const firstListItem = listbox.firstElementChild;

  if (!(firstListItem instanceof HTMLLIElement)) {
    return;
  }

  return firstListItem;
};
