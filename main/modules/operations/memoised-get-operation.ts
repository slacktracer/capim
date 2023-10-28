import { memoizeWith } from "ramda";

import { core } from "../../core/core.js";
import type { MemoisedGetOperation } from "../../types/MemoisedGetOperation.js";

export const memoisedGetOperation: MemoisedGetOperation =
  memoizeWith<MemoisedGetOperation>(
    ({ invalidateCount, operationID }) => `${operationID}::${invalidateCount}`,
    async (input) =>
      core.wrapWithRetrievedAt({ data: await core.getOperation(input) }),
  );
