import { endOfDay } from "date-fns";

export const toEndOfDayISOString = ({
  yearMonthDay,
}: {
  yearMonthDay: string;
}) => endOfDay(new Date(`${yearMonthDay} 00:00:00`)).toISOString();
