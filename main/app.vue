<script lang="ts" setup>
import { useRuntimeConfig } from "#imports"; // eslint-disable-line import/order

import * as main from "./core/main.js";
import { useStore } from "./stores/main-store.js";

const runtimeConfig = useRuntimeConfig();

main.loadEnvironmentVariables({ runtimeConfig });

await useStore().boot();
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
