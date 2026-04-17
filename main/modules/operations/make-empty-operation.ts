import type { Operation } from "../../core/types/Operation.js";

export const makeEmptyOperation = (params?: {
  date?: string | undefined;
}): Partial<Operation> => {
  const now = new Date();

  const at = params?.date
    ? new Date(`${params.date} ${now.toTimeString().slice(0, 5)}`).toISOString()
    : now.toISOString();

  return {
    amount: 1,
    amountPerUnit: 1,
    at,
    atTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    confirmed: true,
    type: "Expense",
    unitCount: 1,
  };
};
