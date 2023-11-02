import { toRaw } from "vue";

import type { MakeEditableOperation } from "../../types/MakeEditableOperation.js";

export const makeEditableOperation: MakeEditableOperation = ({
  data: operation,
}) => {
  const rawOperation = toRaw(operation);

  return {
    ...rawOperation,
    atDate: rawOperation.at.slice(0, 10),
    atTime: rawOperation.at.slice(11, 16),
  };
};
