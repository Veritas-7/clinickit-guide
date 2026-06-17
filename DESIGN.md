---
version: public-reference-v1
name: clinickit-guide
description: "차분하고 신뢰 중심인 의료기관 제작 기준서. 과장 없는 전문성, 명확한 진료 정보, 지역 접근성을 우선한다."
colors:
  primary: "hsl(215 50% 23%)"
  secondary: "hsl(210 18% 94%)"
  tertiary: "hsl(185 45% 38%)"
  neutral: "hsl(210 15% 97%)"
  background: "hsl(210 20% 99%)"
  surface: "hsl(0 0% 100%)"
  foreground: "hsl(220 25% 12%)"
  muted: "hsl(215 15% 45%)"
  accent: "hsl(185 45% 38%)"
typography:
  h1:
    fontFamily: "Noto Sans KR"
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0em"
  body-md:
    fontFamily: "Noto Sans KR"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
rounded:
  sm: 4px
  md: 8px
  lg: 10px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 20px
  xl: 32px
components:
  guide-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 20px
  primary-action:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 10px
  accent-card:
    backgroundColor: "{colors.accent}"
    textColor: "#000000"
    rounded: "{rounded.md}"
    padding: 20px
  muted-note:
    backgroundColor: "{colors.muted}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: 12px
  neutral-panel:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: 12px
---

# DESIGN.md

## Overview

병원/의원 웹사이트 제작 가이드 시스템 is a public reference system for 병원/의원 homepage production. This document captures the implementation-facing visual contract needed to recreate the same site style, color behavior, spacing rhythm, and guide/tool surface from source alone.

The project should feel like a practical industry workbench: a curated guide, a client brief tool, a site blueprint generator, and implementation rules in one interface. It is not a marketing landing page. Preserve the source system's dense but readable documentation rhythm.

## Source-Derived Identity

차분하고 신뢰 중심인 의료기관 제작 기준서. 과장 없는 전문성, 명확한 진료 정보, 지역 접근성을 우선한다.

Core visual rules:

- Use navy as structural authority and teal as restrained action/accent.
- Compliance and review states must stay visible through badges and border treatments.
- Medical copy must remain precise, reviewable, and not promise treatment outcomes.

## Palette

Use semantic HSL tokens from `src/index.css` and Tailwind aliases from `tailwind.config.ts`. Do not hard-code unrelated one-off colors into pages.

- Primary: `hsl(215 50% 23%)`
- Secondary: `hsl(210 18% 94%)`
- Tertiary: `hsl(185 45% 38%)`
- Neutral: `hsl(210 15% 97%)`
- Background: `hsl(210 20% 99%)`
- Surface: `hsl(0 0% 100%)`
- Foreground: `hsl(220 25% 12%)`
- Muted text: `hsl(215 15% 45%)`
- Accent: `hsl(185 45% 38%)`

### Local CSS Variable Evidence

- `background` = `210 20% 99%`
- `foreground` = `220 25% 12%`
- `card` = `0 0% 100%`
- `card-foreground` = `220 25% 12%`
- `popover` = `0 0% 100%`
- `popover-foreground` = `220 25% 12%`
- `primary` = `215 50% 23%`
- `primary-foreground` = `210 40% 98%`
- `secondary` = `210 18% 94%`
- `secondary-foreground` = `220 25% 12%`
- `muted` = `210 15% 95%`
- `muted-foreground` = `215 15% 45%`
- `accent` = `185 45% 38%`
- `accent-foreground` = `0 0% 100%`
- `destructive` = `0 70% 50%`
- `destructive-foreground` = `210 40% 98%`
- `border` = `215 15% 90%`
- `input` = `215 15% 90%`
- `ring` = `215 50% 23%`
- `radius` = `0.5rem`
- `surface` = `210 15% 97%`
- `info` = `200 75% 45%`
- `success` = `155 55% 38%`
- `warning` = `40 85% 50%`
- `emergency` = `0 70% 50%`
- `review-required` = `35 90% 50%`
- `clinic-closed` = `215 15% 55%`
- `teal` = `185 45% 38%`

## Typography

Use `Noto Sans KR` for page titles and `Noto Sans KR` for body/UI text. Preserve Korean readability over decorative density: body copy uses at least `1.55` line-height, stable letter spacing, and no viewport-width font scaling.

