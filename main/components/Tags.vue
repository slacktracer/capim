<script lang="ts" setup>
import { useTagsStore} from "../stores/use-tags-store.js";

const tagsStore = useTagsStore();
</script>

<template>
  <div>
    <h1>Tags</h1>

    <pre>{{ tagsStore.tags.data }}</pre>
  </div>
</template>
