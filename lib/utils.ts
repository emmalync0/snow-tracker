/**
 * Get the upcoming weekend date range (Friday through Sunday).
 * If today is already Sat/Sun, returns this weekend.
 */
export function getUpcomingWeekendRange(): { start: Date; end: Date } {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 6=Sat

  let daysUntilFriday: number;
  if (day === 0) {
    // Sunday — use today's weekend (go back to Friday)
    daysUntilFriday = -2;
  } else if (day === 6) {
    // Saturday — use today's weekend (go back to Friday)
    daysUntilFriday = -1;
  } else {
    // Mon-Fri — next Friday
    daysUntilFriday = 5 - day;
  }

  const friday = new Date(now);
  friday.setDate(now.getDate() + daysUntilFriday);
  friday.setHours(0, 0, 0, 0);

  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);
  sunday.setHours(23, 59, 59, 999);

  return { start: friday, end: sunday };
}

/**
 * Format a date string (YYYY-MM-DD) for display.
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Check if a date string falls on a weekend (Sat or Sun).
 */
export function isWeekend(dateStr: string): boolean {
  const date = new Date(dateStr + "T12:00:00");
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Get WMO weather code description.
 */
export function weatherCodeToDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm + hail",
    99: "Thunderstorm + heavy hail",
  };
  return descriptions[code] ?? "Unknown";
}

/**
 * Get a weather icon/emoji for a WMO weather code.
 */
export function weatherCodeToIcon(code: number): string {
  if (code === 0) return "\u2600\uFE0F"; // sun
  if (code <= 3) return "\u26C5"; // partly cloudy
  if (code <= 48) return "\uD83C\uDF2B\uFE0F"; // fog
  if (code <= 55) return "\uD83C\uDF27\uFE0F"; // drizzle
  if (code <= 65) return "\uD83C\uDF27\uFE0F"; // rain
  if (code <= 67) return "\uD83C\uDF28\uFE0F"; // freezing rain
  if (code <= 77) return "\u2744\uFE0F"; // snow
  if (code <= 82) return "\uD83C\uDF27\uFE0F"; // rain showers
  if (code <= 86) return "\u2744\uFE0F"; // snow showers
  return "\u26A1"; // thunderstorm
}
