<script lang="ts" setup>
import { useOperationsStore } from "../stores/use-operations-store.js";

const operationsStore = useOperationsStore();

operationsStore.getOperations();
</script>

<template>
  <div>
    <h1>Operations</h1>

    <pre>{{ operationsStore.operations.data }}</pre>
  </div>
</template>
