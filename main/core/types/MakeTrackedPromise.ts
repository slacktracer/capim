import type { PromiseAction } from "./PromiseAction";
import type { TrackedPromise } from "./TrackedPromise";

export type MakeTrackedPromise = <Input, Output>(input: {
  action: PromiseAction;
  asyncFunction: (input: Input) => Promise<Output> | never;
  onFulfilled?: ((input: Output) => void) | undefined;
  onRejected?: ((input: unknown) => void) | undefined;
  onSettled?: (() => void) | undefined;
}) => TrackedPromise<Input, Output>;
