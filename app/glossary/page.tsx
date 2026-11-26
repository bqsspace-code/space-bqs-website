import Link from "next/link";
import { Breadcrumbs, Section, CtaRow } from "../components/ui";
import { ALL_GLOSSARY_TERMS } from "../lib/glossary";
import { BookOpen, Search, ArrowRight, Bookmark, Calculator, ShieldAlert, FlaskConical } from "lucide-react";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata = routeMetadata("/glossary", {
  title: "Marine Bunker Survey Glossary",
  description:
    "Explanations of marine bunker quantity survey terms, including sounding, ullage, tank tables, volume correction factors, BDN, and ROB.",
});

const CATEGORIES = [
  "Physical Gauging",
  "Calculation & ASTM",
  "Custody & Dispute",
  "Fuel Sampling & MARPOL"
] as const;

export default function GlossaryPage() {
  return (
    <div className="space-y-12 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/glossary", label: "Glossary" },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Maritime Technical Terminology
          </span>
          <span className="text-xs text-slate-500 font-mono">20 Core BQS Definitions</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          Marine Sounding &amp; Bunker Quantity Survey Glossary
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Clear, definitive explanations of physical tank gauging methods, ASTM D1250 calculation tables, volume correction factors (VCF), custody transfer disputes, and MARPOL sampling standards.
        </p>

        {/* Categories Quick Navigation */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-ocean-600 hover:text-ocean-700 transition"
            >
              {cat}
            </a>
          ))}
        </div>
      </div>

      {/* Categorized Terms Listing */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
        {CATEGORIES.map((cat) => {
          const catId = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const terms = ALL_GLOSSARY_TERMS.filter((t) => t.category === cat);

          return (
            <section key={cat} id={catId} className="scroll-mt-32">
              <div className="border-b border-slate-200 pb-3 mb-6">
                <h2 className="font-display text-2xl font-bold text-ocean-950 flex items-center gap-2">
                  {cat === "Physical Gauging" && <Bookmark className="h-5 w-5 text-ocean-600" />}
                  {cat === "Calculation & ASTM" && <Calculator className="h-5 w-5 text-sea-600" />}
                  {cat === "Custody & Dispute" && <ShieldAlert className="h-5 w-5 text-amber-600" />}
                  {cat === "Fuel Sampling & MARPOL" && <FlaskConical className="h-5 w-5 text-purple-600" />}
                  {cat}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {terms.length} verified terminology and standard procedures
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {terms.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/glossary/${t.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-ocean-600 hover:shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-500">
                          {t.standardsReference.split("/")[0].trim()}
                        </span>
                        <span className="text-xs font-semibold text-ocean-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                          Definition <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                      <h3 className="font-display mt-2 text-lg font-bold text-ocean-950 group-hover:text-ocean-700">
                        {t.term}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        {t.shortDefinition}
                      </p>
                    </div>

                    {t.formula && (
                      <div className="mt-4 rounded-lg bg-slate-50 p-2.5 text-[11px] font-mono text-ocean-900 border border-slate-100">
                        {t.formula}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <CtaRow />
      </div>
    </div>
  );
}
