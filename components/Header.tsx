export default function Header() {
  return (
    <header className="relative bg-tahoe-900 text-white overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://www.palisadestahoe.com/-/media/squaw-alpine/photos/employees/camper-digging-patrol-dog.jpg"
        alt="Palisades Tahoe avalanche dog Camper"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative max-w-5xl mx-auto px-6 py-28 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight drop-shadow-sm">
            Snow Tracker
          </h1>
          <p className="text-tahoe-200 text-sm mt-0.5 drop-shadow-sm">
            Menlo Park &rarr; Palisades Tahoe via I-80
          </p>
        </div>
        <a
          href="https://www.instagram.com/palisadesavalanchedogs/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-tahoe-300 hover:text-white transition-colors hidden sm:block drop-shadow-sm"
        >
          @palisadesavalanchedogs &rarr;
        </a>
      </div>
    </header>
  );
}
