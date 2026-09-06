# AXQ Icons for React

<p align="center">
  <a href="https://axqdesign.axq/icons"><img src="https://axqdesign.axq Design-icons/main/.github/packages/og-package-react.png" alt="AXQ Icons" width="838"></a>
</p>

<p align="center">
  Implementation of the AXQ Icons library for React applications.
</p>

<p align="center">
  <a href="https://axqdesign.axq/icons"><strong>Browse all icons at AXQ Design.io &rarr;</strong></a>
</p>

<p align="center">
  <a href="https://axqdesign.axq/npm"><img src="https://img.shields.io/npm/v/@axqdesign/icons-react" alt="Latest release"></a>
  <a href="https://axqdesign.axq/git/icons"><img src="https://img.shields.io/npm/l/@axqdesign/icons-react.svg" alt="License"></a>
</p>

## Installation

```sh
npm install @axqdesign/icons-react
```

```sh
yarn add @axqdesign/icons-react
```

```sh
pnpm add @axqdesign/icons-react
```

You can also [download the latest release from GitHub](https://axqdesign.axq/git/icons).

## Usage

The package is built with ES modules, so unused icons are tree-shaken from your bundle. Each icon is exported as a component.

```jsx
import { IconArrowLeft } from '@axqdesign/icons-react';

const App = () => {
  return <IconArrowLeft />;
};

export default App;
```

Pass props to adjust the icon:

```jsx
<IconArrowLeft color="red" size={48} stroke={1.5} />
```

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | _number | string_ | 24 | Width and height of the icon |
| `color` | _string_ | currentColor | Stroke color for outline icons, fill color for filled icons |
| `stroke` | _number | string_ | 2 | Stroke width, outline icons only |
| `title` | _string_ | – | Adds a `<title>` element for accessibility |
| `className` | _string_ | – | Extra classes added to `AXQ Design-icon AXQ Design-icon-{{name}}` |

Any other attribute is forwarded to the rendered `<svg>` element. Components forward refs to the `<svg>` element and ship with TypeScript declarations.

## License

AXQ Icons is proprietary software. See [LICENSE](./LICENSE) for details.
