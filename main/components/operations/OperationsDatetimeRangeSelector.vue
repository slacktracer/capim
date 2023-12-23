<script lang="ts" setup>
import type { DatetimeRangeRecord } from "../../core/types/DatetimeRangeRecord.js";
import type { Operation } from "../../core/types/Operation";
import type { TrackedPromise } from "../../core/types/TrackedPromise";
import { useOperationsStore } from "../../modules/operations/use-operations-store.js";
import SearchButton from "./SearchButton.vue";

const emit = defineEmits<{ search: [{ from: string; to: string }] }>();

const props = defineProps<{
  operations: TrackedPromise<{ from: string; to: string }, Operation[]>;
}>();

const operationsStore = useOperationsStore();

const search = () => {
  emit("search", {
    from: operationsStore.datetimeRange[0],
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
  <form class="operations-datetime-range-selector" @submit.prevent="search()">
    <fieldset
      class="operations-datetime-range-selector-fieldset"
      :disabled="props.operations?.isPending"
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
        <SearchButton :loading="props.operations?.isPending" />
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
