"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/**
 * LiquidTankStage — the core scroll-driven liquid tank visual.
 *
 * A pinned (sticky) full-viewport stage ~500vh tall. As the visitor scrolls,
 * the story progresses through 5 beats:
 * 0-15%: Hero (calm tank, certificate card)
 * 15-40%: Capture (sounding tape drops, volume appears)
 * 40-65%: Calculate (free water subtracted, VCF correction)
 * 65-85%: Check (per-tank audit rows tick in)
 * 85-100%: Lock (surface flat, certificate resolves, Locked stamp)
 *
 * The surface wave amplitude follows scroll velocity.
 * Canvas + DOM overlay. Pauses off-screen. Static under reduced-motion.
 */
export default function LiquidTankStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const progressRef = useRef(0);
  const scrollVelRef = useRef(0);
  const lastScrollRef = useRef(0);
  const isVisibleRef = useRef(true);
  const timeRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const getPhase = (p: number) => {
    if (p < 0.15) return "hero";
    if (p < 0.40) return "capture";
    if (p < 0.65) return "calculate";
    if (p < 0.85) return "check";
    return "lock";
  };

  const phase = getPhase(progress);

  // Draw the tank canvas
  const drawTank = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const p = progressRef.current;
    const currentPhase = getPhase(p);
    scrollVelRef.current *= 0.93;
    timeRef.current += 0.005;

    const agitation = Math.min(Math.abs(scrollVelRef.current) * 0.25, 1);

    // Tank outline
    const tankL = w * 0.12;
    const tankR = w * 0.55;
    const tankT = h * 0.08;
    const tankB = h * 0.88;
    const tankW = tankR - tankL;
    const tankH = tankB - tankT;

    // Tank shell
    ctx.strokeStyle = "#D3E9F3";
    ctx.lineWidth = 2 * dpr;
    ctx.beginPath();
    const cr = 12 * dpr;
    ctx.roundRect(tankL * dpr, tankT * dpr, tankW * dpr, tankH * dpr, cr);
    ctx.stroke();

    // Inner hairlines (tank marks)
    ctx.strokeStyle = "rgba(211, 233, 243, 0.3)";
    ctx.lineWidth = 1 * dpr;
    for (let i = 1; i <= 4; i++) {
      const y = tankT + (tankH * i) / 5;
      ctx.beginPath();
      ctx.moveTo((tankL + 4) * dpr, y * dpr);
      ctx.lineTo((tankR - 4) * dpr, y * dpr);
      ctx.stroke();
    }

    // Oil fill level — rises with progress
    const fillLevel = currentPhase === "hero"
      ? 0.6
      : currentPhase === "capture"
        ? 0.35 + (p - 0.15) / 0.25 * 0.35
        : currentPhase === "calculate"
          ? 0.68 - (p - 0.4) / 0.25 * 0.05
          : 0.63;

    const oilTop = tankB - tankH * fillLevel;

    // Oil body
    const oilGrad = ctx.createLinearGradient(0, oilTop * dpr, 0, tankB * dpr);
    oilGrad.addColorStop(0, "#032AAC");
    oilGrad.addColorStop(0.5, "#031858");
    oilGrad.addColorStop(1, "#031038");
    ctx.fillStyle = oilGrad;

    // Wave surface
    ctx.beginPath();
    const amp = currentPhase === "lock"
      ? 1
      : (4 + agitation * 12) * (1 + fillLevel * 0.5);

    ctx.moveTo(tankL * dpr, tankB * dpr);

    for (let x = tankL; x <= tankR; x += 1) {
      const normalX = (x - tankL) / tankW;
      let y = oilTop;
      y += Math.sin(normalX * 8 + timeRef.current * 2) * amp;
      y += Math.sin(normalX * 14 + timeRef.current * 1.3) * amp * 0.3;
      ctx.lineTo(x * dpr, Math.max(y, tankT + 2) * dpr);
    }

    ctx.lineTo(tankR * dpr, tankB * dpr);
    ctx.closePath();
    ctx.fill();

    // Free water layer (visible in calculate phase)
    if (currentPhase === "capture" || currentPhase === "calculate") {
      const waterH = currentPhase === "calculate"
        ? Math.max(0, 20 * (1 - (p - 0.4) / 0.25 * 3))
        : 20;

      if (waterH > 0.5) {
        const waterTop = tankB - waterH;
        ctx.fillStyle = "rgba(25, 181, 201, 0.5)";
        ctx.fillRect(
          (tankL + 2) * dpr,
          waterTop * dpr,
          (tankW - 4) * dpr,
          waterH * dpr
        );
      }
    }

    // Sounding tape (drops in capture phase)
    if (currentPhase !== "hero" || p > 0.1) {
      const tapeProgress = currentPhase === "hero"
        ? 0
        : currentPhase === "capture"
          ? (p - 0.15) / 0.25
          : 1;

      const tapeEndY = tankT + tapeProgress * (oilTop - tankT + 10);
      const tapeX = tankL + tankW * 0.3;

      ctx.strokeStyle = "#A5D3E8";
      ctx.lineWidth = 1.5 * dpr;
      ctx.setLineDash([4 * dpr, 3 * dpr]);
      ctx.beginPath();
      ctx.moveTo(tapeX * dpr, (tankT - 10) * dpr);
      ctx.lineTo(tapeX * dpr, tapeEndY * dpr);
      ctx.stroke();
      ctx.setLineDash([]);

      // Tape weight
      ctx.fillStyle = "#19B5C9";
      ctx.beginPath();
      ctx.arc(tapeX * dpr, tapeEndY * dpr, 4 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    // Thermometer (right side of tank)
    if (currentPhase === "calculate" || currentPhase === "check" || currentPhase === "lock") {
      const thermoX = tankR + 16;
      const thermoTop = tankT + tankH * 0.2;
      const thermoBottom = tankT + tankH * 0.8;
      const thermoH = thermoBottom - thermoTop;

      // Outer
      ctx.strokeStyle = "#D3E9F3";
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      ctx.roundRect((thermoX - 4) * dpr, thermoTop * dpr, 8 * dpr, thermoH * dpr, 4 * dpr);
      ctx.stroke();

      // Mercury
      const mercuryH = thermoH * 0.65;
      ctx.fillStyle = "#19B5C9";
      ctx.beginPath();
      ctx.roundRect(
        (thermoX - 2) * dpr,
        (thermoBottom - mercuryH) * dpr,
        4 * dpr,
        mercuryH * dpr,
        2 * dpr
      );
      ctx.fill();

      // Label
      ctx.fillStyle = "rgba(3, 16, 56, 0.5)";
      ctx.font = `${10 * dpr}px system-ui`;
      ctx.fillText("40°C", (thermoX + 10) * dpr, (thermoBottom - mercuryH + 12) * dpr);
    }

    // Check phase: tank rows ticking
    if (currentPhase === "check" || currentPhase === "lock") {
      const checkProgress = currentPhase === "check" ? (p - 0.65) / 0.2 : 1;
      const rows = [
        { name: "1P (FO)", mt: "225.567" },
        { name: "1S (FO)", mt: "232.252" },
      ];

      rows.forEach((row, i) => {
        const rowAlpha = Math.max(0, Math.min(1, checkProgress * 3 - i * 0.8));
        if (rowAlpha <= 0) return;

        const ry = tankT + 20 + i * 28;
        ctx.globalAlpha = rowAlpha;
        ctx.fillStyle = "rgba(25, 181, 201, 0.12)";
        ctx.fillRect(
          (tankL + 4) * dpr,
          ry * dpr,
          (tankW - 8) * dpr,
          22 * dpr
        );

        ctx.fillStyle = "#031038";
        ctx.font = `500 ${11 * dpr}px system-ui`;
        ctx.fillText(row.name, (tankL + 10) * dpr, (ry + 15) * dpr);

        ctx.fillStyle = "#032AAC";
        ctx.font = `700 ${11 * dpr}px system-ui`;
        ctx.textAlign = "right";
        ctx.fillText(`${row.mt} MT`, (tankR - 10) * dpr, (ry + 15) * dpr);
        ctx.textAlign = "left";

        // Check icon
        ctx.fillStyle = "#19B5C9";
        ctx.beginPath();
        ctx.arc((tankR - 24) * dpr, (ry + 11) * dpr, 5 * dpr, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      });
    }
  }, []);

  const animate = useCallback(() => {
    if (!isVisibleRef.current) return;
    drawTank();
    animRef.current = requestAnimationFrame(animate);
  }, [drawTank]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerH = rect.height - window.innerHeight;
      if (containerH <= 0) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / containerH));

      progressRef.current = p;
      setProgress(p);

      const current = window.scrollY;
      scrollVelRef.current = current - lastScrollRef.current;
      lastScrollRef.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount to sync initial scroll position
    onScroll();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !reducedMotion) {
          animRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );
    observer.observe(container);

    if (!reducedMotion) {
      animRef.current = requestAnimationFrame(animate);
    } else {
      drawTank();
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [animate, drawTank, reducedMotion]);

  const phaseTargets = [0.05, 0.25, 0.50, 0.75, 0.95];

  const scrollToPhase = (targetP: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerH = rect.height - window.innerHeight;
    window.scrollTo({
      top: containerTop + containerH * targetP,
      behavior: "smooth",
    });
  };

  // Content for each beat
  const beats = {
    hero: {
      align: "center" as const,
      content: (
        <div className="space-y-5 text-center max-w-lg mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-lagoon-500">
            Quantity only. Delivery, ROB and debunkering.
          </p>
        </div>
      ),
    },
    capture: {
      align: "left" as const,
      content: (
        <div className="space-y-4 max-w-md">
          <h2 className="font-display text-3xl font-bold text-abyss-900 tracking-tight lg:text-4xl">
            Measure on deck. Enter it once.
          </h2>
          <p className="text-body leading-relaxed">
            Pick ullage or sounding for each tank. The app turns the reading into volume using the vessel&apos;s strapping table. A reading outside the table is refused, never guessed.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Strapping table", "No extrapolation", "Works offline for 72 h"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-tide-200 bg-mist-100 px-3 py-1.5 text-xs font-medium text-abyss-900"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    calculate: {
      align: "right" as const,
      content: (
        <div className="space-y-4 max-w-md ml-auto">
          <h2 className="font-display text-3xl font-bold text-abyss-900 tracking-tight lg:text-4xl">
            Water out. Temperature corrected.
          </h2>
          <p className="text-body leading-relaxed">
            Net volume is observed volume minus free water. The correction factor comes from ASTM D1250-04 Table 54B. Corrected volume times density gives mass in metric tons.
          </p>
          <div className="flex flex-wrap gap-2 justify-end">
            {["Table 54B", "4-decimal VCF", "In air or in vacuum"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-tide-200 bg-mist-100 px-3 py-1.5 text-xs font-medium text-abyss-900"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    check: {
      align: "center" as const,
      content: (
        <div className="space-y-4 max-w-md mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-abyss-900 tracking-tight lg:text-4xl">
            Every line is checked.
          </h2>
          <p className="text-body leading-relaxed">
            If one tank fails, that line shows the reason and the others keep calculating. Supervisors review before anything is issued.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Per-line audit", "Survey no. BQS-YYYY-0001", "Supervisor review"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-tide-200 bg-mist-100 px-3 py-1.5 text-xs font-medium text-abyss-900"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    lock: {
      align: "center" as const,
      content: (
        <div className="space-y-5 max-w-lg mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-abyss-900 tracking-tight lg:text-5xl">
            Finalised means locked.
          </h2>
          <p className="text-body leading-relaxed">
            A finalised survey cannot be edited or deleted. Owners and charterers get PDF and Excel proof without a login.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <a href="/request-demo" className="btn-primary">
              Request a demo
            </a>
            <a href="/sample-report" className="btn-secondary">
              See sample report
            </a>
          </div>
          <p className="text-xs text-muted italic">
            Photos and signatures are on the roadmap.
          </p>
        </div>
      ),
    },
  };

  const currentBeat = beats[phase];

  // For reduced motion, stack sections instead of pinning
  if (reducedMotion) {
    return (
      <div className="space-y-24 py-16 max-w-6xl mx-auto px-4">
        {Object.entries(beats).map(([key, beat]) => (
          <div key={key} className={`${beat.align === "right" ? "text-right" : beat.align === "center" ? "text-center" : "text-left"}`}>
            {beat.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height: "500vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full w-full max-w-6xl mx-auto px-4 flex items-center">
          {/* Tank canvas — left side on desktop, background water on mobile */}
          <div className="absolute left-4 lg:left-4 top-1/2 -translate-y-1/2 w-[90%] lg:w-[45%] h-[65vh] lg:h-[75vh] opacity-20 lg:opacity-100 pointer-events-none lg:pointer-events-auto transition-opacity duration-500">
            <canvas
              ref={canvasRef}
              className="w-full h-full block"
              aria-hidden="true"
            />
          </div>

          {/* Content overlay — right side on desktop, full on mobile */}
          <div className={`relative z-10 w-full lg:w-[50%] lg:ml-auto transition-all duration-700`}
            style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
          >
            <div
              key={phase}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
            >
              {currentBeat.content}
            </div>
          </div>

          {/* Progress indicator — interactive buttons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-20">
            {["Hero", "Capture", "Calculate", "Check", "Lock"].map((label, i) => {
              const phases = ["hero", "capture", "calculate", "check", "lock"];
              const isActive = phase === phases[i];
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => scrollToPhase(phaseTargets[i])}
                  className="group flex items-center gap-2 py-1 text-left cursor-pointer focus:outline-none"
                  aria-label={`Jump to ${label} phase`}
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isActive
                        ? "w-6 bg-marine-700"
                        : "w-2 bg-tide-200 group-hover:bg-shallow-300"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-medium uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? "text-marine-700 opacity-100"
                        : "text-abyss-900 opacity-0 group-hover:opacity-60"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
