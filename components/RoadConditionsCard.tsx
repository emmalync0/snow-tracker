import type { RoadConditions } from "@/lib/types";
import { GOOGLE_MAPS_DIRECTIONS_URL, SOURCE_LINKS } from "@/lib/constants";
import CardShell from "./CardShell";
import StatusBadge from "./StatusBadge";

interface RoadConditionsCardProps {
  conditions: RoadConditions;
}

function chainControlColor(level: string) {
  if (level === "R-0") return "green" as const;
  if (level === "R-1") return "yellow" as const;
  return "red" as const;
}

export default function RoadConditionsCard({ conditions }: RoadConditionsCardProps) {
  return (
    <CardShell title="Road Conditions &mdash; I-80 Corridor">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-medium text-gray-600">Chain Controls:</span>
        {conditions.chainControls.length === 0 ? (
          <StatusBadge label="None Active" color="green" />
        ) : (
          <StatusBadge
            label={conditions.worstChainControl}
            color={chainControlColor(conditions.worstChainControl)}
          />
        )}
      </div>

      {conditions.chainControls.length > 0 && (
        <div className="mb-4 space-y-2">
          {conditions.chainControls.map((cc, i) => (
            <div key={i} className="text-sm bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <StatusBadge label={cc.level} color={chainControlColor(cc.level)} />
                <span className="font-medium text-gray-800">{cc.location}</span>
              </div>
              <p className="text-gray-500 text-xs">{cc.description}</p>
            </div>
          ))}
        </div>
      )}

      {conditions.cmsMessages.length > 0 && (
        <div className="mb-4">
          <h3 className="text-[11px] font-bold tracking-wider uppercase text-gray-400 mb-2">
            Highway Message Signs
          </h3>
          <div className="space-y-2">
            {conditions.cmsMessages.map((msg, i) => (
              <div key={i} className="text-sm bg-amber-50 rounded-lg p-3 border border-amber-100">
                <p className="font-medium text-amber-800 text-xs mb-1">{msg.location}</p>
                <p className="text-amber-700 font-mono text-xs">
                  {msg.message || [msg.phase1, msg.phase2, msg.phase3].filter(Boolean).join(" | ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {conditions.cmsMessages.length === 0 && conditions.chainControls.length === 0 && (
        <p className="text-sm text-gray-400 mb-4">No active alerts on I-80 corridor</p>
      )}

      <a
        href={GOOGLE_MAPS_DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-tahoe-900 rounded-lg hover:bg-tahoe-800 transition-colors"
      >
        Get Directions
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>

      <div className="flex gap-2 mt-4 text-[11px] text-gray-400">
        <a href={SOURCE_LINKS.roadConditions} target="_blank" rel="noopener noreferrer" className="hover:text-tahoe-600 transition-colors underline decoration-gray-300">
          Caltrans QuickMap
        </a>
        <span>&middot;</span>
        <a href={SOURCE_LINKS.caltransCctv} target="_blank" rel="noopener noreferrer" className="hover:text-tahoe-600 transition-colors underline decoration-gray-300">
          Caltrans CCTV
        </a>
      </div>
    </CardShell>
  );
}
