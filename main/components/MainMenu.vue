<script lang="ts" setup>
import { Offcanvas } from "bootstrap";
import { onMounted, ref } from "vue";

import { useCommonStore } from "../modules/common/use-common-store.js";

const commonStore = useCommonStore();

const offCanvasElement = ref<HTMLElement>();

let offCanvasInstance: Offcanvas;

onMounted(() => {
  if (offCanvasElement.value) {
    offCanvasInstance = Offcanvas.getOrCreateInstance(offCanvasElement.value);
  }
});

const closeOnPageSelected = () => {
  offCanvasInstance.hide();
};
</script>

<template>
  <div
    id="main-menu"
    ref="offCanvasElement"
    aria-labelledby="offcanvasLabel"
    class="offcanvas offcanvas-start"
    tabindex="-1"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasLabel" class="offcanvas-title">Capim</h5>

      <button
        aria-label="Close"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        type="button"
      ></button>
    </div>

    <div class="offcanvas-body">
      <div
        class="border-bottom border-top list-group list-group-flush menu-list"
        @click="closeOnPageSelected"
      >
        <NuxtLink class="list-group-item list-group-item-action" to="/accounts">
          Accounts
        </NuxtLink>

        <NuxtLink class="list-group-item list-group-item-action" to="/balances">
          Balances
        </NuxtLink>

        <NuxtLink
          class="list-group-item list-group-item-action"
          to="/categories"
        >
          Categories
        </NuxtLink>

        <NuxtLink
          class="list-group-item list-group-item-action"
          to="/operations"
        >
          Operations
        </NuxtLink>

        <NuxtLink class="list-group-item list-group-item-action" to="/tags">
          Tags
        </NuxtLink>

        <NuxtLink
          class="list-group-item list-group-item-action"
          to="/transfers"
        >
          Transfers
        </NuxtLink>
      </div>

      <div class="build-number fw-light">
        Build {{ commonStore.buildNumber }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-list {
  margin-inline: -1rem;
}

.build-number {
  bottom: 1rem;
  position: fixed;
}
</style>
