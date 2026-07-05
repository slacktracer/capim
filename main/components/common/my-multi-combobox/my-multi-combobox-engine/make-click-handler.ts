import { goToListItem } from "../../my-combobox/my-combobox-engine/option-key-down-event-handlers/option-list-traversing/go-to-list-item.js";
import { roles } from "../../my-combobox/my-combobox-engine/roles.js";
import type { EmitOptionAddEvent } from "./types/EmitOptionAddEvent.js";

export const makeClickHandler =
  ({ emitOptionAddEvent }: { emitOptionAddEvent: EmitOptionAddEvent }) =>
  (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const {
        target: { role },
        target,
      } = event;

      if (role === roles.option) {
        if (target instanceof HTMLLIElement) {
          goToListItem({ listItem: target, noDebounce: true });

          const {
            dataset: { label, value },
          } = target;

          if (typeof label === "string" && typeof value === "string") {
            emitOptionAddEvent({ label, value });
          }
        }
      }
    }
  };
