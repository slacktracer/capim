import { makeTrackedPromise } from "./make-tracked-promise";
import { promiseAction } from "./promise-action";

export const voidTrackedPromise = makeTrackedPromise({
  action: promiseAction.noop,
  asyncFunction: () => Promise.resolve(),
});
