import { memoizeWith } from "ramda";

import * as main from "../../core/main.js";
import type { DatetimeRangeInput } from "../../core/types/DatetimeRangeInput.js";
import type { Operation } from "../../core/types/Operation.js";
import { setSearchParamsOnURL } from "../../core/utils/set-search-params-on-url.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { loadDataIntoState } from "../common/utils/load-data-into-state.js";

const nonMemoisedGetOperations = (
  state: OperationStoreState,
  { from, to }: DatetimeRangeInput = {},
) => {
  loadDataIntoState<Operation[]>({
    functionToCall: () => main.getOperations({ from, to }),
    stateToUpdate: state.operations,
  });
};

const getGetOperationsMemoisationKey = (
  _state: OperationStoreState,
  { from, to }: DatetimeRangeInput = {},
) => `${from}::${to}`;

const memoisedGetOperations = memoizeWith(
  getGetOperationsMemoisationKey,
  nonMemoisedGetOperations,
);

export const getOperations = (
  state: OperationStoreState,
  { from, to }: DatetimeRangeInput,
) => {
  setSearchParamsOnURL({ from, to });

  return memoisedGetOperations(state, { from, to });
};
