// tailwind.config.ts
import type { Config } from "tailwindcss";

const withOpacityValue = (variable: string) => {
  return ({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variable}) / ${opacityValue})`;
    }
    return `rgb(var(${variable}) / 1)`;
  };
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": withOpacityValue("--bg-primary"),
        "bg-secondary": withOpacityValue("--bg-secondary"),
        "bg-tertiary": withOpacityValue("--bg-tertiary"),
        "text-primary": withOpacityValue("--text-primary"),
        "text-secondary": withOpacityValue("--text-secondary"),
        "text-tertiary": withOpacityValue("--text-tertiary"),
        "text-muted": withOpacityValue("--text-muted"),
        "brand-blue": withOpacityValue("--color-blue"),
        "brand-green": withOpacityValue("--color-green"),
        "brand-lime": withOpacityValue("--color-lime"),
        "brand-orange": withOpacityValue("--color-orange"),
        "brand-yellow": withOpacityValue("--color-yellow"),
        success: withOpacityValue("--semantic-success"),
        warning: withOpacityValue("--semantic-warning"),
        error: withOpacityValue("--semantic-error"),
        info: withOpacityValue("--semantic-info"),
        "border-subtle": withOpacityValue("--border-subtle"),
        "border-default": withOpacityValue("--border-default"),
        "border-strong": withOpacityValue("--border-strong"),
      },
      fontFamily: {
        grotesk: ["var(--font-grotesk)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
        md: "0 2px 8px rgba(0, 0, 0, 0.4)",
        lg: "0 8px 16px rgba(0, 0, 0, 0.5)",
        xl: "0 16px 32px rgba(0, 0, 0, 0.6)",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
