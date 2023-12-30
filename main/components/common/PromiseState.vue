<script lang="ts" setup>
import { computed } from "vue";

import { useLiveDistanceToNow } from "../../composables/use-live-distance-to-now";
import { core } from "../../core/core.js";
import type { TrackedPromise } from "../../core/types/TrackedPromise";

const emit = defineEmits<{ refresh: [] }>();

const props = defineProps<{
  promise: TrackedPromise<any, unknown>;
  resourceNamePlural: string;
  resourceNameSingular: string;
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

const resourceCount = computed(() =>
  Array.isArray(props.promise.value) ? props.promise.value.length : 1,
);

const refresh = () => {
  emit("refresh");
};
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
      Creating {{ props.resourceNameSingular }}...
    </div>

    <div v-if="props.promise.isPending && isReading">
      Retrieving {{ props.resourceNamePlural }}...
    </div>

    <div v-if="props.promise.isPending && isUpdating">
      Updating {{ props.resourceNameSingular }}...
    </div>

    <div v-if="props.promise.isFulfilled">
      <span v-if="resourceCount !== undefined && resourceCount > -1">
        {{ resourceCount }}
        {{
          resourceCount > 1
            ? props.resourceNamePlural
            : props.resourceNameSingular
        }}
      </span>

      <span v-if="isCreating"> created</span>

      <span v-if="isReading"> retrieved</span>

      <span v-if="isUpdating"> updated</span>

      {{ liveDistanceToNow }} ago &mdash;
      <a href="#" @click.prevent="refresh">Refresh</a>
    </div>
  </div>
</template>
