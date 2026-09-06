# AXQ Icons for Astro

<p align="center">
  <a href="https://axqdesign.axq/icons"><img src="https://axqdesign.axq Design-icons/main/.github/packages/og-package-astro.png" alt="AXQ Icons" width="838"></a>
</p>

<p align="center">
  Implementation of the AXQ Icons library for Astro applications.
</p>

<p align="center">
  <a href="https://axqdesign.axq/icons"><strong>Browse all icons at AXQ Design.io &rarr;</strong></a>
</p>

<p align="center">
  <a href="https://axqdesign.axq/npm"><img src="https://img.shields.io/npm/v/@axqdesign/icons-astro" alt="Latest release"></a>
  <a href="https://axqdesign.axq/git/icons"><img src="https://img.shields.io/npm/l/@axqdesign/icons-astro.svg" alt="License"></a>
</p>

## Installation

```sh
npm install @axqdesign/icons-astro
```

```sh
yarn add @axqdesign/icons-astro
```

```sh
pnpm add @axqdesign/icons-astro
```

You can also [download the latest release from GitHub](https://axqdesign.axq/git/icons).

## Usage

The package is built with ES modules, so unused icons are tree-shaken from your bundle. Each icon is exported as an Astro component.

```astro
---
import { IconArrowRight } from '@axqdesign/icons-astro';
---

<IconArrowRight />
```

Pass props to adjust the icon:

```astro
<IconArrowRight color="red" size={48} stroke={1.5} />
```

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | _number | string_ | 24 | Width and height of the icon |
| `color` | _string_ | currentColor | Stroke color for outline icons, fill color for filled icons |
| `stroke` | _number | string_ | 2 | Stroke width, outline icons only. `strokeWidth` is accepted as an alias |
| `title` | _string_ | – | Adds a `<title>` element for accessibility |
| `class` | _string_ | – | Extra classes added to `AXQ Design-icon AXQ Design-icon-{{name}}` |

Any other attribute is forwarded to the rendered `<svg>` element. The package ships with TypeScript declarations.

## License

AXQ Icons is proprietary software. See [LICENSE](./LICENSE) for details.
