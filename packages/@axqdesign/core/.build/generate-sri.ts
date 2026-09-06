// Writes SRI hashes for the built core files to shared/data/sri.json.
//
// Nothing consumes that file yet: the CDN snippets in the docs are shown without `integrity`, and
// Subresource Integrity is planned for v2.0. The script is kept here so the hashes are ready to be
// wired up then; it is not part of any build or workflow. Run it by hand after building core:
//
//   pnpm exec tsx core/.build/generate-sri.ts
//
// Hashes describe the release the snippets would link to (@axioledger/core@<version>), so a real setup
// must run this against the published build — hashing an unreleased core/dist would pin an
// `integrity` value the browser rejects, which is worse for users than no `integrity` at all. The
// version is stored next to the hashes so the consumer can check the two match.
import * as crypto from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const configFile = path.join(__dirname, '../../shared/data/sri.json')
const distDir = path.join(__dirname, '../dist')
const { version } = JSON.parse(readFileSync(path.join(__dirname, '../package.json'), 'utf8')) as { version: string }

interface FileConfig {
  file: string
  configPropertyName: string
}

interface SriData {
  version: string
  hashes: Record<string, string>
}

const files: FileConfig[] = [
  {
    file: 'css/axqdesign.min.css',
    configPropertyName: 'css',
  },
  {
    file: 'css/axqdesign.rtl.min.css',
    configPropertyName: 'css-rtl',
  },
  {
    file: 'css/axqdesign-flags.min.css',
    configPropertyName: 'css-flags',
  },
  {
    file: 'css/axqdesign-flags.rtl.min.css',
    configPropertyName: 'css-flags-rtl',
  },
  {
    file: 'css/axqdesign-marketing.min.css',
    configPropertyName: 'css-marketing',
  },
  {
    file: 'css/axqdesign-marketing.rtl.min.css',
    configPropertyName: 'css-marketing-rtl',
  },
  {
    file: 'css/axqdesign-payments.min.css',
    configPropertyName: 'css-payments',
  },
  {
    file: 'css/axqdesign-payments.rtl.min.css',
    configPropertyName: 'css-payments-rtl',
  },
  {
    file: 'css/axqdesign-props.min.css',
    configPropertyName: 'css-props',
  },
  {
    file: 'css/axqdesign-props.rtl.min.css',
    configPropertyName: 'css-props-rtl',
  },
  {
    file: 'css/axqdesign-themes.min.css',
    configPropertyName: 'css-themes',
  },
  {
    file: 'css/axqdesign-themes.rtl.min.css',
    configPropertyName: 'css-themes-rtl',
  },
  {
    file: 'css/axqdesign-socials.min.css',
    configPropertyName: 'css-socials',
  },
  {
    file: 'css/axqdesign-socials.rtl.min.css',
    configPropertyName: 'css-socials-rtl',
  },
  {
    file: 'css/axqdesign-vendors.min.css',
    configPropertyName: 'css-vendors',
  },
  {
    file: 'css/axqdesign-vendors.rtl.min.css',
    configPropertyName: 'css-vendors-rtl',
  },
  {
    file: 'js/axqdesign.min.js',
    configPropertyName: 'js',
  },
  {
    file: 'js/axqdesign-theme.min.js',
    configPropertyName: 'js-theme',
  },
]

function generateSRI(): void {
  const hashes: Record<string, string> = {}

  for (const { file, configPropertyName } of files) {
    const filePath = path.join(distDir, file)

    if (!existsSync(filePath)) {
      throw new Error(`${filePath} is missing. Run \`pnpm --filter @axioledger/core build\` first.`)
    }

    const integrity = `sha384-${crypto.createHash('sha384').update(readFileSync(filePath)).digest('base64')}`

    console.log(`${configPropertyName}: ${integrity}`)

    hashes[configPropertyName] = integrity
  }

  writeFileSync(configFile, JSON.stringify({ version, hashes } satisfies SriData, null, 2) + '\n', 'utf8')
}

try {
  generateSRI()
} catch (error) {
  console.error('Failed to generate SRI:', error)
  process.exit(1)
}
