import { routeMetadata } from "../lib/seo-metadata";
import { PageHero, HeroImage, Chapter, Ledger, Split, Steps, Notice, PullStatement } from "../components/Editorial";

export const metadata = routeMetadata("/about", {
  title: "About the Software",
  description: "Learn about Space BQS, bunker quantity survey software for marine survey teams. Space BQS provides software, not survey attendance.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/about"
        crumb="About"
        eyebrow="About the product"
        title="Software for the survey. Not the surveyor."
        description="Space BQS is a digital workflow for bunker quantity survey teams, from field records to office review and report preparation."
        primaryAction={{ href: "/mobile-app", label: "Explore the mobile app" }}
        secondaryAction={{ href: "/how-we-measure", label: "Read how we measure" }}
        visual={<HeroImage src="/assets/web_image/marine-surveyor-deck-sounding.jpg" alt="A marine surveyor taking a tank sounding on deck" caption="Your team measures. The system keeps the record." />}
      />

      <Chapter index="01" eyebrow="Why it exists" title="A survey is only as good as its record." lede="The measurement happens on deck. The record has to survive the trip to the office.">
        <div className="space-y-8">
          <PullStatement>Most disputes about a bunker quantity are really disputes about the record: which readings, which units, which method, which version.</PullStatement>
          <p className="max-w-2xl text-[17px] leading-8 text-[#31485f]">
            Space BQS keeps those inputs together. A surveyor captures readings in a fixed sequence, the calculation runs the same way every time, a supervisor reviews the working, and the finalised report carries the method with it. The aim is a record another person can read and re-check without having been on the vessel.
          </p>
        </div>
      </Chapter>

      <Chapter index="02" eyebrow="Scope" title="One job, done carefully." lede="Space BQS does one thing: software for bunker quantity surveys." tone="white">
        <Split src="/assets/web_image/vessel-tank-strapping-context.jpg" alt="Vessel tank context used for bunker survey calculations" caption="Delivery · ROB · Debunkering">
          <p className="text-lg leading-8 text-[#31485f]">
            Your teams measure on board. The system corrects for temperature, deducts water, and locks the result into a report your clients can share.
          </p>
          <p className="mt-5 text-[15px] leading-7 text-[#52657c]">
            It covers bunker delivery, remaining on board, and debunkering workflows, and nothing outside them. Each has its own service page describing what is captured and what the report contains.
          </p>
        </Split>
      </Chapter>

      <Chapter index="03" eyebrow="How a record moves" title="Four states, two screens." lede="The same record moves from the deck to the office. Status labels can vary with product release and organisation setup." tone="mist">
        <Steps items={[
          { meta: "Mobile: Draft", title: "Nomination and vessel match", body: "The job is created with vessel particulars. On deck, the surveyor scans the vessel QR code so the vessel is identified without retyping its details." },
          { meta: "Mobile: In progress", title: "Offline sounding and measurement", body: "Tape sounding or ullage, observed temperature and water are entered per tank. The calculation previews on the device and the work saves locally if there is no signal." },
          { meta: "Web: Under review", title: "Submission and office review", body: "Once connectivity returns the record syncs. A supervisor checks the inputs and calculation details and resolves questions with the team." },
          { meta: "Web: Finalised", title: "Supervisor finalisation", body: "An authorised supervisor or firm administrator finalises the record and prepares the PDF and Excel outputs for the organisation's own storage and sharing process." },
        ]} />
      </Chapter>

      <Chapter index="04" eyebrow="Principles" title="How we decide what to build." tone="white">
        <Ledger
          items={[
            { title: "Show the working", body: "A figure without its inputs, correction factor and method is hard to trust. Reports and screens expose the calculation path rather than only the answer." },
            { title: "Field first", body: "The deck is the hardest place to use software: gloves, glare, no signal. Capture is a short, fixed sequence that works offline and saves as you go." },
            { title: "Keep the boundary honest", body: "We state plainly what the software does not do, and mark roadmap items as roadmap. Tank photos, digital signatures and a client portal are not presented as live." },
            { title: "Leave judgement with the surveyor", body: "Software does not confirm physical measurements, calibration data or contract terms. The survey firm remains responsible for its findings." },
          ]}
        />
      </Chapter>

      <Chapter index="05" eyebrow="Boundaries" title="What we do not do." tone="mist">
        <div className="space-y-6">
          <Ledger
            items={[
              { title: "We do not attend vessels", body: "Marine survey firms provide attendance and make the measurements. Space BQS is the software they use." },
              { title: "We do not test fuel", body: "There is no laboratory testing and no quality opinion in the product." },
              { title: "We do not certify findings", body: "The survey firm and its personnel remain responsible for the findings they issue." },
            ]}
          />
          <Notice>Space BQS provides software, not survey attendance.</Notice>
        </div>
      </Chapter>

      <Chapter index="06" eyebrow="Keep exploring" title="See the work behind the claims." tone="white">
        <Ledger
          items={[
            { title: "Method and evidence", body: "Review the published calculation workflow and its limits.", href: "/how-we-measure", cta: "How we measure" },
            { title: "Finished output", body: "Open an illustrative report and check what the client receives.", href: "/sample-report", cta: "Sample report" },
            { title: "Evaluate it yourself", body: "A step-by-step way to test fit with your own vessels and survey types.", href: "/evaluate", cta: "Evaluation guide" },
          ]}
        />
      </Chapter>

    </div>
  );
}
