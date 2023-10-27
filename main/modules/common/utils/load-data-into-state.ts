import { core } from "../../../core/core.js";
import type { LoadDataIntoState } from "../../../types/LoadDataIntoState.js";

export const loadDataIntoState: LoadDataIntoState = ({
  functionToCall,
  stateToUpdate,
}) => {
  stateToUpdate.ready = false;

  stateToUpdate.error = false;

  stateToUpdate.loading = true;

  functionToCall()
    .then((value) => {
      stateToUpdate.data = value;

      stateToUpdate.ready = true;

      stateToUpdate.retrievedAt = new Date();
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
