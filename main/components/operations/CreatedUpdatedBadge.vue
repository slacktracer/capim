<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{ createdAt: string; updatedAt: string | null }>();

const justCreated = computed(() => {
  const diff = Date.now() - new Date(props.createdAt).getTime();

  return diff < 1000 * 60 * 5;
});

const justUpdated = computed(() => {
  if (props.updatedAt !== null) {
    const diff = Date.now() - new Date(props.updatedAt).getTime();

    return diff < 1000 * 60 * 5;
  }

  return false;
});
</script>

<template>
  <span class="badge-container">
    <span
      v-if="justCreated && !justUpdated"
      class="badge rounded-pill text-bg-success"
    >
      <span class="badge-content">Created</span>
    </span>
  </span>

  <span class="badge-container">
    <span v-if="justUpdated" class="badge rounded-pill text-bg-success">
      <span class="badge-content">Updated</span>
    </span>
  </span>
</template>

<style scoped>
.badge-container {
  animation: fadeIn 0.5s;
  opacity: 0.75;
}

.badge-content {
  text-transform: uppercase;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.75;
  }
}
</style>
