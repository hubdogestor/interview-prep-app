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
import Script from "next/script";

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
    "entrevista frontend",
    "entrevista backend",
    "engenharia software"
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
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preconnect to critical resources */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Resource hints for better performance */}
        <link rel="preload" href="/notification-sound.mp3" as="audio" type="audio/mpeg" />
        
        {/* Theme detection with enhanced CSS variables */}
        <Script id="theme-detector" strategy="beforeInteractive">
          {`
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
          `}
        </Script>
        
        {/* Enhanced CSS Variables System */}
        <style>
          {`
            :root {
              /* Brand Colors - Enhanced with better contrast ratios and accessibility */
              --color-brand-green: #10b981;
              --color-brand-green-light: #34d399;
              --color-brand-green-dark: #059669;
              --color-brand-green-contrast: #a7f3d0;
              --color-brand-blue: #3b82f6;
              --color-brand-blue-light: #60a5fa;
              --color-brand-blue-dark: #2563eb;
              --color-brand-blue-contrast: #93c5fd;
              --color-brand-lime: #84cc16;
              --color-brand-yellow: #facc15;
              --color-brand-yellow-contrast: #fde047;
              --color-brand-red: #ef4444;
              --color-brand-red-contrast: #fca5a5;
              --color-brand-orange: #fb923c;
              --color-brand-orange-contrast: #fed7aa;
              
              /* Background Colors - Improved depth and glass morphism */
              --color-bg-primary: #ffffff;
              --color-bg-secondary: #f8fafc;
              --color-bg-tertiary: #f1f5f9;
              --color-bg-glass: rgba(255, 255, 255, 0.8);
              --color-bg-glass-dark: rgba(15, 23, 42, 0.8);
              --color-bg-overlay: rgba(0, 0, 0, 0.5);
              
              /* Text Colors - Enhanced readability and WCAG compliance */
              --color-text-primary: #0f172a;
              --color-text-secondary: #475569;
              --color-text-muted: #64748b;
              --color-text-accent: #059669;
              --color-text-inverse: #ffffff;
              
              /* Border Colors - Subtle but visible with better contrast */
              --color-border-subtle: #e2e8f0;
              --color-border-default: #cbd5e1;
              --color-border-strong: #94a3b8;
              --color-border-accent: #10b981;
              
              /* Effect Colors - Enhanced shadows and effects */
              --color-shadow-soft: rgba(0, 0, 0, 0.05);
              --color-shadow-medium: rgba(0, 0, 0, 0.1);
              --color-shadow-strong: rgba(0, 0, 0, 0.15);
              --color-shadow-glow: rgba(16, 185, 129, 0.3);
              
              /* Interactive States - Comprehensive hover and focus states */
              --color-focus-ring: #10b981;
              --color-focus-ring-opacity: 0.4;
              --color-hover-overlay: rgba(16, 185, 129, 0.1);
              --color-active-overlay: rgba(16, 185, 129, 0.2);
              --color-disabled: #94a3b8;
              
              /* Spring Animation Variables */
              --spring-tension: 300;
              --spring-friction: 25;
              --spring-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
              
              /* Spacing Scale - Consistent rhythm */
              --space-px: 1px;
              --space-0: 0;
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
              --space-20: 5rem;
              --space-24: 6rem;
              
              /* Typography Scale - Harmonious proportions */
              --text-xs: 0.75rem;
              --text-sm: 0.875rem;
              --text-base: 1rem;
              --text-lg: 1.125rem;
              --text-xl: 1.25rem;
              --text-2xl: 1.5rem;
              --text-3xl: 1.875rem;
              --text-4xl: 2.25rem;
              --text-5xl: 3rem;
              
              /* Font Weights - Complete scale */
              --font-weight-light: 300;
              --font-weight-normal: 400;
              --font-weight-medium: 500;
              --font-weight-semibold: 600;
              --font-weight-bold: 700;
              
              /* Line Heights - Optimal readability */
              --line-height-tight: 1.25;
              --line-height-snug: 1.375;
              --line-height-normal: 1.5;
              --line-height-relaxed: 1.625;
              --line-height-loose: 2;
              
              /* Border Radius - Consistent shapes */
              --radius-none: 0;
              --radius-sm: 0.25rem;
              --radius-md: 0.375rem;
              --radius-lg: 0.5rem;
              --radius-xl: 0.75rem;
              --radius-2xl: 1rem;
              --radius-3xl: 1.5rem;
              --radius-full: 9999px;
              
              /* Transitions - Smooth interactions with spring physics */
              --transition-fast: 150ms ease-out;
              --transition-normal: 250ms ease-out;
              --transition-slow: 350ms ease-out;
              --transition-bounce: 350ms var(--spring-bounce);
              --transition-spring: 500ms var(--spring-bounce);
              
              /* Z-Index Scale - Layered architecture */
              --z-dropdown: 1000;
              --z-sticky: 1020;
              --z-fixed: 1030;
              --z-modal-backdrop: 1040;
              --z-modal: 1050;
              --z-popover: 1060;
              --z-tooltip: 1070;
              --z-toast: 1080;
              
              /* Screen Reader Support */
              --sr-only-size: 1px;
              --sr-only-position: absolute;
              --sr-only-clip: rect(0, 0, 0, 0);
              --sr-only-clip-path: inset(50%);
            }
            
            .dark {
              --color-bg-primary: #0f172a;
              --color-bg-secondary: #1e293b;
              --color-bg-tertiary: #334155;
              --color-bg-glass: rgba(30, 41, 59, 0.8);
              --color-bg-glass-dark: rgba(15, 23, 42, 0.9);
              --color-bg-overlay: rgba(0, 0, 0, 0.7);
              --color-text-primary: #f8fafc;
              --color-text-secondary: #cbd5e1;
              --color-text-muted: #94a3b8;
              --color-border-subtle: #475569;
              --color-border-default: #64748b;
              --color-border-strong: #94a3b8;
              --color-shadow-soft: rgba(0, 0, 0, 0.1);
              --color-shadow-medium: rgba(0, 0, 0, 0.2);
              --color-shadow-strong: rgba(0, 0, 0, 0.3);
              --color-shadow-glow: rgba(16, 185, 129, 0.4);
            }
            
            /* Smooth scrolling with performance optimization */
            html {
              scroll-behavior: smooth;
              scroll-padding-top: var(--space-20);
            }
            
            /* Enhanced focus styles for accessibility with better contrast */
            *:focus-visible {
              outline: 2px solid var(--color-focus-ring);
              outline-offset: 2px;
              border-radius: var(--radius-md);
            }
            
            /* Focus within for complex components */
            *:focus-within {
              outline: 1px solid var(--color-focus-ring);
              outline-offset: 1px;
            }
            
            /* Selection styling with brand colors */
            ::selection {
              background-color: var(--color-brand-green);
              color: var(--color-text-inverse);
            }
            
            ::-moz-selection {
              background-color: var(--color-brand-green);
              color: var(--color-text-inverse);
            }
            
            /* Progressive enhancement for modern browsers */
            @supports (backdrop-filter: blur(10px)) {
              .glass-morphism {
                backdrop-filter: blur(10px) saturate(180%);
                background-color: var(--color-bg-glass);
              }
            }
            
            @supports (backdrop-filter: blur(20px)) {
              .glass-morphism-strong {
                backdrop-filter: blur(20px) saturate(200%);
                background-color: var(--color-bg-glass-dark);
              }
            }
            
            /* Enhanced spring animations */
            @keyframes spring-scale {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            
            @keyframes spring-bounce {
              0%, 100% { 
                transform: translateY(0);
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
              }
              50% { 
                transform: translateY(-10px);
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
              }
            }
            
            @keyframes spring-glow {
              0%, 100% { 
                box-shadow: 0 0 5px var(--color-shadow-glow);
              }
              50% { 
                box-shadow: 0 0 20px var(--color-shadow-glow);
              }
            }
            
            /* Reduced motion support with performance optimization */
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
            
            /* High contrast mode support */
            @media (prefers-contrast: high) {
              :root {
                --color-border-subtle: #000000;
                --color-border-default: #000000;
                --color-border-strong: #000000;
                --color-text-muted: #000000;
              }
              
              .dark {
                --color-border-subtle: #ffffff;
                --color-border-default: #ffffff;
                --color-border-strong: #ffffff;
                --color-text-muted: #ffffff;
              }
            }
            
            /* Screen reader only utility */
            .sr-only {
              position: var(--sr-only-position);
              width: var(--sr-only-size);
              height: var(--sr-only-size);
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: var(--sr-only-clip);
              clip-path: var(--sr-only-clip-path);
              white-space: nowrap;
              border: 0;
            }
            
            .sr-only:focus {
              position: static;
              width: auto;
              height: auto;
              padding: inherit;
              margin: inherit;
              overflow: visible;
              clip: auto;
              clip-path: auto;
              white-space: normal;
            }
            
            /* Skip links for keyboard navigation */
            .skip-link {
              position: absolute;
              top: -40px;
              left: 6px;
              z-index: var(--z-tooltip);
              padding: var(--space-2) var(--space-4);
              background-color: var(--color-brand-green);
              color: var(--color-text-inverse);
              text-decoration: none;
              border-radius: var(--radius-lg);
              transition: top var(--transition-fast);
            }
            
            .skip-link:focus {
              top: 6px;
            }
            
            /* Performance optimizations */
            .will-change-transform {
              will-change: transform;
            }
            
            .will-change-opacity {
              will-change: opacity;
            }
            
            /* Hardware acceleration for smooth animations */
            .hardware-accelerated {
              transform: translateZ(0);
              backface-visibility: hidden;
              perspective: 1000px;
            }
            
            /* Enhanced loading states */
            .loading-skeleton {
              background: linear-gradient(
                90deg,
                var(--color-bg-tertiary) 25%,
                var(--color-border-subtle) 50%,
                var(--color-bg-tertiary) 75%
              );
              background-size: 200% 100%;
              animation: loading-shimmer 2s infinite;
            }
            
            @keyframes loading-shimmer {
              0% {
                background-position: -200% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
            
            /* Enhanced button states */
            .button-spring {
              transition: all var(--transition-spring);
              transform-origin: center;
            }
            
            .button-spring:hover {
              transform: scale(1.05);
              box-shadow: 0 4px 12px var(--color-shadow-medium);
            }
            
            .button-spring:active {
              transform: scale(0.98);
              transition-duration: 100ms;
            }
          `}
        </style>
        
        {/* Critical CSS for above-the-fold content */}
        <style>
          {`
            /* Critical path CSS for immediate rendering */
            body {
              margin: 0;
              padding: 0;
              min-height: 100vh;
              font-family: ${inter.style.fontFamily}, system-ui, -apple-system, sans-serif;
              line-height: var(--line-height-normal);
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* Loading state optimization */
            #initial-loading {
              opacity: 1;
              transition: opacity 0.3s ease-out;
            }
            
            #initial-loading.hidden {
              opacity: 0;
              pointer-events: none;
            }
            
            /* Performance critical layouts */
            .layout-container {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
            
            .content-area {
              flex: 1;
              width: 100%;
              max-width: 1280px;
              margin: 0 auto;
              padding: 0 var(--space-4);
            }
          `}
        </style>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${inter.variable} ${jetBrainsMono.variable} bg-bg-primary text-text-primary transition-colors duration-300 layout-container`}
      >
        {/* Skip links for accessibility */}
        <a href="#main-content" className="skip-link">
          Pular para conteúdo principal
        </a>
        <a href="#navigation" className="skip-link" style={{ left: '120px' }}>
          Pular para navegação
        </a>
        
        <TRPCProvider>{children}</TRPCProvider>
        
        {/* Loading fallback for slower connections */}
        <div 
          id="initial-loading" 
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary hardware-accelerated"
          suppressHydrationWarning={true}
          role="status"
          aria-label="Carregando aplicação"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="loading-skeleton rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
            <div className="text-sm text-text-muted">Carregando Interview Prep...</div>
          </div>
        </div>
        
        {/* Service Worker and Performance Scripts */}
        <Script
          id="performance-monitoring"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if (typeof window !== 'undefined' && 'performance' in window && 'measure' in window.performance) {
                window.addEventListener('load', () => {
                  // Measure critical rendering path
                  performance.mark('app-start');
                  
                  setTimeout(() => {
                    performance.mark('app-end');
                    performance.measure('app-load-time', 'app-start', 'app-end');
                    
                    const measures = performance.getEntriesByType('measure');
                    measures.forEach(measure => {
                      if (measure.duration > 1000) {
                        console.warn('Slow operation detected:', measure.name, measure.duration + 'ms');
                      }
                    });
                  }, 0);
                });
                
                // Monitor long tasks
                if ('PerformanceObserver' in window) {
                  const longTaskObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      console.warn('Long task detected:', entry.duration + 'ms');
                    }
                  });
                  
                  try {
                    longTaskObserver.observe({ entryTypes: ['longtask'] });
                  } catch (e) {
                    // Long task API not supported
                  }
                }
              }
              
              // Progressive enhancement detection
              const supportsIntersectionObserver = 'IntersectionObserver' in window;
              const supportsServiceWorker = 'serviceWorker' in navigator;
              const supportsWebShare = 'share' in navigator;
              const supportsNotifications = 'Notification' in window;
              
              // Store feature support for use by components
              window.__FEATURE_SUPPORT__ = {
                intersectionObserver: supportsIntersectionObserver,
                serviceWorker: supportsServiceWorker,
                webShare: supportsWebShare,
                notifications: supportsNotifications,
                webAudio: 'AudioContext' in window || 'webkitAudioContext' in window,
                vibration: 'vibrate' in navigator,
                reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
                highContrast: window.matchMedia('(prefers-contrast: high)').matches
              };
              
              // Service Worker registration with offline support
              if (supportsServiceWorker && 'serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                      console.log('SW registered: ', registration);
                      
                      // Listen for updates
                      registration.addEventListener('updatefound', () => {
                        console.log('Service Worker update found');
                      });
                    })
                    .catch(registrationError => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
              
              // Hide loading screen
              window.addEventListener('load', () => {
                const loading = document.getElementById('initial-loading');
                if (loading) {
                  loading.classList.add('hidden');
                  setTimeout(() => {
                    loading.style.display = 'none';
                  }, 300);
                }
              });
              
              // Handle visibility changes for performance
              document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                  // Pause animations and heavy operations
                  document.body.classList.add('page-hidden');
                } else {
                  // Resume operations
                  document.body.classList.remove('page-hidden');
                }
              });
              
              // Advanced keyboard navigation
              document.addEventListener('keydown', (event) => {
                const { key, ctrlKey, metaKey } = event;
                
                // Global shortcuts
                if ((metaKey || ctrlKey) && key === 'k') {
                  event.preventDefault();
                  const searchInput = document.querySelector('input[placeholder*="Buscar"]') || document.querySelector('input[type="search"]');
                  if (searchInput) {
                    searchInput.focus();
                  }
                }
                
                // Skip links navigation
                if (key === 'Tab' && !event.shiftKey) {
                  const focusedElement = document.activeElement;
                  if (focusedElement === document.body) {
                    const skipLink = document.querySelector('.skip-link');
                    if (skipLink) {
                      skipLink.focus();
                      event.preventDefault();
                    }
                  }
                }
              });
              
              // Accessibility enhancements
              if (window.__FEATURE_SUPPORT__.reducedMotion) {
                document.body.classList.add('reduce-motion');
              }
              
              if (window.__FEATURE_SUPPORT__.highContrast) {
                document.body.classList.add('high-contrast');
              }
              
              // Focus management for better accessibility
              let focusVisible = false;
              
              document.addEventListener('keydown', (event) => {
                if (event.key === 'Tab') {
                  focusVisible = true;
                  document.body.classList.add('keyboard-navigation');
                }
              });
              
              document.addEventListener('mousedown', () => {
                focusVisible = false;
                document.body.classList.remove('keyboard-navigation');
              });
              
              // Announce page changes to screen readers
              function announceToScreenReader(message) {
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.setAttribute('aria-atomic', 'true');
                announcement.className = 'sr-only';
                announcement.textContent = message;
                document.body.appendChild(announcement);
                
                setTimeout(() => {
                  document.body.removeChild(announcement);
                }, 1000);
              }
              
              // Expose announce function globally
              window.announceToScreenReader = announceToScreenReader;
            `
          }}
        />
        
        {/* Critical resource hints */}
        <link rel="preload" href="/favicon-32x32.png" as="image" type="image/png" />
        <link rel="preload" href="/favicon-16x16.png" as="image" type="image/png" />
        
        {/* Manifest for PWA support */}
        <link rel="manifest" href="/manifest.json" />
      </body>
    </html>
  );
}
