import { NextResponse } from "next/server";
import { fetchWeather } from "@/lib/api-clients";

export async function GET() {
  try {
    const data = await fetchWeather();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch weather data", details: String(error) },
      { status: 500 }
    );
  }
}
