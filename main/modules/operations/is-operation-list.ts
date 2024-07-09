import type { Operation } from "../../core/types/Operation";

export const isOperationList = (
  operationList: any,
): operationList is Operation[] => "byDate" in operationList;
