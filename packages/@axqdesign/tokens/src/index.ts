/**
 * @axqdesign/tokens — Source Entry
 * AXQ Design System · Design Token Library
 * © 2024 AXQ Design · https://axqdesign.axq
 *
 * Layer architecture:
 *   Primitive → Semantic → Component
 *
 * Source files (*.tokens.json) are in src/ per layer.
 * Compiled outputs are in dist/.
 */

// Re-export everything from the compiled dist
export * from '../dist/tokens.esm.js';
export { default } from '../dist/tokens.esm.js';
