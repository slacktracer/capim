import { roles } from "./roles.js";

export const dismiss = ({ target }: { target: HTMLElement }) => {
  const container: HTMLElement | null = target.closest(
    `[data-select-role=${roles.select}]`,
  );

  if (container) {
    const toggle = container.querySelector(`[data-select-role=${roles.input}]`);

    if (toggle instanceof HTMLButtonElement) {
      toggle.click();
    }
  }
};
