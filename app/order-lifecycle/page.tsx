import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Chapter, Steps, Tiles, Tile, Notice } from "../components/Editorial";
import { QrCode, Cpu, ShieldCheck, CheckCircle2, Lock, ArrowDown, ChevronRight, FileSpreadsheet, FileText } from "lucide-react";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/order-lifecycle", {
  title: "Bunker Survey Record Workflow",
  description:
    "See how Space BQS moves a bunker survey from mobile capture to web review and report preparation, with release-specific workflow states.",
});

export default function Page() {
  const steps = [
    {
      num: "01",
      name: "Nomination & Vessel QR Match",
      webState: "DRAFT",
      mobileState: "DRAFT",
      icon: QrCode,
      summary: "Job created with vessel particulars. On deck, the surveyor scans the ship QR code (`SPACE_BQS_VESSEL v1`).",
      details: [
        "Reduces manual entry of the IMO number",
        "Uses the vessel and tank reference data recorded for the survey",
        "Associates the surveyor with the organization's workspace",
      ],
    },
    {
      num: "02",
      name: "Offline Deck Sounding & Measurement",
      webState: "DRAFT / CALCULATED",
      mobileState: "IN_PROGRESS",
      icon: Cpu,
      summary: "Surveyor inputs tape sounding or ullage, observed temperature, and water cuts across all active fuel tanks.",
      details: [
        "Mobile capture supports offline work and later synchronization",
        "Review the calculation preview on the device",
        "Save survey work locally and synchronize when connected",
      ],
    },
    {
      num: "03",
      name: "Field Submission & Office Review",
      webState: "UNDER_REVIEW",
      mobileState: "SUBMITTED",
      icon: ShieldCheck,
      summary: "The surveyor submits the captured record for review through the web platform.",
      details: [
        "Review the recorded survey inputs",
        "Check the calculation details available for the product release",
        "Resolve questions with the survey team before finalization",
      ],
    },
    {
      num: "04",
      name: "Supervisor Finalization",
      webState: "FINALISED",
      mobileState: "COMPLETED",
      icon: Lock,
      summary: "An authorized supervisor or firm administrator completes the office workflow.",
      details: [
        "Finalize the reviewed survey record",
        "Prepare available PDF and Excel report outputs",
        "Follow the organization’s process for storing and sharing reports",
      ],
    },
  ];

  return (
    <div>
      <PageHero
        href="/order-lifecycle"
        crumb="Order Lifecycle"
        parent={{ href: "/features", label: "Features" }}
        eyebrow="Workflow states"
        title="Bunker survey record workflow."
        description="Follow the product workflow from mobile survey capture to office review and report preparation."
        primaryAction={{ href: "/request-demo", label: "Request a demo" }}
      />

      <Chapter index="01" eyebrow="Workflow states" title="Step-by-step survey workflow." lede="Product materials describe a mobile workflow from draft through submission and a web workflow for calculation, review and finalisation. Status labels depend on the release and organisation configuration.">
        <Steps items={steps.map((s) => ({
          meta: `Web: ${s.webState} \u00b7 Mobile: ${s.mobileState}`,
          title: s.name,
          body: (<>
            <p>{s.summary}</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {s.details.map((d) => <li key={d} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-[#19b5c9]" />{d}</li>)}
            </ul>
          </>),
        }))} />
      </Chapter>

      <Chapter index="02" eyebrow="Report outputs" title="What the report workflow describes." tone="white">
        <div className="space-y-5">
          <Tiles>
            <Tile art="doc" tag="PDF" title="A4 BQS inspection certificate" href="/sample-report" cta="View sample PDF anatomy">Product materials describe a report for the survey firm's client, with vessel particulars, a BDN comparison note, tank-by-tank figures and review status. Fields vary by release.</Tile>
            <Tile art="bars" tag="Excel" title="Four-sheet audit workbook" tone="dark" href="/features/calculation-audit" cta="Read the calculation notes">A multi-sheet workbook for review: survey summary, tank measurements, calculation steps and an event record. Confirm the current structure with the team.</Tile>
          </Tiles>
          <Notice label="Reminder">Exact status labels and review requirements depend on the product release and organisation configuration.</Notice>
        </div>
      </Chapter>

    </div>
  );
}
