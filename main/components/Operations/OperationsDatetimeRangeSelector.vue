<script lang="ts" setup>
import type { DatetimeRangeInput } from "../../core/types/DatetimeRangeInput.js";
import { useOperationsStore } from "../../modules/operations/use-operations-store.js";

const operationsStore = useOperationsStore();

const submit = () => {
  operationsStore.getOperations({
    from: operationsStore.datetimeRange[0],
    to: operationsStore.datetimeRange[1],
  });
};

const updateDatetimeRange = (event: Event) => {
  if (event.target) {
    const { name: key, value } = event.target as HTMLInputElement;

    operationsStore.setDatetimeRange({ [key]: value } as DatetimeRangeInput);
  }
};
</script>

<template>
  <form class="operations-datetime-range-selector" @submit.prevent="submit()">
    <div class="datetime-selectors">
      <div>
        From:
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
        To:
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

    <div><button class="btn btn-primary" type="submit">Search</button></div>
  </form>
</template>

<style scoped>
.operations-datetime-range-selector {
  align-items: end;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-block: 1rem;
}

.datetime-selectors {
  display: flex;
  gap: 1rem;
}
</style>
