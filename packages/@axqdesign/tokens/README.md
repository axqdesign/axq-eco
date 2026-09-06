# @axqdesign/tokens

> **AXQ Design System — Official Design Token Library**
> Proprietary & Confidential · © 2024 AXQ Design · [axqdesign.axq](https://axqdesign.axq)

---

## Giới thiệu

`@axqdesign/tokens` là thư viện design token chính thức của **AXQ Design System** — hệ thống thiết kế độc quyền thuộc sở hữu của AXQ Design. Thư viện cung cấp toàn bộ giá trị nền tảng (màu sắc, typography, spacing, radius) theo kiến trúc 3 lớp:

```
Primitive → Semantic → Component
```

| Lớp | Mô tả | Ví dụ |
|---|---|---|
| **Primitive** | Giá trị thô, không gắn ngữ nghĩa | `#101426`, `16px`, `8` |
| **Semantic** | Alias theo mục đích sử dụng | `--axq-text-primary`, `--axq-bg-brand` |
| **Component** | Token cụ thể theo component | `--axq-button-radius`, `--axq-input-border` |

---

## Cài đặt

> ⚠️ **Package này là nội bộ và độc quyền.** Chỉ dùng trong hệ sinh thái AXQ. Cần được cấp quyền truy cập từ AXQ Design trước khi sử dụng.

```bash
# Cần cấu hình registry trước
npm config set @axqdesign:registry https://axqdesign.axq/npm

# Sau đó cài đặt
npm install @axqdesign/tokens
```

---

## Sử dụng

### CSS Variables (Khuyến nghị)

Import toàn bộ token bundle (Primitive + Semantic + Component):

```css
@import '@axqdesign/tokens/css';
```

Hoặc từng lớp riêng:

```css
@import '@axqdesign/tokens/css/primitive';   /* Chỉ giá trị thô */
@import '@axqdesign/tokens/css/semantic';    /* Alias theo ngữ nghĩa */
@import '@axqdesign/tokens/css/component';  /* Token theo component */
```

Dùng trong CSS:

```css
.button {
  background-color: var(--axq-button-primary-bg);
  color: var(--axq-button-primary-text);
  border-radius: var(--axq-button-radius);
  padding: var(--axq-button-padding-y) var(--axq-button-padding-x);
  font-size: var(--axq-button-font-size);
}
```

---

### JavaScript / TypeScript

```ts
import tokens from '@axqdesign/tokens';
// hoặc named imports:
import { semanticColor, componentTokens, primitiveRadius } from '@axqdesign/tokens';

// Dùng token
const brandColor = tokens.semantic.color.bg.brand;     // '#000000'
const buttonRadius = tokens.component.button.radius;    // 24
const teal = tokens.primitive.color.brand.teal;        // '#49DBC8'
```

TypeScript types:

```ts
import type { AXQTokens, ButtonTokens, SemanticColors } from '@axqdesign/tokens';

function applyButtonStyle(t: ButtonTokens) {
  return {
    background: t['primary-bg'],
    borderRadius: `${t.radius}px`,
  };
}
```

---

## Cấu trúc Token

### Màu sắc (Color)

#### Primitive
| Token | Hex |
|---|---|
| `--axq-color-white` | `#FFFFFF` |
| `--axq-color-black` | `#000000` |
| `--axq-color-greyscale-{100–900}` | Thang xám 9 bậc |
| `--axq-color-brand-{teal\|green\|orange\|pink\|purple\|yellow\|grey}` | Màu thương hiệu |
| `--axq-color-{info\|success\|warning\|error}-{100–900}` | Màu trạng thái |

#### Semantic (Light Mode)
| Nhóm | Token | Giá trị |
|---|---|---|
| Background | `--axq-bg-primary` | `#FFFFFF` |
| Background | `--axq-bg-brand` | `#000000` |
| Text | `--axq-text-primary` | `#101426` |
| Text | `--axq-text-link` | `#0095FF` |
| Border | `--axq-border-focus` | `#0095FF` |
| Status | `--axq-status-info-default` | `#0095FF` |
| Status | `--axq-status-success-default` | `#00D68F` |
| Status | `--axq-status-warning-default` | `#FFAA00` |
| Status | `--axq-status-error-default` | `#FF3D71` |

### Typography
| Token | Kích thước |
|---|---|
| `--axq-type-overline` | 10px |
| `--axq-type-caption` | 12px |
| `--axq-type-body-sm` | 14px |
| `--axq-type-body` | 16px |
| `--axq-type-h6` → `--axq-type-h1` | 20px → 96px |

### Radius
| Token | Giá trị |
|---|---|
| `--axq-radius-component-button` | 24px |
| `--axq-radius-component-input` | 12px |
| `--axq-radius-component-card` | 16px |
| `--axq-radius-component-chip` | 9999px |
| `--axq-radius-component-badge` | 4px |

### Spacing
| Token | Giá trị |
|---|---|
| `--axq-spacing-xs` | 8px |
| `--axq-spacing-sm` | 12px |
| `--axq-spacing-md` | 16px |
| `--axq-spacing-lg` | 24px |
| `--axq-inset-sm` | 8px |
| `--axq-gap-md` | 12px |

---

## Components

Thư viện cung cấp token cho 6 component:

| Component | Prefix |
|---|---|
| Badge & Chip | `--axq-badge-*`, `--axq-chip-*` |
| Button | `--axq-button-*` |
| Input | `--axq-input-*` |
| Card | `--axq-card-*` |
| Navbar | `--axq-navbar-*` |
| Toggle | `--axq-toggle-*` |

---

## Cấu trúc thư mục

```
@axqdesign/tokens/
├── dist/
│   ├── tokens.css          ← Full bundle (Primitive + Semantic + Component)
│   ├── primitive.css       ← Chỉ giá trị thô
│   ├── semantic.css        ← Chỉ semantic aliases
│   ├── component.css       ← Chỉ component tokens
│   ├── tokens.js           ← CJS bundle
│   ├── tokens.esm.js       ← ESM bundle
│   └── index.d.ts          ← TypeScript declarations
├── package.json
├── README.md
└── LICENSE
```

---

## Bản quyền & Giấy phép

**© 2024 AXQ Design. Tất cả các quyền được bảo lưu.**

Thư viện này là tài sản độc quyền của AXQ Design. Nghiêm cấm sao chép, phân phối, hoặc sử dụng cho mục đích thương mại mà không có văn bản cho phép từ AXQ Design.

Xem chi tiết tại file [LICENSE](./LICENSE) hoặc liên hệ [legal@axqdesign.axq](mailto:legal@axqdesign.axq).
