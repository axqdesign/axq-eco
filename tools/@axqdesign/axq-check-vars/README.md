# `@axqdesign/axq-check-vars`

CSS custom-property validator for the AXQ Design System.

Detects `var(--axq-*)` references that have **no fallback and no definition** —
the exact pattern that causes browsers to silently drop declarations at
computed-value time, producing invisible layout regressions with zero console
output.

> Three production bugs in the upstream codebase were first caught by this tool.

---

## How it works

1. Compiles every non-partial `.scss` entry file in the target directory via Sass.  
2. Runs the compiled CSS through PostCSS:  
   - Folds `/*rtl:ignore*/` raw value comments back into declaration values so they survive the pipeline.  
   - Applies the `--axq-` prefix to bare custom properties (same transform as the build pipeline).  
3. Scans the resulting CSS with three regex passes:  
   - **Defined** — every `--axq-*:` declaration + `@property --axq-*` registration.  
   - **Referenced** — every `var(--axq-*, )` call **without a fallback** (next char after the name is `)`).  
4. `dangling = referenced − defined` — reported as errors.

`var()` calls that include a fallback value (`var(--axq-foo, #000)`) are
intentionally ignored — they cannot silently break.

---

## Requirements

- Node.js ≥ 22
- `tsx` (dev dependency — available after `pnpm install`)

---

## Usage

```sh
# Check the default SCSS directory (core/scss)
tsx src/check.ts

# Check a specific directory
tsx src/check.ts packages/@axqdesign/core/scss

# Use a custom baseline file
tsx src/check.ts core/scss --baseline=.check-vars-baseline.txt

# Write current dangling list to baseline (silence known issues)
tsx src/check.ts core/scss --update-baseline
```

**Options**

| Flag | Default | Description |
|------|---------|-------------|
| `<scssDir>` (positional) | `core/scss` | Directory of SCSS entry files to compile |
| `--baseline=<path>` | `tool/axq-check-vars/src/baseline.txt` | Path to the known-exceptions file |
| `--update-baseline` | — | Overwrite baseline with current dangling set |

---

## Via pnpm scripts

```sh
pnpm --filter @axqdesign/axq-check-vars run   # check core/scss
```

---

## Exit codes

| Code | Meaning |
|------|---------|
| `0` | All `--axq-*` references are defined (or allowed by baseline) |
| `1` | New dangling properties found, or baseline has stale entries |

---

## Baseline file

`src/baseline.txt` lists known-dangling properties that are temporarily
allowed — one per line:

```
# Lines starting with # are comments.
# List properties that are intentionally dangling (e.g. defined at runtime).
--axq-some-runtime-var
```

**When to update the baseline:**

- `--update-baseline` after purposely removing a definition that was in use.  
- Manually remove a line when you add the missing definition.  
- The tool will remind you if a baseline entry is no longer dangling.

---

## Configuration (`config.ts`)

| Export | Default | Description |
|--------|---------|-------------|
| `AXQ_CSS_VAR_PREFIX` | `'axq-'` | Prefix applied to bare custom properties |
| `AXQ_CSS_VAR_IGNORE` | `['--axq-', '--bs-', ...]` | Prefixes excluded from prefixing |
| `inlineValueComments` | PostCSS plugin | Preserves `/*rtl:ignore*/` markers through the pipeline |

Keep `AXQ_CSS_VAR_PREFIX` in sync with `axq-build-css/src/css-var-prefix.ts`.

---

## License

SEE LICENSE IN [LICENSE](../../../../LICENSE)  
© 2024 AXQ Design · <https://axqdesign.axq>
