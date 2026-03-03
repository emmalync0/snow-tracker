// --- Weather (Open-Meteo) ---

export interface WeatherDay {
  date: string;
  tempMax: number; // °F
  tempMin: number; // °F
  snowfall: number; // inches
  snowDepth: number; // inches
  precipitation: number; // inches
  windSpeedMax: number; // mph
  windGustsMax: number; // mph
  weatherCode: number;
  isWeekend: boolean;
}

export interface WeatherForecast {
  days: WeatherDay[];
  locationName: string;
  elevation: number;
}

// --- Snow Conditions (SnoCountry) ---

export interface SnowConditions {
  resortName: string;
  baseDepth: number; // inches
  newSnow24h: number; // inches
  newSnow48h: number; // inches
  snowCondition: string; // e.g. "Powder", "Packed Powder"
  liftsOpen: number;
  liftsTotal: number;
  trailsOpen: number;
  trailsTotal: number;
  seasonTotal: number; // inches
  lastUpdated: string;
}

// --- Road Conditions (Caltrans) ---

export type ChainControlLevel =
  | "R-0" // No restrictions
  | "R-1" // Chains required (except AWD/4WD with snow tires)
  | "R-2" // Chains required (no exceptions)
  | "R-3"; // Road closed

export interface ChainControl {
  location: string;
  level: ChainControlLevel;
  description: string;
}

export interface CMSMessage {
  location: string;
  message: string;
  phase1?: string;
  phase2?: string;
  phase3?: string;
}

export interface WebcamInfo {
  id: string;
  name: string;
  imageUrl: string;
  location: string;
  detailUrl?: string;
}

// Resort webcams — live video embeds (Ozolio / Roundshot)
export interface ResortWebcam {
  id: string;
  name: string;
  embedUrl: string;
  detailUrl: string;
}

// --- Lift Status ---

export interface LiftInfo {
  name: string;
  status: "open" | "closed" | "hold" | "scheduled";
  type?: string; // e.g. "Gondola", "Chairlift"
}

export interface LiftStatusData {
  liftsOpen: number;
  liftsTotal: number;
  trailsOpen: number;
  trailsTotal: number;
  lifts: LiftInfo[];
  lastUpdated: string;
}

export interface RoadConditions {
  chainControls: ChainControl[];
  cmsMessages: CMSMessage[];
  webcams: WebcamInfo[];
  worstChainControl: ChainControlLevel;
  lastUpdated: string;
}

// --- Go/No-Go ---

export type Verdict = "go" | "maybe" | "no-go";

export interface GoNoGoResult {
  verdict: Verdict;
  reasons: string[];
  snowScore: string; // "great" | "good" | "meh"
  roadStatus: ChainControlLevel;
  weekendTempHigh: number;
  weekendWindMax: number;
  newSnowExpected: number; // total inches expected Fri-Sun
}
