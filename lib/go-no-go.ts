import type {
  WeatherForecast,
  SnowConditions,
  RoadConditions,
  GoNoGoResult,
  Verdict,
  ChainControlLevel,
} from "./types";

export function computeGoNoGo(
  weather: WeatherForecast,
  snow: SnowConditions,
  road: RoadConditions
): GoNoGoResult {
  const reasons: string[] = [];

  // Weekend days from forecast
  const weekendDays = weather.days.filter((d) => d.isWeekend);
  const weekendSnow = weekendDays.reduce((sum, d) => sum + d.snowfall, 0);
  const weekendTempHigh = weekendDays.length
    ? Math.max(...weekendDays.map((d) => d.tempMax))
    : weather.days[0]?.tempMax ?? 0;
  const weekendWindMax = weekendDays.length
    ? Math.max(...weekendDays.map((d) => d.windSpeedMax))
    : weather.days[0]?.windSpeedMax ?? 0;

  // Total expected new snow from forecast only (next 5 days)
  const newSnowExpected =
    weather.days.slice(0, 5).reduce((sum, d) => sum + d.snowfall, 0);

  // Snow score
  let snowScore: "great" | "good" | "meh";
  if (newSnowExpected >= 6) {
    snowScore = "great";
    reasons.push(`${newSnowExpected.toFixed(0)}" of new snow expected — powder day!`);
  } else if (newSnowExpected >= 3) {
    snowScore = "good";
    reasons.push(`${newSnowExpected.toFixed(0)}" of new snow expected — decent conditions`);
  } else {
    snowScore = "meh";
    reasons.push(
      newSnowExpected > 0
        ? `Only ${newSnowExpected.toFixed(1)}" of new snow expected`
        : "No significant new snow expected"
    );
  }

  // Road status
  const roadStatus: ChainControlLevel = road.worstChainControl;
  switch (roadStatus) {
    case "R-0":
      reasons.push("Roads are clear — no chain controls");
      break;
    case "R-1":
      reasons.push("R-1 chain controls active (AWD/snow tires may pass)");
      break;
    case "R-2":
      reasons.push("R-2 chain controls — chains required for all vehicles");
      break;
    case "R-3":
      reasons.push("I-80 is CLOSED");
      break;
  }

  // Wind check
  if (weekendWindMax > 60) {
    reasons.push(`Dangerous winds: ${weekendWindMax.toFixed(0)} mph`);
  } else if (weekendWindMax > 40) {
    reasons.push(`Strong winds: ${weekendWindMax.toFixed(0)} mph — lifts may be affected`);
  }

  // Temperature note
  if (weekendTempHigh > 45) {
    reasons.push("Warm temps may soften snow");
  } else if (weekendTempHigh < 15) {
    reasons.push("Very cold — bundle up!");
  }

  // Resort conditions
  if (snow.baseDepthMax > 0) {
    reasons.push(`Base depth: ${snow.baseDepthMin}–${snow.baseDepthMax}" — ${snow.snowCondition}`);
  }

  // Compute verdict
  let verdict: Verdict;
  if (roadStatus === "R-3" || weekendWindMax > 60) {
    verdict = "no-go";
  } else if (
    snowScore === "great" &&
    (roadStatus === "R-0" || roadStatus === "R-1")
  ) {
    verdict = "go";
  } else if (snowScore === "good" && roadStatus === "R-0") {
    verdict = "go";
  } else if (roadStatus === "R-2") {
    verdict = "maybe";
  } else if (snowScore === "meh" && roadStatus === "R-0") {
    verdict = "maybe";
  } else {
    verdict = "maybe";
  }

  return {
    verdict,
    reasons,
    snowScore,
    roadStatus,
    weekendTempHigh,
    weekendWindMax,
    newSnowExpected,
  };
}
