@echo off
setlocal

:: ============================================================
:: push-to-github.bat
:: Double-click de push axq-eco len GitHub org axqdesign
:: ============================================================

set "REPO_DIR=D:\iOS-UI-screens\axq-eco"
set "REPO_NAME=axq-eco"
set "ORG=axqdesign"
set "GH_REMOTE=https://github.com/%ORG%/%REPO_NAME%.git"

:: Refresh PATH
set "PATH=%PATH%;%LOCALAPPDATA%\Programs\GitHub CLI;%ProgramFiles%\GitHub CLI"

echo.
echo ============================================================
echo  AXQ Eco -- Push to GitHub
echo  https://github.com/orgs/%ORG%/repositories
echo ============================================================
echo.

:: --- Check gh ---
where gh >nul 2>&1
if errorlevel 1 (
  echo [ERROR] gh CLI not found.
  echo Install: winget install GitHub.cli
  echo Then re-run this script.
  pause
  exit /b 1
)

:: --- Auth ---
echo [1/6] Checking GitHub auth...
gh auth status >nul 2>&1
if errorlevel 1 (
  echo Not logged in. Opening browser login...
  echo.
  gh auth login --web --git-protocol https
  if errorlevel 1 (
    echo [ERROR] Login failed.
    pause
    exit /b 1
  )
)
echo      OK -- logged in.

:: --- cd to repo ---
echo.
echo [2/6] Setting up git in %REPO_DIR%...
cd /d "%REPO_DIR%"

if exist ".git" (
  echo      .git already exists -- skipping init.
) else (
  git init
  git config user.name  "AXQ Design"
  git config user.email "studio@axqdesign.axq"
  git branch -M main
  echo      git init done.
)

:: --- Create repo on GitHub ---
echo.
echo [3/6] Creating repo %ORG%/%REPO_NAME% on GitHub...
gh repo create %ORG%/%REPO_NAME% ^
  --private ^
  --description "AXQ Design System -- Official Ecosystem Workspace" ^
  --homepage "https://axqdesign.axq" ^
  --source . ^
  --remote origin 2>&1

if errorlevel 1 (
  echo      Repo may already exist -- setting remote manually.
  git remote remove origin 2>nul
  git remote add origin %GH_REMOTE%
  echo      Remote set to: %GH_REMOTE%
)

:: --- Stage & commit ---
echo.
echo [4/6] Staging all files...
git add .

echo.
echo [5/6] Committing...
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "chore: initial workspace -- axq-eco v1.0.0^
^
Packages: tokens, icons (5130+1054 SVG), icons-react, icons-vue,^
icons-svelte, icons-svelte-runes, icons-preact, icons-solidjs,^
icons-astro, icons-angular, icons-sprite, icons-webfont,^
core, shared^
^
Apps: axq-preview v1.4.0, axq-docs v0.1.0^
Tools: axq-build-icons, axq-check-vars, axq-generate-tokens,^
       axq-import-icons, axq-zip^
Assets: AXQ/KPX/SQX/VPX/VRQ brand logos + favicon sets"
  echo      Commit done.
) else (
  echo      Nothing to commit -- working tree clean.
)

:: --- Push ---
echo.
echo [6/6] Pushing to origin/main...
git push -u origin main

if errorlevel 1 (
  echo.
  echo [ERROR] Push failed.
  echo Check: git remote -v
  echo        git status
  pause
  exit /b 1
)

:: --- Done ---
echo.
echo ============================================================
echo  SUCCESS!
echo  https://github.com/%ORG%/%REPO_NAME%
echo ============================================================
echo.

:: Open in browser
gh repo view %ORG%/%REPO_NAME% --web

pause