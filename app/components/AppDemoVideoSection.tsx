"use client";

const VIDEO_SRC = "/assets/videos/bqs-app-demo-screen.mp4";

export default function AppDemoVideoSection() {
  return (
    <section
      id="app-demo"
      className="scroll-mt-28 py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#f7fbfd] via-[#eaf4f9] to-[#e2edff] relative overflow-hidden"
    >
      {/* subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />

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
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#031038] tracking-tight">
            The world’s first BQS mobile app. In action.
          </h2>
          <p className="text-sm sm:text-base text-[#52657c] max-w-xl mx-auto leading-relaxed">
            Watch the actual app walkthrough: choose a vessel, enter readings, and review the calculation. Mobile capture on deck. Web review in the office.
          </p>
        </div>

        {/* Video container — sleek phone-frame style */}
        <div className="mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[312px]">
          {/* Phone shell */}
          <div className="relative overflow-hidden rounded-[30px] border-[5px] border-[#151b24] bg-[#dcefff] shadow-[0_24px_60px_-20px_rgba(3,16,56,0.3),0_0_0_1px_rgba(255,255,255,0.5)]">

            {/* Video Player */}
            <div className="relative">
              <video
                src={VIDEO_SRC}
                poster="/assets/videos/bqs-app-demo-screen-poster.webp"
                width={860}
                height={1920}
                muted
                playsInline
                controls
                preload="metadata"
                aria-label="Actual Space BQS mobile app walkthrough"
                className="block h-auto w-full aspect-[43/96] object-contain"
              />
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-xs font-mono text-[#60748a] mt-5 tracking-wider uppercase">
            Actual Space BQS app recording
          </p>
        </div>

        {/* 3 feature bullets below the phone */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
          {[
            {
              label: "Work without a signal",
              sub: "Capture readings and calculate locally on the device.",
            },
            {
              label: "One focused workflow",
              sub: "Vessel context, fuel details, and tanks—without retyping ashore.",
            },
            {
              label: "Reconnect to the office",
              sub: "A 72-hour offline lease supports field work before syncing for review.",
            },
          ].map((f) => (
            <div key={f.label} className="liquid-glass-ui space-y-2 rounded-2xl p-5 border border-white/60">
              <p className="font-display font-bold text-[#032aac] text-sm">
                {f.label}
              </p>
              <p className="text-[#52657c] text-xs leading-relaxed">{f.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
