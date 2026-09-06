# AXQ Toolchain — Developer Reference

> Internal CLI tools powering the AXQ Design System build pipeline.
> All tools live under `tools/@axqdesign/` and run with `tsx` — no compile step needed.

---

## Overview

| Tool | Package | Purpose |
|------|---------|---------|
| `axq-build-css` | `@axqdesign/axq-build-css` | SCSS → CSS (RTL, minify, prefix) |
| `axq-validate-icons` | `@axqdesign/axq-validate-icons` | SVG quality checker (19 rules) |
| `axq-import-icons` | `@axqdesign/axq-import-icons` | Import new SVGs + sync data JSON |
| `axq-generate-tokens` | `@axqdesign/axq-generate-tokens` | tokens.json → TypeScript types |
| `axq-check-vars` | `@axqdesign/axq-check-vars` | Detect undefined CSS custom properties |
| `axq-build-icons` | `@axqdesign/axq-build-icons` | SVG → framework components (React, Vue…) |
| `axq-zip` | `@axqdesign/axq-zip` | Package dist/ into versioned ZIP |

---

## `axq-build-css` — CSS Build Pipeline

**Source:** `.build/build-css.ts`

Compiles SCSS through a full production pipeline:

```
SCSS file
  → Sass compile (expanded)
  → PostCSS prefix  (--axq-*)
  → Autoprefixer
  → RTL variant     (rtlcss)
  → CleanCSS minify (.min.css)
  → Source maps
```

**Usage:**
```bash
tsx tools/@axqdesign/axq-build-css/src/build-css.ts [scss-dir] [out-dir] [--rtl] [--minify] [--banner]
```

**Outputs:** `.css`, `.min.css`, `.rtl.css`, `.rtl.min.css`, `.css.map`

---

## `axq-validate-icons` — SVG Validator

**Source:** `packages/.build/validate-icons.mjs`

Validates every SVG against 19 rules before it enters the icon library:

1. Only `.svg` files accepted
2. Frontmatter comment `<!-- -->` required
3. No empty bounding-box path `M0 0h24v24H0z`
4. No `<circle>`, `<rect>`, `<ellipse>`, `<line>`, `<polygon>`, `<polyline>` — convert to `<path>`
5. No `<g>` wrappers
6. `stroke-width` only on root `<svg>`
7. Outline: no uppercase `Z` in path data
8. No `d=""` (empty paths)
9. No no-op commands `v0`, `h0`
10. Unicode: 4–5 hex chars, globally unique
11. Tags: no duplicates
12. **Hard mode:** `version` field required
13. Outline: `category` required
14. Filled: no `category`

**Usage:**
```bash
tsx tools/@axqdesign/axq-validate-icons/src/validate.ts [icons-dir] [--hard] [--diff]
```

---

## `axq-import-icons` — Icon Importer

**Source:** `tools/@axqdesign/axq-import-icons/src/`

Two sub-commands:

### `import-svg.ts` — SVG pipeline
```
new/{outline|filled}/*.svg
  → svgo optimize
  → validate (no transform=, no spaces in filename)
  → strip empty bounding-box path
  → apply AXQ SVG template
  → preserve existing frontmatter
  → write to packages/@axqdesign/icons/icons/{type}/
```

```bash
tsx src/import-svg.ts [--dir=new] [--icons=icons] [--type=outline|filled]
```

### `import-data.ts` — Data sync
Reads `@axqdesign/icons/icons.json` → generates compressed `shared/data/icons.json` + `icons-info.json`.

```bash
tsx src/import-data.ts [--package=@axqdesign/icons] [--out=shared/data]
```

---

## `axq-generate-tokens` — Token Generator

**Source:** `tools/@axqdesign/axq-generate-tokens/src/generate.ts`

Reads `@axqdesign/tokens/dist/tokens.json` and emits TypeScript `export const` arrays + `export type` unions for all 3 token layers.

```bash
tsx src/generate.ts [--tokens=<path>] [--out=<path>] [--check]
```

