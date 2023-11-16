import { roles } from "./roles.js";

export const mouseoverHandler = (event: MouseEvent) => {
  if (event.target instanceof HTMLElement) {
    const {
      target: {
        dataset: { selectRole: role },
      },
      target,
    } = event;

    if (role === roles["option-input"] || role === roles["option-label"]) {
      target.focus();
    }
  }
};
