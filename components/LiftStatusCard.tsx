import type { LiftStatusData } from "@/lib/types";
import { SOURCE_LINKS } from "@/lib/constants";
import CardShell from "./CardShell";

interface LiftStatusCardProps {
  liftStatus: LiftStatusData;
}

function ProgressBar({ open, total, label }: { open: number; total: number; label: string }) {
  const pct = total > 0 ? Math.round((open / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">
          {open} / {total} <span className="text-gray-400 font-normal text-xs">({pct}%)</span>
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all bg-tahoe-600"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  open: "bg-emerald-500",
  closed: "bg-gray-300",
  hold: "bg-amber-400",
  scheduled: "bg-sky-400",
};

const STATUS_LABELS: Record<string, string> = {
  open: "Open",
  closed: "Closed",
  hold: "On Hold",
  scheduled: "Scheduled",
};

export default function LiftStatusCard({ liftStatus }: LiftStatusCardProps) {
  return (
    <CardShell title="Lift Status">
      <div className="mb-4">
        <ProgressBar open={liftStatus.liftsOpen} total={liftStatus.liftsTotal} label="Lifts" />
      </div>

      {liftStatus.lifts.length > 0 && (
        <div className="mt-4">
          <h3 className="text-[11px] font-bold tracking-wider uppercase text-gray-400 mb-2">
            Individual Lifts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {liftStatus.lifts.map((lift) => (
              <div key={lift.name} className="flex items-center gap-2 py-1">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_COLORS[lift.status] || "bg-gray-300"}`} />
                <span className="text-sm text-gray-700 truncate">{lift.name}</span>
                <span className="text-[10px] text-gray-400 ml-auto flex-shrink-0">
                  {STATUS_LABELS[lift.status] || lift.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {liftStatus.lifts.length === 0 && (
        <p className="text-xs text-gray-400 italic mt-1">
          Individual lift details unavailable — visit the Palisades website for full status.
        </p>
      )}

      <div className="flex gap-2 mt-4 text-[11px] text-gray-400">
        <a
          href={SOURCE_LINKS.mountainReport}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-tahoe-600 transition-colors underline decoration-gray-300"
        >
          Mountain Report
        </a>
        <span>&middot;</span>
        <a
          href={SOURCE_LINKS.liftStatus}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-tahoe-600 transition-colors underline decoration-gray-300"
        >
          Full Lift Status
        </a>
      </div>
    </CardShell>
  );
}
