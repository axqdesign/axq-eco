// AXQ Docs — App Zones page

const ZONES = [
  {
    id: 'shell',
    name: 'App Shell',
    color: '#49DBC8',
    description: 'The persistent outer frame — sidebar, topbar, and content area. Always visible regardless of route.',
    specs: [
      { label: 'Sidebar width',  value: '240px' },
      { label: 'Topbar height',  value: '56px' },
      { label: 'Sidebar z-index',value: '100' },
      { label: 'Content padding','value': '24px 32px' },
    ],
  },
  {
    id: 'navigation',
    name: 'Navigation',
    color: '#BEFF6C',
    description: 'Primary navigation links in the sidebar. Hash-router driven, active state via .active class.',
    specs: [
      { label: 'Link height',  value: '38px' },
      { label: 'Link padding', value: '8px 20px' },
      { label: 'Sub-link indent', value: '36px left' },
      { label: 'Active indicator', value: '3px left border' },
    ],
  },
  {
    id: 'content',
    name: 'Content Area',
    color: '#AF96FB',
    description: 'The #app mount point. Each route\'s module.render(el) injects HTML here. Scrolls independently.',
    specs: [
      { label: 'Max width',     value: '900px (page-dependent)' },
      { label: 'Padding',       value: '24px 32px' },
      { label: 'Scroll',        value: 'vertical, independent' },
      { label: 'Mount element', value: '#app' },
    ],
  },
  {
    id: 'topbar',
    name: 'Topbar',
    color: '#FFF172',
    description: 'Sticky top bar showing breadcrumb, optional icon search (only on /icons), and GitHub link.',
    specs: [
      { label: 'Height',       value: '56px' },
      { label: 'Background',   value: '#ffffff / blur' },
      { label: 'Breadcrumb',   value: '#bcCurrent span' },
      { label: 'Search shown', value: 'route === /icons only' },
    ],
  },
  {
    id: 'overlay',
    name: 'Mobile Overlay',
    color: '#FC7339',
    description: 'Translucent backdrop shown on mobile when sidebar is open. Tap to dismiss.',
    specs: [
      { label: 'Breakpoint',   value: '< 768px' },
      { label: 'z-index',      value: '99' },
      { label: 'Background',   value: 'rgba(0,0,0,0.4)' },
      { label: 'Toggle',       value: '#menuBtn click' },
    ],
  },
  {
    id: 'toast',
    name: 'Toast',
    color: '#FD9FDD',
    description: 'Transient copy confirmation. Add .show class to display, auto-removed after 2 seconds.',
    specs: [
      { label: 'Position',     value: 'fixed, bottom-right' },
      { label: 'Duration',     value: '2000ms' },
      { label: 'Trigger',      value: 'Add .show class' },
      { label: 'Element',      value: '#copyToast' },
    ],
  },
];

