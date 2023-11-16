export const getNextListItem = ({
  element,
}: {
  element: HTMLElement;
}): HTMLElement | undefined => {
  const nextSibling = element.closest("li")?.nextSibling;

  if (nextSibling instanceof HTMLElement) {
    if (nextSibling?.tagName !== "LI") {
      return;
    }

    return nextSibling;
  }
};
