import type { Category } from "../core/types/Category.js";

export type MemoisedGetCategories = (input: {
  invalidateCount: number;
}) => Promise<{ data: Category[]; retrievedAt: Date }>;
