import { defineStore } from "pinia";
import { partial } from "ramda";
import type { Ref } from "vue";
import { computed, reactive, readonly, ref, toRefs, watch } from "vue";

import * as main from "../../core/main.js";
import { makeOperationsByDate } from "../../core/make-operations-by-date.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { getInitialOperationsStoreState } from "./get-initial-operations-store-state.js";
import { getOperations } from "./get-operations.js";
import { setDatetimeRange } from "./set-datetime-range.js";

export const useOperationsStore = defineStore("operations", () => {
  const state: OperationStoreState = reactive(getInitialOperationsStoreState());

  const actions = {
    getOperations: partial(getOperations, [state]),
    setDatetimeRange: partial(setDatetimeRange, [state]),
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
    ...actions,
    ...toRefs(readonly(state)),
    increaseAmountOfOperationsToRender,
    operationsByDate,
    operationsByDateInSegments,
  };
});
