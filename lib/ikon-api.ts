import { OPEN_METEO_BASE, WEATHER_DAILY_FIELDS } from "./constants";
import { IKON_RESORTS, MENLO_PARK, distanceMiles, type IkonResort } from "./ikon-resorts";

export interface IkonResortConditions {
  name: string;
  region: string;
  country: string;
  nearestAirport: string;
  onTheSnowSlug: string;
  distanceFromHome: number; // miles from Menlo Park
  forecast: {
    date: string;
    tempMax: number;
    tempMin: number;
    snowfall: number;   // inches
    precipitation: number;
    windSpeedMax: number;
    weatherCode: number;
  }[];
  // Aggregated metrics
  snow72h: number;       // total snowfall next 3 days (inches)
  snow7d: number;        // total snowfall next 7 days
  bestDay: string;       // date of the best powder day in the window
  bestDaySnow: number;   // snowfall on the best day
  avgTempMax: number;    // avg high temp over next 7 days
  maxWind: number;       // max wind in forecast
  elevation: number;
}

export interface TripRecommendation {
  resort: IkonResortConditions;
  score: number;
  reasons: string[];
  suggestedDates: string; // e.g. "Mar 29 - Mar 31"
  verdict: "top-pick" | "great" | "good";
}

export interface IkonPageData {
  resorts: IkonResortConditions[];
  recommendations: TripRecommendation[];
  updatedAt: string;
}

// Fetch weather for a batch of resorts from Open-Meteo (supports up to 100 locations)
async function fetchBatchWeather(
  resorts: IkonResort[],
): Promise<Map<string, IkonResortConditions["forecast"]>> {
  const results = new Map<string, IkonResortConditions["forecast"]>();

  // Open-Meteo supports comma-separated lat/lon for batch queries
  // Split into chunks of 50 to stay well within limits
  const chunkSize = 50;
  for (let i = 0; i < resorts.length; i += chunkSize) {
    const chunk = resorts.slice(i, i + chunkSize);
    const lats = chunk.map((r) => r.lat).join(",");
    const lons = chunk.map((r) => r.lon).join(",");

    const url = new URL(OPEN_METEO_BASE);
    url.searchParams.set("latitude", lats);
    url.searchParams.set("longitude", lons);
    url.searchParams.set("daily", WEATHER_DAILY_FIELDS);
    url.searchParams.set("temperature_unit", "fahrenheit");
    url.searchParams.set("windspeed_unit", "mph");
    url.searchParams.set("precipitation_unit", "inch");
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("forecast_days", "8");

    try {
      const res = await fetch(url.toString(), { next: { revalidate: 1800 } });
      if (!res.ok) continue;
      const data = await res.json();

      // When multiple locations, Open-Meteo returns an array
      const entries = Array.isArray(data) ? data : [data];
      entries.forEach((entry: Record<string, Record<string, number[]>>, idx: number) => {
        const resort = chunk[idx];
        if (!resort || !entry.daily) return;
        const d = entry.daily;
        const forecast: IkonResortConditions["forecast"] = (d.time as unknown as string[]).map(
          (date: string, j: number) => ({
            date,
            tempMax: d.temperature_2m_max[j] ?? 0,
            tempMin: d.temperature_2m_min[j] ?? 0,
            snowfall: d.snowfall_sum[j] ?? 0,
            precipitation: d.precipitation_sum[j] ?? 0,
            windSpeedMax: d.wind_speed_10m_max[j] ?? 0,
            weatherCode: d.weather_code[j] ?? 0,
          }),
        );
        results.set(resort.name, forecast);
      });
    } catch {
      // Batch failed — skip this chunk
    }
  }

  return results;
}

function findBestPowderWindow(forecast: IkonResortConditions["forecast"]): {
  bestDay: string;
  bestDaySnow: number;
  suggestedStart: string;
  suggestedEnd: string;
} {
  // Find the day with the most snowfall, then suggest arriving the day after
  // (ski the freshies after the storm clears)
  let bestIdx = 0;
  let bestSnow = 0;
  for (let i = 0; i < forecast.length; i++) {
    if (forecast[i].snowfall > bestSnow) {
      bestSnow = forecast[i].snowfall;
      bestIdx = i;
    }
  }

  // Suggest skiing the day after the biggest snowfall (or same day if it's the last)
  const skiIdx = Math.min(bestIdx + 1, forecast.length - 1);
  const endIdx = Math.min(skiIdx + 2, forecast.length - 1);

  return {
    bestDay: forecast[bestIdx].date,
    bestDaySnow: bestSnow,
    suggestedStart: forecast[skiIdx].date,
    suggestedEnd: forecast[endIdx].date,
  };
}

