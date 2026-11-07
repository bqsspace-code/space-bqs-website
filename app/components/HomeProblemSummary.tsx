import { FilePenLine, Calculator, FolderSearch, ArrowRight } from "lucide-react";
import Link from "next/link";
import WeightText from "./WeightText";

const PROBLEMS = [
  { icon: FilePenLine, label: "On Deck", title: "Paper That Gets Retyped", description: "Every copy from notebook to spreadsheet is another chance for a slip.", resolution: "Capture once, at the tank." },
  { icon: Calculator, label: "At The Desk", title: "Formulas That Quietly Break", description: "Copied workbooks carry old formulas and hidden mistakes into the next job.", resolution: "One versioned calculation engine." },
  { icon: FolderSearch, label: "Months Later", title: "Files Nobody Can Find", description: "A disputed number should lead to its evidence, not a search through inboxes.", resolution: "One locked record to return to." },
];

export default function HomeProblemSummary() {
  return (
    <section id="friction" className="home-problem-summary bg-[#F7FBFD] px-6 py-16 lg:py-20" aria-labelledby="friction-heading">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <WeightText id="friction-heading" tag="h2" mode="scroll-reveal" restWeight={400} activeWeight={700} className="max-w-xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">Where Survey Numbers Go Wrong</WeightText>
          <p className="max-w-sm text-sm leading-6 text-[#52657c]">The mistakes rarely happen at the tank. They happen between the reading and the record.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PROBLEMS.map(item => <article key={item.label} className="rounded-2xl border border-white bg-white/50 p-6">
            <p className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#032aac]"><item.icon className="h-4 w-4" aria-hidden="true" />{item.label}</p>
            <WeightText tag="h3" mode="scroll-reveal" restWeight={400} activeWeight={700} className="font-display text-xl leading-tight tracking-tight">{item.title}</WeightText>
            <p className="mt-3 text-sm leading-6 text-[#52657c]">{item.description}</p>
            <p className="mt-5 border-t border-[#d3e9f3] pt-4 text-xs font-semibold text-[#032aac]">{item.resolution}</p>
          </article>)}
        </div>
        <Link href="#section-comparison" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#032aac] hover:underline">See what changes with Space BQS<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
