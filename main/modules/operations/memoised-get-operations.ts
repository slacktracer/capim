import { memoizeWith } from "ramda";

import { core } from "../../core/core.js";
import type { MemoisedGetOperations } from "../../types/MemoisedGetOperations.js";

export const memoisedGetOperations: MemoisedGetOperations =
  memoizeWith<MemoisedGetOperations>(
    ({ from, to, invalidateCount }) => `${from}::${to}::${invalidateCount}`,
    async (input) =>
      core.wrapWithRetrievedAt({ data: await core.getOperations(input) }),
  );
