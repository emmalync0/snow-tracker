// All Ikon Pass destinations with coordinates for distance calculation and weather lookups.
// Coordinates are approximate resort base/mid-mountain positions.

export interface IkonResort {
  name: string;
  lat: number;
  lon: number;
  region: string;        // e.g. "Utah, USA"
  country: string;       // ISO country for grouping
  elevation: number;     // approximate summit elevation in meters (for Open-Meteo)
  nearestAirport: string; // IATA code of the closest major airport
  onTheSnowSlug: string; // for linking out
}

export const MENLO_PARK = { lat: 37.4529, lon: -122.1817 };

// Haversine distance in miles
export function distanceMiles(
  lat1: number, lon1: number,
  lat2: number, lon2: number,
): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const IKON_RESORTS: IkonResort[] = [
  // ── California ──
  { name: "Palisades Tahoe", lat: 39.1968, lon: -120.2354, region: "California, USA", country: "US", elevation: 2697, nearestAirport: "RNO", onTheSnowSlug: "palisades-tahoe" },
  { name: "Mammoth Mountain", lat: 37.6308, lon: -119.0326, region: "California, USA", country: "US", elevation: 3369, nearestAirport: "MMH", onTheSnowSlug: "mammoth-mountain" },
  { name: "June Mountain", lat: 37.7672, lon: -119.0906, region: "California, USA", country: "US", elevation: 3091, nearestAirport: "MMH", onTheSnowSlug: "june-mountain" },
  { name: "Big Bear Mountain Resort", lat: 34.2369, lon: -116.8909, region: "California, USA", country: "US", elevation: 2590, nearestAirport: "ONT", onTheSnowSlug: "bear-mountain" },
  { name: "Snow Summit", lat: 34.2325, lon: -116.8740, region: "California, USA", country: "US", elevation: 2530, nearestAirport: "ONT", onTheSnowSlug: "snow-summit" },
  { name: "Snow Valley", lat: 34.2268, lon: -117.0358, region: "California, USA", country: "US", elevation: 2286, nearestAirport: "ONT", onTheSnowSlug: "snow-valley" },

  // ── Utah ──
  { name: "Alta Ski Area", lat: 40.5884, lon: -111.6386, region: "Utah, USA", country: "US", elevation: 3216, nearestAirport: "SLC", onTheSnowSlug: "alta-ski-area" },
  { name: "Snowbird", lat: 40.5830, lon: -111.6508, region: "Utah, USA", country: "US", elevation: 3353, nearestAirport: "SLC", onTheSnowSlug: "snowbird" },
  { name: "Brighton Resort", lat: 40.5980, lon: -111.5833, region: "Utah, USA", country: "US", elevation: 3200, nearestAirport: "SLC", onTheSnowSlug: "brighton-resort" },
  { name: "Solitude Mountain Resort", lat: 40.6199, lon: -111.5919, region: "Utah, USA", country: "US", elevation: 3048, nearestAirport: "SLC", onTheSnowSlug: "solitude-mountain-resort" },
  { name: "Deer Valley Resort", lat: 40.6375, lon: -111.4783, region: "Utah, USA", country: "US", elevation: 2917, nearestAirport: "SLC", onTheSnowSlug: "deer-valley-resort" },
  { name: "Snowbasin", lat: 41.2160, lon: -111.8569, region: "Utah, USA", country: "US", elevation: 2896, nearestAirport: "SLC", onTheSnowSlug: "snowbasin" },

  // ── Colorado ──
  { name: "Aspen Snowmass", lat: 39.2084, lon: -106.9490, region: "Colorado, USA", country: "US", elevation: 3813, nearestAirport: "ASE", onTheSnowSlug: "aspen-snowmass" },
  { name: "Steamboat", lat: 40.4572, lon: -106.8045, region: "Colorado, USA", country: "US", elevation: 3221, nearestAirport: "HDN", onTheSnowSlug: "steamboat" },
  { name: "Winter Park", lat: 39.8868, lon: -105.7625, region: "Colorado, USA", country: "US", elevation: 3676, nearestAirport: "DEN", onTheSnowSlug: "winter-park-resort" },
  { name: "Copper Mountain", lat: 39.5022, lon: -106.1497, region: "Colorado, USA", country: "US", elevation: 3753, nearestAirport: "DEN", onTheSnowSlug: "copper-mountain-resort" },
  { name: "Arapahoe Basin", lat: 39.6426, lon: -105.8718, region: "Colorado, USA", country: "US", elevation: 3978, nearestAirport: "DEN", onTheSnowSlug: "arapahoe-basin-ski-area" },
  { name: "Eldora Mountain", lat: 39.9372, lon: -105.5827, region: "Colorado, USA", country: "US", elevation: 3200, nearestAirport: "DEN", onTheSnowSlug: "eldora-mountain-resort" },

  // ── Wyoming ──
  { name: "Jackson Hole", lat: 43.5877, lon: -110.8279, region: "Wyoming, USA", country: "US", elevation: 3185, nearestAirport: "JAC", onTheSnowSlug: "jackson-hole-mountain-resort" },

  // ── Montana ──
  { name: "Big Sky", lat: 45.2833, lon: -111.4014, region: "Montana, USA", country: "US", elevation: 3403, nearestAirport: "BZN", onTheSnowSlug: "big-sky-resort" },

  // ── Idaho ──
  { name: "Sun Valley", lat: 43.6974, lon: -114.3514, region: "Idaho, USA", country: "US", elevation: 2789, nearestAirport: "SUN", onTheSnowSlug: "sun-valley-resort" },
  { name: "Schweitzer", lat: 48.3676, lon: -116.6228, region: "Idaho, USA", country: "US", elevation: 1920, nearestAirport: "SFF", onTheSnowSlug: "schweitzer" },

  // ── Washington ──
  { name: "Crystal Mountain", lat: 46.9282, lon: -121.4746, region: "Washington, USA", country: "US", elevation: 2134, nearestAirport: "SEA", onTheSnowSlug: "crystal-mountain-resort" },
  { name: "The Summit at Snoqualmie", lat: 47.4209, lon: -121.4136, region: "Washington, USA", country: "US", elevation: 1676, nearestAirport: "SEA", onTheSnowSlug: "the-summit-at-snoqualmie" },
  { name: "Alpental", lat: 47.4443, lon: -121.4264, region: "Washington, USA", country: "US", elevation: 1737, nearestAirport: "SEA", onTheSnowSlug: "alpental-at-the-summit" },

  // ── Oregon ──
  { name: "Mt. Bachelor", lat: 43.9792, lon: -121.6886, region: "Oregon, USA", country: "US", elevation: 2764, nearestAirport: "RDM", onTheSnowSlug: "mt-bachelor" },

  // ── Alaska ──
  { name: "Alyeska Resort", lat: 60.9604, lon: -149.0981, region: "Alaska, USA", country: "US", elevation: 1201, nearestAirport: "ANC", onTheSnowSlug: "alyeska-resort" },

  // ── New Mexico ──
  { name: "Taos Ski Valley", lat: 36.5956, lon: -105.4543, region: "New Mexico, USA", country: "US", elevation: 3804, nearestAirport: "ABQ", onTheSnowSlug: "taos-ski-valley" },

  // ── Vermont ──
  { name: "Killington Resort", lat: 43.6045, lon: -72.8201, region: "Vermont, USA", country: "US", elevation: 1293, nearestAirport: "BTV", onTheSnowSlug: "killington-resort" },
  { name: "Sugarbush", lat: 44.1357, lon: -72.9137, region: "Vermont, USA", country: "US", elevation: 1244, nearestAirport: "BTV", onTheSnowSlug: "sugarbush" },
  { name: "Stratton Mountain", lat: 43.1134, lon: -72.9079, region: "Vermont, USA", country: "US", elevation: 1181, nearestAirport: "ALB", onTheSnowSlug: "stratton-mountain" },
  { name: "Pico Mountain", lat: 43.6613, lon: -72.8442, region: "Vermont, USA", country: "US", elevation: 1188, nearestAirport: "BTV", onTheSnowSlug: "pico-mountain" },

  // ── New Hampshire ──
  { name: "Loon Mountain", lat: 44.0366, lon: -71.6214, region: "New Hampshire, USA", country: "US", elevation: 1067, nearestAirport: "MHT", onTheSnowSlug: "loon-mountain" },

  // ── Maine ──
  { name: "Sugarloaf", lat: 45.0314, lon: -70.3131, region: "Maine, USA", country: "US", elevation: 1291, nearestAirport: "PWM", onTheSnowSlug: "sugarloaf" },
  { name: "Sunday River", lat: 44.4735, lon: -70.8563, region: "Maine, USA", country: "US", elevation: 960, nearestAirport: "PWM", onTheSnowSlug: "sunday-river" },

  // ── Michigan ──
  { name: "Boyne Mountain Resort", lat: 45.1638, lon: -84.9361, region: "Michigan, USA", country: "US", elevation: 390, nearestAirport: "TVC", onTheSnowSlug: "boyne-mountain-resort" },

  // ── Wisconsin ──
  { name: "Granite Peak", lat: 44.9328, lon: -89.6818, region: "Wisconsin, USA", country: "US", elevation: 579, nearestAirport: "CWA", onTheSnowSlug: "granite-peak-ski-area" },

  // ── Minnesota ──
  { name: "Lutsen Mountains", lat: 47.6636, lon: -90.7180, region: "Minnesota, USA", country: "US", elevation: 335, nearestAirport: "DLH", onTheSnowSlug: "lutsen-mountains" },

  // ── Pennsylvania ──
  { name: "Blue Mountain Resort", lat: 40.8271, lon: -75.5156, region: "Pennsylvania, USA", country: "US", elevation: 472, nearestAirport: "ABE", onTheSnowSlug: "blue-mountain-ski-area" },
  { name: "Camelback Mountain", lat: 41.0517, lon: -75.3573, region: "Pennsylvania, USA", country: "US", elevation: 640, nearestAirport: "ABE", onTheSnowSlug: "camelback-mountain-resort" },

  // ── West Virginia ──
  { name: "Snowshoe Mountain", lat: 38.4108, lon: -79.9937, region: "West Virginia, USA", country: "US", elevation: 1482, nearestAirport: "LWB", onTheSnowSlug: "snowshoe-mountain" },

  // ── Canada ──
  { name: "Banff Sunshine", lat: 51.0783, lon: -115.7732, region: "Alberta, CAN", country: "CA", elevation: 2730, nearestAirport: "YYC", onTheSnowSlug: "banff-sunshine-village" },
  { name: "Lake Louise", lat: 51.4413, lon: -116.1768, region: "Alberta, CAN", country: "CA", elevation: 2637, nearestAirport: "YYC", onTheSnowSlug: "lake-louise-ski-resort" },
  { name: "Revelstoke", lat: 51.0297, lon: -118.1609, region: "British Columbia, CAN", country: "CA", elevation: 2225, nearestAirport: "YLW", onTheSnowSlug: "revelstoke-mountain-resort" },
  { name: "Panorama Mountain", lat: 50.4604, lon: -116.2369, region: "British Columbia, CAN", country: "CA", elevation: 2365, nearestAirport: "YXC", onTheSnowSlug: "panorama-mountain-village" },
  { name: "Sun Peaks", lat: 50.8824, lon: -119.8868, region: "British Columbia, CAN", country: "CA", elevation: 2152, nearestAirport: "YKA", onTheSnowSlug: "sun-peaks-resort" },
  { name: "Cypress Mountain", lat: 49.3965, lon: -123.2046, region: "British Columbia, CAN", country: "CA", elevation: 1440, nearestAirport: "YVR", onTheSnowSlug: "cypress-mountain" },
  { name: "Red Mountain", lat: 49.1044, lon: -117.8429, region: "British Columbia, CAN", country: "CA", elevation: 2075, nearestAirport: "YTH", onTheSnowSlug: "red-mountain-resort" },
  { name: "Tremblant", lat: 46.2093, lon: -74.5858, region: "Quebec, CAN", country: "CA", elevation: 875, nearestAirport: "YUL", onTheSnowSlug: "tremblant" },
  { name: "Le Massif de Charlevoix", lat: 47.2797, lon: -70.6231, region: "Quebec, CAN", country: "CA", elevation: 770, nearestAirport: "YQB", onTheSnowSlug: "le-massif-de-charlevoix" },
  { name: "Blue Mountain", lat: 44.5016, lon: -80.3154, region: "Ontario, CAN", country: "CA", elevation: 450, nearestAirport: "YYZ", onTheSnowSlug: "blue-mountain-resort" },

  // ── Japan ──
  { name: "Niseko United", lat: 42.8622, lon: 140.6988, region: "Hokkaido, JP", country: "JP", elevation: 1308, nearestAirport: "CTS", onTheSnowSlug: "niseko-united" },
  { name: "Furano", lat: 43.3373, lon: 142.3523, region: "Hokkaido, JP", country: "JP", elevation: 1074, nearestAirport: "CTS", onTheSnowSlug: "furano" },

  // ── Europe (Alps) ──
  { name: "Chamonix Mont-Blanc", lat: 45.9237, lon: 6.8694, region: "Northern Alps, FR", country: "FR", elevation: 3842, nearestAirport: "GVA", onTheSnowSlug: "chamonix-mont-blanc" },
  { name: "Zermatt", lat: 46.0207, lon: 7.7491, region: "Valais, CH", country: "CH", elevation: 3883, nearestAirport: "GVA", onTheSnowSlug: "zermatt" },
  { name: "St. Moritz", lat: 46.4908, lon: 9.8355, region: "Graubunden, CH", country: "CH", elevation: 3057, nearestAirport: "ZRH", onTheSnowSlug: "st-moritz-corviglia" },
  { name: "Kitzbuhel", lat: 47.4499, lon: 12.3923, region: "Tyrol, AT", country: "AT", elevation: 2000, nearestAirport: "INN", onTheSnowSlug: "kitzbuhel" },
  { name: "Ischgl", lat: 46.9689, lon: 10.2945, region: "Tyrol, AT", country: "AT", elevation: 2872, nearestAirport: "INN", onTheSnowSlug: "ischgl" },
  { name: "Grandvalira", lat: 42.5556, lon: 1.7395, region: "Andorra", country: "AD", elevation: 2640, nearestAirport: "TLS", onTheSnowSlug: "grandvalira" },

  // ── Italian Dolomites ──
  { name: "Cortina d'Ampezzo", lat: 46.5369, lon: 12.1399, region: "Veneto, IT", country: "IT", elevation: 2930, nearestAirport: "VCE", onTheSnowSlug: "cortina-dampezzo" },
  { name: "Alta Badia", lat: 46.5550, lon: 11.8399, region: "Sudtirol, IT", country: "IT", elevation: 2778, nearestAirport: "VCE", onTheSnowSlug: "alta-badia" },
  { name: "Val Gardena", lat: 46.5582, lon: 11.7357, region: "Sudtirol, IT", country: "IT", elevation: 2518, nearestAirport: "VCE", onTheSnowSlug: "val-gardena-groden" },
  { name: "Kronplatz", lat: 46.7393, lon: 11.9641, region: "Sudtirol, IT", country: "IT", elevation: 2275, nearestAirport: "VCE", onTheSnowSlug: "plan-de-corones-kronplatz" },

  // ── Italian Aosta Valley / Monterosa ──
  { name: "Cervinia", lat: 45.9340, lon: 7.6319, region: "Aosta Valley, IT", country: "IT", elevation: 3480, nearestAirport: "TRN", onTheSnowSlug: "cervinia-breuil" },
  { name: "Courmayeur", lat: 45.7920, lon: 6.9501, region: "Aosta Valley, IT", country: "IT", elevation: 2755, nearestAirport: "TRN", onTheSnowSlug: "courmayeur" },
  { name: "La Thuile", lat: 45.7166, lon: 6.9508, region: "Aosta Valley, IT", country: "IT", elevation: 2642, nearestAirport: "TRN", onTheSnowSlug: "la-thuile" },

  // ── French Alps ──
  { name: "Megeve", lat: 45.8567, lon: 6.6174, region: "Northern Alps, FR", country: "FR", elevation: 2350, nearestAirport: "GVA", onTheSnowSlug: "megeve" },
  { name: "La Rosiere", lat: 45.6282, lon: 6.8487, region: "Northern Alps, FR", country: "FR", elevation: 2800, nearestAirport: "GVA", onTheSnowSlug: "la-rosiere-1850" },
];
