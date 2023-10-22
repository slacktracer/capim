import { memoizeWith } from "ramda";

import type { Operation } from "../../core/main.js";
import * as main from "../../core/main.js";
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
    main.wrapWithRetrievedAt({ data: await main.getOperation(input) }),
);
