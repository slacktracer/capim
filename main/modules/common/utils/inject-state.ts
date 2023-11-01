import type { InjectState } from "../../../types/InjectState.js";

export const injectState: InjectState =
  (fun, state) =>
  (input, ...rest) =>
    fun(Object.assign(input ?? {}, { state }), ...rest);
