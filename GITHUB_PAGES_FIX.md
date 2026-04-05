# GitHub Pages Deployment Fix

## Current Issue
GitHub Pages is trying to serve source files (main.jsx) instead of built files, causing MIME type errors.

## Root Cause
The repository's GitHub Pages is configured to serve from the `main` branch root, but it should serve from the `gh-pages` branch which contains the built files.

## Solution: Configure GitHub Pages Correctly

### Step 1: Verify gh-pages Branch Exists
Run this command to check:
```bash
git ls-remote --heads origin gh-pages
```

If it doesn't exist, the `npm run deploy` command should have created it. If it failed, you may need to authenticate with GitHub first.

### Step 2: Configure GitHub Pages Settings

1. Go to your repository: **https://github.com/rohithp550-create/Expense-Split**

2. Click **Settings** tab

3. In the left sidebar, click **Pages**

4. Under **"Build and deployment"**:
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `gh-pages` (NOT main)
   - **Folder**: Select `/ (root)`

5. Click **Save**

6. Wait 2-3 minutes for GitHub Pages to rebuild

### Step 3: Verify Deployment

Visit: **https://rohithp550-create.github.io/Expense-Split/**

The app should now load correctly with the built JavaScript files.

## Alternative: Manual Deployment

If the gh-pages branch doesn't exist or deployment keeps failing:

### Option A: Use GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Commit and push:
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment"
git push origin main
```

3. Go to repository Settings → Pages
4. Source: Select "GitHub Actions"

### Option B: Manual gh-pages Branch

```bash
# Build the project
npm run build

# Create and switch to gh-pages branch
git checkout --orphan gh-pages

# Remove all files from staging
git rm -rf .

# Copy dist contents to root
cp -r dist/* .
cp dist/.nojekyll .

# Add and commit
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push origin gh-pages

# Switch back to main
git checkout main
```

Then configure GitHub Pages to use the gh-pages branch.

## Troubleshooting

### Issue: "Published" but site shows 404
- Wait 2-3 minutes for GitHub Pages to update
- Check GitHub Pages settings are correct
- Verify gh-pages branch exists: `git ls-remote --heads origin`

### Issue: MIME type errors
- Ensure GitHub Pages is serving from `gh-pages` branch, not `main`
- Verify `.nojekyll` file exists in gh-pages branch
- Clear browser cache and try again

### Issue: Assets not loading (404 on CSS/JS)
- Check `base` in `vite.config.js` matches repository name
- Should be: `base: '/Expense-Split/'`
- Rebuild and redeploy if changed

### Issue: gh-pages deployment fails
- Ensure you're authenticated with GitHub
- Try using GitHub CLI: `gh auth login`
- Or use Personal Access Token for HTTPS

## Quick Check Commands

```bash
# Check if gh-pages branch exists remotely
git ls-remote --heads origin gh-pages

# Check current GitHub Pages configuration
# (Visit in browser)
https://github.com/rohithp550-create/Expense-Split/settings/pages

# Redeploy
npm run deploy

# Check deployment status
git log origin/gh-pages --oneline -5
```

## Expected Result

After correct configuration:
- ✅ Site loads at: https://rohithp550-create.github.io/Expense-Split/
- ✅ No MIME type errors
- ✅ All assets load correctly
- ✅ App functions properly

## Current Configuration

- Repository: rohithp550-create/Expense-Split
- Base path: /Expense-Split/
- Build output: dist/
- Deploy branch: gh-pages (should be)
- Current issue: Serving from main instead of gh-pages

---

**Next Step**: Go to GitHub Pages settings and change the source branch from `main` to `gh-pages`.