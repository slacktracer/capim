<script lang="ts" setup>
import { navigateTo, ref } from "#imports";

import { useStore } from "../stores/main-store.js";

const store = useStore();

const password = ref("???");
const username = ref("thiago");

const login = async () => {
  await store.login({ password, username });

  navigateTo("/");
};
</script>

<template>
  <div class="login-form-container">
    <form class="border login-form shadow" @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label"> Username </label>

        <input
          autocomplete="username"
          class="form-control"
          id="username"
          type="text"
          v-model="username"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label"> Password </label>

        <input
          autocomplete="current-password"
          class="form-control"
          id="password"
          type="password"
          v-model="password"
        />
      </div>

      <button type="submit" class="btn btn-outline-dark">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.login-form-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.login-form {
  flex: 0 1 25rem;
  padding: 1rem;
}
</style>
