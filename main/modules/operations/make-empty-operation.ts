import type { Operation } from "../../core/types/Operation.js";

export const makeEmptyOperation: () => Partial<Operation> = () => ({
  at: new Date().toISOString(),
  confirmed: true,
  type: "Expense",
  unitCount: 1,
});
