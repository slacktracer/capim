<script lang="ts" setup>
import { useTagsStore } from "../stores/modules/tags/use-tags-store.js";

const tagsStore = useTagsStore();

const { tags } = tagsStore;
</script>

<template>
  <div>
    <h1>Tags</h1>

    <div v-if="tags.loading">Loading tags...</div>

    <div v-if="tags.error">{{ tags.error.message }}</div>

    <div v-if="tags.retrievedAt">
      {{ tags.retrievedAt.toISOString() }}
    </div>

    <pre v-if="tags.ready">{{ tags.data }}</pre>
  </div>
</template>
