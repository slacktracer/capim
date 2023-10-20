<script lang="ts" setup>
import { computed } from "vue";

import { useRoute } from "#app";

import { useOperationsStore } from "../../modules/operations/use-operations-store.js";

const route = useRoute();

const operationsStore = useOperationsStore();

// the below arguments are just placeholders to please the Nuxi Checker for now
operationsStore.getOperations({ from: "1", to: "2" });

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
