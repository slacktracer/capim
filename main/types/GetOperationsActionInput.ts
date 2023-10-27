import type { DatetimeRangeRecord } from "../core/types/DatetimeRangeRecord.js";

export type GetOperationsActionInput = DatetimeRangeRecord & {
  invalidate?: boolean;
};
