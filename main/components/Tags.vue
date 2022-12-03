<script lang="ts" setup>
import { useStore } from "~/stores/main-store.js";

const store = useStore();
</script>

<template>
  <div>
    <h1>Tags</h1>

    <pre>{{ store.state.tags }}</pre>
  </div>
</template>
