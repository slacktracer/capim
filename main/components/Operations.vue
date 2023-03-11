<script lang="ts" setup>
import { useOperationsStore } from "../modules/operations/use-operations-store.js";

const operationsStore = useOperationsStore();

operationsStore.getOperations();
</script>

<template>
  <div>
    <h1>Operations</h1>

    <div v-if="operationsStore.operations.loading">Loading operations...</div>

    <div v-if="operationsStore.operations.error">
      {{ operationsStore.operations.error.message }}
    </div>

    <div v-if="operationsStore.operations.retrievedAt">
      {{ operationsStore.operations.retrievedAt.toISOString() }}
    </div>

    <pre v-if="operationsStore.operations.ready">{{
      operationsStore.operations.data
    }}</pre>
  </div>
</template>
