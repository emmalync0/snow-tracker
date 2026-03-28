import type { IkonResortConditions } from "@/lib/ikon-api";
import CardShell from "./CardShell";
import { weatherCodeToIcon } from "@/lib/utils";

interface IkonResortTableProps {
  resorts: IkonResortConditions[];
}

function snowBar(inches: number, max: number): string {
  if (max === 0) return "0%";
  return `${Math.min((inches / max) * 100, 100).toFixed(0)}%`;
}

function formatDistance(miles: number): string {
  if (miles < 300) return `${miles} mi`;
  return `${miles.toLocaleString()} mi`;
}

function tempColor(temp: number): string {
  if (temp > 45) return "text-amber-600";
  if (temp < 10) return "text-sky-600";
  return "text-gray-700";
}

export default function IkonResortTable({ resorts }: IkonResortTableProps) {
  const maxSnow7d = Math.max(...resorts.map((r) => r.snow7d), 1);

  return (
    <CardShell title="All Ikon Destinations — Sorted by Snow">
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] font-bold tracking-wider uppercase text-gray-400 border-b border-tahoe-100">
              <th className="text-left py-2 pr-3">#</th>
              <th className="text-left py-2 pr-3">Resort</th>
              <th className="text-left py-2 pr-3 hidden sm:table-cell">Region</th>
              <th className="text-right py-2 pr-3">72h</th>
              <th className="text-right py-2 pr-3">7-day</th>
              <th className="text-left py-2 pr-3 w-24 hidden md:table-cell">&nbsp;</th>
              <th className="text-right py-2 pr-3 hidden sm:table-cell">Temp</th>
              <th className="text-right py-2 pr-3 hidden md:table-cell">Wind</th>
              <th className="text-right py-2 pr-3">Dist</th>
              <th className="text-center py-2 hidden lg:table-cell">3-Day</th>
            </tr>
          </thead>
          <tbody>
            {resorts.map((resort, idx) => (
              <tr
                key={resort.name}
                className={`border-b border-tahoe-50 hover:bg-tahoe-50/50 transition-colors ${
                  resort.snow72h >= 6 ? "bg-sky-50/40" : ""
                }`}
              >
                <td className="py-2.5 pr-3 text-gray-400 text-xs">{idx + 1}</td>
                <td className="py-2.5 pr-3">
                  <a
                    href={`https://www.onthesnow.com/${resort.onTheSnowSlug}/skireport`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-tahoe-800 hover:text-tahoe-600 transition-colors"
                  >
                    {resort.name}
                  </a>
                  <span className="sm:hidden block text-[10px] text-gray-400">{resort.region}</span>
                </td>
                <td className="py-2.5 pr-3 text-xs text-gray-500 hidden sm:table-cell">
                  {resort.region}
                </td>
                <td className="py-2.5 pr-3 text-right font-semibold tabular-nums">
                  <span className={resort.snow72h >= 6 ? "text-sky-600" : resort.snow72h >= 3 ? "text-sky-500" : "text-gray-400"}>
                    {resort.snow72h > 0 ? `${resort.snow72h.toFixed(0)}"` : "—"}
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-right font-semibold tabular-nums">
                  <span className={resort.snow7d >= 12 ? "text-sky-700 font-bold" : resort.snow7d >= 6 ? "text-sky-600" : "text-gray-500"}>
                    {resort.snow7d > 0 ? `${resort.snow7d.toFixed(0)}"` : "—"}
                  </span>
                </td>
                <td className="py-2.5 pr-3 hidden md:table-cell">
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        resort.snow7d >= 12
                          ? "bg-sky-600"
                          : resort.snow7d >= 6
                          ? "bg-sky-400"
                          : "bg-gray-300"
                      }`}
                      style={{ width: snowBar(resort.snow7d, maxSnow7d) }}
                    />
                  </div>
                </td>
                <td className={`py-2.5 pr-3 text-right text-xs tabular-nums hidden sm:table-cell ${tempColor(resort.avgTempMax)}`}>
                  {resort.avgTempMax > 0 ? `${resort.avgTempMax.toFixed(0)}°F` : "—"}
                </td>
                <td className="py-2.5 pr-3 text-right text-xs tabular-nums hidden md:table-cell">
                  <span className={resort.maxWind > 40 ? "text-red-500" : "text-gray-500"}>
                    {resort.maxWind > 0 ? `${resort.maxWind.toFixed(0)}` : "—"}
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-right text-xs text-gray-500 tabular-nums">
                  {formatDistance(resort.distanceFromHome)}
                </td>
                <td className="py-2.5 text-center hidden lg:table-cell">
                  <div className="flex items-center justify-center gap-0.5">
                    {resort.forecast.slice(0, 3).map((day) => (
                      <span key={day.date} className="text-xs" title={`${day.date}: ${day.snowfall.toFixed(1)}" snow`}>
                        {weatherCodeToIcon(day.weatherCode)}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-gray-400 mt-4">
        Snow forecasts from Open-Meteo. Distance is straight-line from Menlo Park. Wind in mph.
        <a
          href="https://www.onthesnow.com/ikon-pass/skireport"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-sky-500 hover:text-sky-700"
        >
          Full report on OnTheSnow &rarr;
        </a>
      </p>
    </CardShell>
  );
}
