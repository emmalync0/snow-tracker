import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = [
  "cwwp2.dot.ca.gov",
];

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  // If requesting metadata only
  const metaOnly = request.nextUrl.searchParams.get("meta") === "1";

  try {
    const parsed = new URL(url);
    if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
      return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
    }

    if (metaOnly) {
      const headRes = await fetch(url, { method: "HEAD", headers: { "User-Agent": "SnowTracker/1.0" } });
      const lastMod = headRes.headers.get("last-modified") || "";
      return NextResponse.json({ lastModified: lastMod });
    }

    const res = await fetch(url, {
      headers: { "User-Agent": "SnowTracker/1.0" },
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      return new NextResponse(null, { status: res.status });
    }

    let contentType = res.headers.get("content-type") || "image/jpeg";
    if (contentType === "binary/octet-stream" || contentType === "application/octet-stream") {
      contentType = "image/jpeg";
    }
    const lastModified = res.headers.get("last-modified") || "";
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=120",
        ...(lastModified ? { "X-Last-Modified": lastModified } : {}),
      },
    });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
  }
}
