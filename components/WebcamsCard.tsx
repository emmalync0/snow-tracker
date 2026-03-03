import type { WebcamInfo, ResortWebcam } from "@/lib/types";
import { SOURCE_LINKS } from "@/lib/constants";
import CardShell from "./CardShell";

interface WebcamsCardProps {
  resortWebcams: ResortWebcam[];
  roadWebcams: WebcamInfo[];
  timestamps?: Record<string, string>;
}

function ResortWebcamTile({ cam }: { cam: ResortWebcam }) {
  return (
    <div className="group">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src={cam.embedUrl}
          title={`Webcam: ${cam.name}`}
          className="w-full h-full border-0"
          allow="autoplay; fullscreen"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <p className="text-xs font-medium text-gray-700">{cam.name}</p>
        <a
          href={cam.detailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-tahoe-500 hover:text-tahoe-700 transition-colors"
        >
          Full view &rarr;
        </a>
      </div>
    </div>
  );
}

function HighwayCamTile({ cam, timestamp }: { cam: WebcamInfo; timestamp?: string }) {
  const proxyUrl = `/api/webcam-proxy?url=${encodeURIComponent(cam.imageUrl)}`;

  return (
    <div className="group">
      <a
        href={cam.detailUrl || proxyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group-hover:border-tahoe-300 transition-colors">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={proxyUrl}
            alt={`Webcam: ${cam.name}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-2 right-2 text-[10px] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
            View full size &rarr;
          </span>
        </div>
      </a>
      <div className="mt-1.5 flex items-center justify-between">
        <p className="text-xs font-medium text-gray-700">{cam.name}</p>
        {timestamp && (
          <span className="text-[10px] text-gray-400">{timestamp}</span>
        )}
      </div>
    </div>
  );
}

export default function WebcamsCard({ resortWebcams, roadWebcams, timestamps }: WebcamsCardProps) {
  return (
    <CardShell title="Webcams">
      <h3 className="text-[11px] font-bold tracking-wider uppercase text-gray-400 mb-3">
        Palisades Tahoe — Live Video
      </h3>
      {resortWebcams.length === 0 ? (
        <p className="text-sm text-gray-400 italic mb-5">No resort webcam feeds available</p>
      ) : (
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resortWebcams.map((cam) => (
            <ResortWebcamTile key={cam.id} cam={cam} />
          ))}
        </div>
      )}

      <h3 className="text-[11px] font-bold tracking-wider uppercase text-gray-400 mb-3">
        Highway Cameras (I-80 &amp; Hwy 89)
      </h3>
      {roadWebcams.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No highway camera feeds available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadWebcams.map((cam) => (
            <HighwayCamTile key={cam.id} cam={cam} timestamp={timestamps?.[cam.imageUrl]} />
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-4 text-[11px] text-gray-400">
        <a href={SOURCE_LINKS.webcams} target="_blank" rel="noopener noreferrer" className="hover:text-tahoe-600 transition-colors underline decoration-gray-300">
          Palisades Webcams
        </a>
        <span>&middot;</span>
        <a href={SOURCE_LINKS.caltransCctv} target="_blank" rel="noopener noreferrer" className="hover:text-tahoe-600 transition-colors underline decoration-gray-300">
          Caltrans CCTV
        </a>
      </div>
    </CardShell>
  );
}
