import type { Operation } from "../core/types/Operation.js";

export type MemoisedGetOperation = (input: {
  operationID: string;
  invalidate?: boolean;
  invalidateCount: number;
}) => Promise<{ data: Operation; retrievedAt: Date }>;
