export const getNextListItem = ({
  listItem,
}: {
  listItem: HTMLLIElement;
}): HTMLLIElement | undefined => {
  const nextListItem = listItem.nextSibling;

  if (!(nextListItem instanceof HTMLLIElement)) {
    return;
  }

  return nextListItem;
};
