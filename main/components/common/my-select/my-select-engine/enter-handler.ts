import { dismiss } from "./dismiss.js";

export const enterHandler = ({
  onOptionSelected,
  target,
}: {
  onOptionSelected?: (() => void) | undefined;
  target: HTMLInputElement;
}) => {
  if (onOptionSelected === undefined) return;

  const inputIsChecked = target.checked;

  if (!inputIsChecked) {
    target.click();
  }

  setTimeout(() => {
    onOptionSelected();

    dismiss({ target });

    // This was my last resort...
    // Hopefully I wil be able to "fix" it someday...
  }, 10);
};
