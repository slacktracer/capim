import type { Operation } from "../core/types/Operation";
import type { OperationsByDate } from "../core/types/OperationsByDate";
import type { TrackedPromise } from "../core/types/TrackedPromise";

export type TrackedPromiseOfOperations = TrackedPromise<
  unknown,
  Operation[] & { byDate: OperationsByDate }
>;
