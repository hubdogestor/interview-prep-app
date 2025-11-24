import type { ReactNode } from "react";

import { MobileHeader } from "@/components/dashboard/mobile-header";
import Notifications from "@/components/dashboard/notifications";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import Widget from "@/components/dashboard/widget";
import { ResizableLayout } from "@/components/ui/resizable-layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import mockDataJson from "@/mock.json";
import type { MockData } from "@/types/dashboard";

const mockData = mockDataJson as MockData;

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* Mobile Header - only visible on mobile */}
      <MobileHeader mockData={mockData} />

      {/* Desktop Layout com Painéis Redimensionáveis */}
      <ResizableLayout
        leftPanel={<DashboardSidebar />}
        rightPanel={
          <div className="space-y-gap py-sides min-h-screen max-h-screen sticky top-0 overflow-clip">
            <Widget widgetData={mockData.widgetData} />
            <Notifications initialNotifications={mockData.notifications} />
          </div>
        }
      >
        {children}
      </ResizableLayout>
    </SidebarProvider>
  );
}
