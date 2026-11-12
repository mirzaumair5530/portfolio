/** "2023-04" -> "2023". Dates stay strings so rendering never reads the clock. */
export function formatYear(value: string) {
  return value.slice(0, 4);
}

/** "2023-04", undefined -> "2023 — Present". */
export function formatPeriod(start: string, end?: string) {
  return `${formatYear(start)} — ${end ? formatYear(end) : "Present"}`;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2026-11-01" -> "Nov 1, 2026". Plain string work; no Date, no time zone. */
export function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}
