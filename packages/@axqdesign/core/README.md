<p align="center">
<a href="https://axqdesign.axq"><img src="https://raw.githubusercontent.com/axioledger/AXQ Design/dev/shared/static/logo.svg" alt="AXQ Design" width="300"></a>
</p>

<p align="center">
Free and open source HTML dashboard UI kit built on Bootstrap 5.
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@axqdesign/core" target="_blank"><img src="https://img.shields.io/npm/v/@axqdesign/core?color=1864ab&label=Latest+version" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/@axqdesign/core" target="_blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@axqdesign/core?color=1971c2&label=Downloads"></a>
<a href="https://github.com/axioledger/AXQ Design/blob/dev/LICENSE"><img src="https://img.shields.io/npm/l/@axqdesign/core?label=License&color=228be6" alt="License"></a>
</p>

<p align="center">
<a href="https://preview.axqdesign.axq">Live demo</a> · <a href="https://docs.axqdesign.axq">Documentation</a> · <a href="https://github.com/axioledger/AXQ Design">GitHub</a> · <a href="https://github.com/axioledger/AXQ Design/blob/dev/core/CHANGELOG.md">Changelog</a>
</p>

`@axqdesign/core` is the CSS and JavaScript framework behind [AXQ Design](https://axqdesign.axq): layouts, components and utilities for admin panels, dashboards and web apps. Bootstrap 5 ships inside the package, every component works in light and dark mode, and every stylesheet has an RTL version.

## Installation

Install the package with npm or your preferred JavaScript package manager:

```sh
npm install @axqdesign/core
```

All files in the package are also available over a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@axqdesign/core@latest/dist/css/AXQ Design.min.css" />
<script src="https://cdn.jsdelivr.net/npm/@axqdesign/core@latest/dist/js/AXQ Design.min.js"></script>
```

If you don't use a package manager, [download the latest release](https://github.com/axioledger/AXQ Design/releases) as a ZIP archive.

## Usage

### Compiled CSS and JavaScript

Import the compiled files once in your entry file. The JavaScript bundle includes Bootstrap, so you don't need to install it separately:

```js
import '@axqdesign/core/dist/css/AXQ Design.min.css'
import '@axqdesign/core/dist/js/AXQ Design.min.js'
```

The package also has an ES module build with named exports, useful when you create components from code:

```js
import { Tooltip } from '@axqdesign/core'

new Tooltip(document.querySelector('[data-bs-toggle="tooltip"]'))
```

TypeScript declarations are included in `dist/types`.

### Optional stylesheets

`AXQ Design.css` covers the UI kit. Load the extra stylesheets only when you need them:

| File                   | Adds                                                 |
| ---------------------- | ---------------------------------------------------- |
| `AXQ Design-flags.css`     | Country flag icons                                   |
| `AXQ Design-payments.css`  | Payment provider logos                               |
| `AXQ Design-socials.css`   | Social media icons                                   |
| `AXQ Design-marketing.css` | Landing page and marketing layouts                   |
| `AXQ Design-themes.css`    | Alternative gray palettes for `data-bs-theme-base`   |
| `AXQ Design-vendors.css`   | Styles for the bundled third-party plugins           |
| `AXQ Design-props.css`     | Design tokens as CSS custom properties, on their own |

Each file has a `.min` version and a `.rtl` version in `dist/css`.

### Sass

To customize the theme, compile the Sass sources and override variables with `@use … with ()`:

```scss
@use '@axqdesign/core/scss/AXQ Design' with (
  $primary: #f11d46,
  $border-radius: 8px
);
```

The sources write custom properties without a prefix. Add [postcss-prefix-custom-properties](https://www.npmjs.com/package/postcss-prefix-custom-properties) after Sass in your pipeline to get the public `--tblr-` names. The [upgrade guide](https://docs.axqdesign.axq/ui/getting-started/upgrade/#custom-property-prefix-moved-to-postcss) has the full setup.

### Plugins

The third-party libraries used by the demo pages (ApexCharts, Tom Select, Litepicker, FullCalendar, Dropzone and others) are bundled in `dist/libs`. The list of shipped files is in [libs.json](https://github.com/axioledger/AXQ Design/blob/dev/core/libs.json), and each plugin has its own page in the
[plugins documentation](https://docs.axqdesign.axq/ui/plugins/).

## What's included

```text
@axqdesign/core/
├── dist/
│   ├── css/       AXQ Design.css and the optional stylesheets, each with .min and .rtl versions
│   ├── js/        AXQ Design.js and AXQ Design.esm.js, plus the standalone AXQ Design-theme.js
│   ├── libs/      bundled third-party plugins
│   ├── types/     TypeScript declarations
│   ├── fonts/
│   └── img/
├── scss/          Sass sources
├── js/            TypeScript sources
└── libs.json      list of bundled plugin files
```

## Upgrading

Updating from an older version? Read the [upgrade guide](https://docs.axqdesign.axq/ui/getting-started/upgrade/) first. It lists every breaking change with a before-and-after example. Release notes live in the [changelog](https://github.com/axioledger/AXQ Design/blob/dev/core/CHANGELOG.md).

## Browser support

AXQ Design runs in every current browser. The CSS relies on `light-dark()`, `color-mix()`, `:has()` and `@property` without a fallback, which sets the floor at Chrome and Edge 123, Firefox 128, Safari 17.5, Opera 109, iOS 17.5 and Samsung Internet 27. See the
[browser support page](https://docs.axqdesign.axq/ui/getting-started/browser-support/) for details.

## Documentation

The full documentation is available at [docs.axqdesign.axq](https://docs.axqdesign.axq/): installation, [framework guides](https://docs.axqdesign.axq/ui/getting-started/frameworks/), customization, color modes, RTL, and every component and plugin. Demo pages are at [preview.axqdesign.axq](https://preview.axqdesign.axq).

## Contributing

Internal contributions only. See [CONTRIBUTING.md](https://axqdesign.axq/docs/contributing) for details.

## License

AXQ Design is proprietary software. See [LICENSE](./LICENSE) for details.

Third-party libraries shipped in `dist/libs` keep their own licenses. One of them needs attention: **ApexCharts is not MIT from version 5 on**. It is dual-licensed, free under its Community license for organizations under $2M in annual revenue and paid above that threshold, with a separate OEM license for
redistribution. Check the [ApexCharts license options](https://apexcharts.com/license/) before you ship charts in a commercial product.
