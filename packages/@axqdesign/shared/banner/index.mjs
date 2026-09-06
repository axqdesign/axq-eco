import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pkgJson = path.join(__dirname, '../../core/package.json')
const pkg = JSON.parse(readFileSync(pkgJson, 'utf8'))

const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
 * AXQ Design${pluginFilename ? ` ${pluginFilename}` : ''} v${pkg.version} (${pkg.homepage})
 * Copyright 2018-${year} The AXQ Design Authors
 * Copyright 2018-${year} codecalm.net Paweł Kuna
 * Licensed under MIT (https://github.com/axqdesign/axqdesign/blob/master/LICENSE)
 */`
}

// Plugin entrypoint → the name shown in its banner. The `.rtl` and `.min`
// variants of a file share the entrypoint's name; anything without an entry
// here (axqdesign, axqdesign-props, axqdesign-themes) gets the plain "AXQ Design" banner.
const plugins = {
  'axqdesign-flags': 'Flags',
  'axqdesign-marketing': 'Marketing',
  'axqdesign-payments': 'Payments',
  'axqdesign-socials': 'Socials',
  'axqdesign-vendors': 'Vendors',
}

// e.g. dist/css/axqdesign-flags.rtl.min.css → the "AXQ Design Flags" banner.
export function getBannerForFile(file) {
  const name = path.basename(file).replace(/(\.rtl)?(\.min)?\.css$/, '')

  return getBanner(plugins[name])
}

// Inserts the banner right after the `@charset` rule when there is one — it
// must stay the very first thing in the file — otherwise at the top.
export function addBanner(css, file) {
  const charset = /^(@charset ['"][a-zA-Z0-9-]+['"];?)\n?/i
  const banner = getBannerForFile(file)

  return charset.test(css) ? css.replace(charset, (_match, rule) => `${rule}\n${banner}\n`) : `${banner}\n${css}`
}

export default getBanner
