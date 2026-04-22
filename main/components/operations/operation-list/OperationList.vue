<script lang="ts" setup>
import { computed, ref, unref, watch } from "vue";
import type { LocationQuery } from "vue-router";
import { useRoute } from "vue-router";

import { useAccountsStore } from "../../../modules/accounts/use-accounts-store.js";
import { useCategoriesStore } from "../../../modules/categories/use-categories-store.js";
import { setSearchParams } from "../../../modules/common/utils/set-search-params.js";
import { defaultDatetimeRange } from "../../../modules/operations/default-datetime-range.js";
import { useOperationsStore } from "../../../modules/operations/use-operations-store.js";
import type { TrackedPromiseOfOperations } from "../../../types/TrackedPromiseOfOperations.js";
import PromiseState from "../../common/PromiseState.vue";
import AddOperationToDate from "../AddOperationToDate.vue";
import OperationListItem from "../OperationListItem.vue";
import OperationsDatetimeRangeSelector from "../OperationsDatetimeRangeSelector.vue";
import { getFromAndTo } from "./get-from-and-to.js";
import { getOperations } from "./get-operations.js";
import { search } from "./search.js";

const accountsStore = useAccountsStore();

const categoriesStore = useCategoriesStore();

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

const defaults: { from?: string; to?: string } = {};

if (!route.query.from) {
  defaults.from = defaultDatetimeRange.from;
}

if (!route.query.to) {
  defaults.to = defaultDatetimeRange.to;
}

const needsDefaults = defaults.from || defaults.to;

if (needsDefaults) {
  setSearchParams({
    data: defaults,
    replace: true,
  });
}

watch(
  () => route.query,
  (searchParams: LocationQuery) => {
    const fromAndTo = getFromAndTo(searchParams);

    ({ from: from.value, to: to.value } = fromAndTo);

    operationListID.value = getOperations({ ...fromAndTo });
  },
  { immediate: !needsDefaults },
);

const onSearch = ({ from, to }: { from: string; to: string }) => {
  const searchID = search({ from, to });

  if (searchID) {
    operationListID.value = searchID;
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

const selectedAccountName = ref("");

const selectedCategoryName = ref("");

// @ts-expect-error
const filterOperationsByDateByAccount = (operationsByDate) =>
  // @ts-expect-error
  operationsByDate.map(([date, operations]) => {
    // @ts-expect-error
    const filtered = operations.filter((operation) => {
      if (
        selectedAccountName.value &&
        operation.account.name !== selectedAccountName.value
      ) {
        return false;
      }

      if (
        selectedCategoryName.value &&
        operation.category.name !== selectedCategoryName.value
      ) {
        return false;
      }

      return true;
    });
    return [date, filtered];
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

const dateTimeRangeBalance = computed(() =>
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
    <div
      style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem"
    >
      <select v-model="selectedAccountName">
        <option value="">None</option>
        <option
          v-for="account in accountsStore.accounts.data"
          :key="account.accountID"
          :value="account.name"
        >
          {{ account.name }}
        </option>
      </select>

      <select v-model="selectedCategoryName">
        <option value="">None</option>
        <option
          v-for="category in categoriesStore.categories.data"
          :key="category.categoryID"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </select>
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
        <div class="day-header">
          <div class="date">
            {{ date }}
          </div>

          <AddOperationToDate :date="date" />
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

.day-header {
  align-items: center;
  background: hsla(0, 0%, 95%, 1);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  height: 2.25rem;
  padding-inline: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
}

.day-header .date {
  font-size: 1.1rem;
  grid-column: 2;
}

.day-header > :last-child {
  grid-column: 3;
  justify-self: end;
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
