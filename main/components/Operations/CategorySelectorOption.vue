<script lang="ts" setup>
const props = defineProps<{
  option: { group: { name: string }; name: string };
}>();
</script>

<template>
  <div>
    <div class="category-name">{{ props.option.name }}</div>
    <div class="category-group-name">{{ props.option.group.name }}</div>
  </div>
</template>

<style scoped>
.category-name {
  font-weight: bold;
}

.category-group-name {
  font-size: 0.75rem;
}
</style>
