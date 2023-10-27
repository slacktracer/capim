import { memoizeWith } from "ramda";

import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation.js";
import type { GetOperationActionInput } from "../../types/GetOperationActionInput.js";

export const memoisedGetOperation = memoizeWith<
  (
    input: GetOperationActionInput & { invalidateCount: number },
  ) => Promise<{ data: Operation; retrievedAt: Date }>
>(
  ({
    invalidateCount,
    operationID,
  }: GetOperationActionInput & { invalidateCount: number }) =>
    `${operationID}::${invalidateCount}`,
  async (input) =>
    core.wrapWithRetrievedAt({ data: await core.getOperation(input) }),
);
