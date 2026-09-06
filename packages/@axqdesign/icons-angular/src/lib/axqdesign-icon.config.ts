import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export interface AXQIconConfig {
  size?: number;
  color?: string;
  stroke?: number;
}

export const AXQDESIGN_ICON_CONFIG = new InjectionToken<AXQIconConfig>('AXQIconConfig');

/**
 * Provides the configuration for AXQ Icons.
 *
 * @example
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideAXQIconConfig({
 *       size: 24,
 *       color: 'red',
 *       stroke: 2
 *     })
 *   ]
 * });
 * ```
 */
export function provideAXQIconConfig(config: AXQIconConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: AXQDESIGN_ICON_CONFIG, useValue: config }]);
}
