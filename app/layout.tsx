import type { ReactNode } from "react";
import { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import { ContextFilesSync } from "@/components/ai/context-files-sync";
import { CommandPalette } from "@/components/command-palette";
import { ConditionalLayout } from "@/components/conditional-layout";
import { KeyboardShortcutsProvider } from "@/components/keyboard-shortcuts-provider";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
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
                {/* ConditionalLayout detecta automaticamente se é página de auth */}
                <ConditionalLayout mockData={mockData}>
                  {children}
                </ConditionalLayout>

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
