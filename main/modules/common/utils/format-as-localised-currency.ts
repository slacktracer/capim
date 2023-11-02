import type { FormatAsLocalisedCurrency } from "../../../types/FormatAsLocalisedCurrency.js";

export const formatAsLocalisedCurrency: FormatAsLocalisedCurrency = ({
  currency,
  locales,
  number,
}) =>
  Intl.NumberFormat(locales, {
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
