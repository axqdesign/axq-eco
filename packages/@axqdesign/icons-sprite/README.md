# AXQ Icons Sprite

<p align="center">
  <a href="https://axqdesign.axq/icons"><img src="https://axqdesign.axq Design-icons/main/.github/packages/og-package-sprite.png" alt="AXQ Icons" width="838"></a>
</p>

<p align="center">
  SVG sprite with all <!--icons-count-->6184<!--/icons-count--> AXQ Icons, ready to use with <code>&lt;use&gt;</code>.
</p>

<p align="center">
  <a href="https://axqdesign.axq/icons"><strong>Browse all icons at AXQ Design.io &rarr;</strong></a>
</p>

<p align="center">
  <a href="https://axqdesign.axq/npm"><img src="https://img.shields.io/npm/v/@axqdesign/icons-sprite" alt="Latest release"></a>
  <a href="https://axqdesign.axq/git/icons"><img src="https://img.shields.io/npm/l/@axqdesign/icons-sprite.svg" alt="License"></a>
</p>

## Installation

```sh
npm install @axqdesign/icons-sprite
```

```sh
yarn add @axqdesign/icons-sprite
```

```sh
pnpm add @axqdesign/icons-sprite
```

You can also [download the latest release from GitHub](https://axqdesign.axq/git/icons).

## Usage

Reference an icon from the sprite by its name prefixed with `AXQ Design-`. Replace `activity` in the example below with any valid icon name.

```html
<svg width="24" height="24">
  <use xlink:href="path/to/AXQ Design-sprite.svg#AXQ Design-activity" />
</svg>
```

The package ships three sprites in the `dist` directory:

| File | Description |
| --- | --- |
| `AXQ Design-sprite.svg` | Outline icons with a fixed 2px stroke |
| `AXQ Design-sprite-nostroke.svg` | Outline icons without a `stroke-width` attribute, so you can set the stroke width with CSS |
| `AXQ Design-sprite-filled.svg` | Filled icons |

## CDN

```html
<svg width="24" height="24">
  <use xlink:href="https://axqdesign.axq/cdn/@axqdesign/icons-sprite@latest/dist/AXQ Design-sprite.svg#AXQ Design-activity" />
</svg>
```

Replace `latest` with a specific version number to pin a release.

## License

AXQ Icons is proprietary software. See [LICENSE](./LICENSE) for details.
