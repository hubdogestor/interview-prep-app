"use client";

import { useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { placeholderProfileSummary } from "@/types/profile";
import BracketsIcon from "@/components/icons/brackets";
import { V0Provider } from "@/lib/v0-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./sidebar";
import { MobileHeader } from "./mobile-header";
import DashboardPageLayout from "./layout";
import DashboardStat from "./stat";
import DashboardChart from "./chart";
import { FocusRanking } from "./focus-ranking";
import PreparationStatusBoard from "./security-status";
import Widget from "./widget";
import Notifications from "./notifications";
import Chat from "./chat";
import { buildDashboardV0Data } from "./data-adapter";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { MobileChat } from "./chat/mobile-chat";

const formatHeaderDescription = (updatedAt?: string | null) => {
  if (!updatedAt) return undefined;
  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) return undefined;

  return `Atualizado em ${date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  })}`;
};

export function DashboardV0Shell() {
  const { data: profileData, isLoading } = trpc.profile.summary.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const profile = profileData ?? placeholderProfileSummary;

  const dashboardData = useMemo(() => buildDashboardV0Data(profile), [profile]);

  return (
    <V0Provider isV0={false}>
      <SidebarProvider>
        <MobileHeader
          notifications={dashboardData.notifications}
          label="Monitor diário"
        />

        <div className="w-full grid grid-cols-1 gap-6 lg:grid-cols-12 lg:px-6 xl:px-10 2xl:px-16">
          <div className="hidden lg:block lg:col-span-2">
            <DashboardSidebar profile={profile} activeKey="dashboard" />
          </div>

          <div className="col-span-1 lg:col-span-7">
            <DashboardPageLayout
              header={{
                title: profile.name || "Seu dashboard",
                description: formatHeaderDescription(profile.updatedAt),
                icon: BracketsIcon,
              }}
            >
              <div className="flex flex-col gap-8">
                <ProfileCard profile={profile} isLoading={isLoading} />

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {dashboardData.stats.map((stat) => (
                    <DashboardStat key={stat.label} {...stat} />
                  ))}
                </section>

                <section>
                  <DashboardChart data={dashboardData.chart} />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FocusRanking items={dashboardData.ranking} />
                  <PreparationStatusBoard statuses={dashboardData.statuses} />
                </section>
              </div>
            </DashboardPageLayout>
          </div>

          <aside className="hidden lg:block lg:col-span-3">
            <div className="space-y-6 sticky top-24">
              <Widget widgetData={dashboardData.widget} />
              <Notifications initialNotifications={dashboardData.notifications} />
              <Chat />
            </div>
          </aside>
        </div>

        <MobileChat />
      </SidebarProvider>
    </V0Provider>
  );
}

export default DashboardV0Shell;
