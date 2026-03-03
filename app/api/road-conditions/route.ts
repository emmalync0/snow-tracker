import { NextResponse } from "next/server";
import { fetchRoadConditions } from "@/lib/api-clients";

export async function GET() {
  try {
    const data = await fetchRoadConditions();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch road conditions", details: String(error) },
      { status: 500 }
    );
  }
}
