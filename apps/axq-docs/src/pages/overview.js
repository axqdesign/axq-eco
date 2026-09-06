// AXQ Docs — Overview page

const STATS = [
  { value: '5130+', label: 'Icons' },
  { value: '3',     label: 'Token Layers' },
  { value: '6',     label: 'Components' },
  { value: '7',     label: 'Brand Colors' },
];

const BRAND_COLORS = [
  { name: 'Teal',   hex: '#49DBC8', dark: false },
  { name: 'Green',  hex: '#BEFF6C', dark: false },
  { name: 'Orange', hex: '#FC7339', dark: false },
  { name: 'Pink',   hex: '#FD9FDD', dark: false },
  { name: 'Purple', hex: '#AF96FB', dark: false },
  { name: 'Yellow', hex: '#FFF172', dark: false },
  { name: 'Grey',   hex: '#EFEFEF', dark: false },
  { name: 'Black',  hex: '#000000', dark: true  },
  { name: 'White',  hex: '#FFFFFF', dark: false },
];

const FEATURES = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    title: 'Design Tokens',
    desc: '3-layer token system: Primitive → Semantic → Component. CSS custom properties ready.',
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
    title: 'Icon Library',
    desc: '5130+ outline SVG icons. Search, preview, copy React/Vue/HTML snippets instantly.',
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    title: 'Components',
    desc: 'Button, Badge, Input, Toggle, Card, Navbar — live preview with token-driven props.',
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    title: 'App Zones',
    desc: 'Predefined application zones with layout specs, spacing rules and usage guidelines.',
  },
];

