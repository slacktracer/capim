<script lang="ts" setup>
import { useStore } from "~/stores/main-store.js";

const store = useStore();
</script>

<template>
  <div>
    <h1>Accounts</h1>

    <pre>{{ store.state.accounts }}</pre>
  </div>
</template>
