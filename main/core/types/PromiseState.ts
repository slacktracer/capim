import type { promiseState } from "../utils/promise-state.js";

export type PromiseState = (typeof promiseState)[keyof typeof promiseState];
