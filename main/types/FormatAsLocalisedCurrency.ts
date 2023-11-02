export type FormatAsLocalisedCurrency = (input: {
  currency: string;
  locales: string | string[];
  number: number;
}) => string;
