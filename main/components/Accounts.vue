<script lang="ts" setup>
import { useStore } from "~/store/use-store.js";

const store = useStore();

store.getAccounts();
</script>

<template>
  <div>
    <h1>Accounts</h1>

    <pre>{{ store.state.accounts }}</pre>
  </div>
</template>
