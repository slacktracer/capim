<template>
  <aside>
    <button
      class="btn btn-light btn-sm mb-3"
      data-bs-target="#debug"
      data-bs-toggle="collapse"
      type="button"
    >
      Debug
    </button>
    <div id="debug" class="collapse">
      <pre><slot></slot></pre>
    </div>
  </aside>
</template>

<script setup lang="ts"></script>
<style scoped>
aside {
  margin-inline: 1rem;
}

pre {
  font-size: 0.75rem;
}
</style>
