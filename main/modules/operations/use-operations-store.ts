import { defineStore } from "pinia";
import type { Ref } from "vue";
import { computed, reactive, readonly, ref, toRefs, watch } from "vue";

import type { Operation } from "../../core/main.js";
import * as main from "../../core/main.js";
import { makeOperationsByDate } from "../../core/make-operations-by-date.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { loadDataIntoState } from "../common/utils/load-data-into-state.js";
import { getInitialOperationsStoreState } from "./get-initial-operations-store-state.js";

export const useOperationsStore = defineStore("operations", () => {
  const state: OperationStoreState = reactive(getInitialOperationsStoreState());

  const getOperations = ({ from, to }: { from: string; to: string }) => {
    if (state.operations.ready) {
      return;
    }

    loadDataIntoState<Operation[]>({
      functionToCall: () => main.getOperations({ from, to }),
      stateToUpdate: state.operations,
    });
  };

  const operationsByDate = computed(() =>
    makeOperationsByDate({
      operations: state.operations.data ?? [],
    }),
  );

  const operationsByDateInSegments: Ref<
    OperationStoreState["operationsByDateInSegments"]
  > = ref([]);

  watch(state.operations, () => {
    operationsByDateInSegments.value = operationsByDate.value.slice(
      0,
      state.amountOfOperationsToRender,
    );
  });

  const increaseAmountOfOperationsToRender = () => {
    state.amountOfOperationsToRender += 90;

    operationsByDateInSegments.value = operationsByDate.value.slice(
      0,
      state.amountOfOperationsToRender,
    );
  };

  const $reset = () =>
    void Object.assign(state, getInitialOperationsStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return {
    $reset,
    ...toRefs(readonly(state)),
    getOperations,
    increaseAmountOfOperationsToRender,
    operationsByDate,
    operationsByDateInSegments,
  };
});
