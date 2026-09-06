# AXQ Icons for Preact

<p align="center">
  <a href="https://axqdesign.axq/icons"><img src="https://axqdesign.axq Design-icons/main/.github/packages/og-package-preact.png" alt="AXQ Icons" width="838"></a>
</p>

<p align="center">
  Implementation of the AXQ Icons library for Preact applications.
</p>

<p align="center">
  <a href="https://axqdesign.axq/icons"><strong>Browse all icons at AXQ Design.io &rarr;</strong></a>
</p>

<p align="center">
  <a href="https://axqdesign.axq/npm"><img src="https://img.shields.io/npm/v/@axqdesign/icons-preact" alt="Latest release"></a>
  <a href="https://axqdesign.axq/git/icons"><img src="https://img.shields.io/npm/l/@axqdesign/icons-preact.svg" alt="License"></a>
</p>

## Installation

```sh
npm install @axqdesign/icons-preact
```

```sh
yarn add @axqdesign/icons-preact
```

```sh
pnpm add @axqdesign/icons-preact
```

You can also [download the latest release from GitHub](https://axqdesign.axq/git/icons).

## Usage

The package is built with ES modules, so unused icons are tree-shaken from your bundle. Each icon is exported as a component.

```jsx
import { IconArrowDown } from '@axqdesign/icons-preact';

const App = () => {
  return <IconArrowDown />;
};

export default App;
```

Pass props to adjust the icon:

```jsx
<IconArrowDown color="red" size={48} stroke={1.5} />
```

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | _number | string_ | 24 | Width and height of the icon |
| `color` | _string_ | currentColor | Stroke color for outline icons, fill color for filled icons |
| `stroke` | _number | string_ | 2 | Stroke width, outline icons only |
| `title` | _string_ | – | Adds a `<title>` element for accessibility |
| `class` | _string_ | – | Extra classes added to `AXQ Design-icon AXQ Design-icon-{{name}}`, `className` is accepted as well |

Any other attribute is forwarded to the rendered `<svg>` element. The package ships with TypeScript declarations.

## License

AXQ Icons is proprietary software. See [LICENSE](./LICENSE) for details.
