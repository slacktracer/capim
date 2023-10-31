import type { DidSwitchTo } from "../types/DidSwitchTo.js";

export const didSwitchTo: DidSwitchTo = ({ currentValue, previousValue, to }) =>
  currentValue === to && previousValue === !to;
