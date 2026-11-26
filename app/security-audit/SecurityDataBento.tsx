"use client";

import { useState } from "react";
import Link from "next/link";
import { FileCheck2, Lock, ShieldCheck } from "lucide-react";
import WeightText from "../components/WeightText";
import styles from "./security.module.css";

/**
 * 60x26 hex-staggered continent mask for the dotted world map.
 * '#' renders a land dot; '.' leaves ocean whitespace.
 */
const WORLD_ROWS = [
  "............................................................",
  ".............######.............##..........................",
  ".......############.##.........####.........................",
  "....###################.......######......###########.......",
  "...#####################.....########...################....",
  "....###################......############################...",
  ".....#################......##############################..",
  "......###############.......#############################...",
  ".......#############........############################....",
  "........##########...........#######.##################.....",
  ".........######...............#####...################......",
  "..........###................#######...##############.......",
  "............##..............#########...############........",
  ".............###...........##########....#########..........",
  ".............#####.........###########....######............",
  ".............#######........##########.....####...#.........",
  "..............#######.......#########............###........",
  "..............#######........#######..............##........",
  "...............#####..........#####.........................",
  "...............#####...........####..............#####......",
  "................###............###..............#######.....",
  "................##..............................#######.....",
  "................#................................####.......",
  "............................................................",
];

type MapRegion = {
  id: string;
  label: string;
  x: number; // percentage 0..100
  y: number; // percentage 0..100
  labelPlacement: "top" | "bottom" | "left" | "right";
  detail: string;
};

const MAP_REGIONS: MapRegion[] = [
  {
    id: "usa",
    label: "USA",
    x: 22.5,
    y: 27.5,
    labelPlacement: "top",
    detail: "North America regional contact & deployment scoping",
  },
  {
    id: "ksa",
    label: "KSA",
    x: 57.5,
    y: 48.5,
    labelPlacement: "left",
    detail: "Saudi Arabia regional contact & residency review",
  },
  {
    id: "uae",
    label: "UAE",
    x: 63.5,
    y: 46.5,
    labelPlacement: "top",
    detail: "UAE & Middle East regional contact",
  },
  {
    id: "india",
    label: "India",
    x: 71,
    y: 51,
    labelPlacement: "right",
    detail: "Sales & technical support hub",
  },
  {
    id: "singapore",
    label: "Singapore",
    x: 78.5,
    y: 67,
    labelPlacement: "bottom",
    detail: "APAC regional contact & maritime hub context",
  },
];

const RIGHT_CARDS = [
  {
    title: "Private & On-Premise Scoping",
    description:
      "Discuss dedicated cloud or on-premises deployment requirements so survey records stay inside your network boundaries.",
  },
  {
    title: "Role-Gated Record Access",
    description:
      "Separate deck capture, supervisor review, and report exports with role permissions, per-org API keys, and audit history.",
  },
  {
    title: "Offline Capture & Regional Support",
    description:
      "Record soundings offline on deck, sync cleanly when signal returns, and reach regional Space BQS support teams.",
  },
];

const ASSURANCE_ITEMS = [
  {
    title: "Assurance Scope",
    subtitle: "Assessments on request",
    href: "#deployment-review",
    tone: "ocean",
    Icon: ShieldCheck,
  },
  {
    title: "Website Privacy",
    subtitle: "Privacy & cookie controls",
    href: "/legal/privacy",
    tone: "navy",
    Icon: Lock,
  },
  {
    title: "Audit Trail",
    subtitle: "Locked final records",
    href: "/features/calculation-audit",
    tone: "slate",
    Icon: FileCheck2,
  },
] as const;

const COLS = 60;
const ROWS = WORLD_ROWS.length;
const DX = 10;
const DY = 9.2;

const WORLD_DOTS = WORLD_ROWS.flatMap((row, r) =>
  [...row].flatMap((cell, c) =>
    cell === "#"
      ? [
          {
            key: `${r}-${c}`,
            cx: c * DX + (r % 2 ? DX * 0.45 : 0) + 6,
            cy: r * DY + 6,
          },
        ]
      : []
  )
);

const VIEW_W = COLS * DX + 12;
const VIEW_H = ROWS * DY + 12;

