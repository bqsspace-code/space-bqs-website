import { QrCode, WifiOff, Clock, CheckCircle2, ChevronRight, Layers, ShieldCheck, AlertCircle } from "lucide-react";

export default function DeckToolMock() {
  return (
    <div className="relative mx-auto w-full max-w-sm rounded-[36px] border-[6px] border-slate-900 bg-slate-950 p-3.5 shadow-2xl">
      {/* Phone Notch & Status Bar */}
      <div className="flex items-center justify-between px-3 pt-1 pb-2 text-[11px] text-slate-300">
        <span className="font-semibold">09:41</span>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-300 border border-amber-500/30">
            <WifiOff className="h-2.5 w-2.5" />
            <span>OFFLINE</span>
          </div>
          <span className="text-[10px] text-slate-400">Offline capture preview</span>
        </div>
      </div>

      {/* Screen Frame Container */}
      <div className="overflow-hidden rounded-[24px] bg-slate-900 text-slate-100 border border-white/5">
        {/* App Bar Header */}
        <div className="bg-ocean-950 px-4 py-3 border-b border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-tight text-white">Space BQS Mobile</span>
            <span className="rounded bg-ocean-700/80 px-1.5 py-0.5 text-[9px] font-mono text-ocean-200">v1.1.0</span>
          </div>
          <div className="mt-2 flex items-center justify-between rounded-lg bg-white/5 p-2 text-xs">
            <div className="flex items-center gap-2">
              <QrCode className="h-4 w-4 text-sea-400" />
              <div>
                <p className="font-semibold text-white leading-tight">M/V PACIFIC MARINER</p>
                <p className="text-[10px] text-slate-400 font-mono">IMO 9412345 · Valid QR</p>
              </div>
            </div>
            <span className="rounded bg-sea-500/20 px-1.5 py-0.5 text-[10px] text-sea-300 font-medium">Scanned</span>
          </div>
        </div>

        {/* 3-Step Wizard Navigation */}
        <div className="grid grid-cols-3 border-b border-white/10 bg-ocean-900/40 text-center text-[10px] font-medium">
          <div className="py-2 text-slate-400 border-r border-white/5">
            <span className="block text-sea-400">✓ Step 1</span>
            Context
          </div>
          <div className="py-2 text-slate-400 border-r border-white/5">
            <span className="block text-sea-400">✓ Step 2</span>
            Product
          </div>
          <div className="py-2 bg-ocean-800 text-white font-bold">
            <span className="block text-sea-300">Step 3</span>
            Tanks (Live)
          </div>
        </div>

        {/* Screen Content: Tank Sounding Entry */}
        <div className="p-3.5 space-y-3 text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-200">TANK READINGS (ULLAGE / SOUNDING)</span>
            <span className="text-[10px] text-sea-400">Autosaved 1s ago</span>
          </div>

          {/* Active Tank Row Card */}
          <div className="rounded-xl border border-sea-500/40 bg-sea-950/20 p-2.5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Tank 1P (VLSFO)</span>
              <span className="text-[10px] rounded bg-sea-500/20 px-1.5 py-0.5 text-sea-300 font-mono">225.567 MT</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
              <div className="rounded bg-black/40 p-1.5 border border-white/5">
                <span className="text-[9px] text-slate-400 block">Sounding</span>
                <span className="font-bold text-white">4.250 m</span>
              </div>
              <div className="rounded bg-black/40 p-1.5 border border-white/5">
                <span className="text-[9px] text-slate-400 block">Temp</span>
                <span className="font-bold text-white">40.0°C</span>
              </div>
              <div className="rounded bg-black/40 p-1.5 border border-white/5">
                <span className="text-[9px] text-slate-400 block">Water</span>
                <span className="font-bold text-sea-400">0.050 m</span>
              </div>
            </div>
          </div>

          {/* Tank 2 Row Card */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Tank 1S (VLSFO)</span>
              <span className="text-[10px] rounded bg-white/10 px-1.5 py-0.5 text-slate-300 font-mono">232.252 MT</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
              <div className="rounded bg-black/40 p-1.5 border border-white/5">
                <span className="text-[9px] text-slate-400 block">Sounding</span>
                <span className="font-bold text-white">4.380 m</span>
              </div>
              <div className="rounded bg-black/40 p-1.5 border border-white/5">
                <span className="text-[9px] text-slate-400 block">Temp</span>
                <span className="font-bold text-white">40.0°C</span>
              </div>
              <div className="rounded bg-black/40 p-1.5 border border-white/5">
                <span className="text-[9px] text-slate-400 block">Water</span>
                <span className="font-bold text-sea-400">0.070 m</span>
              </div>
            </div>
          </div>

          {/* Live Mobile Summary Banner */}
          <div className="rounded-xl bg-ocean-950 p-2.5 border border-ocean-700/50 flex justify-between items-center">
            <div>
              <span className="text-[9px] text-slate-400 block uppercase">Calculated Total</span>
              <span className="font-display font-bold text-sea-400 text-sm">457.819 MT</span>
            </div>
            <button className="rounded-lg bg-sea-500 px-3 py-1.5 text-[11px] font-bold text-ocean-950 shadow-sm">
              Submit to Office
            </button>
          </div>
        </div>

        {/* Honest Deck Roadmap Note */}
        <div className="border-t border-white/10 bg-slate-950/80 p-2.5 text-[10px] text-slate-400 flex items-center gap-1.5">
          <AlertCircle className="h-3 w-3 text-amber-400 shrink-0" />
          <span>Photos & signatures coming in v1.2 (honest roadmap)</span>
        </div>
      </div>
    </div>
  );
}
