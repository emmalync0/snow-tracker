import type { GoNoGoResult } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface GoNoGoProps {
  result: GoNoGoResult;
}

const verdictConfig = {
  go: {
    label: "GO",
    title: "Great weekend to ski!",
    bg: "bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
    titleColor: "text-emerald-800",
  },
  maybe: {
    label: "MAYBE",
    title: "Weekend is a maybe",
    bg: "bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
    titleColor: "text-amber-800",
  },
  "no-go": {
    label: "NO-GO",
    title: "Not a good weekend to drive up",
    bg: "bg-red-50 border-red-200",
    dot: "bg-red-500",
    titleColor: "text-red-800",
  },
};

function roadBadgeColor(level: string) {
  if (level === "R-0") return "green" as const;
  if (level === "R-1") return "yellow" as const;
  return "red" as const;
}

export default function GoNoGo({ result }: GoNoGoProps) {
  const config = verdictConfig[result.verdict];

  return (
    <div className={`rounded-xl border p-5 md:p-6 ${config.bg}`}>
      <div className="flex items-center gap-2.5 mb-3">
        <span className={`w-2.5 h-2.5 rounded-full ${config.dot} animate-pulse`} />
        <span className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
          {config.label}
        </span>
      </div>
      <h2 className={`text-xl md:text-2xl font-bold tracking-tight mb-4 ${config.titleColor}`}>
        {config.title}
      </h2>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <StatusBadge
          label={`${result.newSnowExpected.toFixed(0)}" new snow`}
          color={result.snowScore === "great" ? "green" : result.snowScore === "good" ? "yellow" : "gray"}
        />
        <StatusBadge
          label={`Roads: ${result.roadStatus}`}
          color={roadBadgeColor(result.roadStatus)}
        />
        <StatusBadge
          label={`${Math.round(result.weekendTempHigh)}\u00B0F`}
          color="gray"
        />
        <StatusBadge
          label={`Wind: ${Math.round(result.weekendWindMax)} mph`}
          color={result.weekendWindMax > 40 ? "red" : "gray"}
        />
      </div>

      <ul className="space-y-1">
        {result.reasons.map((reason, i) => (
          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
            <span className="text-gray-400 mt-0.5">&bull;</span>
            {reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
