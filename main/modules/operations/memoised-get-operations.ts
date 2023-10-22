import { memoizeWith } from "ramda";

import type { Operation } from "../../core/main.js";
import * as main from "../../core/main.js";
import type { GetOperationsActionInput } from "../../types/GetOperationsActionInput.js";

export const memoisedGetOperations = memoizeWith<
  (
    input: GetOperationsActionInput & { invalidateCount: number },
  ) => Promise<{ data: Operation[]; retrievedAt: Date }>
>(
  ({
    from,
    to,
    invalidateCount,
  }: GetOperationsActionInput & { invalidateCount: number }) =>
    `${from}::${to}::${invalidateCount}`,
  async (input) =>
    main.wrapWithRetrievedAt({ data: await main.getOperations(input) }),
);
