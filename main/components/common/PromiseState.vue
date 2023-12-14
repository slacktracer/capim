<script lang="ts" setup>
import { computed } from "vue";

import { useLiveDistanceToNow } from "../../composables/use-live-distance-to-now";
import { core } from "../../core/core.js";
import type { TrackedPromise } from "../../core/types/TrackedPromise";

const props = defineProps<{
  promise: TrackedPromise<unknown, unknown>;
  resourceName: string;
}>();

const liveDistanceToNow = computed(
  () =>
    useLiveDistanceToNow({
      object: props.promise,
      propertyName: "settledAt",
    }).value,
);

const isCreating = computed(
  () => props.promise.action === core.promiseAction.create,
);

const isReading = computed(
  () => props.promise.action === core.promiseAction.read,
);

const isUpdating = computed(
  () => props.promise.action === core.promiseAction.update,
);
</script>

<template>
  <div>
    <div
      v-if="
        props.promise.reason &&
        typeof props.promise.reason === 'object' &&
        'message' in props.promise.reason
      "
      class="alert alert-danger"
      role="alert"
    >
      {{ props.promise.reason.message }}
    </div>

    <div v-if="props.promise.isPending && isCreating">
      Creating {{ props.resourceName }}...
    </div>

    <div v-if="props.promise.isPending && isReading">
      Loading {{ props.resourceName }}...
    </div>

    <div v-if="props.promise.isPending && isUpdating">
      Updating {{ props.resourceName }}...
    </div>

    <div v-if="!props.promise.isPending && props.promise.isFulfilled">
      <span v-if="isCreating">Created</span>

      <span v-if="isReading">Retrieved</span>

      <span v-if="isUpdating">Updated</span>

      {{ liveDistanceToNow }} ago
    </div>
  </div>
</template>
