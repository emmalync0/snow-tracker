export default function Header() {
  return (
    <header className="bg-tahoe-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Snow Tracker
          </h1>
          <p className="text-tahoe-300 text-sm mt-0.5">
            Menlo Park &rarr; Palisades Tahoe via I-80
          </p>
        </div>
        <a
          href="https://www.palisadestahoe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-tahoe-400 hover:text-white transition-colors hidden sm:block"
        >
          palisadestahoe.com &rarr;
        </a>
      </div>
    </header>
  );
}
