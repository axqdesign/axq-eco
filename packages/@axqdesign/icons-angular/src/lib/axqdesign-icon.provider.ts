import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { AXQIcon, AXQIcons } from '../types';

export interface IAXQIconProvider {
  getIcon(name: string): AXQIcon | null;
}

export class AXQIconProvider implements IAXQIconProvider {
  constructor(private readonly icons: AXQIcons) {}

  getIcon(name: string): AXQIcon | null {
    name = name.startsWith('Icon') ? name : `Icon${name}`;
    return this.iconExists(name) ? this.icons[name] : null;
  }

  private iconExists(name: string): boolean {
    return name in this.icons;
  }
}

export const AXQDESIGN_ICONS = new InjectionToken<IAXQIconProvider[]>('AXQIcons', {
  factory: () => []
});

/**
 * Provides a set of AXQ Icons to the application.
 * 
 * @example
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideAXQIcons({ IconHome, IconUser })
 *   ]
 * });
 * ```
 */
export function provideAXQIcons(icons: AXQIcons): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: AXQDESIGN_ICONS,
      multi: true,
      useValue: new AXQIconProvider(icons)
    }
  ]);
}
