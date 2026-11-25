import type { Metadata } from "next";
import SampleReportClient from "./SampleReportClient";
import sampleReportSchema from "@/schema/04_sample_report.json";

const description = "Trace an illustrative bunker delivery note discrepancy through an unsigned sample certificate and a four-sheet workbook preview.";

export const metadata: Metadata = {
  title: "Sample Bunker Certificate & Excel Evidence Package",
  description,
  openGraph: {
    title: "Sample Bunker Certificate & Excel Evidence Package | Space BQS",
    description,
  },
};

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
