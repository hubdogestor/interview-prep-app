// src/app/layout.tsx
import type { Metadata } from "next";
import {
  DM_Sans as DMSans,
  Inter,
  JetBrains_Mono as JetBrainsMono,
  Space_Grotesk as SpaceGrotesk,
} from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc/Provider";

const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DMSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrainsMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Interview Prep App",
  description: "Plataforma de preparacao para entrevistas com IA",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${inter.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
