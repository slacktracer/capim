<script lang="ts" setup>
import { computed, ref, unref, watch } from "vue";
import { useRoute } from "vue-router";

import { setSearchParams } from "../../../modules/common/utils/set-search-params.js";
import { useOperationsStore } from "../../../modules/operations/use-operations-store.js";
import type { TrackedPromiseOfOperations } from "../../../types/TrackedPromiseOfOperations.js";
import PromiseState from "../../common/PromiseState.vue";
import OperationListItem from "../OperationListItem.vue";
import OperationsDatetimeRangeSelector from "../OperationsDatetimeRangeSelector.vue";
import { getFromAndTo } from "./get-from-and-to.js";
import { handleSearchParamsChange } from "./handle-search-params-change.js";
import { search } from "./search.js";

const operationsStore = useOperationsStore();

const route = useRoute();

const from = ref("");

const to = ref("");

const operationListID = ref("");

const trackedPromiseOfOperations = computed(
  () =>
    (operationsStore.promises[operationListID.value] ||
      []) as TrackedPromiseOfOperations,
);

const operationsByDate = computed(() => {
  const promise = unref(trackedPromiseOfOperations);

  return Array.isArray(promise.value?.byDate) ? promise.value.byDate : [];
});

setSearchParams({
  data: getFromAndTo(route.query),
  replace: true,
});

({
  from: from.value,
  operationListID: operationListID.value,
  to: to.value,
} = handleSearchParamsChange(route.query));

let watchSearchParams = false;

const unwatchIsSettled = watch(
  () => unref(trackedPromiseOfOperations).isSettled,
  (isSettled) => {
    if (isSettled && !watchSearchParams) {
      watchSearchParams = true;
    }
  },
  { immediate: true },
);

watch(
  () => route.query,
  (locationQuery) => {
    if (watchSearchParams) {
      unwatchIsSettled();

      ({
        from: from.value,
        operationListID: operationListID.value,
        to: to.value,
      } = handleSearchParamsChange(locationQuery));
    }
  },
);

const onSearch = ({ from, to }: { from: string; to: string }) => {
  const searchID = search({ from, to });

  if (searchID) {
    operationListID.value = searchID;
  }
};
</script>

<template>
  <div>
    <section class="header">
      <h1>
        Operations
        <button
          class="btn btn-success"
          @click="$router.push('/operations/new')"
        >
          New
        </button>
      </h1>

      <OperationsDatetimeRangeSelector
        :from="from"
        :operations="trackedPromiseOfOperations"
        :to="to"
        @search="onSearch"
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
