<script lang="ts" setup>
import { computed, ref } from "vue";

import { core } from "../../core/core.js";
import { formatAsLocalisedCurrency } from "../../modules/common/utils/format-as-localised-currency.js";

const emit = defineEmits<{ change: [newValue: number] }>();

const props = defineProps<{
  amount: number | undefined;
}>();

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

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;

  forceComputation.value += 1;

  formattedAmount.value = value;
};
</script>

<template>
  <input
    autocomplete="off"
    inputmode="numeric"
    name="amountPerUnit"
    required
    type="text"
    :value="formattedAmount"
    @focus="core.selectInputContent"
    @input="onInput"
  />
</template>
