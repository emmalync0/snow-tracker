import { fetchIkonConditions } from "@/lib/ikon-api";
import Header from "@/components/Header";
import NavTabs from "@/components/NavTabs";
import IkonRecommendation from "@/components/IkonRecommendation";
import IkonResortTable from "@/components/IkonResortTable";
import RefreshButton from "@/components/RefreshButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ikon Pass Explorer — Snow Tracker",
  description: "Find the best Ikon Pass destination for fresh powder. Sorted by snowfall, distance from Menlo Park, and weather conditions.",
};

export default async function IkonPage() {
  const data = await fetchIkonConditions();

  return (
    <div className="min-h-screen bg-[#f5f4f9]">
      <Header />
      <NavTabs />
      <main className="max-w-5xl mx-auto px-6 py-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-tahoe-900 tracking-tight">
              Ikon Pass — Where&rsquo;s the Snow?
            </h1>
            <p className="text-[11px] text-gray-400">
              Updated{" "}
              {new Date().toLocaleString("en-US", {
                timeZone: "America/Los_Angeles",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
              {" "}&middot; {data.resorts.length} destinations &middot; sorted by 7-day snowfall
            </p>
          </div>
          <RefreshButton />
        </div>

        <IkonRecommendation recommendations={data.recommendations} />
        <IkonResortTable resorts={data.resorts} />

        <footer className="text-center text-[11px] text-gray-400 pb-8 pt-2">
          Forecasts from Open-Meteo &middot; Distances from Menlo Park, CA &middot;{" "}
          <a
            href="https://www.onthesnow.com/ikon-pass/skireport"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:text-sky-700"
          >
            Live conditions on OnTheSnow
          </a>
        </footer>
      </main>
    </div>
  );
}
