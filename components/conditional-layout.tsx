"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { MobileHeader } from "@/components/dashboard/mobile-header";
import Notifications from "@/components/dashboard/notifications";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import Widget from "@/components/dashboard/widget";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ResizableLayout } from "@/components/ui/resizable-layout";
import type { MockData } from "@/types/dashboard";

interface ConditionalLayoutProps {
  children: ReactNode;
  mockData: MockData;
}

export function ConditionalLayout({ children, mockData }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  // Se é página de autenticação, retorna apenas o children
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Caso contrário, renderiza o layout completo com sidebars
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
