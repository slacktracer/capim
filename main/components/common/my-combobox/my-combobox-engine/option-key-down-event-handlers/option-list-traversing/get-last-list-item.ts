export const getLastListItem = ({
  listbox,
}: {
  listbox: HTMLUListElement;
}): HTMLLIElement | undefined => {
  const lastListItem = listbox.lastElementChild;

  if (!(lastListItem instanceof HTMLLIElement)) {
    return;
  }

  return lastListItem;
};
