import { NextResponse } from "next/server";
import { fetchSnowConditions } from "@/lib/api-clients";

export async function GET() {
  try {
    const data = await fetchSnowConditions();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch snow conditions", details: String(error) },
      { status: 500 }
    );
  }
}
