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
import { api } from "@/lib/trpc/server";

export default async function DashboardOverview() {
  const caller = await api();
  const dashboard = await caller.dashboard.overview();

  return (
    <DashboardPageLayout
      header={{
        title: "Overview",
        description: `Last updated ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
        icon: BracketsIcon,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardStat
          label="ICEBREAKERS"
          value={String(dashboard.totals.icebreakers)}
          description="YOUR INTRODUCTIONS"
          icon={MicrophoneIcon}
          intent="positive"
        />
        <DashboardStat
          label="SPEECHES"
          value={String(dashboard.totals.speeches)}
          description="COMPLETE NARRATIVES"
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
          description="PROFESSIONAL JOURNEY"
          icon={ProcessorIcon}
          intent="positive"
        />
      </div>

      <div className="mb-6">
        <DashboardChart />
      </div>

      {/* Main 2-column grid section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RecentItems items={dashboard.recentItems} />
        <FavoritesList items={dashboard.favoriteItems} />
      </div>
    </DashboardPageLayout>
  );
}
