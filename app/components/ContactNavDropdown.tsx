"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, PhoneCall } from "lucide-react";
import { CountryFlag, FlagUSA } from "./flags/CountryFlags";
import {
  OFFICE_LOCATIONS,
  MAIN_OFFICE_DISPLAY,
  MAIN_OFFICE_TEL,
  OfficeLocation,
} from "../lib/contact-data";

interface ContactNavDropdownProps {
  /**
   * Optional custom button label/override
   */
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export default function ContactNavDropdown({
  className = "",
  onOpenChange,
}: ContactNavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      onOpenChange?.(next);
      return next;
    });
  }, [onOpenChange]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, handleClose]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Separate locations into 2 columns (4 each)
  const leftColumn = OFFICE_LOCATIONS.slice(0, 4);
  const rightColumn = OFFICE_LOCATIONS.slice(4, 8);

  const renderLocationItem = (loc: OfficeLocation) => {
    const isClickableTel = Boolean(loc.phone);
    const href = isClickableTel ? `tel:${loc.phone}` : "/contact";

    return (
      <a
        key={loc.id}
        href={href}
        className="group flex items-center gap-3 rounded-xl p-2.5 transition-all duration-150 hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-[#38bdf8] focus-visible:bg-white/[0.05]"
        title={isClickableTel ? `Call ${loc.country} office (${loc.displayNumber})` : `Inquire for ${loc.country}`}
        onClick={() => {
          // Keep dropdown open or close after brief delay
          setTimeout(handleClose, 300);
        }}
      >
        {/* Country Flag Badge */}
        <span
          className="flex h-6 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[5px] border border-white/15 bg-black/40 shadow-xs"
          aria-hidden="true"
        >
          <CountryFlag code={loc.flagCode} className="h-full w-full object-cover" />
        </span>

        {/* Info */}
        <div className="min-w-0 flex-1">
          {loc.displayNumber ? (
            <>
              <div className="truncate text-[13.5px] font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-300">
                {loc.displayNumber}
              </div>
              <div className="truncate text-[11.5px] font-normal text-slate-400 transition-colors group-hover:text-slate-300">
                {loc.country}
              </div>
            </>
          ) : (
            <div className="truncate text-[13.5px] font-semibold text-white transition-colors group-hover:text-cyan-300">
              {loc.country}
              {loc.note && (
                <span className="ml-1.5 text-[11px] font-normal text-slate-400">
                  ({loc.note})
                </span>
              )}
            </div>
          )}
        </div>
      </a>
    );
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        id="contact-nav-toggle"
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="contact-nav-popover"
        className="group relative flex h-9 items-center gap-2 rounded-full border border-[#1f2d48] bg-[#0c1527]/90 px-3 py-1.5 text-[12.5px] font-medium text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:border-[#334b75] hover:bg-[#111e38] focus-visible:outline-2 focus-visible:outline-[#38bdf8]"
      >
        {/* USA Flag Icon */}
        <span
          className="flex h-4 w-5 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-white/20 shadow-2xs"
          aria-hidden="true"
        >
          <FlagUSA className="h-full w-full object-cover" />
        </span>

        {/* Text */}
        <span className="hidden sm:inline font-semibold text-slate-200">USA</span>
        <span className="hidden md:inline font-semibold text-white tracking-tight">
          {MAIN_OFFICE_DISPLAY}
        </span>
        <span className="inline md:hidden text-xs font-semibold text-white">
          +1 646...
        </span>

        {/* Chevron */}
        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 text-slate-400 transition-transform duration-200 group-hover:text-white ${
            isOpen ? "rotate-180 text-cyan-400" : ""
          }`}
        />
      </button>

      {/* Floating Dropdown Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            id="contact-nav-popover"
            role="dialog"
            aria-label="Global office contact numbers"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-3 z-50 w-[min(540px,calc(100vw-32px))] rounded-2xl border border-[#1e2d47] bg-[#0a1226]/98 p-5 sm:p-6 shadow-[0_24px_55px_rgba(0,0,0,0.7),0_0_1px_rgba(255,255,255,0.14)] backdrop-blur-2xl"
          >
            {/* Top pointer arrow notch pointing directly at the button */}
            <div
              aria-hidden="true"
              className="absolute -top-1.5 right-8 h-3 w-3 rotate-45 border-l border-t border-[#1e2d47] bg-[#0a1226]"
            />

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {/* Left Column: USA, India, Saudi Arabia, Singapore */}
              <div className="flex flex-col gap-1.5">
                {leftColumn.map(renderLocationItem)}
              </div>

              {/* Right Column: Canada, UAE, Kuwait, Malaysia */}
              <div className="flex flex-col gap-1.5">
                {rightColumn.map(renderLocationItem)}
              </div>
            </div>

            {/* Bottom: Call main office */}
            <div className="mt-4 border-t border-white/[0.07] pt-3.5 text-center">
              <a
                href={`tel:${MAIN_OFFICE_TEL}`}
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-cyan-400 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-[#38bdf8] rounded-md px-2 py-1"
              >
                <span>Call main office</span>
                <PhoneCall
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-200 group-hover:scale-110"
                />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
