interface CardShellProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function CardShell({ title, children, className = "" }: CardShellProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-tahoe-100 overflow-hidden ${className}`}>
      <div className="px-5 py-3 bg-tahoe-50 border-b border-tahoe-100">
        <h2 className="text-[11px] font-bold tracking-widest uppercase text-tahoe-600">
          {title}
        </h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
