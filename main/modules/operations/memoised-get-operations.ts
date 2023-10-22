import { memoizeWith } from "ramda";

import type { Operation } from "../../core/main.js";
import * as main from "../../core/main.js";

export const memoisedGetOperations = memoizeWith<
  (
    input: main.DatetimeRangeRecord,
  ) => Promise<{ data: Operation[]; retrievedAt: Date }>
>(
  ({ from, to }: main.DatetimeRangeRecord) => `${from}::${to}`,
  async (input) =>
    main.wrapWithRetrievedAt({ data: await main.getOperations(input) }),
);
