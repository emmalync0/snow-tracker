import { fetchIkonConditions } from "@/lib/ikon-api";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchIkonConditions();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Ikon conditions", detail: String(error) },
      { status: 500 },
    );
  }
}
