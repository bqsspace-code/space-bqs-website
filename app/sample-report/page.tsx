import type { Metadata } from "next";
import SampleReportClient from "./SampleReportClient";
import sampleReportSchema from "@/schema/04_sample_report.json";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/sample-report", {
  title: "Sample Bunker Survey Report",
  description:
    "Explore a sample bunker survey PDF and Excel report to see the measurements and calculation details Space BQS can present.",
  openGraph: {
    type: "article",
    title: "Sample Bunker Survey Report | Space BQS",
    description: "Explore a sample bunker survey PDF and Excel report to see the measurements and calculation details Space BQS can present.",
  },
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sampleReportSchema) }}
      />
      <SampleReportClient />
    </>
  );
}
