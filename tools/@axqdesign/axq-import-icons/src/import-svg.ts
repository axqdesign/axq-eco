/**
 * axq-import-icons · import-svg.ts
 * @axqdesign/axq-import-icons v0.0.0
 *
 * Import SVG icons từ new/{type}/*.svg → icons/{type}/*.svg
 * Quy trình: glob → svgo-optimize → validate → cleanup → build AXQ template → write
 *
 * Nguồn gốc: icons/.build/import.mjs (Tabler Icons)
 * Viết lại sạch TypeScript bởi AXQ Design · https://axqdesign.axq
 *
 * Sử dụng:
 *   tsx src/import-svg.ts [--dir=new] [--icons=icons] [--type=outline|filled]
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import { globSync } from 'glob'
import { load as cheerio } from 'cheerio'
import { optimize } from 'svgo'
import matter from 'gray-matter'

// ─── Types ────────────────────────────────────────────────────────────────────

type IconType = 'outline' | 'filled'

interface Frontmatter {
  category?: string
  tags?: string[]
  version?: string
  unicode?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Sentinel path that marks the bounding-box placeholder — always removed. */
const EMPTY_PATH_D = ['M0 0h24v24H0z', 'M0 0h24v24H0Z']

const SVG_TEMPLATE: Record<IconType, string> = {
  outline: [
    '<svg',
    '  xmlns="http://www.w3.org/2000/svg"',
    '  width="24"',
    '  height="24"',
    '  viewBox="0 0 24 24"',
    '  fill="none"',
    '  stroke="currentColor"',
    '  stroke-width="2"',
    '  stroke-linecap="round"',
    '  stroke-linejoin="round"',
    '>',
  ].join('\n'),
  filled: [
    '<svg',
    '  xmlns="http://www.w3.org/2000/svg"',
    '  width="24"',
    '  height="24"',
    '  viewBox="0 0 24 24"',
    '  fill="currentColor"',
    '>',
  ].join('\n'),
}

const SVGO_CONFIG = {
  plugins: [
    {
      name: 'preset-default',
      params: { overrides: { removeViewBox: false, removeXMLNS: false } },
    },
    { name: 'sortAttrs' },
  ],
} as const

// ─── Args ─────────────────────────────────────────────────────────────────────

const argv     = process.argv.slice(2)
const newDir   = argv.find((a) => a.startsWith('--dir='))?.split('=')[1]    ?? 'new'
const iconsDir = argv.find((a) => a.startsWith('--icons='))?.split('=')[1]  ?? 'icons'
const typeArg  = argv.find((a) => a.startsWith('--type='))?.split('=')[1] as IconType | undefined
const types: IconType[] = typeArg ? [typeArg] : ['outline', 'filled']

// ─── Helpers ──────────────────────────────────────────────────────────────────

function svgoOptimize(content: string): string {
  const result = optimize(content, SVGO_CONFIG)
  return result.data
}

/**
 * Parse YAML-style frontmatter from an SVG <!-- comment -->.
 * Returns {} when no comment or malformed.
 */
function parseFrontmatter(content: string): Frontmatter {
  const m = content.match(/<!--([\s\S]*?)-->/)
  if (!m) return {}
  try {
    return matter(`---\n${m[1].trim()}\n---`).data as Frontmatter
  } catch {
    return {}
  }
}

/**
 * Serialise frontmatter back to an SVG <!-- comment -->.
 * Outline icons include category; filled icons do not.
 */
function buildFrontmatterComment(fm: Frontmatter, type: IconType): string {
  const lines: string[] = []
  if (type === 'outline' && fm.category) lines.push(`category: ${fm.category}`)
  if (fm.tags?.length)                    lines.push(`tags: [${fm.tags.join(', ')}]`)
  if (fm.version)                         lines.push(`version: "${fm.version}"`)
  if (fm.unicode)                         lines.push(`unicode: "${fm.unicode}"`)
  if (lines.length === 0) return ''
  return `<!--\n${lines.map((l) => `  ${l}`).join('\n')}\n-->`
}

/**
 * Extract <path> elements from the optimised SVG, skipping the empty
 * bounding-box placeholder. Returns serialised <path .../> strings.
 */
function extractPaths(optimised: string, type: IconType): string[] {
  const $ = cheerio(optimised, { xmlMode: true })
  const paths: string[] = []

  $('path').each((_, el) => {
    const d = $(el).attr('d') ?? ''
    if (!d || EMPTY_PATH_D.includes(d)) return

    if (type === 'filled') {
      paths.push(`<path stroke="none" d="${d}" fill="currentColor"/>`)
    } else {
      paths.push(`<path stroke="none" d="${d}" fill="none"/>`)
    }
  })

  return paths
}

/**
 * Assemble the final clean SVG file content.
 */
function buildSvg(paths: string[], fm: Frontmatter, type: IconType): string {
  const comment  = buildFrontmatterComment(fm, type)
  const template = SVG_TEMPLATE[type]
  const body     = paths.map((p) => `  ${p}`).join('\n')
  return [...(comment ? [comment] : []), template, body, '</svg>'].join('\n') + '\n'
}

// ─── Process single file ──────────────────────────────────────────────────────

function processFile(src: string, dest: string, type: IconType): boolean {
  const raw = readFileSync(src, 'utf8')

  // Hard error: transform= means the paths are position-dependent after transforms
  // were not yet baked in — the icon must be fixed in the source tool first.
  if (raw.includes('transform=')) {
    console.error(`  ✗ ${basename(src)}: contains transform= — fix in source tool before importing`)
    return false
  }

  // Hard error: spaces in filename break glob patterns and module imports.
  const name = basename(src, extname(src))
  if (/\s/.test(name)) {
    console.error(`  ✗ ${basename(src)}: filename contains whitespace`)
    return false
  }

  // Preserve existing frontmatter if dest already exists
  const existingFm: Frontmatter = existsSync(dest)
    ? parseFrontmatter(readFileSync(dest, 'utf8'))
    : {}

  // Run SVGO to normalise the geometry
  const optimised = svgoOptimize(raw)
  const paths     = extractPaths(optimised, type)

  if (paths.length === 0) {
    console.error(`  ✗ ${basename(src)}: no usable <path> elements extracted`)
    return false
  }

  const output = buildSvg(paths, existingFm, type)
  writeFileSync(dest, output)
  console.log(`  ✓ ${basename(dest)}  (${paths.length} path${paths.length !== 1 ? 's' : ''})`)
  return true
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log(`\n◆ axq-import-icons (svg) v0.0.0 · https://axqdesign.axq`)
console.log(`  source: ${newDir}/  →  dest: ${iconsDir}/  |  types: ${types.join(', ')}\n`)

let imported = 0
let failed   = 0

for (const type of types) {
  const pattern = join(newDir, type, '*.svg').replace(/\\/g, '/')
  const files   = globSync(pattern)

  if (files.length === 0) {
    console.log(`  (no files found in ${pattern})`)
    continue
  }

  console.log(`  [${type}]  ${files.length} file(s)`)
  mkdirSync(join(iconsDir, type), { recursive: true })

  for (const file of files) {
    const name = basename(file, extname(file))
    const dest = join(iconsDir, type, `${name}.svg`)
    if (processFile(file, dest, type)) imported++ else failed++
  }

  console.log('')
}

console.log('─'.repeat(60))

if (failed > 0) {
  console.error(`✗  ${failed} failed,  ${imported} imported`)
  process.exit(1)
}

console.log(`✓  ${imported} icon(s) imported successfully\n`)
