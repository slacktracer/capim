import type { Operation } from "../core/types/Operation.js";

export type MemoisedGetOperations = (input: {
  from?: string | undefined;
  invalidateCount: number;
  to?: string | undefined;
}) => Promise<{ data: Operation[]; retrievedAt: Date }>;
