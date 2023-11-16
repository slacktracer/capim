export const getPreviousListItem = ({ element }: { element: HTMLElement }) => {
  const previousSibling = element.closest("li")?.previousSibling;

  if (previousSibling instanceof HTMLElement) {
    if (previousSibling?.tagName !== "LI") {
      return;
    }

    return previousSibling;
  }
};
