"use client";

import React, { useState } from "react";
import { AuroraBackgroundDemo } from "@/components/ui/demo";
import { AuroraHeroSection } from "@/components/ui/aurora-hero";
import { Sparkles, Layout, Eye } from "lucide-react";

export function DemoShowcase() {
  const [activeTab, setActiveTab] = useState<"bqs-hero" | "raw-demo">("bqs-hero");

  return (
    <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Aurora UI Showcase</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Aurora Background Component
          </h2>
          <p className="text-sm text-slate-500">
            Preview the component integrated with BQS branding or view the raw Aceternity UI demo.
          </p>
        </div>

        <div className="inline-flex rounded-xl bg-slate-100 p-1 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("bqs-hero")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === "bqs-hero"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>BQS Hero Integration</span>
          </button>
          <button
            onClick={() => setActiveTab("raw-demo")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === "raw-demo"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Standard UI Demo</span>
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
        {activeTab === "bqs-hero" ? (
          <AuroraHeroSection />
        ) : (
          <div className="overflow-hidden">
            <AuroraBackgroundDemo />
          </div>
        )}
      </div>
    </div>
  );
}
