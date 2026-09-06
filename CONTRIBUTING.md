# Contributing to AXQ Design System

Thank you for your interest in contributing! This document covers everything you need to get started.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Workspace Structure](#workspace-structure)
3. [Getting Started](#getting-started)
4. [Naming Conventions](#naming-conventions)
5. [Workflow](#workflow)
6. [Design Tokens](#design-tokens)
7. [Icons Pipeline](#icons-pipeline)
8. [Commit & Branch](#commit--branch)
9. [Release Process](#release-process)

---

## Prerequisites

| Tool       | Minimum version |
|------------|-----------------|
| Node.js    | >= 22.0.0       |
| pnpm       | >= 10.0.0       |
| TypeScript | >= 5.0.0        |
| Git        | >= 2.40.0       |

```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Verify setup
pnpm --filter @axqdesign/icons build
```

---

## Workspace Structure

```
axq-eco/
├── .build/                     # Admin/CSS pipeline scripts
├── packages/
│   ├── .build/                 # Icons pipeline scripts
│   └── @axqdesign/
│       ├── tokens/             # Design tokens (3-layer system)
│       ├── icons/              # 5 130 outline + 1 054 filled SVGs
│       ├── icons-react/        # React components
│       ├── icons-vue/          # Vue 3 components
│       ├── icons-svelte/       # Svelte components
│       ├── icons-svelte-runes/ # Svelte 5 Runes
│       ├── icons-preact/       # Preact components
│       ├── icons-solidjs/      # SolidJS components
│       ├── icons-astro/        # Astro components
│       ├── icons-angular/      # Angular library
│       ├── icons-sprite/       # SVG sprite
│       ├── icons-webfont/      # TTF / WOFF / WOFF2
│       ├── core/               # SCSS + JS admin framework
│       └── shared/             # Shared Astro components
├── apps/
│   ├── axq-preview/            # Astro preview app
│   └── axq-docs/               # Documentation app
├── tools/@axqdesign/
│   ├── axq-build-icons/        # SVG → framework component generator
│   ├── axq-build-css/          # SCSS → CSS pipeline (RTL, minify)
│   ├── axq-check-vars/         # CSS custom property checker
│   ├── axq-generate-tokens/    # Token JSON → TypeScript types
│   ├── axq-import-icons/       # SVG importer + data sync
│   └── axq-zip/                # Release packager
└── public/
    └── logos/                  # Brand assets (SVG, PNG, favicon sets)
```

---

## Getting Started

```bash
# Clone
git clone https://github.com/axqdesign/axq-eco.git
cd axq-eco

# Install all workspace dependencies
pnpm install

# Build in order
pnpm --filter @axqdesign/icons build          # generates icons.json
pnpm --filter @axqdesign/core build           # generates dist/css + dist/js
pnpm --filter "@axqdesign/icons-*" build      # all 10 framework packages

# Run tests
pnpm -r test
```

---

## Naming Conventions

### Package namespace
All packages use the **`@axqdesign`** scope.
Examples: `@axqdesign/tokens`, `@axqdesign/icons`, `@axqdesign/core`

### CSS variables
Mandatory prefix: **`--axq-`**
Examples: `--axq-color-primary`, `--axq-spacing-sm`, `--axq-radius-md`

### CSS classes
Prefix: **`axq-`**
Examples: `axq-btn`, `axq-card`, `axq-input`

### Files / folders
`kebab-case` for all files and directories.

### Components
`PascalCase` for React/Vue/Svelte/etc components.
Examples: `IconAccessible`, `ButtonPrimary`

---

## Workflow

### Updating tokens

1. Edit `*.tokens.json` files under `packages/@axqdesign/tokens/src/`
2. Rebuild: `pnpm --filter @axqdesign/tokens build`
3. Verify `packages/@axqdesign/tokens/dist/` is updated correctly

### Adding a new icon

1. Drop your SVG into `packages/@axqdesign/icons/icons/outline/` or `icons/filled/`
2. Run the importer: `tsx tools/@axqdesign/axq-import-icons/src/import-svg.ts`
3. Rebuild: `pnpm --filter @axqdesign/icons build`
4. Update `aliases.json` at the workspace root if you are renaming an existing icon

### SVG spec

- ViewBox: `0 0 24 24`
- Outline: `stroke="currentColor"`, `fill="none"`, `stroke-width="2"`
- Filled: `fill="currentColor"`, no stroke
- No embedded fonts, `<image>`, or hardcoded colours
- All shapes converted to `<path>` (no `<circle>`, `<rect>`, `<line>`, etc.)
- No `<g>` wrappers

### Developing a component / package

1. Create branch: `feat/component-{name}`
2. Use template: `packages/@axqdesign/` (copy an existing package)
3. Import tokens: `@axqdesign/tokens/dist/tokens.css`
4. Follow `axq-` class prefix and `--axq-` variable prefix

---

## Design Tokens

### 3-layer architecture

```
Primitive (Layer 1)            Semantic (Layer 2)          Component (Layer 3)
──────────────────             ──────────────────          ──────────────────
--axq-color-blue-500    →      --axq-color-primary    →    --axq-btn-bg
--axq-spacing-4         →      --axq-spacing-md       →    --axq-btn-padding
--axq-radius-2          →      --axq-radius-sm        →    --axq-badge-radius
```

**Rule:** always use the highest applicable layer. Never reference a primitive directly in component code.

### Adding a new token

```jsonc
// packages/@axqdesign/tokens/src/primitive/color.tokens.json
{
  "color": {
    "purple": {
      "500": { "$value": "#8b5cf6", "$type": "color" }
    }
  }
}
```

---

## Icons Pipeline

### Build flow

```
packages/@axqdesign/icons/icons/   (SVG source)
          │
          ▼
  pnpm --filter @axqdesign/icons build
          │  generates icons.json + categories/
          ▼
  pnpm --filter "@axqdesign/icons-*" build
          │  generates dist/ for each framework package
          ▼
  Ready to publish
```

### Tools

| Tool | Command | Purpose |
|------|---------|---------|
| `axq-import-icons` | `tsx src/import-svg.ts` | Import + optimize new SVGs |
| `axq-build-icons` | `tsx src/build.ts` | Generate framework components |
| `axq-check-vars` | `tsx src/check.ts` | Detect undefined CSS variables |
| `axq-generate-tokens` | `tsx src/generate.ts` | TypeScript types from tokens.json |
| `axq-zip` | `tsx src/zip.ts` | Package dist/ into a versioned ZIP |

---

## Commit & Branch

### Branch strategy

```
main        ← stable, merge only from release/*
dev         ← active development
feat/*      ← new features
fix/*       ← bug fixes
release/*   ← release preparation
```

### Commit format ([Conventional Commits](https://www.conventionalcommits.org/))

```
type(scope): short description

type:  feat | fix | docs | style | refactor | test | chore | build
scope: tokens | icons | core | shared | tools | apps | root

Examples:
  feat(tokens): add purple color scale to primitive layer
  fix(icons): correct viewBox on alert-circle SVG
  build(tools): upgrade axq-build-css to process RTL output
```

---

## Release Process

```bash
# 1. Prepare release branch
git checkout -b release/v1.0.0

# 2. Build everything
pnpm -r build

# 3. Run all tests
pnpm -r test

# 4. Publish packages
pnpm -r publish --tag latest --no-git-checks

# 5. Create GitHub release
gh release create v1.0.0 --title "v1.0.0" --generate-notes

# 6. Package ZIP artifact (optional)
tsx tools/@axqdesign/axq-zip/src/zip.ts --dist=packages/@axqdesign/icons/dist
```

### Versioning

Follow **Semantic Versioning**: `MAJOR.MINOR.PATCH`
Update `CHANGELOG.md` in each affected package before releasing.

---

## Code of Conduct

Be respectful, constructive, and inclusive. See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) if present.

## Questions?

Open an issue or reach out at [studio@axqdesign.axq](mailto:studio@axqdesign.axq)

---

© 2024 AXQ Design · [axqdesign.axq](https://axqdesign.axq)