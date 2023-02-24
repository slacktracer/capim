import { defineStore } from "pinia";
import type { Ref } from "vue";
import { readonly, ref } from "vue";

import * as main from "../core/main.js";
import { Operation } from "../core/main.js";

type OperationStoreOperations = {
  data: Operation[];
  error: {
    data: Record<string, unknown>;
    message: string;
  };
};

export const useOperationsStore = defineStore("operations", () => {
  const operations: Ref<OperationStoreOperations> = ref({
    data: [],
    error: {
      data: {},
      message: "",
    },
  });

  const getOperations = async () => {
    try {
      operations.value.data = await main.getOperations();

      operations.value.error = { data: {}, message: "" };
    } catch (error: unknown) {
      if (error instanceof Error) {
        operations.value.error.message = error.message;
      }
    }
  };

  const $reset = () => {
    operations.value = {
      data: [],
      error: {
        data: {},
        message: "",
      },
    };
  };

  main.mainEventBus.on("logout", $reset);

  return { getOperations, operations: readonly(operations), $reset };
});
