<script lang="ts" setup>
import { ref, unref, watch } from "vue";

import type { Operation } from "../../core/types/Operation";
import type { TrackedPromise } from "../../core/types/TrackedPromise";

const emit = defineEmits<{ search: [{ from: string; to: string }] }>();

const props = defineProps<{
  from: string;
  operations: TrackedPromise<{ from: string; to: string }, Operation[]>;
  to: string;
}>();

const from = ref(props.from);

const to = ref(props.to);

watch(
  () => props.from,
  (newValue) => (from.value = newValue),
);

watch(
  () => props.to,
  (newValue) => (to.value = newValue),
);

const search = () => {
  emit("search", {
    from: unref(from) || "",
    to: unref(to) || "",
  });
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

          <input v-model="from" class="form-control" name="from" type="date" />
        </div>

        <div>
          To
          <br />

          <input v-model="to" class="form-control" name="to" type="date" />
        </div>
      </div>

      <div>
        <button class="btn btn-primary" type="submit">Search</button>
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
