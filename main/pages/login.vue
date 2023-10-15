<script lang="ts" setup>
import { definePageMeta } from "#imports";

import Login from "../components/Login.vue"; // eslint-disable-line import/order

definePageMeta({
  layout: "login",
});
</script>

<template>
  <div>
    <Login />
  </div>
</template>
