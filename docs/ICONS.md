# @axqdesign/icons — Icon Library Reference

> **6 184 SVG icons** — 5 130 outline + 1 054 filled.
> Available for React, Vue, Angular, Svelte, SolidJS, Preact, Astro, SVG Sprite, and Web Font.

---

## Quick Start

```bash
# SVG base package
pnpm add @axqdesign/icons

# React
pnpm add @axqdesign/icons-react

# Vue 3
pnpm add @axqdesign/icons-vue

# Svelte
pnpm add @axqdesign/icons-svelte

# Angular
pnpm add @axqdesign/icons-angular
```

---

## Usage

### React

```tsx
import { IconAccessible, IconAccessibleFilled } from '@axqdesign/icons-react'

// Outline (stroke-based)
<IconAccessible size={24} color="currentColor" stroke={2} />

// Filled
<IconAccessibleFilled size={24} color="currentColor" />
```

### Vue 3

```vue
<script setup>
import { IconAccessible } from '@axqdesign/icons-vue'
</script>

<template>
  <IconAccessible :size="24" color="currentColor" :stroke="2" />
</template>
```

### Svelte

```svelte
<script>
  import { IconAccessible } from '@axqdesign/icons-svelte'
</script>

<IconAccessible size={24} color="currentColor" stroke={2} />
```

### SVG direct

```html
<!-- outline -->
<img src="node_modules/@axqdesign/icons/icons/outline/accessible.svg" width="24" height="24" />

<!-- or inline the SVG content -->
```

### With AXQ Design Tokens

```tsx
import { IconAccessible } from '@axqdesign/icons-react'

<IconAccessible
  color="var(--axq-icon-primary)"
  size="var(--axq-type-h5)"
  stroke={2}
/>
```

```css
.my-icon {
  color: var(--axq-icon-primary);
  width: var(--axq-type-h5);
  height: var(--axq-type-h5);
}
```

---

## Packages

| Package | Description | Output |
|---------|-------------|--------|
| `@axqdesign/icons` | Base SVG files + JSON index | SVG files, `icons.json` |
| `@axqdesign/icons-react` | React 16+ TSX components | CJS + ESM |
| `@axqdesign/icons-vue` | Vue 3 components | CJS + ESM |
| `@axqdesign/icons-svelte` | Svelte 3–5 components | `.svelte` |
| `@axqdesign/icons-svelte-runes` | Svelte 5 Runes API | `.svelte` |
| `@axqdesign/icons-preact` | Preact components | CJS + ESM |
| `@axqdesign/icons-solidjs` | SolidJS components | CJS + ESM |
| `@axqdesign/icons-astro` | Astro components | CJS + ESM |
| `@axqdesign/icons-angular` | Angular library | `dist/` |
| `@axqdesign/icons-sprite` | SVG `<use>` sprite | `sprite.svg` |
| `@axqdesign/icons-webfont` | TTF · WOFF · WOFF2 | Font files |

---

## SVG Format

### Outline icon

```xml
<!--
category: Communication
tags: [accessibility, person]
version: "1.76"
unicode: "f25f"
-->
<svg xmlns="http://www.w3.org/2000/svg"
  width="24" height="24" viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="..." />
</svg>
```

### Filled icon

```xml
<!--
version: "2.3"
unicode: "f6ea"
-->
<svg xmlns="http://www.w3.org/2000/svg"
  width="24" height="24" viewBox="0 0 24 24"
  fill="currentColor"
>
  <path stroke="none" d="..." fill="currentColor"/>
</svg>
```

### Differences

| Attribute | Outline | Filled |
|-----------|---------|--------|
| `fill` | `none` | `currentColor` |
| `stroke` | `currentColor` | none |
| `stroke-width` | `2` | none |
| `category` metadata | required | not present |

---

## Validation Rules (19 checks)

Before any SVG is accepted into the library it must pass:

1. `.svg` extension only
2. Frontmatter comment `<!-- -->` required
3. No empty bounding-box path `M0 0h24v24H0z`
4. Elements `<circle>`, `<rect>`, `<ellipse>`, `<line>`, `<polygon>`, `<polyline>` must be converted to `<path>`
5. No `<g>` wrappers
6. `stroke-width` only on root `<svg>`
7. Outline: no uppercase `Z` in path data
8. No `d=""` (empty path data)
9. No no-op commands `v0`, `h0`
10. Unicode: 4–5 hex chars, globally unique across all icons
11. Tags: no duplicates within a single icon
12. *(hard mode)* `version` field required
13. Outline: `category` field required
14. Filled: `category` field must be absent

Run the validator:
```bash
tsx tools/@axqdesign/axq-validate-icons/src/validate.ts packages/@axqdesign/icons/icons
```

---

## Categories (44 groups)

```
Animals · Arrows · Badges · Brand · Buildings · Charts
Communication · Computers · Currencies · Database · Design
Development · Devices · Document · E-commerce · Electrical
Extensions · Food · Games · Gender · Gestures · Health
Laundry · Letters · Logic · Map · Math · Media · Mood
Nature · Numbers · Photography · Shapes · Sport · Symbols
System · Text · Vehicles · Version control · Weather · Zodiac
```

---

## Stroke Weights

| Token | Value | Usage |
|-------|-------|-------|
| stroke-200 | 1.0 px | Thin |
| stroke-300 | 1.5 px | Regular |
| stroke-400 | 2.0 px | **Default** |

---

## Aliases

`aliases.json` (workspace root) maps old icon names to new ones for backward compatibility:

```json
{
  "outline": {
    "discount-2": "rosette-discount",
    "3d-cube-sphere": "cube-3d-sphere"
  }
}
```

---

## Build Pipeline

```
icons/{outline,filled}/*.svg     (SVG source)
          │
          ▼
  pnpm --filter @axqdesign/icons build
          │  → icons.json
          │  → axq-nodes-outline.json
          │  → axq-nodes-filled.json
          │  → categories/{outline,filled}/{category}/*.svg
          ▼
  pnpm --filter "@axqdesign/icons-*" build
          │  each package: node build.mjs → rollup bundle
          ▼
  dist/   ready to publish
```

---

## Contributing an Icon

1. Create a 24×24 SVG following the format above
2. Drop it into `packages/@axqdesign/icons/icons/outline/` or `icons/filled/`
3. Validate: `tsx tools/@axqdesign/axq-validate-icons/src/validate.ts`
4. Import + optimize: `tsx tools/@axqdesign/axq-import-icons/src/import-svg.ts`
5. Rebuild: `pnpm --filter @axqdesign/icons build`
6. Open a pull request with a short description and screenshot

---

## Technology Stack

| Technology | Version | Role |
|---|---|---|
| pnpm | >= 10 | Package manager |
| Rollup | ^4.x | Bundle packages |
| TypeScript | 5.9.x | Type safety |
| SVGO | ^4.x | SVG optimization |
| svgpath | ^2.x | Path manipulation |
| svgson | ^5.x | SVG ↔ JSON |
| cheerio | ^1.x | SVG DOM parsing |
| gray-matter | ^4.x | Frontmatter parsing |
| Vitest | ^4.x | Unit testing |

---

© 2024 AXQ Design · [axqdesign.axq](https://axqdesign.axq)