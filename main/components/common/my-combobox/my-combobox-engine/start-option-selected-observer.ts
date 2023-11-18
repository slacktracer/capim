import type { OnOptionSelected } from "./types/OnOptionSelected";

export const startOptionSelectedObserver = ({
  listbox,
  onOptionSelected,
}: {
  listbox: HTMLUListElement;
  onOptionSelected: OnOptionSelected;
}) => {
  const optionSelectedObserver = new MutationObserver((mutations) => {
    const [{ target: selectedOption }] = mutations;

    if (selectedOption instanceof HTMLLIElement) {
      const {
        dataset: { label, value },
      } = selectedOption;

      if (label) {
        onOptionSelected({
          label,
          value,
        });
      }
    }
  });

  optionSelectedObserver.observe(listbox, {
    attributes: true,
    attributeFilter: ["aria-selected"],
    subtree: true,
  });

  return optionSelectedObserver;
};
