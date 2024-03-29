import { format } from "date-fns";
import { toRaw } from "vue";

import type { MakeEditableOperation } from "../../types/MakeEditableOperation.js";

export const makeEditableOperation: MakeEditableOperation = ({
  data: operation,
}) => {
  const rawOperation = toRaw(operation);

  return {
    ...rawOperation,
    atDate: format(new Date(operation.at), "yyyy-MM-dd"),
    atTime: format(new Date(rawOperation.at), "HH:mm"),
  };
};
