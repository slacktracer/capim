<script lang="ts" setup>
import { onMounted, ref } from "vue";

import { navigateTo } from "#app";

import { core } from "../core/core.js";
import { login } from "../modules/authentication/login.js";

const password = ref("???");
const username = ref("thiago");

onMounted(() => {
  core.isUserLoggedIn() && navigateTo("/");
});
</script>

<template>
  <div class="login-form-container">
    <form
      class="border login-form shadow"
      @submit.prevent="login({ password, username })"
    >
      <div class="mb-3">
        <label class="form-label" for="username"> Username </label>

        <input
          id="username"
          v-model="username"
          autocomplete="username"
          class="form-control"
          type="text"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="password"> Password </label>

        <input
          id="password"
          v-model="password"
          autocomplete="current-password"
          class="form-control"
          type="password"
        />
      </div>

      <button class="btn btn-outline-dark" type="submit">Submit</button>
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
