import { useOperationsStore } from "../../../modules/operations/use-operations-store.js";

export const getOperations = ({
  bypassLocalCache = false,
  from,
  to,
}: {
  bypassLocalCache?: boolean;
  from: string;
  to: string;
}) => {
  const operationsStore = useOperationsStore();

  const operationListID = operationsStore.getOperations({
    bypassLocalCache,
    from,
    to,
  });

  return operationListID;
};
