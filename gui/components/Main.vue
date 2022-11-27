<script lang="ts" setup>
import { useStore } from "~/store/use-store.js";

const store = useStore();

const getAccounts = async () => {
  await store.getAccounts();
};
</script>

<template>
  <div>
    <h1>Capim</h1>
  </div>
</template>
