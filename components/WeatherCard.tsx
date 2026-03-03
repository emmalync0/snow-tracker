import type { WeatherForecast } from "@/lib/types";
import { formatDate, weatherCodeToIcon, weatherCodeToDescription } from "@/lib/utils";
import { SOURCE_LINKS } from "@/lib/constants";
import CardShell from "./CardShell";

interface WeatherCardProps {
  forecast: WeatherForecast;
}

export default function WeatherCard({ forecast }: WeatherCardProps) {
  return (
    <CardShell title="Weather Forecast" className="col-span-1">
      <p className="text-xs text-gray-500 mb-3">
        {forecast.locationName} &middot; {Math.round(forecast.elevation)}ft
      </p>
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] font-semibold tracking-wider uppercase text-gray-400 border-b border-gray-100">
              <th className="pb-2 pr-2">Day</th>
              <th className="pb-2 pr-2"></th>
              <th className="pb-2 pr-2 text-right">Hi</th>
              <th className="pb-2 pr-2 text-right">Lo</th>
              <th className="pb-2 pr-2 text-right">Snow</th>
              <th className="pb-2 text-right">Wind</th>
            </tr>
          </thead>
          <tbody>
            {forecast.days.map((day) => (
              <tr
                key={day.date}
                className={`border-b border-gray-50 last:border-0 ${
                  day.isWeekend ? "bg-tahoe-50/50" : ""
                }`}
              >
                <td className="py-2 pr-2 whitespace-nowrap">
                  <span className="font-medium text-gray-800">{formatDate(day.date)}</span>
                  {day.isWeekend && (
                    <span className="ml-1 text-[9px] font-bold text-tahoe-500 uppercase align-top">wknd</span>
                  )}
                </td>
                <td className="py-2 pr-2" title={weatherCodeToDescription(day.weatherCode)}>
                  <span>{weatherCodeToIcon(day.weatherCode)}</span>
                </td>
                <td className="py-2 pr-2 text-right tabular-nums font-medium text-gray-800">
                  {Math.round(day.tempMax)}&deg;
                </td>
                <td className="py-2 pr-2 text-right tabular-nums text-gray-400">
                  {Math.round(day.tempMin)}&deg;
                </td>
                <td className="py-2 pr-2 text-right tabular-nums">
                  {day.snowfall > 0 ? (
                    <span className="text-sky-600 font-bold">{day.snowfall.toFixed(1)}&quot;</span>
                  ) : (
                    <span className="text-gray-300">&mdash;</span>
                  )}
                </td>
                <td className="py-2 text-right tabular-nums text-gray-500">
                  {Math.round(day.windSpeedMax)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-gray-400 mt-3">
        <a href={SOURCE_LINKS.weather} target="_blank" rel="noopener noreferrer" className="hover:text-tahoe-600 transition-colors underline decoration-gray-300">
          Open-Meteo
        </a>
      </p>
    </CardShell>
  );
}