`--check` mode exits 1 if the output file is stale (useful as a CI gate).

**Outputs per layer:**
- **Primitive:** `brandColorNames`, `greyscaleSteps`, `fontSizeValues`, `radiusNames`
- **Semantic:** `bgRoles`, `textRoles`, `borderRoles`, `iconRoles`, `spacingNames`, `insetNames`, `gapNames`
- **Component:** `componentNames`

---

## `axq-check-vars` — CSS Variable Checker

**Source:** `tools/@axqdesign/axq-check-vars/src/check.ts`

Detects CSS custom properties referenced via `var(--axq-*)` without a definition or fallback — a class of silent runtime bugs that no linter catches.

**Mechanism:**
1. Sass-compile all entry `.scss` files
2. Apply `--axq-` prefix (same PostCSS pipeline as build)
3. Collect **definitions** (`--axq-*:`)
4. Collect **references** (`var(--axq-*, )` — no fallback only)
5. Report: `referenced − defined = dangling` → exit 1

```bash
tsx src/check.ts [scss-dir] [--baseline=<path>] [--update-baseline]
```

`--update-baseline` regenerates `baseline.txt` for known exceptions (e.g. JS-injected variables).

---

## `axq-build-icons` — Icon Component Builder

**Source:** `tools/@axqdesign/axq-build-icons/src/build.ts`

Reads `icons/{outline,filled}/*.svg` and generates:
- `out/icons/Icon{Name}.tsx` — one component per outline icon
- `out/icons/Icon{Name}Filled.tsx` — one component per filled icon
- `out/index.ts` — barrel re-export
- `out/aliases.ts` — backward-compatible re-exports from `aliases.json`
- `out/../icons.json` — metadata index

```bash
tsx src/build.ts [--icons=icons] [--out=src/icons] [--list-only]
```

SVG attributes are converted kebab-case → camelCase for JSX (`stroke-width` → `strokeWidth`).

---

## `axq-zip` — Release Packager

**Source:** `tools/@axqdesign/axq-zip/src/zip.ts`

Packages a `dist/` directory (plus optional extra folders) into a versioned ZIP artifact.

```bash
tsx src/zip.ts [--dist=dist] [--out=releases] [--name=axqdesign] \
               [--pkg=package.json] [--docs-url=<url>] \
               [--folder=src:dest] ...   # repeatable
```

- Auto-discovers version from nearest `package.json`
- Strips junk files (`.DS_Store`, `Thumbs.db`, `desktop.ini`)
- Adds a `documentation.url` Internet Shortcut at ZIP root
- `--folder=src:dest` can be supplied multiple times to include extra directories

---

## Technology Stack

| Technology | Version | Role |
|---|---|---|
| Node.js | >= 22 | Runtime |
| TypeScript | 5.9.x | Language |
| tsx | ^4.x | Execute TS directly (no compile step) |
| Sass | 1.103.x | SCSS compiler |
| PostCSS | ^8.x | CSS transformation |
| autoprefixer | ^10.x | Vendor prefixes |
| rtlcss | ^4.x | RTL generation |
| CleanCSS | ^5.x | CSS minification |
| svgo | ^4.x | SVG optimization |
| svgpath | ^2.x | SVG path manipulation |
| cheerio | ^1.x | SVG/HTML parsing |
| gray-matter | ^4.x | Frontmatter parsing |
| AdmZip | ^0.5.x | ZIP creation |
| glob | 10.x | File globbing |

---

## Cross-tool Architecture

```
packages/@axqdesign/tokens/dist/tokens.json
          ↑  reads
axq-generate-tokens  →  emits TypeScript types
axq-build-css        →  uses --axq- prefix
axq-check-vars       →  validates --axq- references

packages/@axqdesign/icons/icons/
          ↑  source
axq-import-icons     →  sync SVG + generate data JSON
axq-validate-icons   →  enforce SVG quality
axq-build-icons      →  generate framework components
axq-zip              →  package release artifact
```

---

© 2024 AXQ Design · [axqdesign.axq](https://axqdesign.axq)