/**
 * axq-build-icons · build.ts
 * @axqdesign/axq-build-icons v0.0.0
 *
 * Generate React/TSX icon component files từ SVG source.
 * Đọc icons/{outline,filled}/*.svg → sinh ra:
 *   • out/icons/Icon{Name}.tsx      — 1 component per icon
 *   • out/index.ts                  — barrel re-export tất cả
 *   • out/aliases.ts                — backward-compat aliases từ aliases.json
 *   • out/../icons.json             — metadata index (name, styles, tags, category)
 *
 * Nguồn gốc: icons/.build/build-icons.mjs (Tabler Icons)
 * Viết lại sạch TypeScript bởi AXQ Design · https://axqdesign.axq
 *
 * Sử dụng:
 *   tsx src/build.ts [--icons=icons] [--out=src/icons] [--list-only]
 *
 * Ví dụ:
 *   tsx src/build.ts --icons=icons --out=packages/icons-react/src
 *   tsx src/build.ts --list-only
 */

import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { basename, join, dirname } from 'node:path'
import { globSync } from 'glob'
import { parseSync } from 'svgson'
import matter from 'gray-matter'

// ─── Types ────────────────────────────────────────────────────────────────────

type IconType = 'outline' | 'filled'

interface SvgNode {
  name:       string
  attributes: Record<string, string>
  children:   SvgNode[]
}

interface IconData {
  name:       string
  namePascal: string
  type:       IconType
  /** Serialised <path .../> elements, ready to embed in JSX */
  paths:      string
  category?:  string
  tags:       string[]
  unicode?:   string
  version?:   string
}

interface AliasMap {
  outline?: Record<string, string>
  filled?:  Record<string, string>
}

/** icons.json entry per icon name */
interface JsonIconEntry {
  styles:    Partial<Record<IconType, true>>
  tags:      string[]
  category?: string
}

// ─── Args ─────────────────────────────────────────────────────────────────────

const argv     = process.argv.slice(2)
const iconsDir = argv.find((a) => a.startsWith('--icons='))?.split('=')[1] ?? 'icons'
const outDir   = argv.find((a) => a.startsWith('--out='))?.split('=')[1]   ?? 'src/icons'
const listOnly = argv.includes('--list-only')

// ─── PascalCase ───────────────────────────────────────────────────────────────

