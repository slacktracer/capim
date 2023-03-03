<script lang="ts" setup>
import { useOperationsStore } from "../stores/modules/operations/use-operations-store.js";

const operationsStore = useOperationsStore();

operationsStore.getOperations();

const { operations } = operationsStore.state;
</script>

<template>
  <div>
    <h1>Operations</h1>

    <div v-if="operations.loading">Loading operations...</div>

    <div v-if="operations.error">{{ operations.error.message }}</div>

    <div v-if="operations.retrievedAt">
      {{ operations.retrievedAt.toISOString() }}
    </div>

    <pre v-if="operations.ready">{{ operations.data }}</pre>
  </div>
</template>
