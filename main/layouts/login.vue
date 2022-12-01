<template>
  <div class="container">
    <div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.container > div {
  align-content: center;
  display: grid;
  height: 100vh;
}
</style>
