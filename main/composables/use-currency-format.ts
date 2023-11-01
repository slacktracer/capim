import { computed } from "vue";

import type { UseCurrencyFormat } from "../types/UseCurrencyFormat.js";

const notADigit = /[^0-9]/;

export const useCurrencyFormat: UseCurrencyFormat = ({ object, property }) => {
  return computed({
    get() {
      const formattedAmountAsString = String(object[property]).replace(
        notADigit,
        "",
      );

      const formattedAmountAsNumber = Number(formattedAmountAsString) / 100;

      return formattedAmountAsNumber.toFixed(2);
    },

    set(newValue) {
      if (newValue === "0.0") {
        object[property] = "0.00";
      }

      object[property] = Number(newValue.replace(notADigit, ""));
    },
  });
};
