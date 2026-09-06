# AXQ Icons

A set of high-quality SVG icons for AXQ Design System. Each icon is designed on a 24×24 grid with a 1.5px stroke.

**[Browse all icons at axqdesign.axq →](https://axqdesign.axq/icons)**

## Installation

```sh
npm install @axqdesign/icons
```

```sh
yarn add @axqdesign/icons
```

```sh
pnpm add @axqdesign/icons
```

> **Registry:** All packages are hosted on the private AXQ registry.
> Add `.npmrc` to your project:
> ```
> @axqdesign:registry=https://axqdesign.axq/npm
> ```

## Usage

All icons are plain SVG files, so you can use them as an `<img>` source, as a CSS `background-image`, or inline in your HTML.

### HTML image

```html
<img src="path/to/icon.svg" alt="icon title" />
```

### Inline SVG

Paste the content of the icon file directly into your HTML to render it inline.

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-axq icons-axq-outline icon-axq-activity"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3 12h4l3 8l4 -16l3 8h4" />
</svg>
```

Inline icons inherit `currentColor`, so you can change their size, color, and `stroke-width` with CSS.

```css
.icon-axq {
  color: var(--axq-color-primary);
  width: 32px;
  height: 32px;
  stroke-width: 1.5;
}
```

## Package contents

| Path | Description |
| --- | --- |
| `icons/outline/*.svg` | Outline icons |
| `icons/filled/*.svg` | Filled icons |
| `icons.json` | Metadata: name, category, tags, version |
| `categories/outline/<category>/*.svg` | Outline icons grouped by category |
| `axq-nodes-outline.json`, `axq-nodes-filled.json` | Icon paths as `[tag, attributes]` tuples |

## CDN

All files are available from the AXQ private registry. Replace `latest` with a specific version to pin a release.

```html
<img src="https://axqdesign.axq/cdn/@axqdesign/icons@latest/icons/outline/home.svg" alt="Home" />
<img src="https://axqdesign.axq/cdn/@axqdesign/icons@latest/icons/filled/home.svg" alt="Home" />
```

## License

AXQ Icons is proprietary software. See [LICENSE](./LICENSE) for details.

© 2024 AXQ Design — https://axqdesign.axq
