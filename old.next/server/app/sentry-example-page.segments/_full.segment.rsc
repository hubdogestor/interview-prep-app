1:"$Sreact.fragment"
2:I[79520,["/_next/static/chunks/7f2161fbfcdb9d2b.js","/_next/static/chunks/c9db675762dfab0a.js"],""]
9:I[63491,["/_next/static/chunks/3f0c66945ff4435c.js"],"default"]
:HL["/_next/static/chunks/b1ba67a3414fab37.css","style"]
:HL["/_next/static/media/0c89a48fa5027cee-s.p.4564287c.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/media/5c285b27cdda1fe8-s.p.a62025f2.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/media/70bc3e132a0a741e-s.p.15008bfb.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/media/83afe278b6a6bb3c-s.p.3a6ba036.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
3:T3258,
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
          0:{"P":null,"b":"hHBc_Dy3TtyR5rIk9_k1B","c":["","sentry-example-page"],"q":"","i":false,"f":[[["",{"children":["sentry-example-page",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/b1ba67a3414fab37.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","script","script-0",{"src":"/_next/static/chunks/7f2161fbfcdb9d2b.js","async":true,"nonce":"$undefined"}],["$","script","script-1",{"src":"/_next/static/chunks/c9db675762dfab0a.js","async":true,"nonce":"$undefined"}]],["$","html",null,{"lang":"pt-BR","className":"scroll-smooth antialiased","children":[["$","head",null,{"children":[["$","link",null,{"rel":"preconnect","href":"https://fonts.googleapis.com"}],["$","link",null,{"rel":"preconnect","href":"https://fonts.gstatic.com","crossOrigin":""}],["$","link",null,{"rel":"dns-prefetch","href":"https://api.interview-prep.app"}],["$","link",null,{"rel":"dns-prefetch","href":"https://fonts.gstatic.com"}],["$","link",null,{"rel":"preconnect","href":"https://images.unsplash.com"}],["$","$L2",null,{"id":"theme-detector","strategy":"beforeInteractive","children":"\n            try {\n              const theme = localStorage.getItem('theme') || \n                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');\n              document.documentElement.classList.toggle('dark', theme === 'dark');\n            } catch (e) {\n              console.warn('Theme initialization failed:', e);\n            }\n          "}],["$","style",null,{"children":"$3"}],"$L4"]}],"$L5"]}]]}],{"children":["$L6",{"children":["$L7",{},null,false,false]},null,false,false]},null,false,false],"$L8",false]],"m":"$undefined","G":["$9",[]],"s":false,"S":true}
b:I[69576,["/_next/static/chunks/7f2161fbfcdb9d2b.js","/_next/static/chunks/c9db675762dfab0a.js"],"TRPCProvider"]
c:I[39756,["/_next/static/chunks/bb7fa27eebfd9621.js"],"default"]
d:I[37457,["/_next/static/chunks/bb7fa27eebfd9621.js"],"default"]
e:I[22016,["/_next/static/chunks/7f2161fbfcdb9d2b.js","/_next/static/chunks/c9db675762dfab0a.js","/_next/static/chunks/f32742045d91774e.js"],""]
11:I[47257,["/_next/static/chunks/bb7fa27eebfd9621.js"],"ClientPageRoot"]
12:I[72386,["/_next/static/chunks/7f2161fbfcdb9d2b.js","/_next/static/chunks/c9db675762dfab0a.js","/_next/static/chunks/1bd506e04b215aaf.js"],"default"]
15:I[97367,["/_next/static/chunks/bb7fa27eebfd9621.js"],"OutletBoundary"]
16:"$Sreact.suspense"
18:I[97367,["/_next/static/chunks/bb7fa27eebfd9621.js"],"ViewportBoundary"]
1a:I[97367,["/_next/static/chunks/bb7fa27eebfd9621.js"],"MetadataBoundary"]
a:T483,
            /* Critical path CSS for immediate rendering */
            body {
              margin: 0;
              padding: 0;
              min-height: 100vh;
              font-family: 'Inter', 'Inter Fallback', system-ui, -apple-system, sans-serif;
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
          4:["$","style",null,{"children":"$a"}]
f:T1bcb,
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
            5:["$","body",null,{"className":"space_grotesk_188ec921-module__vWqBPa__variable dm_sans_9c2cdb89-module__YswyhW__variable inter_1043632-module__-XRQOW__variable jetbrains_mono_f384371a-module__XBgw1G__variable bg-bg-primary text-text-primary transition-colors duration-300 layout-container","children":[["$","a",null,{"href":"#main-content","className":"skip-link","children":"Pular para conteúdo principal"}],["$","a",null,{"href":"#navigation","className":"skip-link","style":{"left":"120px"},"children":"Pular para navegação"}],["$","$Lb",null,{"children":["$","$Lc",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Ld",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","div",null,{"className":"flex min-h-screen flex-col items-center justify-center gap-8 bg-[radial-gradient(circle_at_top,var(--color-blue)/12,transparent_55%),var(--bg-primary)] px-6 py-16 text-text-primary","children":["$","div",null,{"ref":"$undefined","className":"relative overflow-hidden rounded-3xl border w-full max-w-xl border-border-subtle/60 bg-bg-secondary/95 p-8 shadow-2xl shadow-black/40 backdrop-blur","children":[["$","div",null,{"ref":"$undefined","className":"grid gap-1.5 space-y-4 text-center","children":[["$","div",null,{"className":"flex justify-center","children":["$","span",null,{"ref":"$undefined","className":"inline-flex items-center rounded-full font-semibold border border-border-default px-4 py-1 text-sm uppercase tracking-[0.3em] text-brand-blue","children":"Erro 404"}]}],["$","h2",null,{"ref":"$undefined","className":"font-grotesk font-semibold text-3xl text-text-primary","children":"Conteúdo não encontrado"}],["$","p",null,{"ref":"$undefined","className":"text-base text-text-secondary","children":"O recurso que você procurava não está pronto ainda. Volte para o dashboard ou acompanhe o protótipo visual enquanto finalizamos esta rota."}]]}],["$","div",null,{"ref":"$undefined","className":"mt-6 flex flex-col gap-3","children":[["$","$Le",null,{"href":"/","children":"Voltar para o dashboard","className":"inline-flex items-center justify-center gap-2 rounded-xl font-sans font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 bg-brand-green text-bg-primary hover:bg-brand-green/90 focus-visible:ring-brand-green/40 h-10 px-5 py-2 text-sm","ref":null}],["$","$Le",null,{"href":"/design-test","children":"Abrir protótipo de layout","className":"inline-flex items-center justify-center gap-2 rounded-xl font-sans font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 bg-transparent text-text-primary hover:bg-white/5 focus-visible:ring-border-strong/40 h-10 px-5 py-2 text-sm","ref":null}]]}]]}]}],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]}],["$","div",null,{"id":"initial-loading","className":"fixed inset-0 z-50 flex items-center justify-center bg-bg-primary hardware-accelerated","suppressHydrationWarning":true,"role":"status","aria-label":"Carregando aplicação","children":["$","div",null,{"className":"flex flex-col items-center gap-4","children":[["$","div",null,{"className":"loading-skeleton rounded-full h-8 w-8 border-b-2 border-brand-green"}],["$","div",null,{"className":"text-sm text-text-muted","children":"Carregando Interview Prep..."}]]}]}],["$","$L2",null,{"id":"performance-monitoring","strategy":"afterInteractive","dangerouslySetInnerHTML":{"__html":"$f"}}],"$L10"]}]
6:["$","$1","c",{"children":[null,["$","$Lc",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Ld",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
7:["$","$1","c",{"children":[["$","$L11",null,{"Component":"$12","serverProvidedParams":{"searchParams":{},"params":{},"promises":["$@13","$@14"]}}],[["$","script","script-0",{"src":"/_next/static/chunks/1bd506e04b215aaf.js","async":true,"nonce":"$undefined"}]],["$","$L15",null,{"children":["$","$16",null,{"name":"Next.MetadataOutlet","children":"$@17"}]}]]}]
8:["$","$1","h",{"children":[null,["$","$L18",null,{"children":"$@19"}],["$","div",null,{"hidden":true,"children":["$","$L1a",null,{"children":["$","$16",null,{"name":"Next.Metadata","children":"$@1b"}]}]}],["$","meta",null,{"name":"next-size-adjust","content":""}]]}]
10:["$","link",null,{"rel":"manifest","href":"/manifest.json"}]
13:{}
14:"$7:props:children:0:props:serverProvidedParams:params"
19:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"}],["$","meta","2",{"name":"theme-color","media":"(prefers-color-scheme: light)","content":"#ffffff"}],["$","meta","3",{"name":"theme-color","media":"(prefers-color-scheme: dark)","content":"#0f172a"}],["$","meta","4",{"name":"color-scheme","content":"light dark"}]]
1b:[["$","title","0",{"children":"Interview Prep App - Prepare-se para entrevistas com IA"}],["$","meta","1",{"name":"description","content":"Plataforma de preparação para entrevistas com IA. Pratique respostas, analise suas competências e melhore seu desempenho em entrevistas técnicas e comportamentais."}],["$","link","2",{"rel":"author","href":"https://interview-prep.app"}],["$","meta","3",{"name":"author","content":"Interview Prep Team"}],["$","link","4",{"rel":"manifest","href":"/site.webmanifest","crossOrigin":"$undefined"}],["$","meta","5",{"name":"keywords","content":"entrevista,preparação,IA,entrevista técnica,carreira,desenvolvimento,perguntas entrevista,prática entrevista,entrevista comportamental,entrevista frontend,entrevista backend,engenharia software"}],["$","meta","6",{"name":"creator","content":"Interview Prep App"}],["$","meta","7",{"name":"publisher","content":"Interview Prep App"}],["$","meta","8",{"name":"robots","content":"index, follow"}],["$","meta","9",{"name":"googlebot","content":"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"}],["$","meta","10",{"name":"msapplication-TileColor","content":"#059669"}],["$","meta","11",{"name":"msapplication-config","content":"/browserconfig.xml"}],["$","meta","12",{"name":"theme-color","content":"#059669"}],["$","meta","13",{"name":"apple-mobile-web-app-capable","content":"yes"}],["$","meta","14",{"name":"apple-mobile-web-app-status-bar-style","content":"default"}],["$","meta","15",{"name":"apple-mobile-web-app-title","content":"Interview Prep"}],["$","link","16",{"rel":"canonical","href":"https://interview-prep.app"}],["$","meta","17",{"name":"format-detection","content":"telephone=no, address=no, email=no"}],["$","meta","18",{"property":"og:title","content":"Interview Prep App - Prepare-se para entrevistas com IA"}],["$","meta","19",{"property":"og:description","content":"Plataforma de preparação para entrevistas com IA. Pratique respostas, analise suas competências e melhore seu desempenho."}],["$","meta","20",{"property":"og:url","content":"https://interview-prep.app"}],["$","meta","21",{"property":"og:site_name","content":"Interview Prep App"}],["$","meta","22",{"property":"og:locale","content":"pt_BR"}],["$","meta","23",{"property":"og:image","content":"https://interview-prep.app/og-image.png"}],["$","meta","24",{"property":"og:image:width","content":"1200"}],["$","meta","25",{"property":"og:image:height","content":"630"}],["$","meta","26",{"property":"og:image:alt","content":"Interview Prep App - Prepare-se para entrevistas com IA"}],["$","meta","27",{"property":"og:image","content":"https://interview-prep.app/og-image-square.png"}],["$","meta","28",{"property":"og:image:width","content":"1200"}],["$","meta","29",{"property":"og:image:height","content":"1200"}],["$","meta","30",{"property":"og:image:alt","content":"Interview Prep Logo"}],["$","meta","31",{"property":"og:type","content":"website"}],["$","meta","32",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","33",{"name":"twitter:site","content":"@interviewprep"}],["$","meta","34",{"name":"twitter:creator","content":"@interviewprep"}],["$","meta","35",{"name":"twitter:title","content":"Interview Prep App - Prepare-se para entrevistas com IA"}],["$","meta","36",{"name":"twitter:description","content":"Plataforma de preparação para entrevistas com IA. Pratique respostas, analise suas competências e melhore seu desempenho."}],["$","meta","37",{"name":"twitter:image","content":"https://interview-prep.app/og-image.png"}],["$","link","38",{"rel":"shortcut icon","href":"/favicon-16x16.png"}],["$","link","39",{"rel":"icon","href":"/favicon.ico?favicon.b36d6da0.ico","sizes":"48x48","type":"image/x-icon"}],["$","link","40",{"rel":"icon","href":"/favicon-16x16.png","sizes":"16x16","type":"image/png"}],["$","link","41",{"rel":"icon","href":"/favicon-32x32.png","sizes":"32x32","type":"image/png"}],["$","link","42",{"rel":"icon","href":"/favicon-48x48.png","sizes":"48x48","type":"image/png"}],["$","link","43",{"rel":"apple-touch-icon","href":"/apple-touch-icon.png","sizes":"180x180","type":"image/png"}],["$","link","44",{"rel":"apple-touch-icon","href":"/apple-touch-icon-precomposed.png","sizes":"180x180","type":"image/png"}],"$L1c","$L1d"]
17:null
1e:I[27201,["/_next/static/chunks/bb7fa27eebfd9621.js"],"IconMark"]
1c:["$","link","45",{"rel":"mask-icon","href":"/safari-pinned-tab.svg","color":"#059669"}]
1d:["$","$L1e","46",{}]