Headings may be strong and compact, but guide pages should keep H1 around `2.25rem` desktop and avoid oversized hero treatment. Cards, sidebars, and tool panels use tighter headings so dense Korean content remains scannable.

## Layout

Primary shell: sidebar workbench with sticky top command header, max-w-5xl content, footer disclaimer.

Rules:

- Keep sidebar navigation and top command/search affordances persistent on desktop.
- Keep content width constrained; current source centers guide content around `max-w-4xl` to `max-w-5xl`.
- Cards are for repeated guide objects, status blocks, summary cards, and generated outputs. Do not nest broad page sections inside decorative cards.
- Mobile order: sidebar trigger/header, command/search where available, page title, summary/quick-apply, content, previous/next navigation.
- Long Korean labels, business names, menu names, course names, regions, and CTA labels must wrap without clipping.

## Components

| Component | Contract | Confidence |
|---|---|---|
| `GuideSidebar` | Preserve source behavior and state language from current implementation. | high |
| `GuideLayout` | Preserve source behavior and state language from current implementation. | high |
| `CommandSearch` | Preserve source behavior and state language from current implementation. | high |
| `PageToc` | Preserve source behavior and state language from current implementation. | high |
| `GuideCard` | Preserve source behavior and state language from current implementation. | high |
| `StatusCard` | Preserve source behavior and state language from current implementation. | high |
| `CopyBlock` | Preserve source behavior and state language from current implementation. | high |

Common component rules:

- Navigation items need active, hover, and focus-visible states.
- Command search must remain keyboard reachable and visually stable.
- Copyable prompt/meta/code blocks need clear label, monospaced output, and copied feedback.
- Status/proof/review states cannot rely on color alone; use label text or border/shape difference too.
- Icon buttons require accessible labels. Text buttons must not overflow on mobile.

## States And Accessibility

- Normal text contrast target: 4.5:1 or higher.
- Large text and non-text UI indicators: 3:1 minimum.
- Focus-visible styles must be present on sidebar links, command search, buttons, copy controls, form fields, and TOC links.
- A selected nav route needs both color and active styling.
- Form validation in client brief tools must use visible text and cannot rely only on red color.
- Motion must be subtle and non-blocking; prefer opacity/transform only. Honor reduced-motion expectations when adding new animation.

## Content And Copy Rules

- Keep Korean labels direct and specific.
- Do not show hidden implementation instructions in the UI.
- Guide pages should use evidence-oriented headings: industry traits, design guide, UI guide, UX guide, page templates, content guide, SEO/GEO, checklist, client brief, site blueprint, implementation rules.
- Public-site generation outputs must be copyable and source-grounded.

## Routes And Information Architecture

Detected route/page evidence:

- `/`
- `/industry-overview`
- `/design-guide`
- `/ui-guide`
- `/ux-guide`
- `/page-templates`
- `/content-guide`
- `/compliance-guide`
- `/seo-geo`
- `/checklist`
- `/client-brief`
- `/site-blueprint`
- `/implementation-rules`
- `*`

## Verification Gates

Before publishing style changes:

1. Run `npm run build`.
2. Run `npm test`.
3. Run `npm run lint`.
4. Run `design-md-lint DESIGN.md`.
5. Inspect mobile widths for Korean text wrapping, sidebar collapse, command search, copy blocks, and generated blueprint cards.
6. Re-run secret scan before public GitHub publication if new files include external integrations.

## Evidence Map

| Rule | Evidence | Confidence |
|---|---|---|
| Palette and semantic token names | `src/index.css`, `tailwind.config.ts` | high |
| Industry positioning and trust/CTA rules | industry config and README | high |
| Layout shell and navigation behavior | layout/sidebar components | high |
| Component state vocabulary | guide components and shadcn/ui wrappers | high |
| Route and information architecture | App/routes/navigation data | high |
| Public reproduction guidance | this DESIGN.md synthesized from source on 2026-06-18 | derived |

## Local Evidence Files

- `src/index.css`
- `tailwind.config.ts`
- `src/data/industryConfig.ts`
- `src/data/navigationConfig.ts`
- `src/components/GuideLayout.tsx`
- `src/components/GuideSidebar.tsx`
- `src/pages/DesignGuide.tsx`
