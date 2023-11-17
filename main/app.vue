<script lang="ts" setup>
import "bootstrap/dist/js/bootstrap.esm.js";

import { useRuntimeConfig } from "#imports"; // eslint-disable-line import/order

import { core } from "./core/core.js";
import { logout } from "./modules/authentication/logout.js";
import { boot } from "./modules/boot/boot.js";

const runtimeConfig = useRuntimeConfig();

core.loadEnvironmentVariables({ runtimeConfig });

core.mainEventBus.on("logout", logout);

await boot();
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
