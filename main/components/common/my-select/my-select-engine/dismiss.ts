export const dismiss = ({ target }: { target: HTMLElement }) => {
  const container: HTMLElement | null = target.closest(
    "[data-select-role='select']",
  );

  if (container) {
    const toggle = container.querySelector(".toggle") as HTMLElement;

    if (toggle) {
      toggle.click();
    }
  }
};
