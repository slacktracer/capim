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
  cursor: pointer;
  display: inline-flex;
}

.add-operation-to-date-button:focus-visible {
  outline: 1px solid currentColor;
  outline-offset: 2px;
}

.add-operation-to-date-button svg {
  transition: rotate 0.3s ease;
}

.add-operation-to-date-button:is(:hover, :focus-visible) svg {
  rotate: 90deg;
}
</style>
