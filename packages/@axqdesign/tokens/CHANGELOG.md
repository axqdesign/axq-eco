# Changelog — @axqdesign/tokens

Tất cả thay đổi quan trọng của package này được ghi lại trong file này.

Format theo [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning theo [Semantic Versioning](https://semver.org/).

---

## [1.0.0] — 2024

### Khởi tạo
Package `@axqdesign/tokens` được chắt lọc và củng cố từ `Variables-axq/`
vào hệ sinh thái có tổ chức `axq-eco/packages/@axqdesign/tokens/`.

### Thêm mới
- **Primitive layer** — 4 tập token gốc:
  - `color` — 87 màu: white, black, greyscale (9), brand (7), info/success/warning/error (9×4)
  - `fontSize` — 10 cỡ chữ: 10px → 96px
  - `radius` — 9 bán kính: none → full (9999px)
  - `spacing` — 18 khoảng cách: 0 → 128px

- **Semantic layer** — 7 nhóm alias:
  - `color` — bg (6), surface (4), text (8), icon (5), border (5), status (4×4), accent (6)
  - `typography` — 10 role: overline → h1
  - `radius` — 8 component radius
  - `spacing` — 11 spacing + 6 inset + 5 gap

- **Component layer** — 7 component:
  - `badge` — 12 tokens (color + spacing + radius + fontSize)
  - `chip` — 4 tokens
  - `button` — 21 tokens (multi-variant + spacing)
  - `input` — 15 tokens (states + labels + spacing)
  - `card` — 7 tokens
  - `navbar` — 10 tokens
  - `toggle` — 4 tokens

### Outputs
- `dist/tokens.css` — Full bundle CSS variables (3 layers)
- `dist/primitive.css` — Layer 1 only
- `dist/semantic.css` — Layer 2 only
- `dist/component.css` — Layer 3 only
- `dist/tokens.js` — CommonJS bundle
- `dist/tokens.esm.js` — ES Module bundle
- `dist/tokens.json` — Flat JSON (all resolved values)
- `dist/index.d.ts` — TypeScript declarations

### Nguồn gốc
- Thiết kế gốc từ Figma, xuất qua `axq.design` plugin
- Source files: `Variables-axq/` (14 file `*.tokens.json`)
- Namespace: `@axqdesign` · Domain: `https://axqdesign.axq`

---

*© 2024 AXQ Design · https://axqdesign.axq*
