<script lang="ts" setup>
import { definePageMeta } from "#imports";

import Main from "../components/Main.vue"; // eslint-disable-line import/order

definePageMeta({
  alias: "/",
});
</script>

<template>
  <div>
    <Main />
  </div>
</template>
