"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import WaveDivider from "./WaveDivider";
import { BorderBeamPanel } from "@/components/ui/border-beam-panel";
import ScrollReveal from "./ScrollReveal";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  WifiOff,
  Sparkles,
  FileCheck2,
} from "lucide-react";

interface ProductVideoSectionProps {
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
  showWave?: boolean;
}

interface Chapter {
  id: number;
  title: string;
  timestamp: string;
  timeSec: number;
  badge: string;
  summary: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Deck Sounding",
    timestamp: "00:00",
    timeSec: 0,
    badge: "Tank 1P Entry",
    summary: "Sounding tape 4.250 m entered on deck with automatic trim & heel correction.",
  },
  {
    id: 2,
    title: "ASTM Table 54B",
    timestamp: "00:15",
    timeSec: 15,
    badge: "VCF 0.9842",
    summary: "Instant double-precision temperature volume correction without spreadsheet drift.",
  },
  {
    id: 3,
    title: "Discrepancy Check",
    timestamp: "00:30",
    timeSec: 30,
    badge: "0 Anomaly Flags",
    summary: "Real-time cross check against bunker delivery note within 0.037% tolerance.",
  },
  {
    id: 4,
    title: "Locked Certificate",
    timestamp: "00:45",
    timeSec: 45,
    badge: "SHA-256 Sealed",
    summary: "Biometric Chief Engineer sign-off and tamper-proof PDF generation on deck.",
  },
];

const TOTAL_DURATION_SEC = 60;

