import { fetchWeather, fetchSnowConditions, fetchRoadConditions, fetchWebcamTimestamps, fetchLiftStatus } from "@/lib/api-clients";
import { PALISADES_LIVE_CAMS } from "@/lib/constants";
import { computeGoNoGo } from "@/lib/go-no-go";
import Header from "@/components/Header";
import GoNoGo from "@/components/GoNoGo";
import WeatherCard from "@/components/WeatherCard";
import SnowConditionsCard from "@/components/SnowConditionsCard";
import LiftStatusCard from "@/components/LiftStatusCard";
import RoadConditionsCard from "@/components/RoadConditionsCard";
import WebcamsCard from "@/components/WebcamsCard";
import BlogCard from "@/components/BlogCard";
import RefreshButton from "@/components/RefreshButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [weather, snowConditions, roadConditions] = await Promise.all([
    fetchWeather(),
    fetchSnowConditions(),
    fetchRoadConditions(),
  ]);

  const [goNoGo, liftStatus, timestamps] = await Promise.all([
    Promise.resolve(computeGoNoGo(weather, snowConditions, roadConditions)),
    fetchLiftStatus(snowConditions),
    fetchWebcamTimestamps(roadConditions.webcams),
  ]);

  const resortWebcams = [...PALISADES_LIVE_CAMS];

  return (
    <div className="min-h-screen bg-[#f5f4f9]">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-6 space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-gray-400">
            Updated {new Date().toLocaleString("en-US", {
              timeZone: "America/Los_Angeles",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <RefreshButton />
        </div>

        <GoNoGo result={goNoGo} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <WeatherCard forecast={weather} />
          <SnowConditionsCard conditions={snowConditions} />
        </div>

        <LiftStatusCard liftStatus={liftStatus} />
        <BlogCard />
        <RoadConditionsCard conditions={roadConditions} />
        <WebcamsCard
          resortWebcams={resortWebcams}
          roadWebcams={roadConditions.webcams}
          timestamps={timestamps}
        />

        <footer className="text-center text-[11px] text-gray-400 pb-8 pt-2">
          Data from Open-Meteo, SnoCountry, Caltrans, Palisades Tahoe
        </footer>
      </main>
    </div>
  );
}
