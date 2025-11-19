import DashboardChart from "@/components/dashboard/chart";
import DashboardPageLayout from "@/components/dashboard/layout";
import { RecentItems } from "@/components/dashboard/recent-items";
import { FavoritesList } from "@/components/dashboard/favorites-list";
import DashboardStat from "@/components/dashboard/stat";
import BracketsIcon from "@/components/icons/brackets";
import GearIcon from "@/components/icons/gear";
import ProcessorIcon from "@/components/icons/proccesor";
import StarIcon from "@/components/icons/star";
import MicrophoneIcon from "@/components/icons/microphone";
import MessageIcon from "@/components/icons/message";
import BriefcaseIcon from "@/components/icons/briefcase";
import { api } from "@/lib/trpc/server";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ExportPortfolioButton } from "@/components/dashboard/export-portfolio-button";
import { NeedsReviewWidget } from "@/components/dashboard/needs-review-widget";
import { AIStatsWidget } from "@/components/dashboard/ai-stats-widget";
import { PracticeEvolutionChart } from "@/components/dashboard/practice-evolution-chart";
import { PracticeHeatmap } from "@/components/dashboard/practice-heatmap";
import { SmartSuggestions } from "@/components/dashboard/smart-suggestions";
import {
  dashboardOverviewFallback,
  type DashboardOverviewData,
} from "@/data/dashboard-overview-fallback";

export default async function DashboardOverview() {
  let dashboard: DashboardOverviewData = dashboardOverviewFallback;

  try {
    const caller = await api();
    dashboard = await caller.dashboard.overview();
  } catch (error) {
    console.error(
      "[dashboard] Failed to load data from Prisma. Using fallback dataset instead.",
      error,
    );
  }

  return (
    <DashboardPageLayout
      header={{
        title: "Overview",
        description: `Last updated ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
        icon: BracketsIcon,
      }}
    >
      {/* Quick Actions */}
      <div className="mb-6">
        <QuickActions />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <DashboardStat
          label="ICEBREAKERS"
          value={String(dashboard.totals.icebreakers)}
          description="INTRODUCTIONS"
          icon={MicrophoneIcon}
          intent="positive"
        />
        <DashboardStat
          label="SPEECHES"
          value={String(dashboard.totals.speeches)}
          description="NARRATIVES"
          icon={MessageIcon}
          intent="positive"
        />
        <DashboardStat
          label="QUESTIONS"
          value={String(dashboard.totals.questions)}
          description="FOR INTERVIEWERS"
          icon={StarIcon}
          intent="neutral"
        />
        <DashboardStat
          label="EXPERIÊNCIAS"
          value={String(dashboard.totals.experiencias)}
          description="JOURNEY"
          icon={BriefcaseIcon}
          intent="positive"
        />
        <DashboardStat
          label="COMPETÊNCIAS"
          value={String(dashboard.totals.competencias)}
          description="SKILLS"
          icon={ProcessorIcon}
          intent="positive"
        />
      </div>

      <div className="mb-6">
        <DashboardChart />
      </div>

      {/* Export Portfolio */}
      <div className="mb-6">
        <ExportPortfolioButton />
      </div>

      {/* Enhanced Widgets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <NeedsReviewWidget />
        <AIStatsWidget />
      </div>

      {/* Practice Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PracticeEvolutionChart />
        <PracticeHeatmap />
      </div>

      {/* Smart Suggestions + Recent/Favorites */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SmartSuggestions />
        <RecentItems items={dashboard.recentItems} />
        <FavoritesList items={dashboard.favoriteItems} />
      </div>
    </DashboardPageLayout>
  );
}
