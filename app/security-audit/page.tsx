import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, Lock, ShieldCheck } from "lucide-react";
import Provably, { type ProvablyCredential } from "@/components/ui/provably";
import { Breadcrumbs } from "../components/ui";
import WeightText from "../components/WeightText";
import SecurityDataBento from "./SecurityDataBento";
import { LazyMount } from "../components/Motion";
import { Chapter, Tiles, Tile } from "../components/Editorial";
import { routeMetadata } from "../lib/seo-metadata";
import { CONTACT_EMAIL } from "../lib/site";
import styles from "./security.module.css";

export const metadata: Metadata = routeMetadata("/security-audit", {
  title: "Security & Audit | Survey Records and Deployment",
  description:
    "Follow a Space BQS survey from offline capture to office review. Explore report handling, website privacy and the controls to verify for your deployment.",
});

const stages = [
  {
    step: "01 / On deck",
    title: "Capture offline",
    text: "The surveyor records vessel and tank readings on the mobile app. When connectivity returns, the field record can sync to the web platform.",
    href: "/mobile-app",
    link: "Explore mobile capture",
    Icon: Lock,
  },
  {
    step: "02 / In the office",
    title: "Review before finalisation",
    text: "The surveyor submits the field record. An authorised supervisor or administrator reviews and completes it on the web. The register distinguishes draft, submitted and finalised records.",
    href: "/features/survey-register-dashboard",
    link: "See the survey register",
    Icon: ShieldCheck,
  },
  {
    step: "03 / At handover",
    title: "Inspect the report",
    text: "The certificate presents the survey total; the workbook shows supporting figures. Use the unsigned sample to inspect the layout and follow a difference back to its inputs.",
    href: "/sample-report",
    link: "Open the illustrative report",
    Icon: FileCheck2,
  },
];

const HERO_CREDENTIALS: ProvablyCredential[] = [
  {
    title: "01 / Capture Offline",
    recipient: "Mobile Deck App",
    accent: "#032aac",
    icon: "lock",
    skills: ["Local tank readings", "Sync on signal", "Device storage", "72 h offline lease"],
  },
  {
    title: "02 / Office Review",
    recipient: "Web Register & Roles",
    accent: "#1b4fd1",
    icon: "shield",
    skills: ["Draft to Finalised", "Role-gated review", "Audit history", "Table 54B trace"],
  },
  {
    title: "03 / Client Handover",
    recipient: "PDF & Excel Output",
    accent: "#19b5c9",
    icon: "file",
    skills: ["Survey total", "Supporting figures", "Traceable inputs", "No client login"],
  },
];

const controls = [
  [
    "Hosting & data residency",
    "Where would our records be hosted?",
    "Identify where survey data and backups would reside, who operates the infrastructure, and whether your required region or on-premises environment is available for the proposed deployment.",
  ],
  [
    "Identity & record access",
    "Who can read, change or export a survey?",
    "Request the role matrix for surveyors, reviewers and administrators. Confirm account provisioning, removal, authentication options and which events appear in the audit history.",
  ],
  [
    "Offline devices & encryption",
    "What happens if a device is lost before sync?",
    "Ask which records remain on the device, how long they remain there, how local storage and data in transit are protected, and what can be recovered or revoked while a device is offline.",
  ],
  [
    "Retention & recovery",
    "How would we restore or delete records?",
    "Agree retention and deletion periods for live records and backups. Ask who performs restores, when recovery was last tested, and which recovery targets apply to your agreement.",
  ],
  [
    "Assurance & incident support",
    "Which evidence and support terms apply to us?",
    "Request the scope and date of any applicable assessment, the incident reporting channel, escalation contacts, coverage hours and notification commitments. Confirm these in the service agreement.",
  ],
];

