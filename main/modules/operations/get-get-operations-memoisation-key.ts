import type { DatetimeRangeRecord } from "../../core/types/DatetimeRangeRecord.js";

export const getGetOperationsMemoisationKey = ({
  from,
  to,
}: DatetimeRangeRecord = {}) => `${from}::${to}`;
