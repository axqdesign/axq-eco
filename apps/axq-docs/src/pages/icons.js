// AXQ Docs — Icon Search page

import { loadIconIndex, svgPath } from '../data/icons.js';

const PAGE_SIZE = 120; // icons per page
let allIcons = [];
let filtered = [];
let page = 0;
let variant = 'outline';

export async function render(el) {
  el.innerHTML = `
<div class="page-icons">
  <div class="page-header">
    <h1 class="page-title">Icon Library</h1>
    <p class="page-subtitle" id="iconCount">Loading icons…</p>
  </div>
  <div class="icons-toolbar">
    <div class="icon-variant-tabs" id="variantTabs">
      <button class="tab active" data-variant="outline">Outline</button>
      <button class="tab"        data-variant="filled">Filled</button>
    </div>
  </div>
  <div class="icon-grid" id="iconGrid"></div>
  <div class="icons-load-more" id="loadMoreWrap" style="display:none">
    <button class="btn-load-more" id="loadMoreBtn">Load more icons</button>
  </div>
</div>

<!-- Modal -->
<div class="icon-modal-overlay hidden" id="iconModalOverlay">
  <div class="icon-modal" id="iconModal">
    <button class="icon-modal-close" id="iconModalClose">✕</button>
    <div class="icon-modal-preview" id="iconModalPreview"></div>
    <div class="icon-modal-name" id="iconModalName"></div>
    <div class="icon-modal-snippets">
      <div class="snippet-label">HTML &lt;img&gt;</div>
      <pre class="snippet-code" id="snippetImg" data-copy-target="snippetImg"></pre>
      <div class="snippet-label">CSS url()</div>
      <pre class="snippet-code" id="snippetCss" data-copy-target="snippetCss"></pre>
      <div class="snippet-label">React / JSX</div>
      <pre class="snippet-code" id="snippetJsx" data-copy-target="snippetJsx"></pre>
    </div>
  </div>
</div>

<style>
.page-icons { max-width: 1100px; }
.page-header { padding: 32px 0 20px; }
.page-title  { font-size: 28px; font-weight: 700; margin-bottom: 6px; }
.page-subtitle { color: #555; font-size: 14px; }

.icons-toolbar { display: flex; gap: 12px; align-items: center; margin-bottom: 24px; flex-wrap: wrap; }
.icon-variant-tabs { display: flex; border: 2px solid #000; }
.tab {
  padding: 7px 16px; font-size: 13px; font-weight: 600;
  border: none; border-right: 2px solid #000; background: #fff;
  cursor: pointer;
}
.tab:last-child { border-right: none; }
.tab.active { background: #000; color: #fff; }
.tab:hover:not(.active) { background: #BEFF6C; }

/* Icon Grid */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 8px;
}
.icon-tile {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; padding: 12px 8px;
  border: 2px solid #e5e7eb; cursor: pointer;
  background: #fff; transition: border-color .15s, transform .15s, box-shadow .15s;
  min-height: 88px;
}
.icon-tile:hover {
  border-color: #000; transform: translate(-2px,-2px); box-shadow: 4px 4px 0 #000;
}
.icon-tile img { width: 24px; height: 24px; display: block; }
.icon-tile-name {
  font-size: 10px; text-align: center; color: #555;
  word-break: break-all; line-height: 1.3;
  max-width: 80px; overflow: hidden;
  white-space: nowrap; text-overflow: ellipsis;
}

/* Load more */
.icons-load-more { text-align: center; padding: 24px 0; }
.btn-load-more {
  border: 2px solid #000; padding: 10px 28px;
  font-size: 14px; font-weight: 600; background: #fff; cursor: pointer;
  box-shadow: 4px 4px 0 #000; transition: transform .15s, box-shadow .15s;
}
.btn-load-more:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #000; }

/* Modal */
.icon-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 200; padding: 16px;
}
.icon-modal-overlay.hidden { display: none; }
.icon-modal {
  background: #fff; border: 3px solid #000; padding: 32px;
  width: 100%; max-width: 480px; position: relative;
  box-shadow: 8px 8px 0 #000;
}
.icon-modal-close {
  position: absolute; top: 12px; right: 12px;
  background: none; border: 2px solid #000;
  width: 28px; height: 28px; cursor: pointer; font-size: 14px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700;
}
.icon-modal-close:hover { background: #FF3D71; color: #fff; }
.icon-modal-preview {
  display: flex; align-items: center; justify-content: center;
  height: 80px; margin-bottom: 12px;
}
.icon-modal-preview img { width: 48px; height: 48px; }
.icon-modal-name { font-size: 18px; font-weight: 700; text-align: center; margin-bottom: 20px; }
.snippet-label { font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: .5px; color: #555; margin: 12px 0 4px; }
.snippet-code {
  background: #f7f8fa; border: 2px solid #000;
  padding: 10px 12px; font-family: monospace; font-size: 12px;
  white-space: pre-wrap; word-break: break-all;
  cursor: pointer; transition: background .1s;
}
.snippet-code:hover { background: #BEFF6C; }
</style>
`;

  // Load icons
  allIcons = await loadIconIndex();
  filtered = allIcons;
  page = 0;
  updateCount();
  renderPage();

  // Variant tabs
  el.querySelector('#variantTabs').addEventListener('click', e => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    el.querySelectorAll('#variantTabs .tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    variant = btn.dataset.variant;
    page = 0;
    renderPage();
  });

  // Load more
  el.querySelector('#loadMoreBtn').addEventListener('click', () => {
    page++;
    renderPage(true);
  });

  // Global search input (in topbar)
  const searchEl = document.getElementById('globalSearch');
  if (searchEl) {
    searchEl.value = '';
    searchEl.oninput = () => {
      const q = searchEl.value.toLowerCase().trim();
      filtered = q ? allIcons.filter(n => n.includes(q)) : allIcons;
      page = 0;
      updateCount();
      renderPage();
    };
  }

  // Modal close
  el.querySelector('#iconModalClose').addEventListener('click', closeModal);
  el.querySelector('#iconModalOverlay').addEventListener('click', e => {
    if (e.target === el.querySelector('#iconModalOverlay')) closeModal();
  });

  // Modal snippet copy
  el.querySelectorAll('.snippet-code').forEach(pre => {
    pre.addEventListener('click', () => {
      navigator.clipboard.writeText(pre.textContent).then(() => showToast('Copied!'));
    });
  });

  // Icon tile click (delegated)
  el.querySelector('#iconGrid').addEventListener('click', e => {
    const tile = e.target.closest('.icon-tile');
    if (!tile) return;
    openModal(tile.dataset.name);
  });

  function updateCount() {
    el.querySelector('#iconCount').textContent =
      `${filtered.length.toLocaleString()} icons`;
  }

  function renderPage(append = false) {
    const grid = el.querySelector('#iconGrid');
    const start = page * PAGE_SIZE;
    const end   = start + PAGE_SIZE;
    const chunk = filtered.slice(start, end);

    if (!append) grid.innerHTML = '';

    chunk.forEach(name => {
      const tile = document.createElement('div');
      tile.className = 'icon-tile';
      tile.dataset.name = name;
      tile.innerHTML = `<img src="${svgPath(name, variant)}" alt="${name}" loading="lazy"><span class="icon-tile-name">${name}</span>`;
      grid.appendChild(tile);
    });

    const loadWrap = el.querySelector('#loadMoreWrap');
    loadWrap.style.display = end < filtered.length ? 'block' : 'none';
  }

  function openModal(name) {
    el.querySelector('#iconModalPreview').innerHTML =
      `<img src="${svgPath(name, variant)}" alt="${name}" width="48" height="48">`;
    el.querySelector('#iconModalName').textContent = name;

    const imgPath = svgPath(name, variant);
    el.querySelector('#snippetImg').textContent =
      `<img src="${imgPath}" width="24" height="24" alt="${name}" />`;
    el.querySelector('#snippetCss').textContent =
      `.icon-${name} { background: url('${imgPath}') center/24px no-repeat; }`;
    el.querySelector('#snippetJsx').textContent =
      `import ${toPascalCase(name)}Icon from '@axqdesign/icons/icons/${variant}/${name}.svg';\n// <img src={${toPascalCase(name)}Icon} width={24} height={24} />`;

    el.querySelector('#iconModalOverlay').classList.remove('hidden');
  }

  function closeModal() {
    el.querySelector('#iconModalOverlay').classList.add('hidden');
  }
}

function toPascalCase(str) {
  return str.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function showToast(msg) {
  const toast = document.getElementById('copyToast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}
