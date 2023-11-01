import { memoizeWith } from "ramda";

import { core } from "../../core/core.js";
import type { MemoisedGetCategories } from "../../types/MemoisedGetCategories.js";

export const memoisedGetCategories: MemoisedGetCategories =
  memoizeWith<MemoisedGetCategories>(
    ({ invalidateCount }) => `${invalidateCount}`,
    async () =>
      core.wrapWithRetrievedAt({
        data: await core.getCategories(),
      }),
  );
