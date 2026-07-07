<script lang="ts" setup>
import { format } from "date-fns";
import { computed, ref, unref, watch } from "vue";
import type { LocationQuery } from "vue-router";
import { useRoute } from "vue-router";

import { core } from "../../../core/core.js";
import { useAccountsStore } from "../../../modules/accounts/use-accounts-store.js";
import { useCategoriesStore } from "../../../modules/categories/use-categories-store.js";
import { setSearchParams } from "../../../modules/common/utils/set-search-params.js";
import { defaultDatetimeRange } from "../../../modules/operations/default-datetime-range.js";
import { useOperationsStore } from "../../../modules/operations/use-operations-store.js";
import type { TrackedPromiseOfOperations } from "../../../types/TrackedPromiseOfOperations.js";
import MyMultiCombobox from "../../common/my-multi-combobox/MyMultiCombobox.vue";
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

if (route.query.from === undefined) {
  defaults.from = defaultDatetimeRange.from;
}

if (route.query.to === undefined) {
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

const userOptions = core.getUserOptions();

const toSelectedOptions = (names: string[]) =>
  names.map((name) => ({ label: name, value: name }));

const selectedAccounts = ref(
  toSelectedOptions(userOptions.options.operationList.filters.account),
);

const selectedCategories = ref(
  toSelectedOptions(userOptions.options.operationList.filters.category),
);

const selectedGroups = ref(
  toSelectedOptions(userOptions.options.operationList.filters.group),
);

const accountOptions = computed(() => [...accountsStore.accounts.data]);

const categoryOptions = computed(() => [...categoriesStore.categories.data]);

const groupOptions = computed(() => {
  const seenGroupNames = new Set<string>();

  return categoriesStore.categories.data
    .map((category) => category.group.name)
    .filter((groupName) => {
      if (seenGroupNames.has(groupName)) {
        return false;
      }

      seenGroupNames.add(groupName);

      return true;
    })
    .map((name) => ({ name }));
});

const filterByName = ({
  options,
  search: searchValue,
}: {
  options: Record<string, any>[];
  search: string;
}) =>
  options.filter((option) =>
    core.simplifyAndTestStringIncludesString(option.name, searchValue),
  );

const addOption = (
  selectedOptions: { label: string; value: string }[],
  option: { label: string; value: string },
) => {
  if (
    !selectedOptions.some(
      (selectedOption) => selectedOption.value === option.value,
    )
  ) {
    selectedOptions.push(option);
  }
};

const removeOption = (
  selectedOptions: { label: string; value: string }[],
  option: { label: string; value: string },
) => {
  const index = selectedOptions.findIndex(
    (selectedOption) => selectedOption.value === option.value,
  );

  if (index !== -1) {
    selectedOptions.splice(index, 1);
  }
};

watch(
  [selectedAccounts, selectedCategories, selectedGroups],
  () => {
    core.setUserOptions({
      options: {
        operationList: {
          filters: {
            account: selectedAccounts.value.map((option) => option.value),
            category: selectedCategories.value.map((option) => option.value),
            group: selectedGroups.value.map((option) => option.value),
          },
        },
      },
    });
  },
  { deep: true },
);

const onCopyOperationsJSON = () => {
  navigator.clipboard.writeText(
    JSON.stringify(trackedPromiseOfOperations.value.value, null, 2),
  );
};

// @ts-expect-error
const filterOperationsByDateByAccount = (operationsByDate) =>
  // @ts-expect-error
  operationsByDate.map(([date, operations]) => {
    // @ts-expect-error
    const filtered = operations.filter((operation) => {
      if (
        selectedAccounts.value.length &&
        !selectedAccounts.value.some(
          (option) => option.value === operation.account.name,
        )
      ) {
        return false;
      }

      if (
        selectedCategories.value.length &&
        !selectedCategories.value.some(
          (option) => option.value === operation.category.name,
        )
      ) {
        return false;
      }

      if (
        selectedGroups.value.length &&
        !selectedGroups.value.some(
          (option) => option.value === operation.category.group.name,
        )
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
      <MyMultiCombobox
        combobox-class="form-select"
        :current-selected-options="selectedAccounts"
        :filter="filterByName"
        label="name"
        listbox-class="border rounded"
        name="account"
        :options="accountOptions"
        placeholder="Any account"
        value="name"
        @option-add="addOption(selectedAccounts, $event)"
        @option-remove="removeOption(selectedAccounts, $event)"
      />

      <MyMultiCombobox
        combobox-class="form-select"
        :current-selected-options="selectedCategories"
        :filter="filterByName"
        label="name"
        listbox-class="border rounded"
        name="category"
        :options="categoryOptions"
        placeholder="Any category"
        value="name"
        @option-add="addOption(selectedCategories, $event)"
        @option-remove="removeOption(selectedCategories, $event)"
      />

      <MyMultiCombobox
        combobox-class="form-select"
        :current-selected-options="selectedGroups"
        :filter="filterByName"
        label="name"
        listbox-class="border rounded"
        name="group"
        :options="groupOptions"
        placeholder="Any group"
        value="name"
        @option-add="addOption(selectedGroups, $event)"
        @option-remove="removeOption(selectedGroups, $event)"
      />

      <button class="btn btn-outline-secondary" @click="onCopyOperationsJSON">
        Copy operations JSON
      </button>
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
          <div class="day-of-the-week">
            {{ format(new Date(date + "T00:00:00"), "EEE") }}
          </div>

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

.day-header .day-of-the-week {
  font-size: 0.9rem;
  text-transform: uppercase;
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
