// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background
        'bg-primary': '#0E0F1A',
        'bg-secondary': '#1A1A27',
        'bg-tertiary': '#24253A',
        
        // Text
        'text-primary': '#EAEAEA',
        'text-secondary': '#CFCFCF',
        'text-tertiary': '#A3A3A3',
        'text-muted': '#6B7280',
        
        // Brand (Groovy Funk)
        'brand-blue': '#9AC1F0',
        'brand-green': '#72FA93',
        'brand-lime': '#A0E548',
        'brand-orange': '#E45F2B',
        'brand-yellow': '#F6C445',
        
        // Semantic
        success: '#72FA93',
        warning: '#F6C445',
        error: '#EF4444',
        info: '#9AC1F0',

        // Borders
        'border-subtle': '#2A2B3D',
        'border-default': '#3F4056',
        'border-strong': '#52556E',
      },
      fontFamily: {
        grotesk: ['var(--font-grotesk)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'md': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'lg': '0 8px 16px rgba(0, 0, 0, 0.5)',
        'xl': '0 16px 32px rgba(0, 0, 0, 0.6)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
};

export default config;
