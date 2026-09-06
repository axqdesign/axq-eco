# `@axqdesign/axq-import-icons`

CLI tool that imports raw SVG files into the `@axqdesign/icons` source tree.  
Two independent scripts cover the two halves of the import pipeline:

| Script | Purpose |
|--------|---------|
| `import-svg.ts` | Raw SVG → SVGO-optimised, AXQ-template'd source file |
| `import-data.ts` | Published `icons.json` → shared `data/icons.json` + `icons-info.json` |

---

## Requirements

- Node.js ≥ 22
- `tsx` (dev dependency — available after `pnpm install`)

---

## Usage

### `import-svg` — import raw SVG files

Place new icons in a staging directory (default `new/`) mirroring the
`outline/` / `filled/` sub-structure, then run:

```sh
# Import both outline and filled (default)
tsx src/import-svg.ts

# Import from a custom staging dir, targeting a custom icons dir
tsx src/import-svg.ts --dir=staging --icons=packages/@axqdesign/icons/icons

# Import only outline icons
tsx src/import-svg.ts --type=outline
```

**Options**

| Flag | Default | Description |
|------|---------|-------------|
| `--dir=<path>` | `new` | Staging directory containing `outline/` and `filled/` sub-folders |
| `--icons=<path>` | `icons` | Destination icons directory |
| `--type=outline\|filled` | both | Restrict to one icon type |

**What it does per file**

1. Rejects files with `transform=` (geometry not baked in) or whitespace in filename.  
2. Runs [SVGO](https://github.com/svg/svgo) with `preset-default` (preserves `viewBox` and `xmlns`).  
3. Strips the bounding-box sentinel path (`M0 0h24v24H0z`).  
4. Preserves existing YAML frontmatter from the destination file if it already exists.  
5. Writes the file using the canonical AXQ SVG template (outline or filled).

---

### `import-data` — sync icons.json

Run after `@axqdesign/icons` has been published (or linked) to `node_modules`:

```sh
tsx src/import-data.ts

# Custom package and output directory
tsx src/import-data.ts --package=@axqdesign/icons --out=packages/@axqdesign/shared/data
```

**Options**

| Flag | Default | Description |
|------|---------|-------------|
| `--package=<name>` | `@axqdesign/icons` | npm package to read icons from |
| `--out=<path>` | `shared/data` | Output directory for generated JSON files |

**Outputs**

| File | Contents |
|------|---------|
| `icons.json` | Full icon map — name, category, tags, compressed SVG strings |
| `icons-info.json` | Metadata — version, total count, source package name |

---

## Via pnpm scripts

```sh
pnpm --filter @axqdesign/axq-import-icons run:svg   # import-svg.ts
pnpm --filter @axqdesign/axq-import-icons run:data  # import-data.ts
```

---

## SVG frontmatter

Frontmatter is encoded as a YAML comment at the top of each SVG file:

```xml
<!--
  category: arrows
  tags: [right, next, forward]
  version: "1.0.0"
  unicode: "ea01"
-->
<svg ...>
```

- `category` is written only for `outline` icons.
- All fields are optional; `import-svg` preserves existing frontmatter on update.

---

## License

SEE LICENSE IN [LICENSE](../../../../LICENSE)  
© 2024 AXQ Design · <https://axqdesign.axq>
