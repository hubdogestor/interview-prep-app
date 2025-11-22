import type { ReactNode } from "react";
import { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { headers } from "next/headers";

import { CommandPalette } from "@/components/command-palette";
import { ContextFilesSync } from "@/components/ai/context-files-sync";
import { MobileHeader } from "@/components/dashboard/mobile-header";
import Notifications from "@/components/dashboard/notifications";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import Widget from "@/components/dashboard/widget";
import { KeyboardShortcutsProvider } from "@/components/keyboard-shortcuts-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ResizableLayout } from "@/components/ui/resizable-layout";
import { getBaseUrl } from "@/lib/env";
import { TRPCProvider } from "@/lib/trpc/react";
import { V0Provider } from "@/lib/v0-context";
import mockDataJson from "@/mock.json";
import type { MockData } from "@/types/dashboard";

import "./globals.css";

const mockData = mockDataJson as MockData;

const appBaseUrl = getBaseUrl();

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const rebelGrotesk = localFont({
  src: "../public/fonts/Rebels-Fett.woff2",
  variable: "--font-rebels",
  display: "swap",
});

const isV0 = process.env["VERCEL_URL"]?.includes("vusercontent.net") ?? false;

export const metadata: Metadata = {
  metadataBase: new URL(appBaseUrl),
  title: {
    template: "%s | Interview Prep",
    default: "Interview Prep App",
  },
  description:
    "Prepare-se para entrevistas de emprego com IA. Organize icebreakers, speeches, experiências e competências.",
  generator: "v0.app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Detectar se estamos em uma página de autenticação
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/Rebels-Fett.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${rebelGrotesk.variable} ${robotoMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <TRPCProvider>
          <V0Provider isV0={isV0}>
            <KeyboardShortcutsProvider>
              {isAuthPage ? (
                // Layout simples para páginas de autenticação (sem sidebars)
                children
              ) : (
                // Layout completo com sidebars para páginas normais
                <SidebarProvider>
                  {/* Mobile Header - only visible on mobile */}
                  <MobileHeader mockData={mockData} />

                  {/* Desktop Layout com Painéis Redimensionáveis */}
                  <ResizableLayout
                    leftPanel={<DashboardSidebar />}
                    rightPanel={
                      <div className="space-y-gap py-sides min-h-screen max-h-screen sticky top-0 overflow-clip">
                        <Widget widgetData={mockData.widgetData} />
                        <Notifications
                          initialNotifications={mockData.notifications}
                        />
                      </div>
                    }
                  >
                    {children}
                  </ResizableLayout>
                </SidebarProvider>
              )}

              {/* Command Palette - Global (Ctrl+K) */}
              <CommandPalette />

              {/* Context Files Sync Notification */}
              <ContextFilesSync />
            </KeyboardShortcutsProvider>
          </V0Provider>
        </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
