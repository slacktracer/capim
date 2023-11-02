<script lang="ts" setup>
import { computed, ref } from "vue";

import { formatAsLocalisedCurrency } from "../../modules/common/utils/format-as-localised-currency.js";

const emit = defineEmits<{ change: [newValue: number] }>();

const props = defineProps<{
  amount: number;
}>();

const edgeCases = /^(0?\D\d{1,2}|\d{1,3}|\D)$/;

const forceComputation = ref(0);

const notADigit = /\D/g;

const formattedAmount = computed({
  get() {
    //  I NEED this, OK? =P
    // eslint-disable-next-line no-unused-expressions
    forceComputation.value;

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

const onFocus = (event: Event) => (event.target as HTMLInputElement).select();

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;

  if (value.match(edgeCases)) {
    forceComputation.value += 1;
  }

  formattedAmount.value = value;
};
</script>

<template>
  <input
    autocomplete="off"
    inputmode="numeric"
    type="text"
    :value="formattedAmount"
    @focus="onFocus"
    @input="onInput"
  />
</template>
