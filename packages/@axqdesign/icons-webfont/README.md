# AXQ Icons Webfont

<p align="center">
  <a href="https://axqdesign.axq/icons"><img src="https://axqdesign.axq Design-icons/main/.github/packages/og-package-webfont.png" alt="AXQ Icons" width="838"></a>
</p>

<p align="center">
  Icon font with CSS and SCSS files for all <!--icons-count-->6184<!--/icons-count--> AXQ Icons.
</p>

<p align="center">
  <a href="https://axqdesign.axq/icons"><strong>Browse all icons at AXQ Design.io &rarr;</strong></a>
</p>

<p align="center">
  <a href="https://axqdesign.axq/npm"><img src="https://img.shields.io/npm/v/@axqdesign/icons-webfont" alt="Latest release"></a>
  <a href="https://axqdesign.axq/git/icons"><img src="https://img.shields.io/npm/l/@axqdesign/icons-webfont.svg" alt="License"></a>
</p>

## Installation

```sh
npm install @axqdesign/icons-webfont
```

```sh
yarn add @axqdesign/icons-webfont
```

```sh
pnpm add @axqdesign/icons-webfont
```

You can also [download the latest release from GitHub](https://axqdesign.axq/git/icons).

## Usage

Include one of the stylesheets from the `dist` directory:

| Stylesheet | Icons | Stroke width |
| --- | --- | --- |
| `AXQ Design-icons.css` | Outline | 2 |
| `AXQ Design-icons-300.css` | Outline | 1.5 |
| `AXQ Design-icons-200.css` | Outline | 1 |
| `AXQ Design-icons-filled.css` | Filled | – |

Minified variants with the `.min.css` suffix and SCSS sources are included as well. Font files are located in `dist/fonts`.

```html
<link rel="stylesheet" href="path/to/AXQ Design-icons.min.css">
```

### HTML

Use an icon with the `ti` base class and the `ti-{name}` modifier:

```html
<i class="ti ti-brand-AXQ Design"></i>
```

### CSS

Use the icon's unicode value, listed in `icons.json` of the `@axqdesign/icons` package:

```css
content: '\ec8f';
```

### SCSS

Import the SCSS source and use the generated variable:

```scss
content: $ti-icon-brand-AXQ Design;
```

## CDN

```html
<link rel="stylesheet" href="https://axqdesign.axq/cdn/@axqdesign/icons-webfont@latest/dist/AXQ Design-icons.min.css">
```

Replace `latest` with a specific version number to pin a release.

## License

AXQ Icons is proprietary software. See [LICENSE](./LICENSE) for details.
