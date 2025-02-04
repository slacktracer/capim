<script lang="ts" setup>
import { computed, ref, unref, watch } from "vue";
import type { LocationQuery } from "vue-router";
import { useRoute } from "vue-router";

import { useOperationsStore } from "../../../modules/operations/use-operations-store.js";
import type { TrackedPromiseOfOperations } from "../../../types/TrackedPromiseOfOperations.js";
import PromiseState from "../../common/PromiseState.vue";
import OperationListItem from "../OperationListItem.vue";
import OperationsDatetimeRangeSelector from "../OperationsDatetimeRangeSelector.vue";
import { getFromAndTo } from "./get-from-and-to.js";
import { getOperations } from "./get-operations.js";
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

/*
const operationsByDate = computed(() => {
  const promise = unref(trackedPromiseOfOperations);

  return Array.isArray(promise.value?.byDate) ? promise.value?.byDate : [];
});
 */

watch(
  () => route.query,
  (searchParams: LocationQuery) => {
    const fromAndTo = getFromAndTo(searchParams);

    ({ from: from.value, to: to.value } = fromAndTo);

    operationListID.value = getOperations({ ...fromAndTo });
  },
  { immediate: true },
);

const onSearch = ({ from, to }: { from: string; to: string }) => {
  const searchID = search({ from, to });

  if (searchID) {
    operationListID.value = searchID;

    // I think I'm not using `setDateTimeRange`
    // Maybe we don't need it all
    // At least until I need to check the datetime range used in the last search
    // But we will I ever?
    // "Tomorrow we will know"
    // operationsStore.setDatetimeRange({ from, to });
  }
};

const onRefresh = () => {
  operationListID.value = getOperations({
    bypassLocalCache: true,
    from: from.value,
    to: to.value,
  });
};

/*
const dateTimeRangeBalance = computed(() => {
  const promise = unref(trackedPromiseOfOperations);

  return promise.value
    ?.map((operation) => operation.amount)
    .reduce((accumulator, amount) => accumulator + amount, 0);
});
 */

/* testing something */
const on = ref(false);
const accountName = ref("");

// @ts-expect-error
const filterOperationsByDateByAccount = (operationsByDate) =>
  // @ts-expect-error
  operationsByDate.map(([date, operations]) => {
    // @ts-expect-error
    const y = operations.filter((operation) =>
      on.value ? operation.account.name === accountName.value : true,
    );
    return [date, y];
  });

// @ts-expect-error
const flatMapOperationsByDate = (operationsByDate) =>
  // @ts-expect-error
  operationsByDate.flatMap?.(([_date, operations]) => operations);

const operationsByDate = computed(() => {
  const promise = unref(trackedPromiseOfOperations);

  if (Array.isArray(promise.value?.byDate)) {
    return filterOperationsByDateByAccount(promise.value?.byDate);
  }

  return [];
});

const dateTimeRangeBalance = computed(
  () =>
    flatMapOperationsByDate(operationsByDate?.value)
      // @ts-expect-error
      ?.map((operation) => operation.amount)
      // @ts-expect-error
      .reduce((accumulator, amount) => accumulator + amount, 0),
);
/* quick and dirty feature */
</script>

<template>
  <div>
    <div style="display: grid; place-items: center; gap: 1rem">
      <input v-model="accountName" type="text" />
      <input v-model="on" type="checkbox" />
    </div>

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
        resource-name-plural="operations"
        resource-name-singular="operation"
        @refresh="onRefresh"
      ></PromiseState>
    </section>

    <div class="dateTimeRangeBalance">
      💸 <b>{{ dateTimeRangeBalance ? dateTimeRangeBalance / 100 : "..." }}</b>
    </div>

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

.dateTimeRangeBalance {
  font-size: 1.2rem;
  margin: 0.5rem;
  text-align: right;
}
</style>
