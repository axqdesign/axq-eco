# push-to-github.ps1
# Chay sau khi: gh auth login --web

$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")

Set-Location "D:\iOS-UI-screens\axq-eco"

Write-Host ""
Write-Host "=== Step 1: Verify GitHub auth ==="
gh auth status
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "ERROR: Not logged in. Run first:"
  Write-Host "  gh auth login --web"
  exit 1
}

Write-Host ""
Write-Host "=== Step 2: git init ==="
git init
git config user.name  "AXQ Design"
git config user.email "studio@axqdesign.axq"
git branch -M main

Write-Host ""
Write-Host "=== Step 3: Create repo on GitHub org ==="
gh repo create axqdesign/axq-eco `
  --private `
  --description "AXQ Design System — Official Ecosystem Workspace" `
  --homepage "https://axqdesign.axq" `
  --source . `
  --remote origin

if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "Repo may already exist — setting remote manually..."
  git remote remove origin 2>$null
  git remote add origin https://github.com/axqdesign/axq-eco.git
}

Write-Host ""
Write-Host "=== Step 4: Commit ==="
git add .
git commit -m "chore: initial workspace — axq-eco v1.0.0

Packages:
- @axqdesign/tokens        v1.0.0  (design tokens, 3-layer)
- @axqdesign/icons         v1.0.0  (5130 outline + 1054 filled SVGs)
- @axqdesign/icons-react   v1.0.0
- @axqdesign/icons-vue     v1.0.0
- @axqdesign/icons-svelte  v1.0.0
- @axqdesign/icons-svelte-runes v1.0.0
- @axqdesign/icons-preact  v1.0.0
- @axqdesign/icons-solidjs v1.0.0
- @axqdesign/icons-astro   v1.0.0
- @axqdesign/icons-angular v1.0.0
- @axqdesign/icons-sprite  v1.0.0
- @axqdesign/icons-webfont v1.0.0
- @axqdesign/core          v1.0.0
- @axqdesign/shared        v0.0.1

Apps:
- axq-preview v1.4.0
- axq-docs    v0.1.0

Tools:
- axq-build-icons, axq-check-vars, axq-generate-tokens
- axq-import-icons, axq-zip

Assets:
- public/logos: AXQ/KPX/SQX/VPX/VRQ brand SVG + favicon sets"

Write-Host ""
Write-Host "=== Step 5: Push ==="
git push -u origin main

if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "SUCCESS! Repo is live at:"
  Write-Host "  https://github.com/axqdesign/axq-eco"
  Write-Host ""
  gh repo view axqdesign/axq-eco --web
} else {
  Write-Host "Push failed. Check remote and auth."
}