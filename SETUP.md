# AXQ Ecosystem — Setup Guide

> Chạy các lệnh này sau khi cài Node.js + pnpm + GitHub CLI.

---

## 1. Cài prerequisites

```powershell
# Node.js 22 LTS
winget install OpenJS.NodeJS.LTS

# pnpm
npm install -g pnpm

# GitHub CLI
winget install GitHub.cli
```

---

## 2. Xác thực GitHub

```bash
gh auth login
# Chon: GitHub.com > HTTPS > Login with browser
```

---

## 3. Tạo repo trên GitHub org

```bash
gh repo create axqdesign/axq-eco \
  --private \
  --description "AXQ Ecosystem — Official Design Workspace" \
  --homepage "https://axqdesign.axq"
```

---

## 4. Push lên GitHub

```bash
cd D:\iOS-UI-screens\axq-eco
git remote add origin https://github.com/axqdesign/axq-eco.git
git push -u origin main
```

---

## 5. Cài dependencies

```bash
cd D:\iOS-UI-screens\axq-eco
pnpm install
```

---

## 6. Build packages (theo thứ tự)

```bash
# 6a. Build icon SVG index (tao icons.json, categories/)
pnpm --filter @axqdesign/icons build

# 6b. Build CSS/JS core framework
pnpm --filter @axqdesign/core build

# 6c. Build tat ca framework icon packages
pnpm --filter "@axqdesign/icons-*" build

# 6d. Build tokens
pnpm --filter @axqdesign/tokens build
```

---

## 7. Chay tests

```bash
pnpm --filter @axqdesign/icons-react test
pnpm --filter @axqdesign/icons-preact test
pnpm --filter @axqdesign/icons-vue test
# ... etc
```

---

## 8. Publish len npm (private registry)

Them `.npmrc` voi token:
```ini
@axqdesign:registry=https://axqdesign.axq/npm
//axqdesign.axq/npm/:_authToken=${NPM_TOKEN}
```

```bash
# Publish tung package
pnpm --filter @axqdesign/icons publish --tag latest --no-git-checks
pnpm --filter @axqdesign/icons-react publish --tag latest --no-git-checks
# ... etc

# Hoac publish tat ca
pnpm -r publish --tag latest --no-git-checks
```

---

## 9. Tao GitHub Releases (tung brand)

```bash
# AXQ Ecosystem release
gh release create v1.0.0 \
  --title "AXQ Ecosystem v1.0.0" \
  --notes "Initial release — 5130 outline + 1054 filled icons, 12 framework packages" \
  --repo axqdesign/axq-eco
```

---

## Cau truc workspace

```
axq-eco/
├── .build/              # Admin pipeline (build-css, check-css-vars...)
├── packages/
│   ├── .build/          # Icons pipeline (build-icons, helpers, rollup...)
│   └── @axqdesign/
│       ├── icons/       # 5130 outline + 1054 filled SVGs
│       ├── icons-react/
│       ├── icons-vue/
│       ├── icons-svelte/
│       ├── icons-svelte-runes/
│       ├── icons-preact/
│       ├── icons-solidjs/
│       ├── icons-astro/
│       ├── icons-angular/
│       ├── icons-sprite/
│       ├── icons-webfont/
│       ├── core/        # SCSS/JS admin framework
│       ├── shared/      # Shared Astro components
│       └── tokens/      # Design tokens (3-layer)
├── apps/
│   ├── axq-preview/     # Astro preview app
│   └── axq-docs/        # Docs app
├── tools/@axqdesign/
│   ├── axq-build-icons/
│   ├── axq-check-vars/
│   ├── axq-generate-tokens/
│   ├── axq-import-icons/
│   └── axq-zip/
└── public/logos/        # Brand logos + favicons (AXQ/KPX/SQX/VPX/VRQ)
```

---

(C) 2024 AXQ Design. All rights reserved.