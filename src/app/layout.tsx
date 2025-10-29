// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
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
  preload: true,
});

const dmSans = DMSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const jetBrainsMono = JetBrainsMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Interview Prep App - Prepare-se para entrevistas com IA",
    template: "%s | Interview Prep App"
  },
  description: "Plataforma de preparação para entrevistas com IA. Pratique respostas, analise suas competências e melhore seu desempenho em entrevistas técnicas e comportamentais.",
  keywords: [
    "entrevista",
    "preparação",
    "IA",
    "entrevista técnica",
    "carreira",
    "desenvolvimento",
    "perguntas entrevista",
    "prática entrevista"
  ],
  authors: [{ name: "Interview Prep Team" }],
  creator: "Interview Prep App",
  publisher: "Interview Prep App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://interview-prep.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://interview-prep.app",
    title: "Interview Prep App - Prepare-se para entrevistas com IA",
    description: "Plataforma de preparação para entrevistas com IA. Pratique respostas, analise suas competências e melhore seu desempenho.",
    siteName: "Interview Prep App",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Interview Prep App - Prepare-se para entrevistas com IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interview Prep App - Prepare-se para entrevistas com IA",
    description: "Plataforma de preparação para entrevistas com IA. Pratique respostas, analise suas competências e melhore seu desempenho.",
    images: ["/og-image.png"],
    creator: "@interviewprep",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon-16x16.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-precomposed.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#059669",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#059669",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Theme detection */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${inter.variable} ${jetBrainsMono.variable} antialiased bg-bg-primary text-text-primary transition-colors duration-300`}
      >
        <TRPCProvider>{children}</TRPCProvider>
        
        {/* Loading fallback for slower connections */}
        <div id="initial-loading" className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
        </div>
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', () => {
                const loading = document.getElementById('initial-loading');
                if (loading) loading.style.display = 'none';
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
