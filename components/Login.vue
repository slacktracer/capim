<script lang="ts" setup>
const config = useRuntimeConfig();

const password = ref("");
const username = ref("");

const login = async () => {
  const response = await $fetch("/authentication/login", {
    baseURL: config.public.baseURL,
    body: {
      password: password.value,
      username: username.value,
    },
    method: "POST",
  });

  localStorage.setItem("email", response.email);

  navigateTo("/");
};
</script>

<template>
  <div class="login-form-container">
    <form class="border login-form shadow" @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label"> Username </label>

        <input
          aria-describedby="emailHelp"
          class="form-control"
          id="username"
          type="text"
          v-model="username"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label"> Password </label>

        <input
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
