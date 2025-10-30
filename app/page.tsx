import DashboardChart from "@/components/dashboard/chart";
import DashboardPageLayout from "@/components/dashboard/layout";
import RebelsRanking from "@/components/dashboard/rebels-ranking";
import SecurityStatus from "@/components/dashboard/security-status";
import DashboardStat from "@/components/dashboard/stat";
import BracketsIcon from "@/components/icons/brackets";
import GearIcon from "@/components/icons/gear";
import ProcessorIcon from "@/components/icons/proccesor";
import StarIcon from "@/components/icons/star";
import { api } from "@/lib/trpc/server";
import mockDataJson from "@/mock.json";
import type { MockData } from "@/types/dashboard";

const mockData = mockDataJson as MockData;

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DashboardStat
          label="COMPETÊNCIAS"
          value={String(dashboard.totals.competencias)}
          description="SKILLS IN YOUR ARSENAL"
          icon={GearIcon}
          intent="positive"
        />
        <DashboardStat
          label="EXPERIÊNCIAS"
          value={String(dashboard.totals.experiencias)}
          description="PROFESSIONAL EXPERIENCES"
          icon={ProcessorIcon}
          intent="positive"
        />
        <DashboardStat
          label="QUESTIONS READY"
          value={String(dashboard.totals.questions)}
          description="PREPARED ANSWERS"
          icon={StarIcon}
          intent="neutral"
        />
      </div>

      <div className="mb-6">
        <DashboardChart />
      </div>

      {/* Main 2-column grid section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RebelsRanking rebels={mockData.rebelsRanking} />
        <SecurityStatus statuses={mockData.securityStatus} />
      </div>
    </DashboardPageLayout>
  );
}
