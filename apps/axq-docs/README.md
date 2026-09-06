# axq-docs

> **AXQ Design System — Docs App**
> `axq-eco/apps/axq-docs/` · v0.1.0

Trang tài liệu chính thức cho AXQ Design System — Token Explorer, Icon Search (5130+), Component Preview.

## Cấu trúc

```
axq-docs/
├── index.html              ← Shell: sidebar nav + topbar + #app
├── package.json
├── README.md
│
├── src/
│   ├── router/
│   │   └── index.js        ← Hash router: #/ #/tokens #/icons #/components
│   │
│   ├── style/
│   │   ├── shell.css       ← Layout: sidebar, topbar, mobile drawer
│   │   └── pages.css       ← Page-specific styles
│   │
│   ├── data/
│   │   ├── tokens.js       ← Parse @axqdesign/tokens → flat map
│   │   └── icons.js        ← Icons index + lazy SVG loader
│   │
│   └── pages/
│       ├── overview.js     ← #/           Home / Design System overview
│       ├── tokens.js       ← #/tokens     Token Explorer (3 lớp)
│       ├── icons.js        ← #/icons      Icon Search (5130+ SVG)
│       └── components.js   ← #/components Live Component Preview
│
└── public/
    └── favicon.svg
```

## Chạy local

```bash
npm install
npm run dev
# mở http://localhost:3000
```

Hoặc chỉ cần mở `index.html` trực tiếp trong browser (không cần server cho overview + tokens).  
**Icon Search cần local server** vì lazy-fetch SVG files qua `fetch()`.

## Nguồn dữ liệu

| Dữ liệu | Đường dẫn |
|---|---|
| Token JSON | `../../packages/@axqdesign/tokens/src/` |
| Token CSS | `../../packages/@axqdesign/tokens/dist/tokens.css` |
| Icons SVG | `../../../icons/icons/outline/` |
| Icons index | `../../../icons/packages/icons/` |

## Routes

| Hash | Trang |
|---|---|
| `#/` | Overview — Design System landing |
| `#/tokens` | Token Explorer — Primitive / Semantic / Component |
| `#/icons` | Icon Search — 5130+ SVG với filter + copy |
| `#/components` | Component Preview — Button, Badge, Input, Toggle, Card |
