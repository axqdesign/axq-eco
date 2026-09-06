# `@axqdesign/axq-generate-tokens`

Code-generation tool for `@axqdesign/tokens`.

Reads `tokens.json` (the compiled output of `@axqdesign/tokens`) and emits a
TypeScript file containing:

- `export const fooNames = [...] as const` — exhaustive const arrays
- `export type FooName = '...' | '...'` — corresponding union types

The generated file is used throughout the design system for type-safe token
access without needing to import the full tokens package.

---

## Requirements

- Node.js ≥ 22
- `tsx` (dev dependency — available after `pnpm install`)
- `@axqdesign/tokens` must be built first (`pnpm run build:tokens`)

---

## Usage

```sh
# Generate (default paths)
tsx src/generate.ts

# Specify custom paths
tsx src/generate.ts \
  --tokens=packages/@axqdesign/tokens/dist/tokens.json \
  --out=packages/@axqdesign/tokens/src/generated-types.ts

# CI check — exit 1 if the generated file is stale
tsx src/generate.ts --check
```

**Options**

| Flag | Default | Description |
|------|---------|-------------|
| `--tokens=<path>` | `packages/@axqdesign/tokens/dist/tokens.json` | Path to compiled `tokens.json` |
| `--out=<path>` | `packages/@axqdesign/tokens/src/generated-types.ts` | Output TypeScript file |
| `--check` | — | Compare output with current file; exit 1 if different |

---

## Via pnpm scripts

```sh
pnpm --filter @axqdesign/axq-generate-tokens run      # generate
pnpm --filter @axqdesign/axq-generate-tokens check    # CI gate
```

---

## Generated tokens

The output is formatted with the project's Prettier config and organised into
three layers:

### Primitive

| Name | Type alias |
|------|-----------|
| `brandColorNames` | `BrandColorName` |
| `greyscaleSteps` | `GreyscaleStep` |
| `statusNames` | `StatusName` |
| `fontSizeValues` | `FontSizeValue` |
| `radiusNames` | `RadiusName` |

### Semantic

| Name | Type alias |
|------|-----------|
| `bgRoles` | `BgRole` |
| `textRoles` | `TextRole` |
| `borderRoles` | `BorderRole` |
| `iconRoles` | `IconRole` |
| `accentNames` | `AccentName` |
| `typeRoles` | `TypeRole` |
| `componentRadiusNames` | `ComponentRadiusName` |
| `spacingNames` | `SpacingName` |
| `insetNames` | `InsetName` |
| `gapNames` | `GapName` |

### Component

| Name | Type alias |
|------|-----------|
| `componentNames` | `ComponentName` |

---

## CI integration

Add to your CI pipeline to guard against stale generated types:

```yaml
- run: tsx tools/@axqdesign/axq-generate-tokens/src/generate.ts --check
```

The step will fail with a clear message if `generated-types.ts` no longer
matches the current `tokens.json`.

---

## License

SEE LICENSE IN [LICENSE](../../../../LICENSE)  
© 2024 AXQ Design · <https://axqdesign.axq>
