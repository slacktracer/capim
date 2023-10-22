<script lang="ts" setup>
import { useTagsStore } from "../modules/tags/use-tags-store.js";

const tagsStore = useTagsStore();
</script>

<template>
  <div class="header">
    <h1>Tags</h1>

    <div v-if="tagsStore.tags.loading">Loading tags...</div>

    <div v-if="tagsStore.tags.error">{{ tagsStore.tags.error.message }}</div>

    <div v-if="tagsStore.tags.retrievedAt">
      {{ tagsStore.tags.retrievedAt.toISOString() }}
    </div>

    <pre v-if="tagsStore.tags.ready">{{ tagsStore.tags.data }}</pre>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 1rem;
  margin-inline: 1rem;
}
</style>
