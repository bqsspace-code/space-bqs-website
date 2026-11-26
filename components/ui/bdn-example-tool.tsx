"use client";

import { useSearchParams } from "next/navigation";
import SurveyTool from "./survey-tool";

export default function BdnExampleTool() {
  const example = useSearchParams().get("example") === "delivery-note";
  return <SurveyTool key={example ? "example" : "default"} tool="bdn-discrepancy" deliveryExample={example} />;
}
