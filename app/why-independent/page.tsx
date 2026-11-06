import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Faq, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Why Independent — BDN vs Measured Quantity",
  description:
    "Why an independent bunker quantity survey beats the BDN alone: shortages, density mistakes, trim, tables, temperature. What attendance documents — honestly scoped.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/why-independent", label: "Why Independent" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Why your clients need your independent number</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">The BDN is the supplier&apos;s receipt. Your certificate is the check your clients forward.</p>
      </div>
      <Section eyebrow="Problem" title="What your clients face without you">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Short delivery vs ordered quantity.</li>
          <li>Wrong density applied to convert volume to mass.</li>
          <li>Trim/list noted wrongly, changing tank volume lookup.</li>
          <li>Old or wrong strapping table for a tank.</li>
          <li>Temperature games: hot litres billed as mass.</li>
          <li>Entrained air making volume read high.</li>
          <li>Unrecorded fuel in overflow, bilge or hidden spaces.</li>
        </ul>
        <div className="mt-6"><AnswerBlock><p>Honest scope: your surveyors&apos; attendance documents measurements, temperatures, tables used and BDN details with dated proof. Fraud detection is diligence on deck, not a software guarantee. Space records the evidence so your clients&apos; settlement has facts, not feelings.</p></AnswerBlock></div>
      </Section>
      <Section eyebrow="Fix" title="What your reports record every time">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Tank-by-tank ullage/sounding + temperature + free water.</li>
          <li>Table ID + revision + method per line, interpolated flags, warnings.</li>
          <li>BDN number cross-reference, port, date, inspector.</li>
          <li>Locked certificate — cannot be edited after sign-off.</li>
        </ul>
        <div className="mt-6"><CtaRow /></div>
      </Section>
      <Section eyebrow="FAQ" title="Independence questions">
        <Faq items={[
          { q: "Does independent mean we find fraud?", a: "It means your number is measured independently with method shown. Settlement stays commercial." },
          { q: "Do crew measurements count?", a: "Crew try hard but are rarely trained surveyors with tables and temperature discipline. Independent removes doubt." },
          { q: "What if numbers match?", a: "Then you have proof all is well — worth the fee for peace of mind and records." },
        ]} />
      </Section>
    </div>
  );
}
