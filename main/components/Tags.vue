<script lang="ts" setup>
import { useStore } from "~/store/use-store.js";

const store = useStore();

store.getTags();
</script>

<template>
  <div>
    <h1>Tags</h1>

    <pre>{{ store.state.tags }}</pre>
  </div>
</template>
