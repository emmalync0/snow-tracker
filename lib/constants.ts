// Coordinates — Palisades Tahoe (formerly Squaw Valley)
export const PALISADES = { lat: 39.1968, lon: -120.2354, name: "Palisades Tahoe" };
export const MENLO_PARK = { lat: 37.4529, lon: -122.1817, name: "Menlo Park" };

// Open-Meteo API (no key required)
export const OPEN_METEO_BASE = "https://api.open-meteo.com/v1/forecast";

// SnoCountry resort ID for Palisades Tahoe
export const SNOCOUNTRY_RESORT_ID = "916011";
export const SNOCOUNTRY_BASE =
  "https://feeds.snocountry.net/conditions.php";

// Caltrans CWWP2 feeds — District 3 (Sierra/I-80 corridor)
export const CALTRANS_BASE = "https://cwwp2.dot.ca.gov/data/d3";
export const CALTRANS_CC_URL = `${CALTRANS_BASE}/cc/ccStatusD03.json`;
export const CALTRANS_CMS_URL = `${CALTRANS_BASE}/cms/cmsStatusD03.json`;
export const CALTRANS_CCTV_URL = `${CALTRANS_BASE}/cctv/cctvStatusD03.json`;

// Caltrans cameras along I-80 corridor — static image URLs (always current)
export const I80_CAMERAS = [
  {
    id: "c80-donner-summit",
    name: "I-80 at Donner Summit",
    imageUrl: "https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy80atdonnersummit/hwy80atdonnersummit.jpg",
  },
  {
    id: "c80-donner-lake",
    name: "I-80 at Donner Lake",
    imageUrl: "https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy80atdonnerlake/hwy80atdonnerlake.jpg",
  },
  {
    id: "c80-castle-peak",
    name: "I-80 at Castle Peak",
    imageUrl: "https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy80atcastlepeak/hwy80atcastlepeak.jpg",
  },
  {
    id: "c80-kingvale",
    name: "I-80 at Kingvale",
    imageUrl: "https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy80atkingvalewb/hwy80atkingvalewb.jpg",
  },
  {
    id: "c80-soda-springs",
    name: "I-80 at Soda Springs",
    imageUrl: "https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy80atsodaspringseb/hwy80atsodaspringseb.jpg",
  },
  {
    id: "c80-hwy89-jct",
    name: "I-80 at Hwy 89 Junction",
    imageUrl: "https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy80athwy89/hwy80athwy89.jpg",
  },
] as const;

// Palisades Tahoe resort webcams — live video embeds (Ozolio + Roundshot)
export const PALISADES_LIVE_CAMS = [
  { id: "pt-base", name: "Palisades Base (6200')", embedUrl: "https://relay.ozolio.com/pub.api?cmd=embed&oid=EMB_ZIGI00000147", detailUrl: "https://www.palisadestahoe.com/mountain-information/webcams" },
  { id: "pt-scope", name: "Scope (8200')", embedUrl: "https://relay.ozolio.com/pub.api?cmd=embed&oid=EMB_EIFC0000015B", detailUrl: "https://www.palisadestahoe.com/mountain-information/webcams" },
  { id: "pt-siberia", name: "Siberia", embedUrl: "https://relay.ozolio.com/pub.api?cmd=embed&oid=EMB_OBCE00000ECB", detailUrl: "https://www.palisadestahoe.com/mountain-information/webcams" },
  { id: "pt-far-east", name: "Far East", embedUrl: "https://relay.ozolio.com/pub.api?cmd=embed&oid=EMB_EMST000001C4", detailUrl: "https://www.palisadestahoe.com/mountain-information/webcams" },
  { id: "pt-alpine-peak", name: "Alpine Peak", embedUrl: "https://relay.ozolio.com/pub.api?cmd=embed&oid=EMB_VPAY0000014C", detailUrl: "https://www.palisadestahoe.com/mountain-information/webcams" },
  { id: "pt-alpine-race", name: "Alpine Race", embedUrl: "https://relay.ozolio.com/pub.api?cmd=embed&oid=EMB_KIYV000003C2", detailUrl: "https://www.palisadestahoe.com/mountain-information/webcams" },
  { id: "pt-alpine-chalet", name: "Alpine Chalet", embedUrl: "https://relay.ozolio.com/pub.api?cmd=embed&oid=EMB_FPOI000010AB", detailUrl: "https://www.palisadestahoe.com/mountain-information/webcams" },
  { id: "pt-360", name: "Palisades 360\u00B0", embedUrl: "https://palisadestahoe.roundshot.com/silverado/#/", detailUrl: "https://palisadestahoe.roundshot.com/silverado/#/" },
  { id: "pt-alpine-360", name: "Alpine 360\u00B0", embedUrl: "https://palisadestahoe.roundshot.com/alpine/#/", detailUrl: "https://palisadestahoe.roundshot.com/alpine/#/" },
] as const;

// Caltrans cameras near Palisades / Hwy 89
export const HWY89_CAMERAS = [
  {
    id: "h89-olympic-valley",
    name: "Hwy 89 at Olympic Valley",
    imageUrl: "https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy89atolympicvalley/hwy89atolympicvalley.jpg",
  },
  {
    id: "h89-alpine-meadows",
    name: "Hwy 89 at Alpine Meadows",
    imageUrl: "https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy89atalpinemeadows/hwy89atalpinemeadows.jpg",
  },
] as const;

// Google Maps directions link
export const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/Menlo+Park,+CA/Palisades+Tahoe,+Olympic+Valley,+CA";

// Source links for each data section
export const SOURCE_LINKS = {
  weather: "https://open-meteo.com/en/docs",
  snowConditions: "https://www.palisadestahoe.com/mountain-information/snow-and-weather-report",
  snoCountry: "https://snocountry.com/snow-report/california/palisades-tahoe/",
  roadConditions: "https://roads.dot.ca.gov/",
  caltransCctv: "https://cwwp2.dot.ca.gov/vm/iframemap.htm",
  webcams: "https://www.palisadestahoe.com/mountain-information/webcams",
  operationsBlog: "https://blog.palisadestahoe.com/operations/",
  latestBlogPost: "https://blog.palisadestahoe.com/operations/moving-at-the-speed-of-safety/",
  liftStatus: "https://www.palisadestahoe.com/mountain-information/lift-and-terrain-status",
  mountainReport: "https://www.palisadestahoe.com/mountain-information/mountain-report",
} as const;

// Open-Meteo daily fields we request
export const WEATHER_DAILY_FIELDS = [
  "temperature_2m_max",
  "temperature_2m_min",
  "snowfall_sum",
  "precipitation_sum",
  "wind_speed_10m_max",
  "wind_gusts_10m_max",
  "weather_code",
].join(",");
