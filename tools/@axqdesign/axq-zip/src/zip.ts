/**
 * axq-zip · zip.ts
 * @axqdesign/axq-zip v0.0.0
 *
 * Đóng gói thư mục dist/ thành một ZIP release được đặt tên theo version.
 * Hỗ trợ hai chế độ:
 *   • Single-dist (mặc định): toàn bộ nội dung --dist= vào một thư mục trong ZIP.
 *   • Multi-folder:           nhiều --folder=src:dest bổ sung thêm vào cùng ZIP.
 *
 * Luôn loại bỏ junk files (.DS_Store, Thumbs.db, desktop.ini).
 * Thêm documentation.url shortcut vào root ZIP.
 *
 * Nguồn gốc: icons/.build/zip-files.mjs + admin-icons/.build/zip-package.ts
 * Viết lại sạch TypeScript bởi AXQ Design · https://axqdesign.axq
 *
 * Sử dụng:
 *   tsx src/zip.ts [options]
 *
 * Options:
 *   --dist=<dir>            Thư mục nguồn chính          (mặc định: dist)
 *   --out=<dir>             Thư mục output ZIP            (mặc định: releases)
 *   --name=<str>            Tiền tố tên ZIP               (mặc định: axqdesign)
 *   --pkg=<path>            package.json lấy version      (tìm tự động nếu bỏ qua)
 *   --docs-url=<url>        URL cho documentation.url     (mặc định: https://axqdesign.axq/docs)
 *   --folder=<src>:<dest>   Thêm thư mục phụ (lặp lại được)
 *
 * Ví dụ:
 *   tsx src/zip.ts --dist=dist --out=releases --name=axqdesign
 *   tsx src/zip.ts --dist=dist --folder=icons/outline:svg --folder=icons/filled:svg-filled
 */

import AdmZip from 'adm-zip'
import { mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// ─── Args ─────────────────────────────────────────────────────────────────────

const argv    = process.argv.slice(2)
const distDir = argv.find((a) => a.startsWith('--dist='))?.split('=')[1]    ?? 'dist'
const outDir  = argv.find((a) => a.startsWith('--out='))?.split('=')[1]     ?? 'releases'
const name    = argv.find((a) => a.startsWith('--name='))?.split('=')[1]    ?? 'axqdesign'
const pkgArg  = argv.find((a) => a.startsWith('--pkg='))?.split('=')[1]
const docsUrl = argv.find((a) => a.startsWith('--docs-url='))?.split('=')[1] ?? 'https://axqdesign.axq/docs'

/**
 * Extra folders: --folder=src/path:zip/dest
 * Can be supplied multiple times.
 */
const extraFolders: Array<{ src: string; dest: string }> = argv
  .filter((a) => a.startsWith('--folder='))
  .map((a) => {
    const pair = a.slice('--folder='.length)
    const sep  = pair.lastIndexOf(':')
    if (sep < 1) throw new Error(`Invalid --folder value: "${a}" — expected src:dest`)
    return { src: pair.slice(0, sep), dest: pair.slice(sep + 1) }
  })

// ─── Junk filter ──────────────────────────────────────────────────────────────

/** Files that macOS / Windows drop into every folder they browse. */
const JUNK = new Set(['.DS_Store', 'Thumbs.db', 'desktop.ini', '.gitkeep'])

function isJunk(entry: string): boolean {
  return JUNK.has(basename(entry))
}

// ─── Version resolver ─────────────────────────────────────────────────────────

/**
 * Walk upward from the script directory until a package.json with a `version`
 * field is found. Falls back to '0.0.0' if nothing is located within 6 levels.
 */
function findVersion(startDir: string): string {
  let dir = startDir
  for (let i = 0; i < 6; i++) {
    const candidate = join(dir, 'package.json')
    try {
      const pkg = JSON.parse(readFileSync(candidate, 'utf8')) as { version?: string }
      if (pkg.version) return pkg.version
    } catch { /* not found — keep walking */ }
    dir = dirname(dir)
  }
  return '0.0.0'
}

// ─── File counter ─────────────────────────────────────────────────────────────

function countFiles(dir: string): number {
  let n = 0
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) n += countFiles(full)
    else if (!isJunk(entry)) n++
  }
  return n
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))

const version = pkgArg
  ? (JSON.parse(readFileSync(pkgArg, 'utf8')) as { version: string }).version
  : findVersion(__dirname)

const zipName = `${name}-${version}.zip`
const zipPath = join(outDir, zipName)

console.log(`\n◆ axq-zip v0.0.0 · https://axqdesign.axq`)
console.log(`  dist:    ${distDir}`)
if (extraFolders.length > 0) {
  for (const f of extraFolders) console.log(`  folder:  ${f.src}  →  ${f.dest}/`)
}
console.log(`  output:  ${zipPath}\n`)

mkdirSync(outDir, { recursive: true })

const zip = new AdmZip()

// Add primary dist folder under the package name directory
zip.addLocalFolder(distDir, name, (entry: string) => !isJunk(entry))

// Add any extra source folders
for (const { src, dest } of extraFolders) {
  zip.addLocalFolder(src, dest, (entry: string) => !isJunk(entry))
}

// Add documentation shortcut at ZIP root
zip.addFile(
  'documentation.url',
  Buffer.from(`[InternetShortcut]\nURL=${docsUrl}\n`),
)

zip.writeZip(zipPath)

// Stats
const fileCount = countFiles(distDir)
const extraCount = extraFolders.reduce((acc, { src }) => acc + countFiles(src), 0)
const total = fileCount + extraCount

console.log(`✓ ${zipName}`)
console.log(`  ${total} file(s) packaged  (${distDir}: ${fileCount}` +
  (extraFolders.length > 0 ? ` + extras: ${extraCount}` : '') + ')')
console.log(`  + documentation.url → ${docsUrl}\n`)
