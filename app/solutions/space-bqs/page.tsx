import type { Metadata } from "next";
import { MarketingHeader, MarketingCard, ServiceLinks } from "../../components/MarketingPage";
import { Section, CtaRow } from "../../components/ui";

export const metadata: Metadata = { title: "Space BQS — Bunker Quantity Survey Software", description: "An offline-first mobile app for surveyors and a web platform for supervisors, with quantity calculations, review, and locked survey records." };

export default function Page() {
  return <div className="bg-[#f7fbfd]"><MarketingHeader eyebrow="Space BQS" title="Mobile on deck. Web in the office." description="Bunker quantity survey software for survey firms. Keep the reading, calculation, review, and client proof in one connected workflow." />
    <Section title="The right interface for each part of the job"><div className="grid gap-6 md:grid-cols-2">
      <MarketingCard title="The mobile app" href="/mobile-app" linkLabel="See real app screens">Choose or scan a vessel, capture tank readings, calculate locally, and sync after field work. A 72-hour offline lease supports work without cellular coverage.</MarketingCard>
      <MarketingCard title="The web app" href="/platform" linkLabel="Explore the office platform">Review calculation details, manage vessel master data, follow survey status, and retrieve issued PDF certificates and Excel workbooks.</MarketingCard>
    </div></Section>
    <Section bg="mist" title="Three quantity workflows"><div className="grid gap-5 md:grid-cols-3">
      <MarketingCard title="Bunker delivery" href="/services/bunker-delivery-survey">Compare before-and-after quantities with the delivery note.</MarketingCard>
      <MarketingCard title="ROB / on-off hire" href="/services/rob-survey">Record fuel remaining on board for a clear handover.</MarketingCard>
      <MarketingCard title="Debunkering" href="/services/debunkering-survey">Record quantities before and after fuel removal.</MarketingCard>
    </div></Section>
    <Section title="Bring your team and existing records"><p className="max-w-2xl text-sm leading-7 text-[#52657c]">Clients receive issued proof without needing a platform login. Migration and infrastructure requirements are scoped with your firm.</p><ServiceLinks /><div className="mt-8"><CtaRow /></div></Section>
  </div>;
}
