export const goToListItem = ({ listItem }: { listItem: HTMLElement }) => {
  const label = listItem.querySelector("label");

  if (label) {
    label.scrollIntoView({ block: "nearest" });

    const input = label.querySelector("input");

    if (input) {
      input.focus();
      input.click();
    }
  }
};
