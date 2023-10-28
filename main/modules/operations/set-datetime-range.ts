import type { SetDatetimeRange } from "../../types/SetDatetimeRange.js";

export const setDatetimeRange: SetDatetimeRange = ({ from, to, state }) => {
  if (typeof from === "string") {
    state.datetimeRange[0] = from;
  }

  if (typeof to === "string") {
    state.datetimeRange[1] = to;
  }
};
