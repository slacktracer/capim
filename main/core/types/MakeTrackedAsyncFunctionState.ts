import type { TrackedAsyncFunctionState } from "./TrackedAsyncFunctionState";

export type MakeTrackedAsyncFunctionState = <Data>(input?: {
  data: Data | Partial<Data> | undefined;
  ready?: boolean;
}) => TrackedAsyncFunctionState<Data>;
