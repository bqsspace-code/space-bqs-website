import { routeMetadata } from "../../lib/seo-metadata";
import { PageHero, Chapter, Ledger } from "../../components/Editorial";

export const metadata = routeMetadata("/legal/terms", {
  title: "Terms of Use",
  description: "Product and survey-service boundaries described on the Space BQS website.",
  robots: { index: false, follow: true },
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/legal/terms"
        crumb="Terms"
        eyebrow="Website policy"
        title="Terms of use."
        description="Product and survey-service boundaries described on this site."
      />
      <Chapter index="01" eyebrow="Product scope" title="What the product is, and is not.">
        <Ledger items={[
          { title: "Quantity measurement only", body: "Space BQS provides independent quantity measurement only. Reports state measured quantity with method and version." },
          { title: "Quality testing is out of scope", body: "Fuel-quality testing and laboratory analysis are not part of the product." },
          { title: "Settlement stays with the parties", body: "Commercial settlement remains between the parties." },
        ]} />
      </Chapter>
    </div>
  );
}
