"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Palisades Tahoe" },
  { href: "/ikon", label: "Ikon Pass Explorer" },
];

export default function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 bg-tahoe-900/80 backdrop-blur-sm px-6 py-2 max-w-5xl mx-auto rounded-b-lg">
      {tabs.map((tab) => {
        const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              isActive
                ? "bg-white/20 text-white"
                : "text-tahoe-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
