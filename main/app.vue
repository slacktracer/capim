<script lang="ts" setup>
import "bootstrap/dist/js/bootstrap.esm.js";

import { useRuntimeConfig } from "#imports"; // eslint-disable-line import/order

import * as main from "./core/main.js";
import { logout } from "./modules/authentication/logout.js";
import { boot } from "./modules/boot/boot.js";

const runtimeConfig = useRuntimeConfig();

main.loadEnvironmentVariables({ runtimeConfig });

main.mainEventBus.on("logout", logout);

await boot();
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
