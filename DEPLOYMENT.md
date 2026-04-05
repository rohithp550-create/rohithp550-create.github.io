# GitHub Pages Deployment Guide

## Prerequisites
- GitHub account (username: rohithp550-create)
- Git installed on your system

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `Expense-Split`
3. Description: "Financial Reality AI - Brutally honest expense tracker with AI-powered insights"
4. Make it **Public** (required for GitHub Pages)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Push Code to GitHub

The repository is already initialized and committed. Now push it:

```bash
# If you haven't already, set your Git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Push to GitHub (you'll be prompted for credentials)
git push -u origin main
```

**Alternative: Use SSH instead of HTTPS**
```bash
# Remove the HTTPS remote
git remote remove origin

# Add SSH remote (if you have SSH keys set up)
git remote add origin git@github.com:rohithp550-create/Expense-Split.git

# Push
git push -u origin main
```

## Step 3: Deploy to GitHub Pages

Once the code is pushed to GitHub, run:

```bash
npm run deploy
```

This command will:
1. Build the production version (`npm run build`)
2. Deploy to GitHub Pages (`gh-pages -d dist`)

## Step 4: Enable GitHub Pages

1. Go to your repository: https://github.com/rohithp550-create/Expense-Split
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select branch: `gh-pages`
5. Click "Save"

## Step 5: Access Your App

After a few minutes, your app will be live at:
**https://rohithp550-create.github.io/Expense-Split/**

## Updating the Deployment

Whenever you make changes:

```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push origin main

# Deploy the updated version
npm run deploy
```

## Troubleshooting

### Authentication Issues
If you get authentication errors:

**Option 1: Use Personal Access Token**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use the token as your password when prompted

**Option 2: Use GitHub CLI**
```bash
# Install GitHub CLI
brew install gh  # macOS
# or download from https://cli.github.com/

# Authenticate
gh auth login

# Push
git push -u origin main
```

### Repository Doesn't Exist
Make sure you've created the repository on GitHub first at:
https://github.com/new

### Build Errors
If deployment fails:
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
npm run deploy
```

## Manual Deployment (Alternative)

If `npm run deploy` doesn't work:

1. Build the project:
```bash
npm run build
```

2. Go to your repository on GitHub
3. Go to Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Upload the contents of the `dist` folder manually

## Configuration Files

The following files are already configured for GitHub Pages:

- **vite.config.js**: Base path set to `/Expense-Split/`
- **package.json**: Homepage and deploy scripts configured
- **GitHub username**: rohithp550-create

## Need Help?

If you encounter issues:
1. Check GitHub repository exists: https://github.com/rohithp550-create/Expense-Split
2. Verify GitHub Pages is enabled in repository settings
3. Check the Actions tab for deployment status
4. Wait 2-3 minutes after deployment for changes to appear

---

**Your app will be available at:**
🚀 https://rohithp550-create.github.io/Expense-Split/