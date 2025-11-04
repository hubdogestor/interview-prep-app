import type { ReactNode } from "react";
import { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";

import Chat from "@/components/chat";
import { MobileChat } from "@/components/chat/mobile-chat";
import { MobileHeader } from "@/components/dashboard/mobile-header";
import Notifications from "@/components/dashboard/notifications";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import Widget from "@/components/dashboard/widget";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TRPCProvider } from "@/lib/trpc/react";
import { V0Provider } from "@/lib/v0-context";
import { KeyboardShortcutsProvider } from "@/components/keyboard-shortcuts-provider";
import { CommandPalette } from "@/components/command-palette";
import mockDataJson from "@/mock.json";
import type { MockData } from "@/types/dashboard";

import "./globals.css";

const mockData = mockDataJson as MockData;

const appBaseUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

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
    template: "%s - M.O.N.K.Y OS",
    default: "M.O.N.K.Y OS",
  },
  description:
    "The ultimate OS for rebels. Making the web for brave individuals.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
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
        <SessionProvider>
          <TRPCProvider>
            <V0Provider isV0={isV0}>
              <KeyboardShortcutsProvider>
                <SidebarProvider>
                {/* Mobile Header - only visible on mobile */}
                <MobileHeader mockData={mockData} />

                {/* Desktop Layout */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-gap lg:px-sides">
                  <div className="hidden lg:block col-span-2 top-0 relative">
                    <DashboardSidebar />
                  </div>
                  <div className="col-span-1 lg:col-span-7">{children}</div>
                  <div className="col-span-3 hidden lg:block">
                    <div className="space-y-gap py-sides min-h-screen max-h-screen sticky top-0 overflow-clip">
                      <Widget widgetData={mockData.widgetData} />
                      <Notifications
                        initialNotifications={mockData.notifications}
                      />
                      <Chat />
                    </div>
                  </div>
                </div>

                {/* Mobile Chat - floating CTA with drawer */}
                <MobileChat />
                </SidebarProvider>

                {/* Command Palette - Global (Ctrl+K) */}
                <CommandPalette />
              </KeyboardShortcutsProvider>
            </V0Provider>
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
