import type { TrackedAsyncFunctionState } from "./TrackedAsyncFunctionState";

export type MakeTrackedAsyncFunctionState = <
  Data,
>() => TrackedAsyncFunctionState<Data>;