function scoreResort(resort: IkonResortConditions): {
  score: number;
  reasons: string[];
  suggestedDates: string;
} {
  const reasons: string[] = [];
  let score = 0;

  // 1. Snow is king — weight heavily
  if (resort.snow72h >= 12) {
    score += 50;
    reasons.push(`${resort.snow72h.toFixed(0)}" of snow in the next 72 hours — powder day alert`);
  } else if (resort.snow72h >= 6) {
    score += 35;
    reasons.push(`${resort.snow72h.toFixed(0)}" of fresh snow expected in the next 3 days`);
  } else if (resort.snow72h >= 3) {
    score += 20;
    reasons.push(`${resort.snow72h.toFixed(0)}" of snow coming in the next 3 days`);
  } else if (resort.snow7d >= 6) {
    score += 15;
    reasons.push(`${resort.snow7d.toFixed(0)}" of snow in the 7-day forecast`);
  }

  // 2. Penalize active storm days (want to ski AFTER the snow, not during)
  const stormDays = resort.forecast.filter(
    (d) => d.snowfall > 3 && d.windSpeedMax > 30,
  ).length;
  if (stormDays >= 3) {
    score -= 15;
    reasons.push("Extended storm period — risk of road closures and poor visibility");
  }

  // 3. Look for a clear day after snowfall (the ideal "freshie" window)
  const { suggestedStart, suggestedEnd } = findBestPowderWindow(resort.forecast);
  const postStormDay = resort.forecast.find(
    (d) => d.date >= suggestedStart && d.snowfall < 2 && d.windSpeedMax < 35,
  );
  if (postStormDay && resort.snow7d >= 3) {
    score += 10;
    reasons.push("Clear day after snowfall — ideal for fresh tracks");
  }

  // 4. Temperature — avoid extreme heat (spring slush) and extreme cold
  if (resort.avgTempMax > 45) {
    score -= 5;
    reasons.push(`Warm temps (avg ${resort.avgTempMax.toFixed(0)}°F) — spring conditions likely`);
  } else if (resort.avgTempMax < 10) {
    score -= 3;
    reasons.push(`Very cold (avg ${resort.avgTempMax.toFixed(0)}°F) — bundle up`);
  } else if (resort.avgTempMax >= 20 && resort.avgTempMax <= 35) {
    score += 5;
    reasons.push(`Ideal temps around ${resort.avgTempMax.toFixed(0)}°F`);
  }

  // 5. Wind — avoid dangerous wind days
  if (resort.maxWind > 60) {
    score -= 15;
    reasons.push(`Dangerously high winds (${resort.maxWind.toFixed(0)} mph) — lifts may close`);
  } else if (resort.maxWind > 40) {
    score -= 5;
  }

  // 6. Distance — closer is better (from Menlo Park)
  if (resort.distanceFromHome < 300) {
    score += 10; // Driveable, no flight needed
    reasons.push("Close enough to drive");
  } else if (resort.distanceFromHome < 800) {
    score += 5; // Short flight
  } else if (resort.distanceFromHome < 1500) {
    score += 2;
  } else if (resort.distanceFromHome > 5000) {
    score -= 10; // International long-haul
  }

  // Format dates
  const fmtDate = (d: string) => {
    const dt = new Date(d + "T12:00:00");
    return dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };
  const suggestedDates = `${fmtDate(suggestedStart)} – ${fmtDate(suggestedEnd)}`;

  return { score, reasons, suggestedDates };
}

export async function fetchIkonConditions(): Promise<IkonPageData> {
  const weatherMap = await fetchBatchWeather(IKON_RESORTS);

  const resorts: IkonResortConditions[] = IKON_RESORTS.map((resort) => {
    const forecast = weatherMap.get(resort.name) ?? [];
    const dist = distanceMiles(
      MENLO_PARK.lat, MENLO_PARK.lon,
      resort.lat, resort.lon,
    );

    const snow72h = forecast.slice(0, 3).reduce((s, d) => s + d.snowfall, 0);
    const snow7d = forecast.reduce((s, d) => s + d.snowfall, 0);
    const avgTempMax =
      forecast.length > 0
        ? forecast.reduce((s, d) => s + d.tempMax, 0) / forecast.length
        : 0;
    const maxWind = forecast.reduce((m, d) => Math.max(m, d.windSpeedMax), 0);
    const { bestDay, bestDaySnow } = findBestPowderWindow(forecast);

    return {
      name: resort.name,
      region: resort.region,
      country: resort.country,
      nearestAirport: resort.nearestAirport,
      onTheSnowSlug: resort.onTheSnowSlug,
      distanceFromHome: Math.round(dist),
      forecast,
      snow72h,
      snow7d,
      bestDay,
      bestDaySnow,
      avgTempMax,
      maxWind,
      elevation: resort.elevation,
    };
  });

  // Sort by snow (primary), distance (secondary)
  resorts.sort((a, b) => {
    const snowDiff = b.snow7d - a.snow7d;
    if (Math.abs(snowDiff) > 2) return snowDiff;
    return a.distanceFromHome - b.distanceFromHome;
  });

  // Generate top recommendations (filter to resorts with meaningful snow)
  const candidates = resorts.filter((r) => r.snow7d >= 3 && r.forecast.length > 0);
  const recommendations: TripRecommendation[] = candidates
    .map((resort) => {
      const { score, reasons, suggestedDates } = scoreResort(resort);
      return { resort, score, reasons, suggestedDates, verdict: "good" as const };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((rec, idx) => ({
      ...rec,
      verdict: idx === 0 ? ("top-pick" as const) : idx < 3 ? ("great" as const) : ("good" as const),
    }));

  return {
    resorts,
    recommendations,
    updatedAt: new Date().toISOString(),
  };
}
