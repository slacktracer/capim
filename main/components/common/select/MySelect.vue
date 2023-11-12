<script lang="ts" setup>
import type { Ref } from "vue";
import { ref } from "vue";

import { keydownEventHandler } from "./keydown-event-handler.js";
import { toggle } from "./toggle.js";

const props = defineProps<{ options: Record<string, any>[] }>();

const selectedOption: Ref<Record<string, any> | null> = ref(null);

const showOptions = ref(false);

const escapeKeydownEventHandler = (event: KeyboardEvent) => {
  if (event.target && event.code === "Escape") {
    event.preventDefault();
    event.stopPropagation();

    const toggle = document.querySelector(".toggle") as HTMLElement;

    if (toggle) {
      toggle.click();
      toggle.focus();
    }
  }
};

const submit = () => {
  toggle({ showOptions });
};
</script>

<template>
  <div>
    <form @submit.prevent="submit">
      <button class="form-select toggle" type="submit">
        {{ selectedOption?.name ?? "Select category" }}
      </button>
    </form>

    <div
      v-if="showOptions"
      class="border rounded select"
      @keydown="escapeKeydownEventHandler"
    >
      <div>Search</div>

      <ul class="options">
        <li
          v-for="option in props.options"
          :id="`list-item-${option.categoryID}`"
          :key="option.categoryID"
          role="option"
        >
          <label
            class="option"
            :for="`option-${option.categoryID}`"
            tabindex="0"
            @keydown="keydownEventHandler"
          >
            <input
              :id="`option-${option.categoryID}`"
              v-model="selectedOption"
              class="option-input"
              name="options"
              type="radio"
              :value="option"
            />

            <span class="option-content">
              <b>{{ option.name }}</b>

              <span class="small">{{ option.group.name }}</span>
            </span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.toggle {
  text-align: left;
  width: 100%;
}

.select {
  background: white;
  overflow-y: hidden;
}

.options {
  list-style: none;
  max-height: 12rem;
  overflow-y: scroll;
  padding-inline-start: 0;
}

.options li {
  margin-block-end: 0.5rem;
}

.option {
  align-items: center;
  display: flex;
  outline: none;
  padding-inline: 1rem;
  width: 100%;
}

.option:focus,
.option:focus-within {
  background: hsla(303, 100%, 50%, 0.5);
}

.option-input {
  height: 0;
  width: 0;
}

.option-content {
  display: flex;
  flex-direction: column;
}
</style>
