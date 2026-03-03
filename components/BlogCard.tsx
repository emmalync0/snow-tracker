import { SOURCE_LINKS } from "@/lib/constants";
import CardShell from "./CardShell";

export default function BlogCard() {
  return (
    <CardShell title="Operations Update">
      <a
        href={SOURCE_LINKS.latestBlogPost}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <h3 className="font-semibold text-tahoe-900 group-hover:text-tahoe-600 transition-colors">
          Moving at the Speed of Safety: Navigating the February Super Storm
        </h3>
        <p className="text-[11px] text-gray-400 mt-1">March 3, 2026</p>
      </a>
      <p className="text-sm text-gray-600 leading-relaxed mt-3">
        Palisades received <strong className="text-gray-800">115&quot; of snow in five days</strong> (Feb
        16&ndash;20) &mdash; the most significant five-day snowfall since 1970. Ridgetop winds exceeded 90 mph.
        Operations expanded from 12 lifts on Feb 18 to 17 by Feb 20. A follow-up atmospheric river helped lock in
        the snowpack. Resort expects to operate through <strong className="text-gray-800">Memorial Day</strong>.
      </p>
      <div className="mt-3 text-[11px] text-gray-400">
        <a href={SOURCE_LINKS.operationsBlog} target="_blank" rel="noopener noreferrer" className="hover:text-tahoe-600 transition-colors underline decoration-gray-300">
          All Operations Updates
        </a>
      </div>
    </CardShell>
  );
}
