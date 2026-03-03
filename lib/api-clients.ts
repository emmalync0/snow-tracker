import {
  OPEN_METEO_BASE,
  PALISADES,
  WEATHER_DAILY_FIELDS,
  SNOCOUNTRY_RESORT_ID,
  SNOCOUNTRY_BASE,
  CALTRANS_CC_URL,
  CALTRANS_CMS_URL,
  I80_CAMERAS,
  HWY89_CAMERAS,
} from "./constants";
import type {
  WeatherForecast,
  WeatherDay,
  SnowConditions,
  RoadConditions,
  ChainControl,
  ChainControlLevel,
  CMSMessage,
  WebcamInfo,
  LiftStatusData,
  LiftInfo,
} from "./types";
import { isWeekend } from "./utils";

// --- Open-Meteo Weather ---

export async function fetchWeather(): Promise<WeatherForecast> {
  const url = new URL(OPEN_METEO_BASE);
  url.searchParams.set("latitude", String(PALISADES.lat));
  url.searchParams.set("longitude", String(PALISADES.lon));
  url.searchParams.set("daily", WEATHER_DAILY_FIELDS);
  url.searchParams.set("temperature_unit", "fahrenheit");
  url.searchParams.set("windspeed_unit", "mph");
  url.searchParams.set("precipitation_unit", "inch");
  url.searchParams.set("timezone", "America/Los_Angeles");
  url.searchParams.set("forecast_days", "8");

  const res = await fetch(url.toString(), { next: { revalidate: 1800 } });
  if (!res.ok) throw new Error(`Open-Meteo error: ${res.status}`);

  const data = await res.json();
  const daily = data.daily;

  const days: WeatherDay[] = daily.time.map((date: string, i: number) => ({
    date,
    tempMax: daily.temperature_2m_max[i] ?? 0,
    tempMin: daily.temperature_2m_min[i] ?? 0,
    snowfall: daily.snowfall_sum[i] ?? 0,
    snowDepth: 0,
    precipitation: daily.precipitation_sum[i] ?? 0,
    windSpeedMax: daily.wind_speed_10m_max[i] ?? 0,
    windGustsMax: daily.wind_gusts_10m_max[i] ?? 0,
    weatherCode: daily.weather_code[i] ?? 0,
    isWeekend: isWeekend(date),
  }));

  return {
    days,
    locationName: "Palisades Tahoe / Olympic Valley",
    elevation: data.elevation ?? 0,
  };
}

// --- SnoCountry Snow Conditions ---

