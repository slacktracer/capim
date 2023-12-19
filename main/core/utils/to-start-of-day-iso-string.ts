import { startOfDay } from "date-fns";

export const toStartOfDayISOString = ({
  yearMonthDay,
}: {
  yearMonthDay: string;
}) => startOfDay(new Date(`${yearMonthDay} 00:00:00`)).toISOString();
