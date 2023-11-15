export const getLastListItem = ({
  container,
}: {
  container: HTMLElement;
}): HTMLElement | null => container.querySelector("li:last-child");
