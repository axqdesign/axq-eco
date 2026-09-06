# AXQ Ecosystem — Workspace Sáng Tác

> **Môi trường ảo chính thức của AXQ Design**
> `D:\iOS-UI-screens\axq-eco` · Phiên bản 1.0.0
> © 2024 AXQ Design · [axqdesign.axq](https://axqdesign.axq) · Độc quyền & Bảo mật

---

## Giới thiệu

`axq-eco` là **môi trường workspace ảo** — không gian sáng tác độc quyền của AXQ Design nơi tất cả sản phẩm, ứng dụng, thư viện và tác phẩm thiết kế được xây dựng theo chuẩn hệ thống AXQ.

Mọi tác phẩm tạo ra trong workspace này đều:
- ✦ Kế thừa token từ `@axqdesign/tokens`
- ✦ Tuân thủ quy ước đặt tên AXQ
- ✦ Thuộc sở hữu độc quyền của AXQ Design
- ✦ Được bảo vệ bởi `LICENSE` của AXQ

---

## Cấu trúc Workspace

```
axq-eco/
│
├── .axq/                    ← Cấu hình hệ thống AXQ
│   ├── manifest.json        ← Định nghĩa toàn bộ workspace
│   └── config.json          ← Cấu hình môi trường hiện tại
│
├── apps/                    ← Ứng dụng hoàn chỉnh
│   └── axq-{type}-{name}/
│
├── packages/                ← Thư viện & component dùng chung
│   └── @axqdesign/{name}/
│
├── products/                ← Sản phẩm thương mại AXQ
│   └── axq-product-{name}/
│
├── tools/                   ← Công cụ, script, CLI nội bộ
│   └── axq-tool-{name}/
│
├── studio/                  ← Không gian sáng tác tự do
│   └── studio-{name}/
│
├── docs/                    ← Tài liệu hệ thống
│   └── {topic}.md
│
├── templates/               ← Mẫu khởi tạo
│   └── template-{type}/
│
├── package.json             ← Workspace root
├── .npmrc                   ← Registry config
├── .gitignore
├── .editorconfig
└── WORKSPACE.md             ← Tài liệu này
```

---

## Phân loại tác phẩm

### `apps/` — Ứng dụng
Ứng dụng web, mobile, desktop hoàn chỉnh có thể deploy.

```
apps/
├── axq-web-portfolio/       ← Web portfolio AXQ
├── axq-mobile-auth/         ← App xác thực iOS/Android
└── axq-desktop-studio/      ← Desktop design studio
```

### `packages/` — Thư viện
Component, hook, utility có thể publish và tái sử dụng.

```
packages/
├── @axqdesign/ui/           ← Component library
├── @axqdesign/icons/        ← Icon system
└── @axqdesign/hooks/        ← React hooks
```

### `products/` — Sản phẩm
Sản phẩm thương mại độc quyền của AXQ Design.

```
products/
├── axq-product-dashboard/   ← Dashboard SaaS
└── axq-product-cms/         ← Content management
```

### `tools/` — Công cụ
Script, CLI, automation nội bộ.

```
tools/
├── axq-tool-codegen/        ← Tạo code từ token
├── axq-tool-figma-sync/     ← Đồng bộ Figma → code
└── scaffold/                ← Tạo tác phẩm mới
```

### `studio/` — Sáng tác
Không gian tự do — prototype, thí nghiệm, concept mới.

```
studio/
├── studio-motion/           ← Nghiên cứu animation
├── studio-dark-mode/        ← Prototype dark mode
└── studio-3d-ui/            ← Thử nghiệm 3D
```

---

## Quy ước Đặt tên

| Loại | Pattern | Ví dụ |
|---|---|---|
| App | `axq-{platform}-{name}` | `axq-web-portfolio` |
| Package | `@axqdesign/{name}` | `@axqdesign/ui` |
| Product | `axq-product-{name}` | `axq-product-dashboard` |
| Tool | `axq-tool-{name}` | `axq-tool-codegen` |
| Studio | `studio-{name}` | `studio-dark-mode` |
| File | `kebab-case` | `token-config.json` |
| Component | `PascalCase` | `ButtonPrimary` |
| Variable | `camelCase` | `primaryColor` |
| CSS var | `--axq-{layer}-{token}` | `--axq-button-radius` |

---

## Sử dụng Token

Mọi tác phẩm trong workspace phải sử dụng token từ `@axqdesign/tokens`. **Không hardcode giá trị màu sắc, kích thước, hoặc spacing.**

```css
/* ✅ Đúng — dùng token */
.my-button {
  background: var(--axq-button-primary-bg);
  border-radius: var(--axq-button-radius);
  padding: var(--axq-button-padding-y) var(--axq-button-padding-x);
}

/* ❌ Sai — hardcode */
.my-button {
  background: #000000;
  border-radius: 24px;
  padding: 8px 16px;
}
```

```ts
// JavaScript/TypeScript
import { componentTokens } from '@axqdesign/tokens';

const style = {
  background: componentTokens.button['primary-bg'],
  borderRadius: componentTokens.button.radius,
};
```

---

## Kiến trúc Token (3 lớp)

```
┌─────────────────────────────────────────────────┐
│  LAYER 3 · COMPONENT                            │
│  --axq-button-radius, --axq-input-border        │
│  Dùng trực tiếp trong code component            │
├─────────────────────────────────────────────────┤
│  LAYER 2 · SEMANTIC                             │
│  --axq-text-primary, --axq-bg-brand             │
│  Dùng khi component token không phù hợp        │
├─────────────────────────────────────────────────┤
│  LAYER 1 · PRIMITIVE                            │
│  --axq-color-greyscale-900, --axq-space-16      │
│  KHÔNG dùng trực tiếp trong UI                 │
└─────────────────────────────────────────────────┘
```

---

## Màu thương hiệu AXQ

| Tên | Hex | Dùng cho |
|---|---|---|
| **Black** | `#000000` | Primary brand, button, text |
| **Teal** | `#49DBC8` | Accent chính |
| **Green** | `#BEFF6C` | Highlight, success accent |
| **Orange** | `#FC7339` | CTA, warning accent |
| **Pink** | `#FD9FDD` | Soft accent |
| **Purple** | `#AF96FB` | Creative, premium |
| **Yellow** | `#FFF172` | Attention, energy |

---

## Khởi tạo tác phẩm mới

```bash
# Tạo app mới
npm run new:app

# Tạo package/thư viện mới
npm run new:package

# Tạo sản phẩm thương mại
npm run new:product

# Mở không gian studio
npm run new:studio
```

---

## Liên kết

| Tài nguyên | Đường dẫn |
|---|---|
| Token Library | `../Variables-axq/` |
| PNG Assets | `../png/` |
| Icons | `../icons/` |
| Admin Icons | `../admin-icons/` |
| Workspace Config | `.axq/manifest.json` |

---

## Bản quyền

**© 2024 AXQ Design. Tất cả tác phẩm trong workspace này là tài sản độc quyền của AXQ Design.**
Nghiêm cấm sao chép, phân phối hoặc sử dụng thương mại khi không có văn bản cho phép.
Liên hệ: [legal@axqdesign.axq](mailto:legal@axqdesign.axq)
