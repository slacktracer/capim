<script lang="ts" setup>
import { useRouter } from "vue-router";

const props = defineProps<{
  date: string;
}>();

const router = useRouter();

const addOperation = () => {
  router.push(`/operations/new?date=${props.date}`);
};
</script>

<template>
  <button class="add-operation-to-date-button" @click="addOperation">
    <svg class="bi" fill="currentColor" height="24" width="24">
      <use xlink:href="bootstrap-icons/bootstrap-icons.svg#plus-lg" />
    </svg>
  </button>
</template>

<style scoped>
.add-operation-to-date-button {
  all: unset;
  color: var(--cs-success-color);
  cursor: pointer;
  display: inline-flex;
}

.add-operation-to-date-button:focus-visible {
  color: var(--cs-success-hover-color);
  outline: 1px solid var(--cs-success-hover-color);
  outline-offset: 2px;
}

.add-operation-to-date-button:hover {
  color: var(--cs-success-hover-color);
}
</style>
