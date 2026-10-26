"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const VIDEO_SRC = "/assets/videos/BQS%20DEMO.mp4";

export default function AppDemoVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <section
      id="app-demo"
      className="py-16 sm:py-20 lg:py-24 bg-[#031038] relative overflow-hidden"
    >
      {/* subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-marine opacity-30 pointer-events-none" />

      {/* aqua radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(25,181,201,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-[#19B5C9] uppercase font-semibold block">
            Mobile Deck Tool · iOS &amp; Android
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            See the mobile app in action.
          </h2>
          <p className="text-sm sm:text-base text-white/65 max-w-xl mx-auto leading-relaxed">
            Watch the full workflow: scan vessel QR, walk the 3-step wizard, and calculate ASTM Table 54B metric tons 100% offline.
          </p>
        </div>

        {/* Video container — sleek phone-frame style */}
        <div className="mx-auto max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
          {/* Phone shell */}
          <div className="relative rounded-[2.8rem] sm:rounded-[3rem] border-[7px] border-white/15 bg-black shadow-[0_0_80px_rgba(25,181,201,0.22)] overflow-hidden">
            {/* Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 pointer-events-none shadow-sm" />

            {/* Video Player */}
            <div className="relative group cursor-pointer" onClick={togglePlay}>
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                muted={muted}
                playsInline
                loop
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                className="w-full h-auto block aspect-[9/16] object-cover"
                onEnded={() => setPlaying(false)}
              />

              {/* Controls overlay — visible on hover or when paused */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                  playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
              >
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  aria-label={playing ? "Pause" : "Play"}
                  className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white/30 hover:scale-105 active:scale-95 transition-all text-white shadow-lg"
                >
                  {playing ? (
                    <Pause className="w-7 h-7 text-white fill-white" />
                  ) : (
                    <Play className="w-7 h-7 text-white fill-white translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* Mute toggle */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                aria-label={muted ? "Unmute" : "Mute"}
                className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/80 hover:scale-105 transition-all text-white"
              >
                {muted ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-xs font-mono text-white/35 mt-5 tracking-wider uppercase">
            BQS Mobile App · Deck Walkthrough
          </p>
        </div>

        {/* 3 feature bullets below the phone */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
          {[
            {
              label: "100% Offline Engine",
              sub: "Calculates in cargo holds and engine rooms without cellular connectivity.",
            },
            {
              label: "3-Step Wizard",
              sub: "Ship particulars → Fuel grade → Tank soundings. Fast and focused.",
            },
            {
              label: "72-Hour Offline Lease",
              sub: "Secure local cryptographic signature that syncs seamlessly upon reconnect.",
            },
          ].map((f) => (
            <div key={f.label} className="space-y-1 rounded-2xl p-4 bg-white/[0.03] border border-white/5">
              <p className="font-display font-bold text-white text-sm">
                {f.label}
              </p>
              <p className="text-white/50 text-xs leading-relaxed">{f.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
