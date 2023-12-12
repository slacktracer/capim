import type { Operation } from "../../core/types/Operation.js";

export const makeEmptyOperation: () => Partial<Operation> = () => ({
  amountPerUnit: 1,
  at: new Date().toISOString(),
  atTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  confirmed: true,
  type: "Expense",
  unitCount: 1,
});
