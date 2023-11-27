import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation";
import type { PatchOperation } from "../../types/PatchOperation";
import { getInitialAsyncDataState } from "../common/utils/get-initial-async-data-state";
import { newLoadDataIntoState } from "../common/utils/new-load-data-into-state";

export const patchOperation: PatchOperation = ({ operation, state }) => {
  const { operationID } = operation;

  operation.at = new Date(
    `${operation.atDate} ${operation.atTime}`,
  ).toISOString();

  state.running[operationID] = getInitialAsyncDataState<Operation>();

  newLoadDataIntoState<Operation>({
    functionToCall: async () =>
      core.wrapWithRetrievedAt({
        // I need to do something about this type assertion.
        // TS was not collaborating... I did try many things...
        data: await core.patchOperation({ operation: operation as Operation }),
      }),
    stateToUpdate: state.running[operation.operationID],
  });
};