export function render(el) {
  el.innerHTML = `
<div class="page-zones">
  <div class="page-header">
    <h1 class="page-title">App Zones</h1>
    <p class="page-subtitle">Six defined zones that make up the AXQ Docs shell layout.</p>
  </div>

  <!-- Layout diagram -->
  <div class="zone-diagram">
    <div class="zd-topbar">Topbar (56px) — breadcrumb + search + GitHub</div>
    <div class="zd-body">
      <div class="zd-sidebar">Sidebar<br>(240px)<br><br>Navigation<br>Links</div>
      <div class="zd-content">
        <div class="zd-content-inner">
          Content Area<br><span style="font-size:12px;opacity:.7">#app mount point</span>
        </div>
        <div class="zd-toast">Toast</div>
      </div>
    </div>
    <div class="zd-overlay-note">Mobile Overlay (z:99, backdrop on sm screens)</div>
  </div>

  <!-- Zone cards -->
  <div class="zone-grid">
    ${ZONES.map(z => `
      <div class="zone-card" style="border-color:${z.color}">
        <div class="zone-card-header" style="background:${z.color}">
          <span class="zone-id">#${z.id}</span>
          <strong class="zone-name">${z.name}</strong>
        </div>
        <div class="zone-card-body">
          <p class="zone-desc">${z.description}</p>
          <div class="zone-specs">
            ${z.specs.map(s => `
              <div class="zone-spec-row">
                <span class="spec-label">${s.label}</span>
                <code class="spec-value">${s.value}</code>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('')}
  </div>

  <!-- Layout rules -->
  <section class="overview-section" style="margin-top:40px">
    <h2 class="section-title">Layout Rules</h2>
    <div class="rules-list">
      <div class="rule-item">
        <div class="rule-num">01</div>
        <div>
          <strong>Sidebar is always in DOM</strong> — it is never destroyed between routes. Only the <code>#app</code> content is replaced.
        </div>
      </div>
      <div class="rule-item">
        <div class="rule-num">02</div>
        <div>
          <strong>Topbar search is hidden by default</strong> — only the Icons page shows it via <code>topbarSearch.style.display = 'flex'</code>.
        </div>
      </div>
      <div class="rule-item">
        <div class="rule-num">03</div>
        <div>
          <strong>Content area scrolls independently</strong> — sidebar and topbar are sticky/fixed; only the page content scrolls.
        </div>
      </div>
      <div class="rule-item">
        <div class="rule-num">04</div>
        <div>
          <strong>Mobile breakpoint is 768px</strong> — below this, the sidebar collapses off-screen and the menu button appears.
        </div>
      </div>
    </div>
  </section>
</div>

<style>
.page-zones { max-width: 900px; }
.page-header { padding: 32px 0 24px; }
.page-title  { font-size: 28px; font-weight: 700; margin-bottom: 6px; }
.page-subtitle { color: #555; font-size: 14px; }

/* Diagram */
.zone-diagram {
  border: 3px solid #000; margin-bottom: 40px;
  box-shadow: 6px 6px 0 #000;
}
.zd-topbar {
  background: #FFF172; border-bottom: 3px solid #000;
  padding: 14px 20px; font-size: 13px; font-weight: 600;
}
.zd-body { display: flex; height: 160px; }
.zd-sidebar {
  width: 120px; flex-shrink: 0; background: #BEFF6C;
  border-right: 3px solid #000; padding: 14px 12px;
  font-size: 12px; font-weight: 600; line-height: 1.6;
}
.zd-content { flex: 1; position: relative; background: #f7f8fa; padding: 14px 16px; }
.zd-content-inner { font-size: 13px; font-weight: 600; }
.zd-toast {
  position: absolute; bottom: 10px; right: 12px;
  background: #FD9FDD; border: 2px solid #000;
  font-size: 11px; font-weight: 600; padding: 4px 10px;
}
.zd-overlay-note {
  background: #FC7339; border-top: 3px solid #000;
  padding: 10px 20px; font-size: 12px; font-weight: 600;
}

/* Zone grid */
.zone-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px; margin-bottom: 8px;
}
.zone-card { border: 2px solid #000; overflow: hidden; }
.zone-card-header {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; border-bottom: 2px solid #000;
}
.zone-id   { font-size: 11px; font-family: monospace; font-weight: 700; opacity: .6; }
.zone-name { font-size: 14px; font-weight: 700; }
.zone-card-body { padding: 14px; }
.zone-desc { font-size: 13px; color: #555; line-height: 1.6; margin-bottom: 12px; }
.zone-specs { }
.zone-spec-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 5px 0; border-bottom: 1px solid #e5e7eb; font-size: 12px;
}
.zone-spec-row:last-child { border-bottom: none; }
.spec-label { color: #555; }
.spec-value { font-family: monospace; color: #000; font-size: 11px; }

/* Rules */
.rules-list { display: flex; flex-direction: column; gap: 12px; }
.rule-item {
  display: flex; gap: 16px; align-items: flex-start;
  padding: 16px; border: 2px solid #000;
}
.rule-num {
  font-size: 24px; font-weight: 700; color: #C5CEE0;
  flex-shrink: 0; line-height: 1;
}
.rule-item strong { display: block; margin-bottom: 4px; }
.rule-item code { background: #f0f0f0; padding: 1px 5px; font-size: 12px; }
.section-title { font-size: 22px; font-weight: 700; margin-bottom: 16px; }
</style>
`;
}
