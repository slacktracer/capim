<script lang="ts" setup>
import { useStore } from "~/store/use-store.js";

const store = useStore();

store.getBalances();
</script>

<template>
  <div>
    <h1>Balances</h1>

    <pre>{{ store.state.balances }}</pre>
  </div>
</template>
