"use client";

import { useCallback, useEffect, useState } from "react";
import { ChartNoAxesCombined, FolderLock, ShieldCheck, type LucideIcon } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const EMIL_EASE_OUT = [0.23, 1, 0.32, 1] as const;
const BUBBLE_EASE = [0.22, 1, 0.36, 1] as const;

const CONTROL_CARDS = [
  {
    icon: ShieldCheck,
    outcome: "Clear roles. Deliberate approvals.",
    title: "Permissions & approvals",
    description:
      "Define Admin, Operator, Supervisor, GM, and Finance permissions. Configure approval thresholds and maker-checker separation where required.",
  },
  {
    icon: FolderLock,
    outcome: "The right information. The right access.",
    title: "Documents & customer access",
    description:
      "Plan encrypted document storage, authorised links, receiver-ID retention, customer tracking, and release-token booking.",
  },
  {
    icon: ChartNoAxesCombined,
    outcome: "Connected records. Useful reporting.",
    title: "Reports & data exchange",
    description:
      "Scope movement, billing, utilisation, overstay, arrival, and exceptions reports. Include saved report templates, validated Excel imports, and documented integration endpoints.",
  },
] as const;

function MinimalBubbleCard({
  index,
  title,
  description,
  icon: Icon,
  outcome,
}: {
  index: number;
  title: string;
  description: string;
  icon: LucideIcon;
  outcome: string;
}) {
  const motionPreference = useReducedMotion();
  const [reducedMotion, setReducedMotion] = useState(false);
  // Keep the first client render identical to the server, then apply the preference.
  useEffect(() => setReducedMotion(!!motionPreference), [motionPreference]);
  const [hovered, setHovered] = useState(false);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 26, mass: 0.8 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 26, mass: 0.8 });

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") return;
      const rect = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      event.currentTarget.style.setProperty("--bubble-x", `${(px * 100).toFixed(1)}%`);
      event.currentTarget.style.setProperty("--bubble-y", `${(py * 100).toFixed(1)}%`);

      if (!reducedMotion) {
        rawRotateY.set((px - 0.5) * 4.5);
        rawRotateX.set((0.5 - py) * 4.5);
      }
    },
    [rawRotateX, rawRotateY, reducedMotion],
  );

  const handlePointerEnter = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      setHovered(true);
      handlePointerMove(event);
    },
    [handlePointerMove],
  );

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
  }, [rawRotateX, rawRotateY]);

  return (
    <motion.article
      data-hovered={hovered}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 14, scale: 0.97 }
      }
      whileInView={
        reducedMotion
          ? { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } }
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.42,
                delay: index * 0.06,
                ease: EMIL_EASE_OUT,
              },
            }
      }
      viewport={{ once: true, amount: 0.25 }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -6,
              scale: 1.012,
              transition: { duration: 0.34, ease: BUBBLE_EASE },
            }
      }
      style={
        reducedMotion
          ? undefined
          : {
              transformPerspective: 1100,
              rotateX,
              rotateY,
            }
      }
      className="control-bubble-card relative flex flex-col p-6 sm:p-7"
    >
      {/* Clipped water-glass refraction & hover sheen (outer shadow stays unclipped) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        <span className="control-bubble-pointer" />
        <span className="control-bubble-rim" />
        <span className="control-bubble-caustic" />
        {!reducedMotion && (
          <motion.span
            initial={false}
            animate={
              hovered
                ? { x: ["-120%", "240%"], opacity: [0, 0.45, 0] }
                : { x: "-120%", opacity: 0 }
            }
            transition={{ duration: 0.68, ease: BUBBLE_EASE }}
            className="absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/75 to-transparent"
          />
        )}
      </div>

      <div className="cargo-control-heading"><span className="cargo-control-icon"><Icon aria-hidden="true" strokeWidth={1.5} /></span><span className="cargo-control-number">0{index + 1} / 03</span></div>
      <h3 className="relative z-10 font-display text-xl font-semibold text-[#032aac]">
        {title}
      </h3>
      <p className="relative z-10 mt-3 flex-1 text-sm leading-7 text-[#52657c]">
        {description}
      </p>
      <span className="cargo-control-outcome">{outcome}</span>
    </motion.article>
  );
}

export default function CargoWmsControls() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {CONTROL_CARDS.map((card, index) => (
        <MinimalBubbleCard
          key={card.title}
          index={index}
          title={card.title}
          description={card.description}
          icon={card.icon}
          outcome={card.outcome}
        />
      ))}
    </div>
  );
}
