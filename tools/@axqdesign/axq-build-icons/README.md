# `@axqdesign/axq-build-icons`

CLI tool that compiles the `@axqdesign/icons` SVG source tree into
framework-specific component packages.

Reads `icons/{outline,filled}/*.svg` and emits:

| Output | Description |
|--------|-------------|
| `out/icons/Icon{Name}.tsx` | One React/TSX component per outline icon |
| `out/icons/Icon{Name}Filled.tsx` | One React/TSX component per filled icon |
| `out/index.ts` | Barrel re-export of every component |
| `out/aliases.ts` | Backward-compatible re-exports from `aliases.json` |
| `out/../icons.json` | Metadata index (name, styles, tags, category) |

---

## Requirements

- Node.js ≥ 22
- `tsx` (dev dependency — available after `pnpm install`)

---

## Usage

```sh
# Build with defaults (icons/ → src/icons/)
tsx src/build.ts

# Specify source and output directories
tsx src/build.ts --icons=packages/@axqdesign/icons/icons \
                 --out=packages/@axqdesign/icons-react/src

# List discovered icons without writing any files
tsx src/build.ts --list-only
```

**Options**

| Flag | Default | Description |
|------|---------|-------------|
| `--icons=<path>` | `icons` | Source directory containing `outline/` and `filled/` sub-folders |
| `--out=<path>` | `src/icons` | Output directory for generated component files |
| `--list-only` | — | Print discovered icons and exit without writing |

---

## Via pnpm scripts

```sh
pnpm --filter @axqdesign/axq-build-icons run         # build
pnpm --filter @axqdesign/axq-build-icons run:list    # list only
```

---

## Generated component shape

**Outline icon** (`Icon{Name}.tsx`):

```tsx
export const IconArrowRight = ({
  size = 24, color = 'currentColor', stroke = 2, ...props
}: { size?: number; color?: string; stroke?: number; [key: string]: unknown }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
       viewBox="0 0 24 24" fill="none" stroke={color}
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M5 12h14" fill="none"/>
  </svg>
)
```

**Filled icon** (`Icon{Name}Filled.tsx`):

```tsx
export const IconArrowRightFilled = ({
  size = 24, color = 'currentColor', ...props
}: { size?: number; color?: string; [key: string]: unknown }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
       viewBox="0 0 24 24" fill={color} {...props}>
    <path stroke="none" d="M5 12h14" fill="currentColor"/>
  </svg>
)
```

SVG attribute names are converted from `kebab-case` to `camelCase` (`stroke-width` → `strokeWidth`) so they are valid JSX props.

---

## `aliases.json`

Place an `aliases.json` file one level above `--icons` to generate backward-compatible re-exports:

```json
{
  "outline": { "old-icon-name": "new-icon-name" },
  "filled":  { "old-icon-filled": "new-icon-filled" }
}
```

Each entry emits a named re-export in `aliases.ts`:

```ts
export { IconNewIconName as IconOldIconName } from './icons/IconNewIconName.js'
```

---

## License

SEE LICENSE IN [LICENSE](../../../../LICENSE)  
© 2024 AXQ Design · <https://axqdesign.axq>
