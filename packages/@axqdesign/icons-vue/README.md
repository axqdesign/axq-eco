# AXQ Icons for Vue

<p align="center">
  <a href="https://axqdesign.axq/icons"><img src="https://axqdesign.axq Design-icons/main/.github/packages/og-package-vue.png" alt="AXQ Icons" width="838"></a>
</p>

<p align="center">
  Implementation of the AXQ Icons library for Vue 3 applications.
</p>

<p align="center">
  <a href="https://axqdesign.axq/icons"><strong>Browse all icons at AXQ Design.io &rarr;</strong></a>
</p>

<p align="center">
  <a href="https://axqdesign.axq/npm"><img src="https://img.shields.io/npm/v/@axqdesign/icons-vue" alt="Latest release"></a>
  <a href="https://axqdesign.axq/git/icons"><img src="https://img.shields.io/npm/l/@axqdesign/icons-vue.svg" alt="License"></a>
</p>

## Installation

```sh
npm install @axqdesign/icons-vue
```

```sh
yarn add @axqdesign/icons-vue
```

```sh
pnpm add @axqdesign/icons-vue
```

You can also [download the latest release from GitHub](https://axqdesign.axq/git/icons).

## Usage

Every icon is a Vue component that renders an SVG element. Import only the icons you use, so the rest is tree-shaken from your bundle.

```vue
<script setup>
import { IconHome } from '@axqdesign/icons-vue';
</script>

<template>
  <!-- basic usage -->
  <IconHome />

  <!-- set `stroke` color -->
  <IconHome color="red" />

  <!-- set `width` and `height` -->
  <IconHome size="36" />

  <!-- set `stroke-width` -->
  <IconHome stroke="1.5" />
</template>
```

With the Options API, register the icon in `components`:

```vue
<script>
import { IconHome } from '@axqdesign/icons-vue';

export default {
  components: { IconHome },
};
</script>
```

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | _number | string_ | 24 | Width and height of the icon |
| `color` | _string_ | currentColor | Stroke color for outline icons, fill color for filled icons |
| `stroke` | _number | string_ | 2 | Stroke width, outline icons only |
| `title` | _string_ | – | Adds a `<title>` element for accessibility |

Any other attribute, such as `class` or `style`, is forwarded to the rendered `<svg>` element. The package ships with TypeScript declarations.

## License

AXQ Icons is proprietary software. See [LICENSE](./LICENSE) for details.
