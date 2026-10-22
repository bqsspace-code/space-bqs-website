import { Ruler, Droplets, Thermometer, Scale, CheckCircle2, AlertOctagon } from "lucide-react";

export default function EnginePipelineGraphic() {
  return (
    <div className="space-y-8">
      {/* 4-Stage Horizontal Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Step 1 */}
        <div className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-ocean-100 p-2 text-ocean-700">
              <Ruler className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 1</span>
          </div>
          <h4 className="font-display font-bold text-ocean-950 mt-3 text-base">Deck Measurement</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Tape reading in metres (ullage or sounding). Looked up against the vessel&apos;s verified tank calibration strapping table.
          </p>
          <div className="mt-3 rounded bg-slate-50 p-2 text-[11px] font-mono text-slate-700">
            Linear 1D Interpolation (No extrapolation allowed)
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-sea-100 p-2 text-sea-700">
              <Droplets className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 2</span>
          </div>
          <h4 className="font-display font-bold text-ocean-950 mt-3 text-base">Water Deduction</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Free water sounding is converted to volume and directly subtracted using Decimal.js precision. Clients never pay for water.
          </p>
          <div className="mt-3 rounded bg-slate-50 p-2 text-[11px] font-mono text-sea-700 font-semibold">
            Net Observed = Gross Vol − Free Water
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-ocean-100 p-2 text-ocean-700">
              <Thermometer className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 3</span>
          </div>
          <h4 className="font-display font-bold text-ocean-950 mt-3 text-base">ASTM 54B Correction</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Volume Correction Factor (VCF) calculated from standard density @ 15°C and measured deck temperature.
          </p>
          <div className="mt-3 rounded bg-slate-50 p-2 text-[11px] font-mono text-ocean-700 font-semibold">
            Corrected Vol = Net Vol × VCF
          </div>
        </div>

        {/* Step 4 */}
        <div className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-sea-100 p-2 text-sea-700">
              <Scale className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 4</span>
          </div>
          <h4 className="font-display font-bold text-ocean-950 mt-3 text-base">Mass Conversion</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Converted to Metric Tonnes (MT) in commercial air basis or vacuum basis. Stamped with engine version and locked.
          </p>
          <div className="mt-3 rounded bg-sea-50 border border-sea-200 p-2 text-[11px] font-mono text-sea-800 font-bold">
            Benchmark: 457.819 MT
          </div>
        </div>
      </div>

      {/* Tank Strapping Curve Visual Representation */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h4 className="font-display text-lg font-bold text-ocean-950">Vessel Tank Strapping & Calibration Curve</h4>
            <p className="text-xs text-slate-500">1D Linear interpolation with strictly enforced physical bounds</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded bg-sea-100 px-2 py-0.5 text-xs font-semibold text-sea-700">
              <CheckCircle2 className="h-3.5 w-3.5" /> No Extrapolation Permitted
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 bg-slate-900 rounded-xl p-4 border border-slate-800 relative">
            <p className="text-[11px] font-mono text-slate-400 mb-2">Tank 1P Calibration Geometry (Volume vs Sounding)</p>
            {/* SVG Calibration Curve */}
            <svg viewBox="0 0 600 220" className="w-full h-48 overflow-visible">
              {/* Grid Lines */}
              <line x1="60" y1="20" x2="60" y2="180" stroke="#334155" strokeWidth="1" />
              <line x1="60" y1="180" x2="560" y2="180" stroke="#334155" strokeWidth="1" />
              <line x1="60" y1="100" x2="560" y2="100" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="60" y1="40" x2="560" y2="40" stroke="#1e293b" strokeDasharray="4 4" />

              {/* Axis Labels */}
              <text x="15" y="100" fill="#94a3b8" fontSize="10" fontFamily="monospace">Vol (m³)</text>
              <text x="280" y="205" fill="#94a3b8" fontSize="10" fontFamily="monospace">Sounding Height (m)</text>

              {/* Calibration Curve Line */}
              <path
                d="M 60 180 Q 200 160, 320 100 T 540 30"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
              />

              {/* Verified Interpolation Point */}
              <circle cx="340" cy="90" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <line x1="340" y1="90" x2="340" y2="180" stroke="#10b981" strokeDasharray="2 2" />
              <line x1="60" y1="90" x2="340" y2="90" stroke="#10b981" strokeDasharray="2 2" />

              <text x="350" y="85" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="bold">
                Measured: 4.250 m → 245.10 m³
              </text>

              {/* Out of range boundary zones */}
              <rect x="540" y="20" width="40" height="160" fill="rgba(239, 68, 68, 0.15)" />
              <text x="510" y="55" fill="#f87171" fontSize="9" fontFamily="monospace">Max Table</text>
            </svg>
          </div>

          <div className="lg:col-span-4 space-y-3 text-xs">
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
              <span className="font-bold text-ocean-950 block">OutOfRangeError Protection</span>
              <p className="text-slate-600 mt-1">
                If a sounding or ullage exceeds the vessel&apos;s physical calibration booklet, the engine raises an explicit flag. It never guesses or extrapolates beyond manufacturer limits.
              </p>
            </div>

            <div className="rounded-lg bg-sea-50 border border-sea-200 p-3 text-sea-900">
              <span className="font-bold block">ASTM D1250-04 Grid Tables</span>
              <p className="text-sea-700 mt-1">
                Fuel Oils (0.900–1.000 kg/L, 0–90°C) and Middle Distillates (0.820–0.900 kg/L, 0–60°C) evaluated on pure mathematical grids without black-box approximations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