export default function SecurityDataBento() {
  const [activeRegion, setActiveRegion] = useState<string>("india");
  const current = MAP_REGIONS.find((r) => r.id === activeRegion) ?? MAP_REGIONS[0];

  return (
    <section
      className={styles.bentoSection}
      id="data-safeguards"
      aria-labelledby="safeguards-heading"
    >
      <div className={styles.wrap}>
        <div className={styles.bentoHeader}>
          <h2 id="safeguards-heading" className={`${styles.bentoTitle} font-display`}>
            <WeightText
              tag="span"
              mode="scroll-reveal"
              restWeight={400}
              activeWeight={700}
              baseColor="#032AAC"
              activeColor="#032AAC"
              accentColor="#19B5C9"
              className="block"
            >
              Safeguarding Your Data,
            </WeightText>
            <WeightText
              tag="span"
              mode="scroll-reveal"
              restWeight={400}
              activeWeight={700}
              baseColor="#031038"
              activeColor="#031038"
              accentColor="#19B5C9"
              className="block"
            >
              Built Around Your Deployment
            </WeightText>
          </h2>
        </div>

        <div className={styles.bentoGrid}>
          {/* Left tall card: dotted world map + regional hosting & residency */}
          <article className={styles.bentoMapCard}>
            <div className={styles.bentoCardCopy}>
              <WeightText
                tag="h3"
                mode="scroll-reveal"
                restWeight={400}
                activeWeight={700}
                className="font-display"
              >
                Regional Hosting &amp; Residency
              </WeightText>
              <p>
                Confirm where survey records and backups reside across the regions where your teams
                operate, including USA, Saudi Arabia, UAE, India &amp; Singapore.
              </p>
            </div>

            <div className={styles.mapStage} role="region" aria-label="Regional deployment map">
              <svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                className={styles.mapSvg}
                aria-hidden="true"
              >
                <g className={styles.mapDots}>
                  {WORLD_DOTS.map((dot) => (
                    <circle key={dot.key} cx={dot.cx} cy={dot.cy} r={2.25} />
                  ))}
                </g>
              </svg>

              {MAP_REGIONS.map((region) => {
                const isActive = region.id === activeRegion;
                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setActiveRegion(region.id)}
                    onMouseEnter={() => setActiveRegion(region.id)}
                    onFocus={() => setActiveRegion(region.id)}
                    aria-pressed={isActive}
                    aria-label={`${region.label}: ${region.detail}`}
                    className={styles.mapPin}
                    data-active={isActive}
                    data-placement={region.labelPlacement}
                    style={{ left: `${region.x}%`, top: `${region.y}%` }}
                  >
                    <span className={styles.mapPinPulse} aria-hidden="true" />
                    <span className={styles.mapPinDot} aria-hidden="true" />
                    <span className={styles.mapPinPill}>{region.label}</span>
                  </button>
                );
              })}
            </div>

            <p className={styles.mapCaption} aria-live="polite">
              <span>{current.label}</span> — {current.detail}
            </p>
          </article>

          {/* Right stacked cards */}
          <div className={styles.bentoRightStack}>
            {RIGHT_CARDS.map((card) => (
              <article key={card.title} className={styles.bentoSmallCard}>
                <WeightText
                  tag="h3"
                  mode="scroll-reveal"
                  restWeight={400}
                  activeWeight={700}
                  className="font-display"
                >
                  {card.title}
                </WeightText>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom verification & governance bar */}
        <div className={styles.scaleBar}>
          <div className={styles.scaleCopy}>
            <WeightText
              tag="h3"
              mode="scroll-reveal"
              restWeight={400}
              activeWeight={700}
              className="font-display"
            >
              Verify Before Go-Live
            </WeightText>
            <p>
              Confirm applicable assessments, data residency, and contractual controls for your
              environment.
            </p>
          </div>

          <div className={styles.scaleBadges}>
            {ASSURANCE_ITEMS.map(({ title, subtitle, href, tone, Icon }) => {
              const inner = (
                <>
                  <span className={styles.scaleIcon} data-tone={tone} aria-hidden="true">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{subtitle}</small>
                  </span>
                </>
              );

              return href.startsWith("#") ? (
                <a key={title} href={href} className={styles.scaleBadgeItem}>
                  {inner}
                </a>
              ) : (
                <Link key={title} href={href} className={styles.scaleBadgeItem}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
