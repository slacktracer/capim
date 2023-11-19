<script lang="ts" setup>
import type { DatetimeRangeRecord } from "../../core/types/DatetimeRangeRecord.js";
import { useOperationsStore } from "../../modules/operations/use-operations-store.js";
import SearchButton from "./SearchButton.vue";

const operationsStore = useOperationsStore();

const search = (event: SubmitEvent) => {
  operationsStore.getOperations({
    from: operationsStore.datetimeRange[0],
    invalidate: (event.submitter as HTMLInputElement)?.value === "invalidate",
    to: operationsStore.datetimeRange[1],
  });
};

const updateDatetimeRange = (event: Event) => {
  if (event.target) {
    const { name: key, value } = event.target as HTMLInputElement;

    operationsStore.setDatetimeRange({
      [key]: value,
    } as DatetimeRangeRecord);
  }
};
</script>

<template>
  <form
    class="operations-datetime-range-selector"
    @submit.prevent="search($event as SubmitEvent)"
  >
    <fieldset
      class="operations-datetime-range-selector-fieldset"
      :disabled="operationsStore.operations.loading"
    >
      <div class="datetime-selectors">
        <div>
          From
          <br />

          <input
            class="form-control"
            name="from"
            type="date"
            :value="operationsStore.datetimeRange[0]"
            @input="updateDatetimeRange"
          />
        </div>

        <div>
          To
          <br />

          <input
            class="form-control"
            name="to"
            type="date"
            :value="operationsStore.datetimeRange[1]"
            @input="updateDatetimeRange"
          />
        </div>
      </div>

      <div>
        <SearchButton :loading="operationsStore.operations.loading">
        </SearchButton>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
.operations-datetime-range-selector {
  padding-block: 1rem;
}

.operations-datetime-range-selector-fieldset {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.datetime-selectors {
  display: flex;
  gap: 1rem;
}
</style>