export default function Page() {
  return (
    <div className={styles.page}>
      <Provably
        hideNavbar
        theme="marine"
        sealMark="shield"
        breadcrumbs={
          <Breadcrumbs
            trail={[
              { href: "/", label: "Home" },
              { href: "/security-audit", label: "Security & Audit" },
            ]}
          />
        }
        copy={{
          eyebrow: "Space BQS / Security & audit",
          lines: ["Keep every", "record"],
          lastWord: "official.",
          subtext:
            "See who captures a reading, who reviews it and what the client receives. For an IT evaluation, verify how your survey data would be protected.",
        }}
        links={{
          explore: { label: "Review deployment controls", href: "#deployment-review" },
          howItWorks: { label: "Who handles the record?", href: "#record-heading" },
        }}
        toggle={{
          label: "Verify security controls",
          hint: { pointer: "Click to verify", touch: "Tap to verify" },
        }}
        stats={{
          value: 5,
          suffix: " controls",
          word: "Deployment",
          states: { off: "to review", on: "verified" },
          note: "Residency, access, offline, recovery & assurance",
        }}
        certificate={{
          kicker: "Audit Stage",
          type: "Survey Record Control",
          sampleLabel: "Security Lifecycle",
          demoNote: "Illustrative Space BQS record flow; confirm deployment controls below",
          recipientLabel: "Handled in",
          recipientNote: "role-scoped step",
          status: { on: "Verified", off: "Pending Review" },
          statusDetail: {
            on: "Control stage checked in the security walkthrough.",
            off: "Switch verification on to mark this stage reviewed.",
          },
          hover: "Inspect stage",
          share: { idle: "Copy stage link", done: "Link copied", locked: "Verify to share" },
          tilt: { rest: 9, verified: 4, hover: 0 },
        }}
        credentials={HERO_CREDENTIALS}
        statusBadge={{
          off: "READY TO AUDIT",
          on: "CONTROLS VERIFIED",
          tail: "SPACE BQS · SECURITY",
          stampTilt: -6,
          hint: "Inspect seal",
          back: {
            title: "Audit-Grade Trail",
            text: "One connected record from offline deck capture to supervisor review and handover.",
            action: "Back",
          },
        }}
        trust={{
          label: "Controls to verify for your deployment",
          logos: [],
        }}
        trustItems={[
          { label: "Offline deck capture", href: "#record-heading" },
          { label: "Draft · Submitted · Finalised", href: "#record-heading" },
          { label: "Hosting & residency", href: "#deployment-review" },
          { label: "Role-gated access", href: "#deployment-review" },
          { label: "Privacy & terms", href: "#security-contact" },
        ]}
      />

      <div className={styles.sectionsBand}>
        <LazyMount minHeight={520}><SecurityDataBento /></LazyMount>
        <div className={styles.wrap}>
          <section className={styles.block} id="record-heading-wrap" aria-labelledby="record-heading">
            <p className={styles.kicker}>01 / Survey workflow</p>
            <WeightText
              id="record-heading"
              tag="h2"
              mode="scroll-reveal"
              restWeight={400}
              activeWeight={700}
              className="font-display"
            >
              Who handles the record?
            </WeightText>
            <div className={styles.stages}>
              {stages.map(({ step, title, text, href, link, Icon }) => (
                <article key={step}>
                  <div className={styles.stageTop}>
                    <span className={styles.stageIcon} aria-hidden="true">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <p className={styles.kicker}>{step}</p>
                  </div>
                  <WeightText
                    tag="h3"
                    mode="scroll-reveal"
                    restWeight={400}
                    activeWeight={700}
                    className="font-display"
                  >
                    {title}
                  </WeightText>
                  <p>{text}</p>
                  <Link href={href}>
                    {link} <span aria-hidden="true">↗</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section
            className={`${styles.block} ${styles.review}`}
            id="deployment-review"
            aria-labelledby="review-heading"
          >
            <div>
              <p className={styles.kicker}>02 / Procurement review</p>
              <WeightText
                id="review-heading"
                tag="h2"
                mode="scroll-reveal"
                restWeight={400}
                activeWeight={700}
                className="font-display"
              >
                Verify your deployment.
              </WeightText>
              <p>
                Product workflows are described above. Hosting locations, technical controls and contractual commitments
                need confirmation for your environment.
              </p>
              <Link href="/services/deployment">Explore deployment requirements ↗</Link>
            </div>
            <div className={styles.questions}>
              {controls.map(([topic, question, answer]) => (
                <details key={topic}>
                  <summary>
                    <span>
                      <small>{topic}</small>
                      {question}
                    </span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section
            className={`${styles.block} ${styles.contact}`}
            id="security-contact-wrap"
            aria-labelledby="security-contact"
          >
            <div>
              <p className={styles.kicker}>03 / Contact &amp; documents</p>
              <WeightText
                id="security-contact"
                tag="h2"
                mode="scroll-reveal"
                restWeight={400}
                activeWeight={700}
                className="font-display"
              >
                Discuss a security requirement.
              </WeightText>
              <p>
                Send your questionnaire or ask where to report a concern. Start with a short description; ask for a
                suitable channel before sharing confidential survey records.
              </p>
              <a
                className={styles.primary}
                href={`mailto:${CONTACT_EMAIL}?subject=Space%20BQS%20security%20enquiry`}
              >
                Email the Space BQS team <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <nav aria-label="Privacy and legal documents">
              <WeightText
                tag="h3"
                mode="scroll-reveal"
                restWeight={400}
                activeWeight={700}
                className="font-display"
              >
                Website privacy &amp; terms
              </WeightText>
              <p>For website enquiries, optional analytics and privacy requests:</p>
              <Link href="/legal/privacy">Privacy policy ↗</Link>
              <Link href="/legal/cookies">Cookie policy ↗</Link>
              <Link href="/legal/terms">Terms of service ↗</Link>
            </nav>
          </section>
        </div>
      </div>

      <Chapter index="04" eyebrow="Keep exploring" title="Related evaluation pages." tone="white" lede="Security questions rarely stand alone. These pages cover the neighbouring ones.">
        <Tiles cols={3}>
          <Tile art="stack" tag="Hosting" title="Deployment requirements" href="/services/deployment" cta="Deployment">Public, private or on-premises, scoped around your infrastructure.</Tile>
          <Tile art="nodes" tag="Access" title="Integrations and API" href="/integrations-api" cta="Integrations">Webhooks, keys and MCP tools, issued per organisation.</Tile>
          <Tile art="doc" tag="Process" title="How to evaluate" href="/evaluate" cta="Evaluation guide">Questions to put to any vendor, including us.</Tile>
        </Tiles>
      </Chapter>
    </div>
  );
}
