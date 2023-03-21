import { format } from "date-fns";

export function dateToString(date: Date | null): string {
  if (!date) { return "";}
  return format(date, "yyyy年M月d日 hh時mm分")
}