"use client";

import TeamSplitCards from "@/components/ui/team-split-cards";
import WorkflowScrollSections from "@/components/ui/workflow-scroll-sections";
import SurveyWarehouseShowcase from "@/components/ui/survey-warehouse-showcase";

/* ─── Official Store Badges ─── */
export function AppStoreBadges({
  className = "",
  dark = false,
  showSubtitle = true,
}: {
  className?: string;
  dark?: boolean;
  showSubtitle?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <div className="flex flex-row items-center justify-center gap-2 sm:gap-3.5">
        {/* Apple App Store */}
        <a
          href="https://apps.apple.com/in/app/space-bqs/id6812992991"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-white transition-all hover:scale-[1.02] active:scale-[0.98] ${
            dark
              ? "bg-white/10 hover:bg-white/20 border border-white/25 shadow-md"
              : "bg-[#031038] hover:bg-[#032AAC] border border-[#D3E9F3]/30 shadow-xs"
          }`}
          title="Download Space BQS on the Apple App Store"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.71-.93 2.73.99.08 2.02-.48 2.65-1.23z" />
          </svg>
          <div className="text-left leading-none">
            <span className={`text-[8px] sm:text-[9px] uppercase tracking-wider block ${dark ? "text-white/70" : "text-white/60"}`}>
              Download on the
            </span>
            <span className="text-[11px] sm:text-xs font-bold tracking-tight block mt-0.5">App Store</span>
          </div>
        </a>

        {/* Google Play */}
        <a
          href="https://play.google.com/store/apps/details?id=com.spaceai.bqs"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-white transition-all hover:scale-[1.02] active:scale-[0.98] ${
            dark
              ? "bg-white/10 hover:bg-white/20 border border-white/25 shadow-md"
              : "bg-[#031038] hover:bg-[#032AAC] border border-[#D3E9F3]/30 shadow-xs"
          }`}
          title="Download Space BQS on Google Play"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M3.609 1.814L13.793 12 3.61 22.186a2.006 2.006 0 0 1-.22-.916V2.73c0-.336.08-.654.22-.916zm11.242 11.243l2.257 2.257-11.75 6.78 9.493-9.037zm0-2.114L5.358 1.906l11.75 6.78-2.257 2.257zm1.414 1.057l3.868-2.233a1.99 1.99 0 0 0 0 3.452l-3.868-2.219z" />
          </svg>
          <div className="text-left leading-none">
            <span className={`text-[8px] sm:text-[9px] uppercase tracking-wider block ${dark ? "text-white/70" : "text-white/60"}`}>
              GET IT ON
            </span>
            <span className="text-[11px] sm:text-xs font-bold tracking-tight block mt-0.5">Google Play</span>
          </div>
        </a>
      </div>

      {showSubtitle && (
        <p
          className={`text-xs sm:text-[13px] font-medium tracking-tight text-center ${
            dark ? "text-white/90" : "text-[#031038]/75"
          }`}
        >
          Free to download on iOS & Android · Account provided by your administrator
        </p>
      )}
    </div>
  );
}

import { WhereNumbersGoWrong } from "./WhereNumbersGoWrong";
export { ProblemCardsSaved } from "./ProblemCardsSaved";
export {
  MASTER_OCEAN_FLOW,
  MASTER_JAMES_SMITH_FOOTER,
  MASTER_TOPO_WAVY_BASE,
  TOPO_FOOTER_WAVES,
} from "./problem-card-waves";

// Where survey numbers go wrong (Continuous Story Section with Waterline Spine)
export const ProblemSection = WhereNumbersGoWrong;

/* ─── Section: Survey Warehouse (The Archive) ─── */
export function SurveyWarehouseSection() {
  return <SurveyWarehouseShowcase />;
}

/* ─── Section: Spreadsheets vs Space BQS ─── */
export function SpreadsheetCompareSection() {
  return <WorkflowScrollSections />;
}

/* ─── Section: Who It's For ─── */
export function WhoItsForSection() {
  return <TeamSplitCards />;
}
