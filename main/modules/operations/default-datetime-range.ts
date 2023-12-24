import { lightFormat, startOfMonth } from "date-fns/fp";

export const defaultDatetimeRange = {
  from: lightFormat("yyyy-MM-dd", startOfMonth(new Date())),
  to: "",
};
