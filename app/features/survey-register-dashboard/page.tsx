import type { Metadata } from "next";
import { PageHero, HeroImage, Chapter, Tiles, Tile, Checklist, Notice } from "../../components/Editorial";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/features/survey-register-dashboard", {
  title: "Survey Register & Bunker Dashboard",
  description:
    "Space BQS register: search by survey number, vessel, port, inspector or BDN. Filters, Total MT, dashboard trends, needs-attention. Plain guide.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/features/survey-register-dashboard"
        crumb="Survey register"
        parent={{ href: "/features", label: "Features" }}
        eyebrow="Feature / office review"
        title="A clearer view of survey work in progress."
        description="The register and dashboard concepts for reviewing survey records, workflow status and office-held reference information."
        primaryAction={{ href: "/request-demo", label: "See the current register" }}
        secondaryAction={{ href: "/platform", label: "The office platform" }}
        visual={<HeroImage src="/assets/videos/space-bqs-survey-03.webp" alt="Illustrative Space BQS mobile calculation interface and survey record mockup" caption="Illustrative interface concept · confirm current register features with the product team." />}
      />

      <Chapter index="01" eyebrow="Register and review" title="Bring the survey record into focus." lede="A useful register helps a team find relevant records, understand their review stage and know what still needs confirmation. Search fields, statuses and analytics should be confirmed against your release.">
        <Tiles cols={3}>
          <Tile art="scan" tag="Find" title="Find a survey record">Explore the available search and filtering fields. Confirm which vessel, port, survey or delivery identifiers are indexed in your release.</Tile>
          <Tile art="sync" tag="Track" title="Review workflow status">Survey records carry a status. Confirm the labels, transitions and whether updates appear live in the current release.</Tile>
          <Tile art="bars" tag="Summarise" title="Review the summary" tone="dark">Dashboard summaries vary by release and account configuration. Verify which aggregate views exist and how figures are derived.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="02" eyebrow="Governance" title="Who can do what." tone="white" lede="Review permissions and sign-off responsibilities with your administrator. Account configuration determines which roles and controls are available.">
        <Tiles cols={3}>
          <Tile tag="Role 1" title="Deck surveyor">Field users capture survey information. Confirm available fields, connectivity behaviour and finalisation permissions.</Tile>
          <Tile tag="Role 2" title="Operations supervisor">Reviews and finalises. Confirm which review controls, warnings and report actions are available.</Tile>
          <Tile tag="Role 3" title="Client viewer">Client access may depend on the release and configuration. Confirm current availability before relying on it.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="03" eyebrow="Before you rely on it" title="Checks to make in a demonstration." tone="mist">
        <div className="space-y-5">
          <Checklist items={[
            "Search for a survey by an identifier your team actually uses",
            "Watch a record move from submitted to finalised",
            "Check who is able to finalise, and who cannot",
            "Confirm what the dashboard counts and how",
          ]} />
          <Notice label="Reminder">Roles in the product are Surveyor, Supervisor and Org Admin. A self-serve client portal is a roadmap concept, not a live feature.</Notice>
        </div>
      </Chapter>

    </div>
  );
}