export default function ProductVideoSection({
  videoSrc,
  posterSrc,
  className = "",
  showWave = true,
}: ProductVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Determine active chapter based on currentTime
  useEffect(() => {
    let currentIdx = 0;
    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (currentTime >= CHAPTERS[i].timeSec) {
        currentIdx = i;
        break;
      }
    }
    setActiveChapter(currentIdx);
  }, [currentTime]);

  // Handle Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (videoSrc && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      // Simulation mode
      setIsPlaying((prev) => !prev);
    }
  }, [videoSrc]);

  // Simulation mode timer
  useEffect(() => {
    if (videoSrc) return; // If real video is mounted, video events drive time

    if (isPlaying) {
      animIntervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION_SEC) {
            setIsPlaying(false);
            return 0;
          }
          return Math.min(TOTAL_DURATION_SEC, prev + 0.25 * playbackSpeed);
        });
      }, 250);
    } else if (animIntervalRef.current) {
      clearInterval(animIntervalRef.current);
    }

    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, [isPlaying, videoSrc, playbackSpeed]);

  // Real video time update handler
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Jump to chapter
  const seekToChapter = (idx: number) => {
    const targetSec = CHAPTERS[idx].timeSec;
    setCurrentTime(targetSec);
    if (videoRef.current) {
      videoRef.current.currentTime = targetSec;
    }
    setIsPlaying(true);
  };

  // Scrub bar click
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(TOTAL_DURATION_SEC, pos * TOTAL_DURATION_SEC));
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <section
      id="product-video"
      className={`relative pt-6 sm:pt-10 lg:pt-14 pb-16 sm:pb-20 lg:pb-28 bg-[#F7FBFD] overflow-hidden ${className}`}
    >
      {/* Top Marine Wave Transition from Hero Liquid Flood */}
      {showWave && <div className="absolute top-0 inset-x-0 w-full pointer-events-none z-10">
        <WaveDivider
          direction="up"
          height={55}
          colors={["#A5D3E8", "#1B4FD1", "#032AAC"]}
        />
      </div>}

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#19B5C9]/10 via-[#1B4FD1]/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* ──────────── SECTION HEADER ──────────── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10">
          {/* Stage label rule */}
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-7 h-[2px] bg-[#19B5C9]" />
            <span className="text-[15px] font-sans font-medium text-[#032AAC]">
              System Walkthrough
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display font-extrabold text-[#031038] tracking-[-0.035em] text-[clamp(32px,5vw,56px)] leading-[1.04] bg-gradient-to-b from-[#031038] to-[#032AAC] bg-clip-text text-transparent">
            See Space BQS in action
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-[#031038]/70 font-sans leading-relaxed max-w-[44ch]">
            From on-deck sounding entry to ASTM Table 54B volume correction and instant signed PDF issuance. Watch the complete workflow.
          </p>
        </div>

        {/* ──────────── VIDEO HARDWARE MOCKUP CHASSIS ──────────── */}
        <div
          ref={containerRef}
          className="relative mx-auto max-w-5xl rounded-2xl md:rounded-3xl border border-[#D3E9F3] bg-white shadow-[0_24px_70px_-15px_rgba(3,42,172,0.18)] overflow-hidden transition-all duration-300"
        >
          {/* Window / Browser Chrome Bar */}
          <div className="liquid-glass-ui flex items-center justify-between px-4 py-3 border-b border-[#D3E9F3] select-none">
            {/* Window control dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF6A3D]/80" />
              <span className="w-3 h-3 rounded-full bg-[#19B5C9]/60" />
              <span className="w-3 h-3 rounded-full bg-[#032AAC]/50" />
              <span className="ml-2 text-xs font-mono font-medium text-[#031038]/60 hidden sm:inline">
                Space BQS v1.0.0 · Deck Workflow Demonstration
              </span>
            </div>

            {/* Offline Engine status badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#D3E9F3] text-[11px] font-mono font-medium text-[#032AAC]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#19B5C9] animate-pulse" />
                ASTM Table 54B
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-[#031038]/50">
                <WifiOff className="w-3 h-3 text-[#19B5C9]" /> Offline Mode
              </span>
            </div>
          </div>

          {/* Screen Content: Real Video or Dynamic Live Simulation */}
          <div className="relative aspect-[16/9] w-full bg-[#031038] overflow-hidden group">
            {videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                muted={isMuted}
                playsInline
              />
            ) : (
              /* ──────────── INTERACTIVE PRODUCT SIMULATION ──────────── */
              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 text-white select-none bg-gradient-to-br from-[#031038] via-[#021859] to-[#032AAC]">
                {/* Background nautical technical grid lines */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Top Status Strip */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#19B5C9]/20 border border-[#19B5C9]/40 flex items-center justify-center text-[#19B5C9]">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-white/50 uppercase tracking-widest">
                        Active Survey Job #BQS-2026-8941
                      </div>
                      <div className="text-sm sm:text-base font-display font-semibold text-white">
                        M/T Nordic Vanguard · Port of Singapore (Anchorage WB)
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#19B5C9]/20 border border-[#19B5C9]/40 text-xs font-mono font-medium text-[#19B5C9]">
                      {CHAPTERS[activeChapter].badge}
                    </span>
                  </div>
                </div>

                {/* Center Dynamic Chapter Screen */}
                <div className="relative z-10 my-auto py-4">
                  {activeChapter === 0 && (
                    <div className="animate-in fade-in duration-500 max-w-xl mx-auto">
                      <div className="text-xs font-mono text-[#19B5C9] uppercase tracking-wider mb-1">
                        Phase 01 / 04 · On-Deck Sounding Entry
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                        Sounding Tape Recorded at Tank 1P
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="liquid-glass-ui liquid-glass-ui--dark p-3 rounded-xl border border-white/10">
                          <div className="text-[10px] font-mono text-white/50">Sounding</div>
                          <div className="text-xl font-bold font-mono text-[#19B5C9]">4.250 m</div>
                        </div>
                        <div className="liquid-glass-ui liquid-glass-ui--dark p-3 rounded-xl border border-white/10">
                          <div className="text-[10px] font-mono text-white/50">Temperature</div>
                          <div className="text-xl font-bold font-mono text-white">38.5 °C</div>
                        </div>
                        <div className="liquid-glass-ui liquid-glass-ui--dark p-3 rounded-xl border border-white/10">
                          <div className="text-[10px] font-mono text-white/50">Trim Correction</div>
                          <div className="text-xl font-bold font-mono text-white">+0.012 m</div>
                        </div>
                        <div className="liquid-glass-ui liquid-glass-ui--dark p-3 rounded-xl border border-white/10">
                          <div className="text-[10px] font-mono text-white/50">Free Water</div>
                          <div className="text-xl font-bold font-mono text-[#A5D3E8]">0.000 m</div>
                        </div>
                      </div>
                      <p className="mt-4 text-xs sm:text-sm text-white/70">
                        Sounding tape reading auto-calibrated against tank strapping table with instant heel and trim hydrostatics.
                      </p>
                    </div>
                  )}

                  {activeChapter === 1 && (
                    <div className="animate-in fade-in duration-500 max-w-xl mx-auto">
                      <div className="text-xs font-mono text-[#19B5C9] uppercase tracking-wider mb-1">
                        Phase 02 / 04 · Volume Correction Factor
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                        Instant Temperature Volume Correction
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="liquid-glass-ui liquid-glass-ui--dark p-3 rounded-xl border border-white/10">
                          <div className="text-[10px] font-mono text-white/50">Density @ 15°C</div>
                          <div className="text-xl font-bold font-mono text-white">0.9500 kg/l</div>
                        </div>
                        <div className="liquid-glass-ui liquid-glass-ui--cyan p-3 rounded-xl border border-[#19B5C9]/40">
                          <div className="text-[10px] font-mono text-[#19B5C9]">Table 54B VCF</div>
                          <div className="text-xl font-bold font-mono text-[#19B5C9]">0.9842</div>
                        </div>
                        <div className="liquid-glass-ui liquid-glass-ui--dark p-3 rounded-xl border border-white/10">
                          <div className="text-[10px] font-mono text-white/50">Metric Tonnes (Air)</div>
                          <div className="text-xl font-bold font-mono text-white">385.143 MT</div>
                        </div>
                      </div>
                      <p className="mt-4 text-xs sm:text-sm text-white/70">
                        Zero floating-point rounding skew. Built directly from certified ASTM algorithms to 6 decimal precision.
                      </p>
                    </div>
                  )}

                  {activeChapter === 2 && (
                    <div className="animate-in fade-in duration-500 max-w-xl mx-auto">
                      <div className="text-xs font-mono text-[#19B5C9] uppercase tracking-wider mb-1">
                        Phase 03 / 04 · Discrepancy & Tolerance Audit
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                        Automatic Cross-Check Against BDN
                      </h3>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="liquid-glass-ui liquid-glass-ui--dark p-3 rounded-xl border border-white/10">
                          <div className="text-[10px] font-mono text-white/50">BDN Stated</div>
                          <div className="text-lg font-bold font-mono text-white">385.000 MT</div>
                        </div>
                        <div className="liquid-glass-ui liquid-glass-ui--dark p-3 rounded-xl border border-white/10">
                          <div className="text-[10px] font-mono text-white/50">Surveyed MT</div>
                          <div className="text-lg font-bold font-mono text-[#19B5C9]">385.143 MT</div>
                        </div>
                        <div className="liquid-glass-ui liquid-glass-ui--emerald p-3 rounded-xl border border-emerald-500/30">
                          <div className="text-[10px] font-mono text-emerald-400">Variance</div>
                          <div className="text-lg font-bold font-mono text-emerald-300">+0.037%</div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-mono">
                        <CheckCircle2 className="w-4 h-4" />
                        Within allowable ISO 13739 commercial tolerance limit (±0.100%).
                      </div>
                    </div>
                  )}

                  {activeChapter === 3 && (
                    <div className="animate-in fade-in duration-500 max-w-xl mx-auto">
                      <div className="text-xs font-mono text-[#19B5C9] uppercase tracking-wider mb-1">
                        Phase 04 / 04 · Cryptographic Certificate Lock
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                        Tamper-Evident SHA-256 PDF Generated
                      </h3>
                      <div className="liquid-glass-ui liquid-glass-ui--cyan p-4 rounded-xl border border-[#19B5C9]/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-7 h-7 text-[#19B5C9]" />
                          <div>
                            <div className="text-xs font-mono text-white/50">Certificate Hash</div>
                            <div className="text-xs sm:text-sm font-mono text-white">
                              e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                            </div>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold">
                          LOCKED
                        </span>
                      </div>
                      <p className="mt-4 text-xs sm:text-sm text-white/70">
                        Signed on-deck by Chief Engineer & Surveyor. One unalterable record ready to export.
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom simulation prompt */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono text-white/40 border-t border-white/10 pt-3">
                  <span>Engine status: 60fps Active · React 19</span>
                  <span>{isPlaying ? "Simulating Live Run..." : "Click Play to run walkthrough"}</span>
                </div>
              </div>
            )}

            {/* ──────────── FLOATING BIG PLAY BUTTON OVERLAY ──────────── */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 backdrop-blur-[2px] cursor-pointer transition-all duration-300 hover:bg-black/25"
              >
                <div className="relative group/play">
                  {/* Glowing pulse ripples */}
                  <span className="absolute -inset-4 rounded-full bg-[#19B5C9]/30 animate-ping opacity-75" />
                  <span className="absolute -inset-2 rounded-full bg-[#1B4FD1]/40" />

                  {/* Play Button */}
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#032AAC] to-[#19B5C9] p-[2px] shadow-2xl transition-transform duration-200 group-hover/play:scale-110">
                    <div className="w-full h-full rounded-full bg-[#031038] flex items-center justify-center pl-1 text-white">
                      <Play className="w-8 h-8 fill-white text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ──────────── BOTTOM CONTROLS OVERLAY BAR ──────────── */}
            <div className="absolute bottom-0 inset-x-0 z-30 p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex flex-col gap-2 transition-opacity duration-300 opacity-90 group-hover:opacity-100">
              {/* Scrub Progress Bar */}
              <div
                onClick={handleScrub}
                className="relative w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all duration-150 overflow-hidden"
              >
                {/* Active progress fill */}
                <div
                  className="h-full bg-gradient-to-r from-[#19B5C9] to-[#1B4FD1] rounded-full transition-all duration-75"
                  style={{ width: `${(currentTime / TOTAL_DURATION_SEC) * 100}%` }}
                />
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between text-white text-xs pt-1 select-none">
                <div className="flex items-center gap-3">
                  {/* Play / Pause button */}
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-white text-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white text-white" />
                    )}
                  </button>

                  {/* Reset button */}
                  <button
                    onClick={() => {
                      setCurrentTime(0);
                      if (videoRef.current) videoRef.current.currentTime = 0;
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Restart video"
                  >
                    <RotateCcw className="w-4 h-4 text-white/80" />
                  </button>

                  {/* Timecode */}
                  <span className="font-mono text-xs text-white/80 ml-1">
                    {formatTime(currentTime)} / {formatTime(TOTAL_DURATION_SEC)}
                  </span>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2">
                  {/* Speed toggle */}
                  <button
                    onClick={() => {
                      const nextSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
                      setPlaybackSpeed(nextSpeed);
                      if (videoRef.current) videoRef.current.playbackRate = nextSpeed;
                    }}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 font-mono text-[11px] text-white/90"
                  >
                    {playbackSpeed}x
                  </button>

                  {/* Mute toggle */}
                  <button
                    onClick={() => {
                      setIsMuted((prev) => !prev);
                      if (videoRef.current) videoRef.current.muted = !isMuted;
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-white/80" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white/80" />
                    )}
                  </button>

                  {/* Fullscreen toggle */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Toggle Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4 text-white/80" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────── CHAPTER NAVIGATION BAR ──────────── */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#D3E9F3] flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-mono font-medium text-[#031038]/60 uppercase tracking-wider">
              Workflow Chapters:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {CHAPTERS.map((chap, idx) => {
                const isActive = activeChapter === idx;
                return (
                  <button
                    key={chap.id}
                    onClick={() => seekToChapter(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? "bg-[#032AAC] text-white shadow-sm"
                        : "bg-[#EAF4F9] text-[#031038]/70 hover:bg-[#D3E9F3]/60 hover:text-[#031038]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? "bg-[#19B5C9]" : "bg-[#032AAC]/30"
                      }`}
                    />
                    <span>{chap.title}</span>
                    <span className="text-[10px] font-mono opacity-60">{chap.timestamp}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ──────────── PROOF VALUE METRICS ──────────── */}
        <ScrollReveal stagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <BorderBeamPanel seed={1}>
            <div className="w-10 h-10 rounded-xl bg-[#EAF4F9] border border-[#D3E9F3] flex items-center justify-center text-[#032AAC] mb-4">
              <Sparkles className="w-5 h-5 text-[#19B5C9]" />
            </div>
            <div className="font-display font-bold text-2xl text-[#031038] tracking-tight">
              &lt; 60 Seconds
            </div>
            <div className="text-xs font-mono text-[#032AAC] uppercase tracking-wider mt-0.5">
              Per-Tank Calculation
            </div>
            <p className="mt-2 text-xs text-[#031038]/70 leading-relaxed font-sans">
              Deck sounding to ASTM Table 54B metric tonnage calculated in real time.
            </p>
          </BorderBeamPanel>

          <BorderBeamPanel seed={2}>
            <div className="w-10 h-10 rounded-xl bg-[#EAF4F9] border border-[#D3E9F3] flex items-center justify-center text-[#032AAC] mb-4">
              <WifiOff className="w-5 h-5 text-[#19B5C9]" />
            </div>
            <div className="font-display font-bold text-2xl text-[#031038] tracking-tight">
              100% Offline
            </div>
            <div className="text-xs font-mono text-[#032AAC] uppercase tracking-wider mt-0.5">
              Zero Signal Needed
            </div>
            <p className="mt-2 text-xs text-[#031038]/70 leading-relaxed font-sans">
              Native SQLite engine runs in deep cargo holds and at sea without internet.
            </p>
          </BorderBeamPanel>

          <BorderBeamPanel seed={3}>
            <div className="w-10 h-10 rounded-xl bg-[#EAF4F9] border border-[#D3E9F3] flex items-center justify-center text-[#032AAC] mb-4">
              <Cpu className="w-5 h-5 text-[#19B5C9]" />
            </div>
            <div className="font-display font-bold text-2xl text-[#031038] tracking-tight">
              Zero Rounding Drift
            </div>
            <div className="text-xs font-mono text-[#032AAC] uppercase tracking-wider mt-0.5">
              Certified Volume Calculation
            </div>
            <p className="mt-2 text-xs text-[#031038]/70 leading-relaxed font-sans">
              Exact Table 54B algorithms replace error-prone Excel approximations.
            </p>
          </BorderBeamPanel>

          <BorderBeamPanel seed={4}>
            <div className="w-10 h-10 rounded-xl bg-[#EAF4F9] border border-[#D3E9F3] flex items-center justify-center text-[#032AAC] mb-4">
              <FileCheck2 className="w-5 h-5 text-[#19B5C9]" />
            </div>
            <div className="font-display font-bold text-2xl text-[#031038] tracking-tight">
              SHA-256 Locked
            </div>
            <div className="text-xs font-mono text-[#032AAC] uppercase tracking-wider mt-0.5">
              Tamper-Evident PDF
            </div>
            <p className="mt-2 text-xs text-[#031038]/70 leading-relaxed font-sans">
              Cryptographically sealed certificate accepted by charterers and insurers.
            </p>
          </BorderBeamPanel>
        </ScrollReveal>
      </div>
    </section>
  );
}
