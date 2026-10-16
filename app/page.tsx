import type { Metadata } from "next";
import Link from "next/link";
import { Section, AnswerBlock, CtaRow, Faq, Breadcrumbs } from "./components/ui";

export const metadata: Metadata = {
  title: "BQS Software for Marine Surveyors — Capture, Calculate, Certify",
  description:
    "Space BQS is software for bunker surveyors and survey firms: offline mobile capture, temperature-corrected MT engine, locked certificates, fleet dashboard. Quantity-only.",
};

const FAQ = [
  {
    q: "Are you a survey company?",
    a: "No. Space BQS builds software for surveyors and survey firms. Your teams attend vessels; our web and mobile apps handle capture, calculation, certificates and fleet records.",
  },
  {
    q: "What survey types does the software support?",
    a: "Bunker delivery, ROB remaining on board including on/off-hire legs, and debunkering — all quantity-only with the same engine and audit trail.",
  },
  {
    q: "Does it test fuel quality?",
    a: "No. Quantity-only. No lab testing, no quality opinions. If your clients need labs, your reports stay clean inputs for them.",
  },
  {
    q: "How do we evaluate and what does it cost?",
    a: "Request a demo and run a pilot with your team. Pricing is per team and usage — contact us and we quote based on surveyors, vessels and volume.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-ocean-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-2">
          <div>
            <Breadcrumbs
              trail={[{ href: "/", label: "Home" }]}
            />
            <h1 className="font-display mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              BQS software for surveyors: capture, calculate, issue locked certificates.
            </h1>
            <p className="mt-4 text-lg text-slate-200">
              Your teams attend the vessel. Space BQS handles the rest: offline capture on deck,
              temperature-corrected MT engine, locked certificates your clients can defend.
            </p>
            <p className="mt-3 text-sm text-slate-300">
              Built for survey firms · Offline mobile · Locked audit trail · Quantity-only
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/demo" className="rounded-lg bg-white px-5 py-3 font-semibold text-ocean-950">
                Request a demo
              </Link>
              <Link href="/sample-report" className="rounded-lg border border-white/40 px-5 py-3 font-semibold">
                See sample report
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 text-slate-900">
            <p className="text-xs font-semibold uppercase tracking-widest text-sea-600">Example output</p>
            <p className="font-display mt-1 text-3xl font-bold">457.819 MT</p>
            <p className="text-sm text-slate-600">Corrected quantity from measured tanks in the certificate.</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>✓ Tank-by-tank table with TOTAL MT</li>
              <li>✓ Water deducted, temperature corrected</li>
              <li>✓ Which tank table + correction version used</li>
              <li>✓ Locked after sign-off — cannot be edited</li>
            </ul>
            <div className="mt-4 rounded-lg bg-ocean-50 p-3 text-sm">
              On deck: <strong>Ship → Fuel → Tanks.</strong> Works offline, syncs later.
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-4 py-4 text-sm text-slate-600">
          <span>Engine v1.0.0</span>
          <span>ASTM D1250 Table 54B</span>
          <span>VLSFO · HFO · MGO · LSMGO · ULSFO</span>
          <span>Ullage or Sounding</span>
          <span>Mass in Air / Vacuum</span>
        </div>
      </div>

      <Section
        eyebrow="Workflows"
        title="One system for your three survey jobs"
        lede="Your surveyors run delivery, ROB and debunkering jobs in the same app with the same audit standard."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              href: "/services/bunker-delivery-survey",
              t: "Bunker Delivery",
              d: "Your team records before/after tanks, temperature, water and BDN — the system computes MT and locks the certificate.",
            },
            {
              href: "/services/rob-survey",
              t: "ROB / On-Off Hire",
              d: "Record fuel on board at charter start and end so your clients can settle fairly.",
            },
            {
              href: "/services/debunkering-survey",
              t: "Debunkering",
              d: "Record fuel removed with before/after measurement both sides accept.",
            },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="rounded-xl border border-slate-200 p-5 hover:border-ocean-700">
              <p className="font-display font-bold text-ocean-950">{c.t}</p>
              <p className="mt-2 text-sm text-slate-600">{c.d}</p>
              <p className="mt-3 text-sm font-semibold text-ocean-700">Learn more →</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="How it works" title="Your team attends — the system does the paperwork">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "1. Your team captures", d: "Surveyor scans the vessel QR and records Ship, Fuel and Tanks in the mobile app — online or offline." },
            { t: "2. System calculates", d: "Live preview per tank, then locked calculation with table versions, flags and warnings." },
            { t: "3.Clients get proof", d: "Supervisor reviews and completes. Locked PDF + Excel go to the client; dashboard updates for your firm." },
          ].map((s) => (
            <div key={s.t} className="rounded-xl bg-slate-50 p-5">
              <p className="font-bold">{s.t}</p>
              <p className="mt-2 text-sm text-slate-600">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Platform"
        title="Your firm's office view of every job"
        lede="Find any survey by ship, port, date or BDN. Status is clear: Draft → Calculated → Under Review → Finalised (locked)."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ul className="space-y-2 text-sm text-slate-700">
            <li>✓ Register with search + status and grade filters</li>
            <li>✓ Dashboard: trends, status donut, top vessels</li>
            <li>✓ Vessel list with IMO, DWT, flag</li>
            <li>✓ Master tank maps + correction tables managed centrally</li>
            <li>✓ Audit on every line: table ID, revision, warnings</li>
          </ul>
          <div className="rounded-xl border border-slate-200 p-5 text-sm">
            <p className="font-semibold">Locked means locked</p>
            <p className="mt-2 text-slate-600">
              Once finalised, a survey cannot be edited or deleted. If a reading is out of range,
              the system flags it — it never guesses.
            </p>
            <Link href="/platform" className="mt-3 inline-block font-semibold text-ocean-700">
              Explore platform →
            </Link>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Mobile app"
        title="Built for the deck, not the desk"
        lede="Surveyors work with no signal. The app scans the ship QR, walks 3 steps, calculates offline, and syncs later."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ul className="space-y-2 text-sm text-slate-700">
            <li>✓ Scan ship QR — no typing IMO numbers wrong</li>
            <li>✓ Steps: Ship → Fuel → Tanks, big buttons</li>
            <li>✓ Works offline up to 72 hours, syncs on reconnect</li>
            <li>✓ Supervisor reviews and completes in office</li>
          </ul>
          <div className="rounded-xl bg-ocean-50 p-5 text-sm">
            <p className="font-semibold">Honest note</p>
            <p className="mt-2 text-slate-600">Tank photos and signatures are coming soon — not live yet.</p>
            <Link href="/mobile-app" className="mt-3 inline-block font-semibold text-ocean-700">
              See mobile app →
            </Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="Why temperature matters" title="Hot fuel looks like more fuel">
        <AnswerBlock>
          <p>
            Fuel expands when hot and shrinks when cold. The system measures the volume in the tank, takes
            the temperature, subtracts free water, and corrects to standard volume using ASTM tables.
            Clients pay for mass in tonnes, not hot litres.
          </p>
        </AnswerBlock>
        <div className="mt-4">
          <Link href="/how-we-measure" className="font-semibold text-ocean-700">
            How the engine works, in plain words →
          </Link>
        </div>
      </Section>

      <Section eyebrow="Sample" title="See what your clients will receive">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-5">
            <p className="font-bold">BQS Certificate (PDF)</p>
            <p className="mt-2 text-sm text-slate-600">
              Particulars, tank table with TOTAL MT, headline quantity, audit trail, remarks, engine
              version + calculation time.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <p className="font-bold">Excel breakdown</p>
            <p className="mt-2 text-sm text-slate-600">
              Survey + tank measurements + calculation steps + audit trail. For analysts and claims teams.
            </p>
          </div>
        </div>
        <div className="mt-6"><CtaRow /></div>
      </Section>

      <Section eyebrow="Pricing" title="Licensed per team, quoted on volume">
        <p className="max-w-3xl text-slate-600">
          No per-job prices on the site. Tell us surveyors, vessels and monthly volume — we quote a
          team license with certificates and Excel included.
        </p>
        <div className="mt-4">
          <Link href="/pricing" className="font-semibold text-ocean-700">How pricing works →</Link>
        </div>
      </Section>

      <Section eyebrow="Learn" title="Simple guides your clients will also read">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { href: "/resources/what-is-bunker-quantity-survey", t: "What is a bunker quantity survey?" },
            { href: "/resources/ullage-vs-sounding", t: "Ullage vs sounding, simply" },
            { href: "/resources/bdn-vs-actual", t: "BDN says X, measured Y — what now?" },
          ].map((r) => (
            <Link key={r.href} href={r.href} className="rounded-xl border border-slate-200 p-5 hover:border-ocean-700">
              <p className="font-bold">{r.t}</p>
              <p className="mt-2 text-sm font-semibold text-ocean-700">Read →</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Quick answers">
        <Faq items={FAQ} />
      </Section>

      <Section eyebrow="Evaluate" title="Run a pilot with your survey team.">
        <p className="max-w-3xl text-slate-600">
          We show a 20-minute walkthrough, then your surveyors run real jobs in a pilot workspace.
          No 24/7 coverage promise — the software works wherever your teams do.
        </p>
        <div className="mt-4"><CtaRow /></div>
      </Section>
    </div>
  );
}
