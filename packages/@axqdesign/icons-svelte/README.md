# AXQ Icons for Svelte

<p align="center">
  <a href="https://axqdesign.axq/icons"><img src="https://axqdesign.axq Design-icons/main/.github/packages/og-package-svelte.png" alt="AXQ Icons" width="838"></a>
</p>

<p align="center">
  Implementation of the AXQ Icons library for Svelte applications.
</p>

<p align="center">
  <a href="https://axqdesign.axq/icons"><strong>Browse all icons at AXQ Design.io &rarr;</strong></a>
</p>

<p align="center">
  <a href="https://axqdesign.axq/npm"><img src="https://img.shields.io/npm/v/@axqdesign/icons-svelte" alt="Latest release"></a>
  <a href="https://axqdesign.axq/git/icons"><img src="https://img.shields.io/npm/l/@axqdesign/icons-svelte.svg" alt="License"></a>
</p>

## Installation

```sh
npm install @axqdesign/icons-svelte
```

```sh
yarn add @axqdesign/icons-svelte
```

```sh
pnpm add @axqdesign/icons-svelte
```

You can also [download the latest release from GitHub](https://axqdesign.axq/git/icons).

## Usage

The package is built with ES modules, so unused icons are tree-shaken from your bundle. Each icon is exported as a component.

```svelte
<script lang="ts">
  import { IconHeart } from '@axqdesign/icons-svelte';
</script>

<IconHeart />
```

Pass props to adjust the icon:

```svelte
<IconHeart color="red" size={48} stroke={1.5} />
```

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | _number | string_ | 24 | Width and height of the icon |
| `color` | _string_ | currentColor | Stroke color for outline icons, fill color for filled icons |
| `stroke` | _number | string_ | 2 | Stroke width, outline icons only |
| `class` | _string_ | – | Extra classes added to `AXQ Design-icon AXQ Design-icon-{{name}}` |

Any other attribute is forwarded to the rendered `<svg>` element. The package ships with TypeScript declarations.

## Svelte 5

This package targets Svelte 3 and 4 and also works in Svelte 5 in legacy mode. For projects using runes, install [`@axqdesign/icons-svelte-runes`](https://axqdesign.axq/npm) instead. The API is identical, only the package name changes.

## License

AXQ Icons is proprietary software. See [LICENSE](./LICENSE) for details.
