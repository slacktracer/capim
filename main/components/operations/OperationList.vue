<script lang="ts" setup>
import { computed, ref, unref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useOperationsStore } from "../../modules/operations/use-operations-store.js";
import type { TrackedPromiseOfOperations } from "../../types/TrackedPromiseOfOperations";
import PromiseState from "../common/PromiseState.vue";
import OperationListItem from "./OperationListItem.vue";
import OperationsDatetimeRangeSelector from "./OperationsDatetimeRangeSelector.vue";

const operationsStore = useOperationsStore();
const route = useRoute();
const router = useRouter();

const getOperations = ({
  from,
  replace = false,
  to,
  updateSearchParams = true,
}: {
  from: string;
  replace?: boolean;
  to: string;
  updateSearchParams?: boolean;
}) => {
  operationListID.value = operationsStore.getOperations({
    from,
    replace,
    to,
    updateSearchParams,
  });
};

const operationListID = ref("");

let firstWatch = true;

watch(
  () => route.query,
  (locationQueryValue) => {
    let from;
    let to;

    if (Object.keys(locationQueryValue).length) {
      ({ from, to } = locationQueryValue);
    } else {
      [from, to] = operationsStore.datetimeRange;
    }

    if (
      !Array.isArray(from) &&
      from !== null &&
      !Array.isArray(to) &&
      to !== null
    ) {
      operationsStore.setDatetimeRange({ from, to });

      let replace = false;

      let updateSearchParams = false;

      if (firstWatch) {
        replace = true;

        updateSearchParams = true;

        firstWatch = false;
      }

      getOperations({ from, replace, to, updateSearchParams });
    }
  },
  { immediate: true },
);

const trackedPromiseOfOperations = computed(
  () =>
    (operationsStore.promises[operationListID.value] ||
      []) as TrackedPromiseOfOperations,
);

const operationsByDate = computed(() => {
  const promise = unref(trackedPromiseOfOperations);

  return Array.isArray(promise.value?.byDate) ? promise.value?.byDate : [];
});
</script>

<template>
  <div>
    <section class="header">
      <h1>
        Operations
        <button class="btn btn-success" @click="router.push('/operations/new')">
          New
        </button>
      </h1>

      <OperationsDatetimeRangeSelector
        :operations="trackedPromiseOfOperations"
        @search="getOperations"
      />

      <PromiseState
        :promise="trackedPromiseOfOperations"
        resource-name="operations"
      ></PromiseState>
    </section>

    <section>
      <div v-for="[date, operations] in operationsByDate" :key="date">
        <div class="date">
          {{ date }}
        </div>

        <div
          v-for="(operation, index) in operations"
          :key="operation.operationID"
        >
          <OperationListItem :operation="operation" />

          <hr
            v-if="index !== operations.length - 1"
            class="operations-separator"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 1rem;
  margin-inline: 1rem;
}

.header > h1 {
  display: flex;
  justify-content: space-between;
}

.date {
  align-items: center;
  background: hsla(0, 0%, 95%, 1);
  display: flex;
  font-size: 1.1rem;
  height: 2.25rem;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 1;
}

.operations-separator {
  border-top: 1px dotted hsla(0, 0%, 95%, 1);
  margin-block: 0;
}
</style>
