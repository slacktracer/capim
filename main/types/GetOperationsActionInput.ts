import type * as main from "../core/main.js";

export type GetOperationsActionInput = main.DatetimeRangeRecord & {
  invalidate?: boolean;
};
