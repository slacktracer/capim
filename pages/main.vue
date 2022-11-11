<script lang="ts" setup>
definePageMeta({
  alias: "/",
});

const email = localStorage.getItem("email");
</script>

<template>
  <div>You're in {{ email }}</div>
</template>
