import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Mobile App — Survey on Deck, Even Offline",
  description:
    "Space BQS mobile app: scan ship QR, 3-step wizard Ship Fuel Tanks, offline calculation up to 72 hours, supervisor review. Quantity-only.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/mobile-app", label: "Mobile App" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Mobile app — your surveyors&apos; deck tool</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">No signal? No problem. Your teams scan, record in 3 steps, calculate offline, sync later.</p>
      </div>
      <Section eyebrow="Flow" title="Ship → Fuel → Tanks">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Scan ship QR code — vessel ID, name, IMO. No typing mistakes. QR holds vessel + optional port only.</li>
          <li>Step 1 Context: port, date, inspector, BDN, remarks.</li>
          <li>Step 2 Product: grade VLSFO/HFO/MGO/LSMGO/ULSFO, density, mass basis.</li>
          <li>Step 3 Tanks: ullage/sounding, temperature, free water per tank.</li>
        </ul>
      </Section>
      <Section eyebrow="Offline" title="72-hour lease, autosave, safe sync">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Drafts autosave every second. Continue from Drafts list.</li>
          <li>Calculate offline with same v1.0.0 engine + cached tables.</li>
          <li>Workflow: Draft → In Progress → Submitted → Completed. Only supervisor/admin can complete.</li>
          <li>Export PDF/Excel only when Completed. Temp files deleted after share.</li>
        </ul>
      </Section>
      <Section eyebrow="Honest" title="Coming soon, not live">
        <p className="text-slate-700">Tank photos and signatures are on the roadmap. The app today does not capture them. BDN signed flags are placeholders.</p>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