export async function fetchSnowConditions(): Promise<SnowConditions> {
  const apiKey = process.env.SNOCOUNTRY_API_KEY || "SnoCountry.example";
  const url = new URL(SNOCOUNTRY_BASE);
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("ids", SNOCOUNTRY_RESORT_ID);
  url.searchParams.set("output", "json");

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`SnoCountry error: ${res.status}`);

    const data = await res.json();
    const resort = data?.items?.[0] ?? data?.[0] ?? {};

    return {
      resortName: resort.resortName ?? "Palisades Tahoe",
      baseDepth: parseFloat(resort.avgBaseDepth) || 0,
      newSnow24h: parseFloat(resort.newSnow) || 0,
      newSnow48h: parseFloat(resort.newSnow48) || 0,
      snowCondition: resort.weatherToday_Condition ?? "Unknown",
      liftsOpen: parseInt(resort.liftsOpen) || 0,
      liftsTotal: parseInt(resort.liftsTotal) || 0,
      trailsOpen: parseInt(resort.trailsOpen) || 0,
      trailsTotal: parseInt(resort.trailsTotal) || 0,
      seasonTotal: parseFloat(resort.seasonTotal) || 0,
      lastUpdated: resort.lastUpdated ?? new Date().toISOString(),
    };
  } catch {
    // Return fallback data if API is unavailable
    return {
      resortName: "Palisades Tahoe",
      baseDepth: 0,
      newSnow24h: 0,
      newSnow48h: 0,
      snowCondition: "Unavailable",
      liftsOpen: 0,
      liftsTotal: 0,
      trailsOpen: 0,
      trailsTotal: 0,
      seasonTotal: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
}

// --- Caltrans Road Conditions ---

function parseChainControlLevel(text: string): ChainControlLevel {
  if (/R-?3|closed/i.test(text)) return "R-3";
  if (/R-?2/i.test(text)) return "R-2";
  if (/R-?1/i.test(text)) return "R-1";
  return "R-0";
}

function getWorstChainControl(controls: ChainControl[]): ChainControlLevel {
  const levels: ChainControlLevel[] = ["R-0", "R-1", "R-2", "R-3"];
  let worst = 0;
  for (const cc of controls) {
    const idx = levels.indexOf(cc.level);
    if (idx > worst) worst = idx;
  }
  return levels[worst];
}

export async function fetchRoadConditions(): Promise<RoadConditions> {
  const results: RoadConditions = {
    chainControls: [],
    cmsMessages: [],
    webcams: [],
    worstChainControl: "R-0",
    lastUpdated: new Date().toISOString(),
  };

  // Fetch chain controls
  try {
    const ccRes = await fetch(CALTRANS_CC_URL, { next: { revalidate: 60 } });
    if (ccRes.ok) {
      const ccData = await ccRes.json();
      const entries = ccData?.data ?? ccData ?? [];

      if (Array.isArray(entries)) {
        results.chainControls = entries
          .filter((e: Record<string, string>) => {
            const loc = (e.locationName ?? e.location ?? "").toLowerCase();
            return loc.includes("i-80") || loc.includes("interstate 80");
          })
          .map((e: Record<string, string>): ChainControl => ({
            location: e.locationName ?? e.location ?? "I-80",
            level: parseChainControlLevel(e.chainControlLevel ?? e.status ?? "R-0"),
            description: e.statusDescription ?? e.message ?? "No details",
          }));
      }
    }
  } catch {
    // Chain control data unavailable
  }

  // Fetch CMS messages
  try {
    const cmsRes = await fetch(CALTRANS_CMS_URL, { next: { revalidate: 300 } });
    if (cmsRes.ok) {
      const cmsData = await cmsRes.json();
      const entries = cmsData?.data ?? cmsData ?? [];

      if (Array.isArray(entries)) {
        results.cmsMessages = entries
          .filter((e: Record<string, string>) => {
            const loc = (e.location ?? e.locationName ?? "").toLowerCase();
            return loc.includes("i-80") || loc.includes("80");
          })
          .slice(0, 10)
          .map((e: Record<string, string>): CMSMessage => ({
            location: e.location ?? e.locationName ?? "I-80",
            message: e.message ?? [e.phase1, e.phase2, e.phase3].filter(Boolean).join(" | ") ?? "",
            phase1: e.phase1,
            phase2: e.phase2,
            phase3: e.phase3,
          }));
      }
    }
  } catch {
    // CMS data unavailable
  }

  // Add I-80 corridor cameras (static Caltrans image URLs)
  for (const cam of I80_CAMERAS) {
    results.webcams.push({
      id: cam.id,
      name: cam.name,
      imageUrl: cam.imageUrl,
      location: cam.name,
      detailUrl: "https://cwwp2.dot.ca.gov/vm/iframemap.htm",
    });
  }

  // Add Hwy 89 cameras near Palisades
  for (const cam of HWY89_CAMERAS) {
    results.webcams.push({
      id: cam.id,
      name: cam.name,
      imageUrl: cam.imageUrl,
      location: cam.name,
      detailUrl: "https://cwwp2.dot.ca.gov/vm/iframemap.htm",
    });
  }

  results.worstChainControl = getWorstChainControl(results.chainControls);
  return results;
}

// --- Webcam Timestamps (for highway cameras) ---

function formatTimeAgo(lastModified: string): string {
  const d = new Date(lastModified);
  const now = new Date();
  const diffMin = Math.floor((now.getTime() - d.getTime()) / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`;
  return `${Math.floor(diffMin / 1440)}d ago`;
}

export async function fetchWebcamTimestamps(
  webcams: WebcamInfo[]
): Promise<Record<string, string>> {
  const timestamps: Record<string, string> = {};

  await Promise.allSettled(
    webcams.map(async (cam) => {
      try {
        const res = await fetch(cam.imageUrl, {
          method: "HEAD",
          headers: { "User-Agent": "SnowTracker/1.0" },
        });
        const lastMod = res.headers.get("last-modified");
        if (lastMod) {
          timestamps[cam.imageUrl] = formatTimeAgo(lastMod);
        }
      } catch {
        // skip
      }
    })
  );

  return timestamps;
}

// --- Lift Status (Liftie API) ---

const LIFTIE_API_URL = "https://liftie.info/api/resort/palisades";

export async function fetchLiftStatus(snow: SnowConditions): Promise<LiftStatusData> {
  const result: LiftStatusData = {
    liftsOpen: snow.liftsOpen,
    liftsTotal: snow.liftsTotal,
    trailsOpen: snow.trailsOpen,
    trailsTotal: snow.trailsTotal,
    lifts: [],
    lastUpdated: new Date().toISOString(),
  };

  try {
    const res = await fetch(LIFTIE_API_URL, { next: { revalidate: 600 } });
    if (res.ok) {
      const data = await res.json();
      const stats = data?.lifts?.stats;
      const status: Record<string, string> = data?.lifts?.status ?? {};

      // Use Liftie stats if available (more current than SnoCountry)
      if (stats) {
        result.liftsOpen = stats.open ?? result.liftsOpen;
        result.liftsTotal = (stats.open ?? 0) + (stats.closed ?? 0) + (stats.hold ?? 0) + (stats.scheduled ?? 0);
      }

      // Build individual lift list, open lifts first
      const lifts: LiftInfo[] = [];
      for (const [name, s] of Object.entries(status)) {
        const normalized = s === "open" || s === "closed" || s === "hold" || s === "scheduled" ? s : "closed";
        lifts.push({ name, status: normalized });
      }
      // Sort: open → scheduled → hold → closed
      const order = { open: 0, scheduled: 1, hold: 2, closed: 3 };
      lifts.sort((a, b) => order[a.status] - order[b.status] || a.name.localeCompare(b.name));
      result.lifts = lifts;
    }
  } catch {
    // Liftie unavailable — rely on SnoCountry summary data
  }

  return result;
}
