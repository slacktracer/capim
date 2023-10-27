import { core } from "../../../core/core.js";
import type { NewLoadDataIntoState } from "../../../types/NewLoadDataIntoState.js";

export const newLoadDataIntoState: NewLoadDataIntoState = ({
  functionToCall,
  stateToUpdate,
}) => {
  stateToUpdate.ready = false;

  stateToUpdate.error = false;

  stateToUpdate.loading = true;

  functionToCall()
    .then(({ data, retrievedAt }) => {
      stateToUpdate.data = data;

      stateToUpdate.ready = true;

      stateToUpdate.retrievedAt = retrievedAt;
    })

    .catch((reason: unknown) => {
      if (reason instanceof core.CoreError) {
        stateToUpdate.error = { data: reason.data, message: reason.message };
      }
    })

    .finally(() => {
      stateToUpdate.loading = false;
    });
};
