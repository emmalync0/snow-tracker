import type { TripRecommendation } from "@/lib/ikon-api";
import StatusBadge from "./StatusBadge";

interface IkonRecommendationProps {
  recommendations: TripRecommendation[];
}

const verdictConfig = {
  "top-pick": {
    label: "TOP PICK",
    bg: "bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
    titleColor: "text-emerald-800",
    badge: "green" as const,
  },
  great: {
    label: "GREAT OPTION",
    bg: "bg-sky-50 border-sky-200",
    dot: "bg-sky-500",
    titleColor: "text-sky-800",
    badge: "gray" as const,
  },
  good: {
    label: "WORTH CONSIDERING",
    bg: "bg-tahoe-50 border-tahoe-200",
    dot: "bg-tahoe-400",
    titleColor: "text-tahoe-800",
    badge: "gray" as const,
  },
};

function formatDistance(miles: number): string {
  if (miles < 300) return `${miles} mi (drive)`;
  const hours = Math.round(miles / 450); // rough flight time
  return `${miles.toLocaleString()} mi (~${hours}h flight)`;
}

export default function IkonRecommendation({ recommendations }: IkonRecommendationProps) {
  if (recommendations.length === 0) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
            NO POWDER ALERTS
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-amber-800 mb-2">
          Slim pickings across the Ikon Pass right now
        </h2>
        <p className="text-sm text-gray-700">
          No Ikon resort has significant snowfall in the forecast. Check back in a few days or consider spring skiing at higher-elevation resorts.
        </p>
      </div>
    );
  }

  const top = recommendations[0];
  const topConfig = verdictConfig[top.verdict];
  const runners = recommendations.slice(1);

  return (
    <div className="space-y-4">
      {/* Top pick — big card */}
      <div className={`rounded-xl border p-5 md:p-6 ${topConfig.bg}`}>
        <div className="flex items-center gap-2.5 mb-3">
          <span className={`w-2.5 h-2.5 rounded-full ${topConfig.dot} animate-pulse`} />
          <span className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
            {topConfig.label}
          </span>
        </div>
        <h2 className={`text-xl md:text-2xl font-bold tracking-tight mb-1 ${topConfig.titleColor}`}>
          Fly to {top.resort.name}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {top.resort.region} &middot; {formatDistance(top.resort.distanceFromHome)} from Menlo Park &middot; Fly into {top.resort.nearestAirport}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <StatusBadge
            label={`${top.resort.snow7d.toFixed(0)}" snow (7-day)`}
            color={top.resort.snow7d >= 12 ? "green" : top.resort.snow7d >= 6 ? "yellow" : "gray"}
          />
          <StatusBadge
            label={`${top.resort.snow72h.toFixed(0)}" next 72h`}
            color={top.resort.snow72h >= 6 ? "green" : top.resort.snow72h >= 3 ? "yellow" : "gray"}
          />
          <StatusBadge
            label={`Avg ${top.resort.avgTempMax.toFixed(0)}°F`}
            color={top.resort.avgTempMax > 45 ? "yellow" : "gray"}
          />
          <StatusBadge
            label={top.suggestedDates}
            color="gray"
          />
        </div>

        <ul className="space-y-1">
          {top.reasons.map((reason, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">&bull;</span>
              {reason}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex gap-2">
          <a
            href={`https://www.onthesnow.com/skireport?resortName=${encodeURIComponent(top.resort.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-sky-600 hover:text-sky-800 transition-colors"
          >
            Snow report &rarr;
          </a>
          <span className="text-gray-300">|</span>
          <a
            href={`https://www.google.com/flights?q=flights+from+SFO+to+${top.resort.nearestAirport}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-sky-600 hover:text-sky-800 transition-colors"
          >
            Find flights (SFO &rarr; {top.resort.nearestAirport}) &rarr;
          </a>
        </div>
      </div>

      {/* Runner-ups — compact row */}
      {runners.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {runners.map((rec) => {
            const cfg = verdictConfig[rec.verdict];
            return (
              <div
                key={rec.resort.name}
                className={`rounded-xl border p-4 ${cfg.bg}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
                    {cfg.label}
                  </span>
                </div>
                <h3 className={`text-base font-bold tracking-tight ${cfg.titleColor}`}>
                  {rec.resort.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  {rec.resort.region} &middot; {formatDistance(rec.resort.distanceFromHome)} &middot; {rec.resort.nearestAirport}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  <StatusBadge
                    label={`${rec.resort.snow7d.toFixed(0)}" (7d)`}
                    color={rec.resort.snow7d >= 12 ? "green" : rec.resort.snow7d >= 6 ? "yellow" : "gray"}
                  />
                  <StatusBadge
                    label={rec.suggestedDates}
                    color="gray"
                  />
                </div>
                <ul className="space-y-0.5">
                  {rec.reasons.slice(0, 2).map((reason, i) => (
                    <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <span className="text-gray-400 mt-0.5">&bull;</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