export function render(el) {
  el.innerHTML = `
<div class="page-overview">

  <!-- Hero -->
  <section class="overview-hero">
    <div class="overview-hero-badge">v1.0 · AXQ Design System</div>
    <h1 class="overview-hero-title">Build with<br><span class="hero-accent">AXQ Design</span></h1>
    <p class="overview-hero-desc">
      A complete design system for AXQ products — tokens, icons, and components
      built for speed, consistency, and clarity.
    </p>
    <div class="overview-hero-actions">
      <a href="#/tokens" class="btn-primary">Explore Tokens</a>
      <a href="#/icons"  class="btn-ghost">Browse Icons</a>
    </div>
  </section>

  <!-- Stats -->
  <section class="overview-stats">
    ${STATS.map(s => `
      <div class="stat-card">
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('')}
  </section>

  <!-- Brand Colors -->
  <section class="overview-section">
    <h2 class="section-title">Brand Palette</h2>
    <p class="section-desc">Seven expressive brand colors plus black and white — the foundation of every AXQ surface.</p>
    <div class="brand-palette">
      ${BRAND_COLORS.map(c => `
        <div class="brand-swatch" style="background:${c.hex}" title="${c.name} ${c.hex}">
          <span class="swatch-label ${c.dark ? 'swatch-label-light' : ''}">${c.name}<br><small>${c.hex}</small></span>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Features -->
  <section class="overview-section">
    <h2 class="section-title">What's Inside</h2>
    <div class="feature-grid">
      ${FEATURES.map(f => `
        <div class="feature-card">
          <div class="feature-icon">${f.icon}</div>
          <h3 class="feature-title">${f.title}</h3>
          <p class="feature-desc">${f.desc}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Token Layers -->
  <section class="overview-section">
    <h2 class="section-title">Token Architecture</h2>
    <div class="token-layers">
      <div class="token-layer layer-primitive">
        <div class="layer-label">Primitive</div>
        <div class="layer-desc">Raw values — colors, spacing, radius</div>
        <div class="layer-count">color · spacing · radius</div>
      </div>
      <div class="layer-arrow">→</div>
      <div class="token-layer layer-semantic">
        <div class="layer-label">Semantic</div>
        <div class="layer-desc">Contextual aliases — bg, text, border, status</div>
        <div class="layer-count">bg · text · border · status</div>
      </div>
      <div class="layer-arrow">→</div>
      <div class="token-layer layer-component">
        <div class="layer-label">Component</div>
        <div class="layer-desc">Per-component tokens for Button, Badge, etc.</div>
        <div class="layer-count">button · badge · input · toggle · card · navbar</div>
      </div>
    </div>
  </section>

  <!-- Quick Start -->
  <section class="overview-section">
    <h2 class="section-title">Quick Start</h2>
    <pre class="code-block"><code>&lt;!-- 1. Include the compiled token CSS --&gt;
&lt;link rel="stylesheet" href="@axqdesign/tokens/dist/tokens.css"&gt;

&lt;!-- 2. Use CSS variables in your styles --&gt;
&lt;style&gt;
  .my-button {
    background: var(--axq-button-primary-bg);   /* #000000 */
    color:      var(--axq-button-primary-text);  /* #FFFFFF */
    padding:    var(--axq-button-padding-y) var(--axq-button-padding-x);
    border-radius: var(--axq-button-radius);
  }
&lt;/style&gt;

&lt;!-- 3. Use icons as inline SVG or &lt;img&gt; --&gt;
&lt;img src="@axqdesign/icons/icons/outline/home.svg" width="24" height="24" /&gt;</code></pre>
  </section>

</div>

<style>
.page-overview { max-width: 900px; }

/* Hero */
.overview-hero { padding: 48px 0 40px; }
.overview-hero-badge {
  display: inline-block;
  font-size: 12px; font-weight: 600; letter-spacing: .5px;
  border: 2px solid #000; padding: 3px 10px; margin-bottom: 20px;
}
.overview-hero-title {
  font-size: clamp(36px, 6vw, 64px); font-weight: 700;
  line-height: 1.1; margin-bottom: 16px; letter-spacing: -1px;
}
.hero-accent { color: #49DBC8; -webkit-text-stroke: 2px #000; }
.overview-hero-desc {
  font-size: 17px; color: #555; max-width: 520px;
  line-height: 1.6; margin-bottom: 28px;
}
.overview-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-primary {
  display: inline-block; background: #000; color: #fff;
  font-weight: 600; font-size: 14px; padding: 10px 24px;
  border: 2px solid #000; text-decoration: none;
  box-shadow: 4px 4px 0 #49DBC8;
  transition: transform .15s, box-shadow .15s;
}
.btn-primary:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #49DBC8; }
.btn-ghost {
  display: inline-block; background: #fff; color: #000;
  font-weight: 600; font-size: 14px; padding: 10px 24px;
  border: 2px solid #000; text-decoration: none;
  box-shadow: 4px 4px 0 #000;
  transition: transform .15s, box-shadow .15s;
}
.btn-ghost:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #000; }

/* Stats */
.overview-stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  margin-bottom: 48px;
}
@media (max-width: 600px) { .overview-stats { grid-template-columns: repeat(2,1fr); } }
.stat-card {
  border: 2px solid #000; padding: 20px 16px; text-align: center;
  box-shadow: 4px 4px 0 #000;
  transition: transform .15s, box-shadow .15s;
}
.stat-card:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #000; }
.stat-value { font-size: 32px; font-weight: 700; letter-spacing: -1px; }
.stat-label { font-size: 13px; color: #666; font-weight: 500; margin-top: 4px; }

/* Section */
.overview-section { margin-bottom: 48px; }
.section-title { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
.section-desc { color: #555; font-size: 14px; margin-bottom: 20px; line-height: 1.6; }

/* Brand Palette */
.brand-palette { display: flex; flex-wrap: wrap; gap: 0; border: 2px solid #000; }
.brand-swatch {
  flex: 1 1 80px; min-height: 80px; display: flex; align-items: flex-end;
  padding: 8px; position: relative; cursor: default;
}
.swatch-label { font-size: 11px; font-weight: 600; color: #000; line-height: 1.3; }
.swatch-label-light { color: #fff; }
.swatch-label small { font-weight: 400; opacity: .8; }

/* Features */
.feature-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
@media (max-width: 600px) { .feature-grid { grid-template-columns: 1fr; } }
.feature-card {
  border: 2px solid #000; padding: 24px;
  box-shadow: 4px 4px 0 #000;
  transition: transform .15s, box-shadow .15s;
}
.feature-card:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #000; }
.feature-icon { margin-bottom: 12px; }
.feature-title { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
.feature-desc { font-size: 13px; color: #555; line-height: 1.6; }

/* Token Layers */
.token-layers {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
}
.token-layer {
  flex: 1 1 180px; border: 2px solid #000; padding: 20px;
  box-shadow: 4px 4px 0 #000;
}
.layer-label { font-size: 14px; font-weight: 700; margin-bottom: 6px; }
.layer-desc  { font-size: 12px; color: #555; line-height: 1.5; margin-bottom: 8px; }
.layer-count { font-size: 11px; color: #888; font-family: monospace; }
.layer-primitive { background: #FFF172; }
.layer-semantic  { background: #BEFF6C; }
.layer-component { background: #49DBC8; }
.layer-arrow { font-size: 24px; font-weight: 700; color: #000; flex-shrink: 0; }

/* Code block */
.code-block {
  background: #101426; color: #e6e6e6;
  border: 2px solid #000; padding: 20px 24px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 13px; line-height: 1.7;
  overflow-x: auto;
  box-shadow: 4px 4px 0 #000;
}
</style>
`;
}
