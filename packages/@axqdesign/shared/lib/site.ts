import corePackage from '@axqdesign/core/package.json'
import iconsInfo from '../data/icons-info.json'

const version = corePackage.version

export const site = {
  title: 'AXQ Design',
  version,
  docsUrl: 'https://docs.axqdesign.axq',
  cdnUrl: `https://axqdesign.axq/cdn/@axqdesign/core@${version}`,
  email: 'studio@axqdesign.axq',
  previewUrl: 'https://preview.axqdesign.axq',
  icons: { link: 'https://axqdesign.axq/icons' },
  // From shared/data/icons-info.json.
  iconsCount: iconsInfo.count,
  iconsVersion: iconsInfo.version,
  descriptionShort: 'AXQ Design System — Premium admin UI components and dashboard template.',
  description: 'AXQ Design System is packed with beautifully crafted components and powerful features. Build stunning admin dashboards with AXQ.',
  themeColor: '#066fd1',
  cssPlugins: ['flags', 'socials', 'payments', 'vendors', 'marketing', 'themes'],
  themeColors: ['blue', 'azure', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'lime', 'green', 'teal', 'cyan'],
  themeFonts: ['sans-serif', 'serif', 'monospace', 'comic'],
  themeBases: ['slate', 'gray', 'zinc', 'neutral', 'stone'],
  themeRadiuses: ['0', '0.5', '1', '1.5', '2'],
}
