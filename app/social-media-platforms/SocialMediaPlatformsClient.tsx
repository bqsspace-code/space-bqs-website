"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ExternalLink, ShieldCheck, Sparkles, Filter, ArrowUpRight, Globe, Layers, Terminal, BookOpen, Users } from "lucide-react";
import { SOCIAL_PLATFORMS, SocialPlatform } from "./socialPlatformsData";
import { PlatformIcon } from "./PlatformIcon";

type CategoryFilter = "all" | "core" | "dev" | "publishing" | "community";

export default function SocialMediaPlatformsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const categoryCounts = useMemo(() => {
    return {
      all: SOCIAL_PLATFORMS.length,
      core: SOCIAL_PLATFORMS.filter((p) => p.category === "core").length,
      dev: SOCIAL_PLATFORMS.filter((p) => p.category === "dev").length,
      publishing: SOCIAL_PLATFORMS.filter((p) => p.category === "publishing").length,
      community: SOCIAL_PLATFORMS.filter((p) => p.category === "community").length,
    };
  }, []);

  const filteredPlatforms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SOCIAL_PLATFORMS.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.handle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="relative min-h-screen bg-[#F7FBFD] text-[#031038] overflow-hidden">
      {/* Background ambient water glow & subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-marine opacity-35" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(25, 181, 201, 0.14) 0%, rgba(3, 42, 172, 0.08) 50%, transparent 75%)",
        }}
      />

      <style jsx global>{`
        @keyframes social-blob {
          0% {
            transform: translate(-100%, -100%) rotate(0deg);
          }
          25% {
            transform: translate(20%, -100%) rotate(90deg);
          }
          50% {
            transform: translate(20%, 20%) rotate(180deg);
          }
          75% {
            transform: translate(-100%, 20%) rotate(270deg);
          }
          100% {
            transform: translate(-100%, -100%) rotate(360deg);
          }
        }
        .animate-social-blob {
          animation: social-blob 10s linear infinite;
        }
      `}</style>

      {/* Hero Header Section */}
      <section className="relative pt-12 pb-12 sm:pt-16 sm:pb-16 border-b border-[#D3E9F3]/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <Link href="/" className="text-[#031038]/60 hover:text-[#032AAC] transition-colors font-medium">
              Home
            </Link>
            <span className="text-[#031038]/30">/</span>
            <span className="text-[#032AAC] font-semibold">Social Media Platforms</span>
          </div>

          <div className="mt-6 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#032AAC]/10 border border-[#032AAC]/20 px-3.5 py-1 text-xs font-semibold text-[#032AAC] shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#032AAC]" />
              <span>OFFICIAL VERIFIED REGISTRY · {categoryCounts.all} PLATFORMS</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#031038] leading-[1.1]">
              Find Space BQS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#032AAC] via-[#1B4FD1] to-[#19B5C9]">Everywhere</span>
            </h1>
            <p className="text-base sm:text-lg text-[#52657c] leading-relaxed max-w-2xl">
              A verified directory of all official and registered Space BQS channels across the web. Follow our engineering releases, ASTM Table 54B calculation research, and live deck tools.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar Section */}
      <section className="sticky top-14 z-30 bg-[#F7FBFD]/90 backdrop-blur-md border-b border-[#D3E9F3]/80 py-4 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === "all"
                    ? "bg-[#032AAC] text-white shadow-md shadow-[#032AAC]/20"
                    : "bg-white/80 text-[#52657c] hover:text-[#031038] hover:bg-white border border-[#D3E9F3]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Platforms</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeCategory === "all" ? "bg-white/20 text-white" : "bg-slate-100 text-[#52657c]"
                }`}>
                  {categoryCounts.all}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("core")}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === "core"
                    ? "bg-[#032AAC] text-white shadow-md shadow-[#032AAC]/20"
                    : "bg-white/80 text-[#52657c] hover:text-[#031038] hover:bg-white border border-[#D3E9F3]"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Core Channels</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeCategory === "core" ? "bg-white/20 text-white" : "bg-slate-100 text-[#52657c]"
                }`}>
                  {categoryCounts.core}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("dev")}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === "dev"
                    ? "bg-[#032AAC] text-white shadow-md shadow-[#032AAC]/20"
                    : "bg-white/80 text-[#52657c] hover:text-[#031038] hover:bg-white border border-[#D3E9F3]"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Engineering &amp; Code</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeCategory === "dev" ? "bg-white/20 text-white" : "bg-slate-100 text-[#52657c]"
                }`}>
                  {categoryCounts.dev}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("publishing")}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === "publishing"
                    ? "bg-[#032AAC] text-white shadow-md shadow-[#032AAC]/20"
                    : "bg-white/80 text-[#52657c] hover:text-[#031038] hover:bg-white border border-[#D3E9F3]"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Research &amp; Articles</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeCategory === "publishing" ? "bg-white/20 text-white" : "bg-slate-100 text-[#52657c]"
                }`}>
                  {categoryCounts.publishing}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("community")}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === "community"
                    ? "bg-[#032AAC] text-white shadow-md shadow-[#032AAC]/20"
                    : "bg-white/80 text-[#52657c] hover:text-[#031038] hover:bg-white border border-[#D3E9F3]"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Community &amp; Hubs</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeCategory === "community" ? "bg-white/20 text-white" : "bg-slate-100 text-[#52657c]"
                }`}>
                  {categoryCounts.community}
                </span>
              </button>
            </div>

            {/* Search Input Box */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52657c]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search platform or handle..."
                className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-white border border-[#D3E9F3] text-[#031038] placeholder:text-[#52657c] focus:outline-none focus:ring-2 focus:ring-[#032AAC] focus:border-transparent transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredPlatforms.length === 0 ? (
            <div className="rounded-3xl border border-[#D3E9F3] bg-white p-12 text-center max-w-lg mx-auto shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#031038]">No platforms found</h3>
              <p className="text-xs text-[#52657c] mt-1.5 leading-relaxed">
                No matching verified profile for &quot;{searchQuery}&quot;. Try searching for &quot;GitHub&quot;, &quot;YouTube&quot;, or reset your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#032AAC] text-white text-xs font-semibold hover:bg-[#1B4FD1] transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlatforms.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full min-h-[240px] rounded-[18px] flex flex-col overflow-hidden bg-white shadow-[0_4px_20px_rgba(3,16,56,0.04),0_1px_3px_rgba(3,16,56,0.06)] border border-[#D3E9F3] hover:border-[#19B5C9] hover:shadow-[0_16px_36px_rgba(3,42,172,0.12)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Rotating Gradient Blob Behind Glass (Inspired by aibizmod) */}
                  <div
                    className={`absolute top-1/2 left-1/2 w-[160px] h-[160px] rounded-full opacity-40 filter blur-[26px] z-0 animate-social-blob bg-gradient-to-r ${platform.blobGradient}`}
                  />

                  {/* Glass Inner Container */}
                  <div className="relative inset-[3px] bg-white/95 backdrop-blur-[20px] rounded-[15px] z-10 p-5 flex flex-col justify-between h-full">
                    <div className="space-y-3.5">
                      {/* Top Header: Icon + Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md bg-gradient-to-br ${platform.iconGradient} shrink-0`}
                        >
                          <PlatformIcon id={platform.id} className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border shrink-0 ${
                            platform.badge === "Official Channel"
                              ? "bg-blue-50 text-[#032AAC] border-blue-200"
                              : platform.badge === "Verified Org"
                              ? "bg-cyan-50 text-cyan-800 border-cyan-200"
                              : platform.badge === "Official Publication"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          {platform.badge}
                        </span>
                      </div>

                      {/* Title & Handle */}
                      <div>
                        <h3 className="font-display font-bold text-base text-[#031038] group-hover:text-[#032AAC] transition-colors leading-snug">
                          {platform.name}
                        </h3>
                        <p className="mt-0.5 text-xs font-mono text-[#032AAC]/75 tracking-tight font-medium truncate">
                          {platform.handle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs leading-relaxed text-[#52657c] line-clamp-3">
                        {platform.description}
                      </p>
                    </div>

                    {/* Footer link button */}
                    <div className="pt-4 border-t border-[#D3E9F3]/60 flex items-center justify-between mt-auto">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#032AAC] group-hover:text-[#19B5C9] transition-colors">
                        <span>Open Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                      <ExternalLink className="w-3 h-3 text-[#52657c]/60 group-hover:text-[#032AAC] transition-colors" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Inquiries & Collaboration Card */}
      <section className="py-12 bg-white border-t border-[#D3E9F3]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[#D3E9F3] bg-gradient-to-br from-[#F7FBFD] via-[#EAF4F9] to-white p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="text-[10px] font-mono tracking-widest text-[#032AAC] uppercase font-bold">
                PARTNERSHIPS &amp; CHANNEL VERIFICATION
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#031038]">
                Don&apos;t see your preferred platform?
              </h3>
              <p className="text-sm text-[#52657c] leading-relaxed">
                If you represent a maritime registry, port community system, or technical publication and want to verify a channel or integrate with the Space BQS ASTM Table 54B engine, our team is ready to connect.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold text-white bg-[#032AAC] hover:bg-[#1B4FD1] shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request a Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sample-report"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-medium text-[#031038] bg-white border border-[#D3E9F3] hover:bg-[#F7FBFD] transition-all"
              >
                <span>View Sample Report</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
