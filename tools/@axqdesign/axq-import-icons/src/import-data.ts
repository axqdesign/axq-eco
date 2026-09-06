/**
 * axq-import-icons · import-data.ts
 * @axqdesign/axq-import-icons v0.0.0
 *
 * Đọc @axqdesign/icons/icons.json → sinh ra shared/data/icons.json + icons-info.json
 * Nén SVG inline (xoá newlines + whitespace thừa) để tối ưu bundle size.
 *
 * Nguồn gốc: admin-icons/.build/import-icons.ts (Tabler Dashboard)
 * Viết lại sạch TypeScript bởi AXQ Design · https://axqdesign.axq
 *
 * Sử dụng:
 *   tsx src/import-data.ts [--package=@axqdesign/icons] [--out=shared/data]
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

// ─── Types ────────────────────────────────────────────────────────────────────

/** Shape of icons.json as published by @axqdesign/icons */
interface RawIconTag {
  styles: {
    outline?: unknown
    filled?:  unknown
  }
  tags?:     string[]
  category?: string
}

/** Shape of one entry in our output icons.json */
interface IconEntry {
  name:      string
  category?: string
  tags:      string[]
  svg: {
    outline: string | null
    filled:  string | null
  }
}

/** Minimal subset of icons-info.json */
interface IconsInfo {
  version: string
  count:   number
  source:  string
}

// ─── Args ─────────────────────────────────────────────────────────────────────

const argv   = process.argv.slice(2)
const pkgName = argv.find((a) => a.startsWith('--package='))?.split('=')[1] ?? '@axqdesign/icons'
const outDir  = argv.find((a) => a.startsWith('--out='))?.split('=')[1]     ?? 'shared/data'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Compress SVG content for inline embedding:
 * strip newlines, collapse redundant whitespace between tags.
 */
function compressSvg(svg: string): string {
  return svg
    .replace(/\n/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

// ─── Resolve package ──────────────────────────────────────────────────────────

const __dirname    = dirname(fileURLToPath(import.meta.url))
const repoRoot     = join(__dirname, '../../..')
const nodeModules  = join(repoRoot, 'node_modules')
const pkgDir       = join(nodeModules, pkgName)

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log(`\n◆ axq-import-icons (data) v0.0.0 · https://axqdesign.axq`)
console.log(`  package: ${pkgName}`)
console.log(`  output:  ${relative(repoRoot, outDir)}\n`)

// Read source package metadata
const rawTags: Record<string, RawIconTag> = JSON.parse(
  readFileSync(join(pkgDir, 'icons.json'), 'utf8'),
)
const { version }: { version: string } = JSON.parse(
  readFileSync(join(pkgDir, 'package.json'), 'utf8'),
)

// Build icon map
const icons: Record<string, IconEntry> = {}

for (const [name, data] of Object.entries(rawTags)) {
  const outline = data.styles.outline
    ? compressSvg(readFileSync(join(pkgDir, `icons/outline/${name}.svg`), 'utf8'))
    : null

  const filled = data.styles.filled
    ? compressSvg(readFileSync(join(pkgDir, `icons/filled/${name}.svg`), 'utf8'))
    : null

  icons[name] = {
    name,
    category: data.category,
    tags:     data.tags ?? [],
    svg:      { outline, filled },
  }
}

// Write outputs
mkdirSync(outDir, { recursive: true })

const iconsInfo: IconsInfo = {
  version,
  count:  Object.keys(icons).length,
  source: pkgName,
}

writeFileSync(join(outDir, 'icons-info.json'), JSON.stringify(iconsInfo, null, 2))
writeFileSync(join(outDir, 'icons.json'),      JSON.stringify(icons))

console.log(`✓ ${iconsInfo.count} icons  ←  ${pkgName} v${version}`)
console.log(`  → ${join(outDir, 'icons.json')}`)
console.log(`  → ${join(outDir, 'icons-info.json')}\n`)
