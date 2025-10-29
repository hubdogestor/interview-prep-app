# Interview Prep App · Dark Dashboard Theme

## Palette
- Background: `#0E0F1A` (primary), `#151625` (secondary), `#1F2032` (tertiary)
- Text: `#EAEAEA`, `#CFCFCF`, `#A3A3A3`, `#6B7280`
- Accents: `#9AC1F0` blue, `#72FA93` green, `#A0E548` lime, `#E45F2B` orange, `#F6C445` yellow
- Borders: `#2A2B3D` subtle, `#3F4056` default, `#52556E` strong

## Typography
- `Space Grotesk`: headings and brand voice (`font-grotesk`)
- `DM Sans`: section titles, buttons, navigation (`font-sans`)
- `Inter`: body copy and long form text (`font-body`)
- `JetBrains Mono`: numerical highlights and code snippets (`font-mono`)

Weights available: 400, 500, 600, 700. All fonts load with `display: swap` through `next/font`.

## Components
- Cards: rounded 28px, glassy gradient highlight on hover, border `border-border-subtle`, soft shadow.
- Buttons: pill shaped with gradients; primary blends green and lime, secondary uses blue haze, ghost for quiet actions.
- Badges: uppercase micro components with transparent brand fills.
- Inputs: `bg-bg-tertiary`, 12px radius, ringed focus with brand blue.

## Layout System
- Dashboard shell: 260px sidebar + fluid content grid, 2rem gutters.
- Panels use `panel-grid` (`repeat(auto-fit, minmax(220px, 1fr))`) and `analytics-grid` for larger sections.
- Sidebar and cards share the same gradient halo and depth treatment.

## Interaction Notes
- Hover states lift elements by 2px with glow shadow.
- Trend indicators use `trend-positive` (green) and `trend-negative` (orange) helpers.
- Charts rely on lightweight SVG paths shaded with branded gradients.

Use the `/design-test` route as a live reference of the full system.
