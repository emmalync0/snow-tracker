type BadgeColor = "green" | "yellow" | "red" | "gray";

interface StatusBadgeProps {
  label: string;
  color: BadgeColor;
}

const colorClasses: Record<BadgeColor, string> = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  yellow: "bg-amber-50 text-amber-700 ring-amber-600/20",
  red: "bg-red-50 text-red-700 ring-red-600/20",
  gray: "bg-tahoe-50 text-tahoe-600 ring-tahoe-600/10",
};

export default function StatusBadge({ label, color }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ring-1 ring-inset ${colorClasses[color]}`}>
      {label}
    </span>
  );
}
