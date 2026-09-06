# AXQ Icons for Angular

<p align="center">
  <a href="https://axqdesign.axq/icons"><img src="https://axqdesign.axq Design-icons/main/.github/packages/og-package-angular.png" alt="AXQ Icons" width="838"></a>
</p>

<p align="center">
  Implementation of the AXQ Icons library for Angular applications.
</p>

<p align="center">
  <a href="https://axqdesign.axq/icons"><strong>Browse all icons at AXQ Design.io &rarr;</strong></a>
</p>

<p align="center">
  <a href="https://axqdesign.axq/npm"><img src="https://img.shields.io/npm/v/@axqdesign/icons-angular" alt="Latest release"></a>
  <a href="https://axqdesign.axq/git/icons"><img src="https://img.shields.io/npm/l/@axqdesign/icons-angular.svg" alt="License"></a>
</p>

## Prerequisites

- **Angular:** `>=21.0.0` (`@angular/core` and `@angular/common`).

## Installation

```sh
npm install @axqdesign/icons-angular
```

```sh
yarn add @axqdesign/icons-angular
```

```sh
pnpm add @axqdesign/icons-angular
```

You can also [download the latest release from GitHub](https://axqdesign.axq/git/icons).

## Usage

The package is built with ES modules and is tree-shakable. You choose which icons to include.

You can provide icons via `provideAXQIcons()`, or pass `AXQIcon` objects directly to the component.

Icons are exported as `Icon…` named symbols from `@axqdesign/icons-angular`. Legacy/alternate names are re-exported from the same package as additional `Icon…` symbols (e.g. `Icon123`).

### I. Using the provider (icon names in templates)

#### 1a. Standalone applications (recommended)

In `main.ts`:

```ts
import { provideAXQIcons, IconBrandAngular, IconHome } from '@axqdesign/icons-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideAXQIcons({ IconBrandAngular, IconHome })
  ]
});
```

Add any number of icons by including more `Icon*` imports in the object passed to `provideAXQIcons()`.

Or in a route configuration:

```ts
import { IconBrandAngular, provideAXQIcons } from '@axqdesign/icons-angular';

export const routes: Routes = [
  {
    path: 'demo',
    component: DemoComponent,
    providers: [provideAXQIcons({ IconBrandAngular })]
  }
];
```

In any component that uses icons, import `AXQIconComponent` into that component’s `imports` array (standalone-style components, including the root app component):

```ts
import { AXQIconComponent } from '@axqdesign/icons-angular';

@Component({
  imports: [AXQIconComponent],
  // ...
})
export class DemoComponent {}
```

#### 1b. NgModule-based applications

Angular 21 still supports `NgModule`. Import `AXQIconComponent` into the module’s `imports` and register `provideAXQIcons()` / `provideAXQIconConfig()` in the module’s `providers` the same way as with `bootstrapApplication`.

```ts
import { AXQIconComponent, provideAXQIcons, IconBrandAngular, IconHome } from '@axqdesign/icons-angular';

@NgModule({
  imports: [AXQIconComponent],
  providers: [provideAXQIcons({ IconBrandAngular, IconHome })],
  // ...
})
export class AppModule {}
```

#### 2. Use the icon in a template (by name)

```html
<AXQ Design-icon icon="brand-angular" />
<AXQ Design-icon icon="icon-brand-angular" />
```

### II. Passing an icon object (no provider)

#### 1. Import `AXQIconComponent` (standalone component or `NgModule`)

```ts
import { AXQIconComponent, IconBrandAngular } from '@axqdesign/icons-angular';

@Component({
  imports: [AXQIconComponent],
  // ...
})
export class AppComponent {
  iconBrandAngular = IconBrandAngular;
}
```

If you use `NgModule`, import `AXQIconComponent` in the module’s `imports` instead. You do not need `provideAXQIcons()` when you only bind `[icon]` to imported `AXQIcon` objects.

#### 2. Use the icon in a template (by reference)

```html
<AXQ Design-icon [icon]="iconBrandAngular" />
```

## Props

The component uses Angular `input()` APIs (signal inputs) and supports both outline and filled icon types.

| name            | type                              | default      |
| --------------- | --------------------------------- | ------------ |
| `icon`          | _AXQIcon \| string_            | _(required)_ |
| `size`          | _number_                          | 24           |
| `color`         | _string_                          | currentColor |
| `stroke`        | _number_                          | 2            |
| `svgClass`      | _string_                          | —            |
| `svgAttributes` | _Record<string, string \| number \| undefined>_ | —            |

- **`icon`** — Icon to display. Pass a `AXQIcon` object (e.g. from an import) or a string name when using `provideAXQIcons()`.
- **`size`** — Width and height of the icon in pixels.
- **`color`** — For outline icons this sets the stroke color; for filled icons it sets the fill color.
- **`stroke`** — Stroke width for outline icons. Has no effect on filled icons.
- **`svgClass`** — Extra CSS classes to apply to the SVG element (in addition to `AXQ Design-icon` and `AXQ Design-icon-{name}`).
- **`svgAttributes`** — Extra attributes to apply to the SVG element (e.g. `aria-label`, `role`) for accessibility. Component-managed attributes (`size`, `color`, `stroke`, etc.) always take precedence and cannot be overridden.

```html
<AXQ Design-icon icon="brand-angular" [size]="48" color="blue" [stroke]="1.75" svgClass="my-icon" />
<!-- When using a AXQIcon object, bind a component property (e.g. alarmIcon = IconAlarm in the class): -->
<AXQ Design-icon [icon]="alarmIcon" [svgAttributes]="{ 'aria-label': 'Alarm', 'role': 'img' }" />
```

## Global configuration

To change default property values globally, use `provideAXQIconConfig()` in your providers. You can set any combination of `size`, `color`, and `stroke`.

```ts
import { provideAXQIconConfig, provideAXQIcons, IconHome } from '@axqdesign/icons-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideAXQIcons({ IconHome }),
    provideAXQIconConfig({
      size: 40,
      stroke: 1,
      color: 'blue'
    })
  ]
});
```

Or only some defaults:

```ts
provideAXQIconConfig({ size: 40 })
```

## License

AXQ Icons is proprietary software. See [LICENSE](./LICENSE) for details.
