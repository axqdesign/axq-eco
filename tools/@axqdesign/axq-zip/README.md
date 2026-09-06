# `@axqdesign/axq-zip`

Release packager for AXQ Design System packages.

Bundles one or more directories into a versioned ZIP archive, automatically
resolving the version from `package.json`. Strips OS junk files (`.DS_Store`,
`Thumbs.db`, `desktop.ini`) and appends a `documentation.url` shortcut at the
ZIP root.

---

## Requirements

- Node.js ≥ 22
- `tsx` (dev dependency — available after `pnpm install`)

---

## Usage

```sh
# Pack dist/ with defaults
tsx src/zip.ts

# Specify all options explicitly
tsx src/zip.ts \
  --dist=dist \
  --out=releases \
  --name=axqdesign-icons \
  --pkg=packages/@axqdesign/icons/package.json \
  --docs-url=https://axqdesign.axq/docs/icons

# Pack multiple folders into one ZIP
tsx src/zip.ts \
  --dist=dist \
  --folder=icons/outline:svg \
  --folder=icons/filled:svg-filled

# Combine dist + extras
tsx src/zip.ts \
  --dist=packages/@axqdesign/icons-react/dist \
  --folder=packages/@axqdesign/icons/icons/outline:svg \
  --folder=packages/@axqdesign/icons/icons/filled:svg-filled \
  --name=axqdesign-icons-react \
  --pkg=packages/@axqdesign/icons-react/package.json
```

**Options**

| Flag | Default | Description |
|------|---------|-------------|
| `--dist=<path>` | `dist` | Primary source directory (packed under `<name>/` in the ZIP) |
| `--out=<path>` | `releases` | Output directory for the ZIP file |
| `--name=<str>` | `axqdesign` | ZIP filename prefix and root directory name inside the archive |
| `--pkg=<path>` | auto-discover | Path to `package.json` to read version from |
| `--docs-url=<url>` | `https://axqdesign.axq/docs` | URL written into `documentation.url` shortcut |
| `--folder=<src>:<dest>` | — | Extra folder to include; can be repeated |

---

## Via pnpm scripts

```sh
pnpm --filter @axqdesign/axq-zip run   # pack with defaults
```

---

## Output

The ZIP is written to `<out>/<name>-<version>.zip`.

**Structure inside the archive:**

```
axqdesign-icons-1.2.0.zip
├── axqdesign/          ← contents of --dist
│   ├── index.js
│   └── ...
├── svg/                ← contents of --folder=icons/outline:svg
├── svg-filled/         ← contents of --folder=icons/filled:svg-filled
└── documentation.url
```

---

## Version resolution

If `--pkg` is not supplied, the tool walks upward from its own directory until
it finds a `package.json` with a `version` field (up to 6 levels). This makes
it work when invoked from anywhere inside the workspace without configuration.

---

## Junk filter

The following files are excluded from the archive regardless of where they appear:

- `.DS_Store`
- `Thumbs.db`
- `desktop.ini`
- `.gitkeep`

---

## License

SEE LICENSE IN [LICENSE](../../../../LICENSE)  
© 2024 AXQ Design · <https://axqdesign.axq>