function toPascalCase(name: string): string {
  return name
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

// ─── Frontmatter ─────────────────────────────────────────────────────────────

function parseFrontmatter(content: string): Record<string, unknown> {
  const m = content.match(/<!--([\s\S]*?)-->/)
  if (!m) return {}
  try { return matter(`---\n${m[1].trim()}\n---`).data }
  catch { return {} }
}

// ─── Path extraction ──────────────────────────────────────────────────────────

/** Bounding-box sentinel paths — always stripped. */
const EMPTY_D = new Set(['M0 0h24v24H0z', 'M0 0h24v24H0Z'])

/**
 * Walk the parsed SVG tree, collect all <path> elements (excluding empty
 * bounding-box sentinels), and serialise them as JSX-ready attribute strings.
 * Renames `stroke-width` → `strokeWidth` for camelCase JSX props.
 */
function extractPaths(node: SvgNode): string {
  const parts: string[] = []

  function walk(n: SvgNode): void {
    if (n.name === 'path') {
      const d = n.attributes.d ?? ''
      if (!d || EMPTY_D.has(d)) return

      const attrs = Object.entries(n.attributes)
        .filter(([k]) => k !== 'xmlns')
        .map(([k, v]) => {
          // Convert kebab-case SVG attributes to camelCase JSX props
          const jsxKey = k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
          return `${jsxKey}="${v}"`
        })
        .join(' ')

      parts.push(`<path ${attrs}/>`)
    }
    for (const child of n.children ?? []) walk(child)
  }

  walk(node)
  return parts.join('\n    ')
}

// ─── Component template ───────────────────────────────────────────────────────

function componentTemplate(icon: IconData): string {
  const svgProps = icon.type === 'outline'
    ? [
        'xmlns="http://www.w3.org/2000/svg"',
        'width={size}',
        'height={size}',
        'viewBox="0 0 24 24"',
        'fill="none"',
        'stroke={color}',
        'strokeWidth={stroke}',
        'strokeLinecap="round"',
        'strokeLinejoin="round"',
      ].join(' ')
    : [
        'xmlns="http://www.w3.org/2000/svg"',
        'width={size}',
        'height={size}',
        'viewBox="0 0 24 24"',
        'fill={color}',
      ].join(' ')

  // Outline props include `stroke`; filled does not (fill-only icon).
  const propTypes = icon.type === 'outline'
    ? 'size?: number; color?: string; stroke?: number; [key: string]: unknown'
    : 'size?: number; color?: string; [key: string]: unknown'

  const defaultProps = icon.type === 'outline'
    ? "size = 24, color = 'currentColor', stroke = 2, ...props"
    : "size = 24, color = 'currentColor', ...props"

  return [
    `// Icon: ${icon.name}  (${icon.type})`,
    `// © 2024 AXQ Design · https://axqdesign.axq`,
    `export const Icon${icon.namePascal} = ({`,
    `  ${defaultProps}`,
    `}: { ${propTypes} }) => (`,
    `  <svg ${svgProps} {...props}>`,
    `    ${icon.paths}`,
    `  </svg>`,
    `)`,
    '',
  ].join('\n')
}

// ─── Index template ───────────────────────────────────────────────────────────

function buildIndex(icons: IconData[]): string {
  const lines = [
    '// @axqdesign/icons — Generated barrel index',
    '// DO NOT EDIT — regenerate: tsx tool/axq-build-icons/src/build.ts',
    '// © 2024 AXQ Design · https://axqdesign.axq',
    '',
  ]

  for (const icon of icons) {
    // Filled icon component names are suffixed with "Filled"
    const compName = icon.type === 'outline'
      ? `Icon${icon.namePascal}`
      : `Icon${icon.namePascal}Filled`
    lines.push(`export { ${compName} } from './icons/Icon${icon.namePascal}${icon.type !== 'outline' ? 'Filled' : ''}.js'`)
  }

  return lines.join('\n') + '\n'
}

// ─── Aliases template ─────────────────────────────────────────────────────────

/**
 * Generate aliases.ts from aliases.json.
 * Each alias re-exports the canonical component under the legacy name.
 */
function buildAliases(aliases: AliasMap, icons: IconData[]): string {
  // Build a quick lookup: name → namePascal for existing icons
  const nameMap = new Map(icons.map((i) => [i.name, i.namePascal]))

  const lines: string[] = [
    '// @axqdesign/icons — Generated aliases (backward compatibility)',
    '// DO NOT EDIT — regenerate: tsx tool/axq-build-icons/src/build.ts',
    '// © 2024 AXQ Design · https://axqdesign.axq',
    '',
  ]

  let count = 0

  for (const type of ['outline', 'filled'] as IconType[]) {
    const map = aliases[type]
    if (!map) continue

    for (const [oldName, newName] of Object.entries(map)) {
      const newPascal = nameMap.get(newName) ?? toPascalCase(newName)
      const oldPascal = toPascalCase(oldName)

      const suffix     = type === 'outline' ? '' : 'Filled'
      const newComp    = `Icon${newPascal}${suffix}`
      const oldComp    = `Icon${oldPascal}${suffix}`
      const importFile = `./icons/Icon${newPascal}${suffix}.js`

      lines.push(`export { ${newComp} as ${oldComp} } from '${importFile}'`)
      count++
    }
  }

  if (count === 0) lines.push('export {}')

  return lines.join('\n') + '\n'
}

// ─── icons.json ───────────────────────────────────────────────────────────────

function buildIconsJson(icons: IconData[]): string {
  const map: Record<string, JsonIconEntry> = {}

  for (const icon of icons) {
    if (!map[icon.name]) {
      map[icon.name] = { styles: {}, tags: icon.tags, category: icon.category }
    }
    map[icon.name].styles[icon.type] = true
  }

  return JSON.stringify(map, null, 2)
}

// ─── Read icons ───────────────────────────────────────────────────────────────

function readAllIcons(): IconData[] {
  const icons: IconData[] = []

  for (const type of ['outline', 'filled'] as IconType[]) {
    const pattern = join(iconsDir, type, '*.svg').replace(/\\/g, '/')
    const files   = globSync(pattern)

    for (const file of files) {
      const content = readFileSync(file, 'utf8')
      const name    = basename(file, '.svg')
      const fm      = parseFrontmatter(content)

      // Strip frontmatter comment before feeding into svgson
      const svgContent = content.replace(/<!--[\s\S]*?-->/, '').trim()
      let paths = ''

      try {
        const parsed = parseSync(svgContent) as SvgNode
        paths = extractPaths(parsed)
      } catch {
        console.warn(`  ⚠ Could not parse SVG: ${file}`)
      }

      icons.push({
        name,
        namePascal: toPascalCase(name),
        type,
        paths,
        category: fm.category as string | undefined,
        tags:     (fm.tags as string[] | undefined) ?? [],
        unicode:  fm.unicode as string | undefined,
        version:  fm.version as string | undefined,
      })
    }
  }

  return icons
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log(`\n◆ axq-build-icons v0.0.0 · https://axqdesign.axq`)
console.log(`  icons: ${iconsDir}  →  out: ${outDir}\n`)

const icons   = readAllIcons()
const outline = icons.filter((i) => i.type === 'outline').length
const filled  = icons.filter((i) => i.type === 'filled').length
console.log(`  Found: ${outline} outline + ${filled} filled = ${icons.length} total\n`)

// ── List-only mode ────────────────────────────────────────────────────────────
if (listOnly) {
  for (const icon of icons) {
    console.log(`  ${icon.type.padEnd(8)}  ${icon.name}`)
  }
  process.exit(0)
}

// ── Write files ───────────────────────────────────────────────────────────────

const iconsSubDir = join(outDir, 'icons')
mkdirSync(iconsSubDir, { recursive: true })

let written = 0

for (const icon of icons) {
  const suffix   = icon.type === 'outline' ? '' : 'Filled'
  const fileName = `Icon${icon.namePascal}${suffix}.tsx`
  writeFileSync(join(iconsSubDir, fileName), componentTemplate(icon))
  written++
}

// Barrel index
writeFileSync(join(outDir, 'index.ts'), buildIndex(icons))

// Aliases (aliases.json is optional — skip gracefully if absent)
const aliasesJsonPath = join(iconsDir, '..', 'aliases.json')
const aliasMap: AliasMap = existsSync(aliasesJsonPath)
  ? JSON.parse(readFileSync(aliasesJsonPath, 'utf8')) as AliasMap
  : {}
writeFileSync(join(outDir, 'aliases.ts'), buildAliases(aliasMap, icons))

// icons.json — written one level above outDir (alongside the component tree)
const iconsJsonPath = join(dirname(outDir), 'icons.json')
writeFileSync(iconsJsonPath, buildIconsJson(icons))

console.log(`✓ ${written} component file(s)  →  ${iconsSubDir}/`)
console.log(`✓ index.ts          →  ${join(outDir, 'index.ts')}`)
console.log(`✓ aliases.ts        →  ${join(outDir, 'aliases.ts')}`)
console.log(`✓ icons.json        →  ${iconsJsonPath}\n`)
