import type { SnowConditions } from "@/lib/types";
import { SOURCE_LINKS } from "@/lib/constants";
import CardShell from "./CardShell";

interface SnowConditionsCardProps {
  conditions: SnowConditions;
}

function StatRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-sky-600" : "text-gray-800"}`}>{value}</span>
    </div>
  );
}

export default function SnowConditionsCard({ conditions }: SnowConditionsCardProps) {
  const isUnavailable = conditions.snowCondition === "Unavailable";

  return (
    <CardShell title="Snow Conditions" className="col-span-1">
      <p className="font-semibold text-gray-900 mb-3">
        {conditions.resortName}
      </p>
      {isUnavailable ? (
        <p className="text-sm text-gray-400 italic">
          Resort data unavailable &mdash; check back later
        </p>
      ) : (
        <div>
          <StatRow label="Base Depth" value={`${conditions.baseDepth}"`} />
          <StatRow label="New Snow (24h)" value={`${conditions.newSnow24h}"`} highlight={conditions.newSnow24h > 0} />
          <StatRow label="New Snow (48h)" value={`${conditions.newSnow48h}"`} highlight={conditions.newSnow48h > 0} />
          <StatRow label="Surface" value={conditions.snowCondition} />
          <StatRow label="Lifts" value={`${conditions.liftsOpen} / ${conditions.liftsTotal}`} />
          <StatRow label="Trails" value={`${conditions.trailsOpen} / ${conditions.trailsTotal}`} />
          <StatRow label="Season Total" value={`${conditions.seasonTotal}"`} />
        </div>
      )}
      <div className="flex gap-2 mt-3 text-[11px] text-gray-400">
        <a href={SOURCE_LINKS.snowConditions} target="_blank" rel="noopener noreferrer" className="hover:text-tahoe-600 transition-colors underline decoration-gray-300">
          Palisades Snow Report
        </a>
        <span>&middot;</span>
        <a href={SOURCE_LINKS.snoCountry} target="_blank" rel="noopener noreferrer" className="hover:text-tahoe-600 transition-colors underline decoration-gray-300">
          SnoCountry
        </a>
      </div>
    </CardShell>
  );
}
