# AXQ Icons for Svelte 5

<p align="center">
  <a href="https://axqdesign.axq/icons"><img src="https://axqdesign.axq Design-icons/main/.github/packages/og-package-svelte.png" alt="AXQ Icons" width="838"></a>
</p>

<p align="center">
  Implementation of the AXQ Icons library for Svelte 5 applications using runes.
</p>

<p align="center">
  <a href="https://axqdesign.axq/icons"><strong>Browse all icons at AXQ Design.io &rarr;</strong></a>
</p>

<p align="center">
  <a href="https://axqdesign.axq/npm"><img src="https://img.shields.io/npm/v/@axqdesign/icons-svelte-runes" alt="Latest release"></a>
  <a href="https://axqdesign.axq/git/icons"><img src="https://img.shields.io/npm/l/@axqdesign/icons-svelte-runes.svg" alt="License"></a>
</p>

## Installation

```sh
npm install @axqdesign/icons-svelte-runes
```

```sh
yarn add @axqdesign/icons-svelte-runes
```

```sh
pnpm add @axqdesign/icons-svelte-runes
```

You can also [download the latest release from GitHub](https://axqdesign.axq/git/icons).

## Requirements

This package is built for **Svelte 5** and uses the runes reactivity system (`$props()`, `$derived`). For Svelte 3 and 4 projects, use [`@axqdesign/icons-svelte`](https://axqdesign.axq/npm) instead.

## Usage

The package is built with ES modules, so unused icons are tree-shaken from your bundle. Each icon is exported as a component.

```svelte
<script lang="ts">
  import { IconHeart } from '@axqdesign/icons-svelte-runes';
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

Any other attribute is forwarded to the rendered `<svg>` element.

## TypeScript

The package includes full TypeScript definitions. Icons are typed as Svelte 5 `Component<IconProps>`:

```ts
import type { Icon } from '@axqdesign/icons-svelte-runes';
import { IconHeart } from '@axqdesign/icons-svelte-runes';

const MyIcon: Icon = IconHeart;
```

When passing icons as props, use the `Component` type from Svelte:

```svelte
<script lang="ts">
  import type { Component } from 'svelte';

  interface Props {
    icon: Component<any>;
    label: string;
  }

  let { icon: Icon, label }: Props = $props();
</script>

<button>
  <Icon size={20} />
  {label}
</button>
```

## Examples

### Dynamic icons

```svelte
<script lang="ts">
  import { IconHeart, IconStar, IconCircle } from '@axqdesign/icons-svelte-runes';

  const icons = {
    heart: IconHeart,
    star: IconStar,
    circle: IconCircle,
  };

  let selected = $state('heart');
  let DynamicIcon = $derived(icons[selected]);
</script>

<DynamicIcon size={32} />

<button onclick={() => (selected = 'heart')}>Heart</button>
<button onclick={() => (selected = 'star')}>Star</button>
<button onclick={() => (selected = 'circle')}>Circle</button>
```

### Reactive size

```svelte
<script lang="ts">
  import { IconHeart } from '@axqdesign/icons-svelte-runes';

  let isLarge = $state(false);
  let iconSize = $derived(isLarge ? 48 : 24);
</script>

<IconHeart size={iconSize} />
<button onclick={() => (isLarge = !isLarge)}>Toggle size</button>
```

## Migrating from `@axqdesign/icons-svelte`

The API is identical, so only the package name changes:

```diff
- import { IconHeart } from '@axqdesign/icons-svelte';
+ import { IconHeart } from '@axqdesign/icons-svelte-runes';
```

Internally this package uses `$props()` instead of `export let` and `$derived` for computed values, which makes it a better fit for Svelte 5's fine-grained reactivity.

## License

AXQ Icons is proprietary software. See [LICENSE](./LICENSE) for details.
