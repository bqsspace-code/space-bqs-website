"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import { CountryFlag } from "./flags/CountryFlags";
import {
  OFFICE_LOCATIONS,
  MAIN_OFFICE_DISPLAY,
  MAIN_OFFICE_TEL,
  OfficeLocation,
} from "../lib/contact-data";

interface ContactDropdownCardProps {
  onClose?: () => void;
  className?: string;
  caretOffsetPx?: number;
}

export default function ContactDropdownCard({
  onClose,
  className = "",
  caretOffsetPx = 54,
}: ContactDropdownCardProps) {
  const reducedMotion = useReducedMotion();

  // Split into 2 columns (4 each)
  const leftColumn = OFFICE_LOCATIONS.slice(0, 4);
  const rightColumn = OFFICE_LOCATIONS.slice(4, 8);

  const renderLocationItem = (loc: OfficeLocation) => {
    const isClickableTel = Boolean(loc.phone);
    const href = isClickableTel ? `tel:${loc.phone}` : "/contact";

    return (
      <a
        key={loc.id}
        href={href}
        className="group flex items-center gap-3.5 rounded-xl p-2.5 transition-all duration-150 hover:bg-[#e4efff] active:bg-[#d5e7fc] focus-visible:outline-2 focus-visible:outline-[#032aac] focus-visible:bg-[#e4efff]"
        title={isClickableTel ? `Call ${loc.country} office (${loc.displayNumber})` : `Inquire for ${loc.country}`}
        onClick={() => {
          setTimeout(() => onClose?.(), 250);
        }}
      >
        {/* Country Flag Container */}
        <span
          className="flex h-6 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[5px] border border-[#c8dfea] bg-white shadow-2xs ring-1 ring-black/5"
          aria-hidden="true"
        >
          <CountryFlag code={loc.flagCode} className="h-full w-full object-cover" />
        </span>

        {/* Text */}
        <div className="min-w-0 flex-1">
          {loc.displayNumber ? (
            <>
              <div className="truncate text-[13.5px] font-semibold tracking-tight text-[#031038] transition-colors group-hover:text-[#032aac]">
                {loc.displayNumber}
              </div>
              <div className="truncate text-[11.5px] font-medium text-[#60748a] transition-colors group-hover:text-[#032aac]">
                {loc.country}
              </div>
            </>
          ) : (
            <div className="truncate text-[13.5px] font-semibold text-[#031038] transition-colors group-hover:text-[#032aac]">
              {loc.country}
              {loc.note && (
                <span className="ml-1.5 text-[11px] font-normal text-[#60748a]">
                  ({loc.note})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Subtle phone icon visible on hover */}
        {isClickableTel && (
          <PhoneCall
            aria-hidden="true"
            className="size-3.5 text-[#032aac] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mr-1"
          />
        )}
      </a>
    );
  };

  return (
    <motion.div
      id="contact-nav-popover"
      role="dialog"
      aria-label="Global office contact numbers"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`relative w-[min(540px,calc(100vw-32px))] rounded-2xl border border-[#c8dfea] bg-[#f5faff]/95 p-5 sm:p-6 shadow-[0_24px_50px_-12px_rgba(3,42,172,0.2),inset_0_1px_0_#ffffff] backdrop-blur-xl ${className}`}
    >
      {/* Upward pointer caret pointing directly to the trigger button */}
      <div
        aria-hidden="true"
        style={{ right: `${caretOffsetPx}px` }}
        className="absolute -top-1.5 h-3 w-3 rotate-45 border-l border-t border-[#c8dfea] bg-[#f5faff]"
      />

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        {/* Left Column: USA, India, Saudi Arabia, Singapore */}
        <div className="flex flex-col gap-1">
          {leftColumn.map(renderLocationItem)}
        </div>

        {/* Right Column: Canada, UAE, Kuwait, Malaysia */}
        <div className="flex flex-col gap-1">
          {rightColumn.map(renderLocationItem)}
        </div>
      </div>

      {/* Bottom Footer: Call main office */}
      <div className="mt-4 border-t border-[#d8e8f2] pt-3.5 text-center">
        <a
          href={`tel:${MAIN_OFFICE_TEL}`}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#032aac] to-[#1b4fd1] px-5 py-2 text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_3px_10px_rgba(3,42,172,0.22)] transition-all hover:shadow-[0_6px_16px_rgba(3,42,172,0.32)] hover:from-[#082fae] hover:to-[#2b6fea] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#032aac]"
        >
          <span>Call main office ({MAIN_OFFICE_DISPLAY})</span>
          <PhoneCall
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 group-hover:scale-110"
          />
        </a>
      </div>
    </motion.div>
  );
}
