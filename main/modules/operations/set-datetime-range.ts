import type { SetDatetimeRange } from "../../types/SetDatetimeRange.js";

export const setDatetimeRange: SetDatetimeRange = ({ from, to, state }) => {
  state.datetimeRange[0] = from !== undefined ? from : "";

  state.datetimeRange[1] = to !== undefined ? to : "";
};
