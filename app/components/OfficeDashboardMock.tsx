import { Search, Filter, Download, Lock, CheckCircle2, AlertTriangle, TrendingUp, Ship, FileText, ChevronRight } from "lucide-react";

export default function OfficeDashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      {/* Top Window Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300"></div>
          </div>
          <span className="font-mono text-slate-500 font-medium ml-2">Space BQS Supervisor Console · Fleet Operations</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded bg-sea-100 px-2 py-0.5 text-[11px] font-semibold text-sea-700">
            <span className="h-1.5 w-1.5 rounded-full bg-sea-500 animate-pulse"></span>
            Sync Online
          </span>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 border-b border-slate-200 bg-white p-4">
        <div className="p-2">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Monthly Metric Tonnes</p>
          <p className="font-display text-2xl font-bold text-ocean-950 mt-1">18,420.5 MT</p>
          <p className="text-[10px] text-sea-600 flex items-center gap-0.5 mt-0.5 font-medium">
            <TrendingUp className="h-3 w-3" /> +14.2% vs last month
          </p>
        </div>

        <div className="p-2">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Active Field Surveys</p>
          <p className="font-display text-2xl font-bold text-ocean-950 mt-1">14 Jobs</p>
          <p className="text-[10px] text-slate-500 mt-0.5">9 In Progress · 5 Under Review</p>
        </div>

        <div className="p-2">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Average VCF (Table 54B)</p>
          <p className="font-display text-2xl font-bold text-ocean-950 mt-1">0.9684</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Heavy Fuel Oil / VLSFO</p>
        </div>

        <div className="p-2">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Audit & Lock Rate</p>
          <p className="font-display text-2xl font-bold text-sea-600 mt-1">100.0%</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Zero unverified records</p>
        </div>
      </div>

      {/* Register Filters & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-4 py-3 text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              readOnly
              value="Filter by survey #, vessel IMO, port, BDN..."
              className="w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-medium text-slate-700">
            All Grades (VLSFO / MGO)
          </span>
          <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-medium text-slate-700">
            Singapore / Rotterdam / Fujairah
          </span>
        </div>
      </div>

      {/* Survey Register Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-500">
            <tr>
              <th className="px-4 py-3">Survey ID</th>
              <th className="px-3 py-3">Vessel & IMO</th>
              <th className="px-3 py-3">Type</th>
              <th className="px-3 py-3">Grade</th>
              <th className="px-3 py-3">Port</th>
              <th className="px-3 py-3">Quantity (MT)</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr className="hover:bg-slate-50 transition">
              <td className="px-4 py-3 font-mono font-medium text-ocean-950">BQS-2026-0142</td>
              <td className="px-3 py-3">
                <span className="font-semibold text-slate-900 block">M/V PACIFIC MARINER</span>
                <span className="font-mono text-[10px] text-slate-400">IMO 9412345</span>
              </td>
              <td className="px-3 py-3">Delivery</td>
              <td className="px-3 py-3">
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium">VLSFO</span>
              </td>
              <td className="px-3 py-3">Singapore</td>
              <td className="px-3 py-3 font-mono font-bold text-ocean-950">457.819 MT</td>
              <td className="px-3 py-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-sea-100 px-2 py-0.5 text-[10px] font-semibold text-sea-700">
                  <Lock className="h-2.5 w-2.5" /> FINALISED
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="rounded border border-slate-200 p-1 text-slate-600 hover:bg-slate-100 cursor-pointer">
                    <FileText className="h-3.5 w-3.5" />
                  </span>
                  <span className="rounded border border-slate-200 p-1 text-slate-600 hover:bg-slate-100 cursor-pointer">
                    <Download className="h-3.5 w-3.5" />
                  </span>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-slate-50 transition">
              <td className="px-4 py-3 font-mono font-medium text-ocean-950">BQS-2026-0141</td>
              <td className="px-3 py-3">
                <span className="font-semibold text-slate-900 block">MT NORDIC BREEZE</span>
                <span className="font-mono text-[10px] text-slate-400">IMO 9784120</span>
              </td>
              <td className="px-3 py-3">ROB (On-hire)</td>
              <td className="px-3 py-3">
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium">MGO</span>
              </td>
              <td className="px-3 py-3">Rotterdam</td>
              <td className="px-3 py-3 font-mono font-bold text-ocean-950">128.450 MT</td>
              <td className="px-3 py-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-ocean-100 px-2 py-0.5 text-[10px] font-semibold text-ocean-800">
                  UNDER REVIEW
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="rounded border border-slate-200 p-1 text-slate-600 hover:bg-slate-100 cursor-pointer">
                    <FileText className="h-3.5 w-3.5" />
                  </span>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-slate-50 transition">
              <td className="px-4 py-3 font-mono font-medium text-ocean-950">BQS-2026-0140</td>
              <td className="px-3 py-3">
                <span className="font-semibold text-slate-900 block">SEA HORIZON VII</span>
                <span className="font-mono text-[10px] text-slate-400">IMO 9314567</span>
              </td>
              <td className="px-3 py-3">Debunkering</td>
              <td className="px-3 py-3">
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium">ULSFO</span>
              </td>
              <td className="px-3 py-3">Fujairah</td>
              <td className="px-3 py-3 font-mono font-bold text-ocean-950">84.210 MT</td>
              <td className="px-3 py-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-sea-100 px-2 py-0.5 text-[10px] font-semibold text-sea-700">
                  <Lock className="h-2.5 w-2.5" /> FINALISED
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="rounded border border-slate-200 p-1 text-slate-600 hover:bg-slate-100 cursor-pointer">
                    <FileText className="h-3.5 w-3.5" />
                  </span>
                  <span className="rounded border border-slate-200 p-1 text-slate-600 hover:bg-slate-100 cursor-pointer">
                    <Download className="h-3.5 w-3.5" />
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Strip */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-[11px] text-slate-500">
        <span>Showing recent 3 of 142 total surveys across your organization</span>
        <span className="font-medium text-ocean-700">Single-click PDF & 4-Sheet Excel Export available for all finalised jobs</span>
      </div>
    </div>
  );
}
