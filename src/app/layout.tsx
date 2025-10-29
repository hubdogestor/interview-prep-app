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

// Font configurations otimizadas com variáveis CSS melhoradas
const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const dmSans = DMSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const jetBrainsMono = JetBrainsMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
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
    "prática entrevista",
    "entrevista comportamental",
    " entrevista frontend",
    " entrevista backend",
    " engenharia software"
  ],
  authors: [{ name: "Interview Prep Team", url: "https://interview-prep.app" }],
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
      {
        url: "/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "Interview Prep Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interview Prep App - Prepare-se para entrevistas com IA",
    description: "Plataforma de preparação para entrevistas com IA. Pratique respostas, analise suas competências e melhore seu desempenho.",
    images: ["/og-image.png"],
    creator: "@interviewprep",
    site: "@interviewprep",
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
    "theme-color": "#059669",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Interview Prep",
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
    <html lang="pt-BR" className="scroll-smooth antialiased">
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetching for external resources */}
        <link rel="dns-prefetch" href="https://api.interview-prep.app" />
        
        {/* Theme detection with enhanced CSS variables */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
                
                // Set CSS custom properties based on theme
                const root = document.documentElement;
                if (theme === 'dark') {
                  root.style.setProperty('--color-bg-primary', '#0f172a');
                  root.style.setProperty('--color-bg-secondary', '#1e293b');
                  root.style.setProperty('--color-bg-tertiary', '#334155');
                  root.style.setProperty('--color-text-primary', '#f8fafc');
                  root.style.setProperty('--color-text-secondary', '#cbd5e1');
                  root.style.setProperty('--color-brand-green', '#10b981');
                  root.style.setProperty('--color-brand-blue', '#3b82f6');
                  root.style.setProperty('--color-border-subtle', '#475569');
                } else {
                  root.style.setProperty('--color-bg-primary', '#ffffff');
                  root.style.setProperty('--color-bg-secondary', '#f8fafc');
                  root.style.setProperty('--color-bg-tertiary', '#f1f5f9');
                  root.style.setProperty('--color-text-primary', '#0f172a');
                  root.style.setProperty('--color-text-secondary', '#475569');
                  root.style.setProperty('--color-brand-green', '#059669');
                  root.style.setProperty('--color-brand-blue', '#2563eb');
                  root.style.setProperty('--color-border-subtle', '#e2e8f0');
                }
              } catch (e) {
                console.warn('Theme initialization failed:', e);
              }
            `,
          }}
        />
        
        {/* Preload critical fonts */}
        <style>
          {`
            :root {
              /* Brand Colors - Enhanced with better contrast ratios */
              --color-brand-green: #10b981;
              --color-brand-green-light: #34d399;
              --color-brand-green-dark: #059669;
              --color-brand-blue: #3b82f6;
              --color-brand-blue-light: #60a5fa;
              --color-brand-blue-dark: #2563eb;
              --color-brand-lime: #84cc16;
              --color-brand-yellow: #facc15;
              --color-brand-red: #ef4444;
              --color-brand-orange: #fb923c;
              
              /* Background Colors - Improved depth */
              --color-bg-primary: #ffffff;
              --color-bg-secondary: #f8fafc;
              --color-bg-tertiary: #f1f5f9;
              --color-bg-glass: rgba(255, 255, 255, 0.8);
              --color-bg-glass-dark: rgba(15, 23, 42, 0.8);
              
              /* Text Colors - Enhanced readability */
              --color-text-primary: #0f172a;
              --color-text-secondary: #475569;
              --color-text-muted: #64748b;
              --color-text-accent: #059669;
              
              /* Border Colors - Subtle but visible */
              --color-border-subtle: #e2e8f0;
              --color-border-default: #cbd5e1;
              --color-border-strong: #94a3b8;
              
              /* Effect Colors */
              --color-shadow-soft: rgba(0, 0, 0, 0.05);
              --color-shadow-medium: rgba(0, 0, 0, 0.1);
              --color-shadow-strong: rgba(0, 0, 0, 0.15);
              
              /* Interactive States */
              --color-focus-ring: #10b981;
              --color-focus-ring-opacity: 0.4;
              --color-hover-overlay: rgba(16, 185, 129, 0.1);
              --color-active-overlay: rgba(16, 185, 129, 0.2);
              
              /* Spacing Scale - Consistent rhythm */
              --space-1: 0.25rem;
              --space-2: 0.5rem;
              --space-3: 0.75rem;
              --space-4: 1rem;
              --space-5: 1.25rem;
              --space-6: 1.5rem;
              --space-8: 2rem;
              --space-10: 2.5rem;
              --space-12: 3rem;
              --space-16: 4rem;
              
              /* Typography Scale - Harmonious proportions */
              --text-xs: 0.75rem;
              --text-sm: 0.875rem;
              --text-base: 1rem;
              --text-lg: 1.125rem;
              --text-xl: 1.25rem;
              --text-2xl: 1.5rem;
              --text-3xl: 1.875rem;
              --text-4xl: 2.25rem;
              
              /* Border Radius - Consistent shapes */
              --radius-sm: 0.25rem;
              --radius-md: 0.375rem;
              --radius-lg: 0.5rem;
              --radius-xl: 0.75rem;
              --radius-2xl: 1rem;
              --radius-3xl: 1.5rem;
              
              /* Transitions - Smooth interactions */
              --transition-fast: 150ms ease-out;
              --transition-normal: 250ms ease-out;
              --transition-slow: 350ms ease-out;
              --transition-bounce: 350ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
              
              /* Z-Index Scale - Layered architecture */
              --z-dropdown: 1000;
              --z-sticky: 1020;
              --z-fixed: 1030;
              --z-modal-backdrop: 1040;
              --z-modal: 1050;
              --z-popover: 1060;
              --z-tooltip: 1070;
              --z-toast: 1080;
            }
            
            .dark {
              --color-bg-primary: #0f172a;
              --color-bg-secondary: #1e293b;
              --color-bg-tertiary: #334155;
              --color-bg-glass: rgba(30, 41, 59, 0.8);
              --color-bg-glass-dark: rgba(15, 23, 42, 0.9);
              --color-text-primary: #f8fafc;
              --color-text-secondary: #cbd5e1;
              --color-text-muted: #94a3b8;
              --color-border-subtle: #475569;
              --color-border-default: #64748b;
              --color-border-strong: #94a3b8;
              --color-shadow-soft: rgba(0, 0, 0, 0.1);
              --color-shadow-medium: rgba(0, 0, 0, 0.2);
              --color-shadow-strong: rgba(0, 0, 0, 0.3);
            }
            
            /* Smooth scrolling for the entire document */
            html {
              scroll-behavior: smooth;
            }
            
            /* Enhanced focus styles for accessibility */
            *:focus {
              outline: 2px solid var(--color-focus-ring);
              outline-offset: 2px;
            }
            
            /* Selection styling */
            ::selection {
              background-color: var(--color-brand-green);
              color: white;
            }
            
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
              *,
              *::before,
              *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
              }
            }
          `}
        </style>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${inter.variable} ${jetBrainsMono.variable} bg-bg-primary text-text-primary transition-colors duration-300`}
      >
        <TRPCProvider>{children}</TRPCProvider>
        
        {/* Loading fallback for slower connections */}
        <div 
          id="initial-loading" 
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary"
          suppressHydrationWarning={true}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
        </div>
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', () => {
                const loading = document.getElementById('initial-loading');
                if (loading) loading.style.display = 'none';
              });
              
              // Performance monitoring
              if ('performance' in window && 'measure' in window.performance) {
                window.addEventListener('load', () => {
                  setTimeout(() => {
                    const navTiming = performance.getEntriesByType('navigation')[0];
                    if (navTiming) {
                      console.log('Page load time:', navTiming.loadEventEnd - navTiming.loadEventStart, 'ms');
                    }
                  }, 0);
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
