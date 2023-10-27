import { memoizeWith } from "ramda";

import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation.js";
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
    core.wrapWithRetrievedAt({ data: await core.getOperations(input) }),
);
