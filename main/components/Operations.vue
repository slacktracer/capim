<script lang="ts" setup>
import { useStore } from "~/store/use-store.js";

const store = useStore();

store.getOperations();
</script>

<template>
  <div>
    <h1>Operations</h1>

    <pre>{{ store.state.operations }}</pre>
  </div>
</template>
