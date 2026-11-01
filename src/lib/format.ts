/** "2023-04" -> "2023". Dates stay strings so rendering never reads the clock. */
export function formatYear(value: string) {
  return value.slice(0, 4);
}

/** "2023-04", undefined -> "2023 — Present". */
export function formatPeriod(start: string, end?: string) {
  return `${formatYear(start)} — ${end ? formatYear(end) : "Present"}`;
}
