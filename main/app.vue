<script lang="ts" setup>
import { useRuntimeConfig } from "#imports"; // eslint-disable-line import/order

import * as main from "./core/main.js";
import { useStore } from "./stores/main-store.js";

const runtimeConfig = useRuntimeConfig();

const store = useStore();

const initialState = await main.boot({ runtimeConfig });

Object.assign(store.state, initialState);
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
