import { memoizeWith } from "ramda";

import type { Operation } from "../../core/main.js";
import * as main from "../../core/main.js";
import type { DatetimeRangeRecord } from "../../core/types/DatetimeRangeRecord.js";
import { wrapWithRetrievedAt } from "../../core/utils/wrap-with-retrieved-at.js";

export const memoisedGetOperations = memoizeWith<
  (
    input: DatetimeRangeRecord,
  ) => Promise<{ data: Operation[]; retrievedAt: Date }>
>(
  ({ from, to }: DatetimeRangeRecord) => `${from}::${to}`,
  async (input) =>
    wrapWithRetrievedAt({ data: await main.getOperations(input) }),
);
