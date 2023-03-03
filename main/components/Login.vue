<script lang="ts" setup>
import { ref } from "vue";

import { useAuthenticationStore } from "../stores/modules/authentication/use-authentication-store.js";

const authenticationStore = useAuthenticationStore();

const password = ref("???");
const username = ref("thiago");

const login = async () => {
  await authenticationStore.login({ password, username });
};
</script>

<template>
  <div class="login-form-container">
    <form class="border login-form shadow" @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label"> Username </label>

        <input
          id="username"
          v-model="username"
          autocomplete="username"
          class="form-control"
          type="text"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label"> Password </label>

        <input
          id="password"
          v-model="password"
          autocomplete="current-password"
          class="form-control"
          type="password"
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
