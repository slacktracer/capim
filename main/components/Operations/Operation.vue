<script lang="ts" setup>
import { computed } from "vue";

import { useRoute } from "#app";

import { useOperationsStore } from "../../modules/operations/use-operations-store.js"; // eslint-disable-line import/order

const route = useRoute();

const operationsStore = useOperationsStore();

operationsStore.getOperations();

const operation = computed(() =>
  operationsStore.operations.data.find(
    (operation) => operation.operationID === route.params.id,
  ),
);
</script>

<template>
  <div class="full-operation">
    <pre>{{ operation }}</pre>
  </div>
</template>

<style scoped>
.full-operation {
  padding-inline: 1rem;
}
</style>
