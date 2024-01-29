import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ru } from "date-fns/locale/ru";
import { parseISO } from "date-fns/parseISO";

export default function formatDateDistanceToNow(dateTimeStr: string): string {
  const dateTime = parseISO(dateTimeStr);

  return formatDistanceToNow(dateTime, { addSuffix: true, locale: ru });
}