<script lang="ts" setup>
import { useRoute } from "#app";

import { useOperationsStore } from "../../modules/operations/use-operations-store.js";

const route = useRoute();

const operationsStore = useOperationsStore();

if (typeof route.params.id === "string") {
  operationsStore.getOperation({ operationID: route.params.id });
}
</script>

<template>
  <div class="full-operation">
    <pre>{{ operationsStore.operation }}</pre>
  </div>
</template>

<style scoped>
.full-operation {
  padding-inline: 1rem;
}
</style>
