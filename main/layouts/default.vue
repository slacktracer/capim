<script lang="ts" setup>
import Header from "../components/Header.vue";
</script>

<template>
  <div>
    <Header />
    <div>
      <slot />
    </div>
  </div>
</template>
