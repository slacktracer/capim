import type { promiseAction } from "../utils/promise-action.js";

export type PromiseAction = (typeof promiseAction)[keyof typeof promiseAction];
