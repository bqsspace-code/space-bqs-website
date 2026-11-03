"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Ship, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function AuroraHeroSection() {
  return (
    <AuroraBackground className="min-h-[85vh] justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative z-10 flex flex-col items-center max-w-5xl mx-auto text-center"
      >
        {/* Eyebrow Badge with Lucide Icon */}
        <div className="liquid-glass-ui liquid-glass-ui--strong inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/80 dark:border-white/10 shadow-sm mb-6">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-semibold tracking-wide uppercase text-slate-800 dark:text-slate-200">
            Next-Gen Marine Bunker Surveying
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-950 dark:text-white max-w-4xl">
          Precision ASTM Calculations with{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            Tamper-Proof
          </span>{" "}
          Certificates
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-light">
          Capture soundings offline on deck, compute temperature-corrected metric tons via Table 54B, and issue locked survey certificates in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-2 bg-[#032AAC] hover:bg-[#1B4FD1] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <span>Request Live Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/platform"
            className="liquid-glass-ui inline-flex items-center gap-2 text-slate-900 dark:text-white border border-slate-200 dark:border-white/20 px-6 py-3 rounded-full text-sm font-semibold transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Explore Platform</span>
          </Link>
        </div>

        {/* Vessel Asset Card with Unsplash Marine Image & Badge */}
        <div className="liquid-glass-ui mt-12 w-full max-w-3xl rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-2xl p-2">
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
              alt="Commercial marine vessel at sea"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <div className="flex items-center gap-3 text-white">
                <div className="liquid-glass-ui liquid-glass-ui--dark p-2 rounded-lg">
                  <Ship className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Bunker Delivery & ROB Survey Engine</p>
                  <p className="text-xs text-white/75">Vessel Tank Register & Offline Calculation Sync</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
