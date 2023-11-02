<script lang="ts" setup>
import { computed } from "vue";

import { formatAsLocalisedCurrency } from "../modules/common/utils/format-as-localised-currency.js";

const emit = defineEmits<{ change: [newValue: number] }>();

const props = defineProps<{
  amount: number;
}>();

const notADigit = /\D/g;

const formattedAmount = computed({
  get() {
    const formattedAmountAsString = String(props.amount).replace(notADigit, "");

    const formattedAmountAsNumber = Number(formattedAmountAsString) / 100;

    return formatAsLocalisedCurrency({
      // Now I will have to, probably, add `currency` to accounts and operations
      // and maybe locale should go in the user... Or the account?
      // But can probably be the last thing I do. (I say that a lot though.)
      currency: "BRL",
      locales: "pt-BR",
      number: formattedAmountAsNumber,
    });
  },

  set(newValue) {
    emit("change", Number(newValue.replace(notADigit, "")));
  },
});
</script>

<template>
  <input
    autocomplete="off"
    inputmode="numeric"
    type="text"
    :value="formattedAmount"
    @focus="(event) => (event.target as HTMLInputElement).select()"
    @input="
      (event) => (formattedAmount = (event.target as HTMLInputElement).value)
    "
  />
</template>
