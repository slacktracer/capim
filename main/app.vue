<script lang="ts" setup>
import { useRuntimeConfig } from "#imports"; // eslint-disable-line import/order

import * as main from "./core/main.js";
import { useBootStore } from "./stores/use-boot-store.js";

const runtimeConfig = useRuntimeConfig();

main.loadEnvironmentVariables({ runtimeConfig });

await useBootStore().boot();
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
