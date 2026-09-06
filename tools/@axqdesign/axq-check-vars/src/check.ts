/**
 * axq-check-vars · check.ts
 * @axqdesign/axq-check-vars v0.0.0
 *
 * Phát hiện CSS custom properties dùng var(--axq-*) mà không có định nghĩa.
 *
 * Tại sao cần tool này?
 *   `color: var(--axq-nav-link-active-color)` khi name chưa được định nghĩa
 *   là invalid tại computed-value time: browser âm thầm drop toàn bộ declaration,
 *   fallback về inherited/initial value — không có error nào, ở Sass, stylelint,
 *   hay browser console. Ba bugs production trong hệ thống gốc Tabler đã bị
 *   phát hiện nhờ tool này.
 *
 *   `var()` CÓ fallback không thể break → không kiểm tra những trường hợp này.
 *
 * Cơ chế:
 *   Compile SCSS → PostCSS prefix --axq- → scan:
 *     "defined"    = mọi `--axq-*:` khai báo + `@property --axq-*`
 *     "referenced" = mọi `var(--axq-*, )` KHÔNG có fallback (ký tự ngay sau name là ')')
 *   "dangling" = referenced \ defined → báo lỗi
 *
 * Nguồn gốc: admin-icons/.build/check-css-vars.ts (Tabler Dashboard)
 * Viết lại sạch TypeScript bởi AXQ Design · https://axqdesign.axq
 *
 * Sử dụng:
 *   tsx src/check.ts [scssDir] [--baseline=<path>] [--update-baseline]
 *
 * Ví dụ:
 *   tsx src/check.ts core/scss
 *   tsx src/check.ts core/scss --update-baseline
 *   tsx src/check.ts core/scss --baseline=tool/axq-check-vars/src/baseline.txt
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { compile as compileSass } from 'sass'
import postcss from 'postcss'
import prefixCustomProperties from 'postcss-prefix-custom-properties'
import { AXQ_CSS_VAR_PREFIX, AXQ_CSS_VAR_IGNORE, inlineValueComments } from './config.js'

// ─── Args ─────────────────────────────────────────────────────────────────────

const argv         = process.argv.slice(2)
const scssDir      = argv.find((a) => !a.startsWith('--')) ?? 'core/scss'
const baselinePath = argv.find((a) => a.startsWith('--baseline='))?.split('=')[1]
  ?? 'tool/axq-check-vars/src/baseline.txt'
const updateMode   = argv.includes('--update-baseline')

// ─── Regex patterns ───────────────────────────────────────────────────────────

/** Any custom-property definition:  --foo-bar: */
const RE_DEFINITION   = /(--[\w-]+)\s*:/g
/** var() with no fallback — next char after name is ')' */
const RE_REFERENCE    = /var\(\s*(--[\w-]+)\s*([,)])/g
/** @property --foo-bar */
const RE_REGISTRATION = /@property\s+(--[\w-]+)/g

// ─── State (accumulated across all SCSS entries) ──────────────────────────────

/** All custom properties that are declared / registered. */
const defined = new Set<string>()

/** name → set of CSS files that reference it without a fallback. */
const referenced = new Map<string, Set<string>>()

// ─── Scan one SCSS entry file ─────────────────────────────────────────────────

async function scan(entry: string): Promise<void> {
  // 1. Sass compile (all partials inlined)
  const compiled = compileSass(join(scssDir, entry), {
    loadPaths: ['node_modules'],
    style:     'expanded',
  })

  // 2. Fold raw value comments + apply --axq- prefix (same pipeline as build)
  const { css } = await postcss([
    inlineValueComments,
    prefixCustomProperties({ prefix: AXQ_CSS_VAR_PREFIX, ignore: AXQ_CSS_VAR_IGNORE }),
  ]).process(compiled.css, { from: undefined, map: false })

  const file = entry.replace(/\.scss$/, '.css')

  // 3. Collect definitions
  for (const [, name] of css.matchAll(RE_DEFINITION))   defined.add(name)
  for (const [, name] of css.matchAll(RE_REGISTRATION)) defined.add(name)

  // 4. Collect references without fallback
  for (const [, name, next] of css.matchAll(RE_REFERENCE)) {
    if (next !== ')') continue                                  // has fallback — safe
    if (!name.startsWith(`--${AXQ_CSS_VAR_PREFIX}`)) continue  // not --axq- — skip

    const files = referenced.get(name) ?? new Set<string>()
    files.add(file)
    referenced.set(name, files)
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log(`\n◆ axq-check-vars v0.0.0 · https://axqdesign.axq`)
  console.log(`  scss:     ${scssDir}`)
  console.log(`  baseline: ${baselinePath}\n`)

  // Discover non-partial SCSS entry files
  const entries = readdirSync(scssDir)
    .filter((f) => f.endsWith('.scss') && !f.startsWith('_'))

  if (entries.length === 0) {
    console.warn(`  ⚠ No SCSS entry files found in ${scssDir}`)
    process.exit(0)
  }

  for (const entry of entries) await scan(entry)

  // dangling = referenced without any definition
  const dangling = new Map(
    [...referenced]
      .filter(([name]) => !defined.has(name))
      .sort(([a], [b]) => a.localeCompare(b)),
  )

  // ── Update-baseline mode ─────────────────────────────────────────────────────
  if (updateMode) {
    const content = [...dangling.keys()].sort().join('\n') + '\n'
    writeFileSync(baselinePath, content)
    console.log(`✓ Baseline updated: ${dangling.size} exception(s) written to ${baselinePath}`)
    return
  }

  // ── Read baseline exceptions ─────────────────────────────────────────────────
  const baseline: string[] = existsSync(baselinePath)
    ? readFileSync(baselinePath, 'utf8')
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.startsWith('--'))
    : []

  // Properties newly dangling (not yet in baseline) → must fail
  const newDangling = [...dangling.keys()].filter((n) => !baseline.includes(n))

  // Properties in baseline that are no longer dangling → baseline is stale
  const nowFixed = baseline.filter((n) => !dangling.has(n))

  // ── Report ───────────────────────────────────────────────────────────────────
  for (const name of newDangling) {
    const files = [...(dangling.get(name) ?? [])].join(', ')
    console.error(`  ✗ ${name}`)
    console.error(`    referenced in: ${files}`)
    console.error(`    → define it, add a fallback, or drop the declaration\n`)
  }

  if (newDangling.length > 0) {
    const s = newDangling.length === 1 ? 'y' : 'ies'
    console.error(`✗ ${newDangling.length} new dangling custom propert${s}`)
  }

  if (nowFixed.length > 0) {
    console.error(
      `\n  ℹ ${nowFixed.join(', ')} no longer dangling` +
      ` — remove from ${baselinePath}`,
    )
  }

  if (newDangling.length > 0 || nowFixed.length > 0) {
    process.exit(1)
  }

  const exMsg = baseline.length > 0 ? ` (${baseline.length} known exception(s) in baseline)` : ''
  console.log(`✓ OK — ${referenced.size} --axq-* references without fallback, all defined${exMsg}\n`)
}

main().catch((err: unknown) => {
  console.error('✗', err)
  process.exit(1)
})
