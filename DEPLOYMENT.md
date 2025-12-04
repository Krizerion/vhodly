# Deployment Guide - GitHub Pages

This guide explains how to deploy the Angular application to GitHub Pages for free.

## Prerequisites

1. A GitHub account
2. The project pushed to a GitHub repository

## Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages whenever you push to the `main` branch.

### Setup Steps:

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/vhod-nadejda.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

3. **The workflow will automatically:**
   - Build your Angular app when you push to `main`
   - Deploy it to GitHub Pages
   - Your site will be available at: `https://YOUR_USERNAME.github.io/vhod-nadejda/`

## Manual Deployment

If you prefer to deploy manually:

1. **Build the app for GitHub Pages:**
   ```bash
   cd vhod-nadejda-app
   npm run build:gh-pages
   ```

2. **Install gh-pages package (one-time):**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json:**
   ```json
   "deploy": "gh-pages -d dist/vhod-nadejda-app/browser"
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

## Important Notes

- **Repository Name:** If your repository has a different name than `vhod-nadejda`, you need to update the `base-href` in:
  - `.github/workflows/deploy.yml` (line with `--base-href`)
  - `package.json` script `build:gh-pages`
  - The base href should be: `"/YOUR_REPO_NAME/"`

- **Custom Domain:** If you want to use a custom domain, you can configure it in GitHub Pages settings, and then change the base-href to `"/"` in the workflow file.

## Troubleshooting

- **404 Errors:** Make sure the base-href matches your repository name exactly
- **Build Fails:** Check that all dependencies are installed (`npm ci`)
- **Assets Not Loading:** Verify the `base` tag in `index.html` matches your base-href

## Alternative Free Hosting Options

If you prefer other free hosting:

1. **Netlify:**
   - Connect your GitHub repo
   - Build command: `cd vhod-nadejda-app && npm ci && npm run build`
   - Publish directory: `vhod-nadejda-app/dist/vhod-nadejda-app/browser`
   - Base directory: `vhod-nadejda-app`

2. **Vercel:**
   - Connect your GitHub repo
   - Framework preset: Angular
   - Root directory: `vhod-nadejda-app`

3. **Firebase Hosting:**
   - Install Firebase CLI: `npm install -g firebase-tools`
   - Initialize: `firebase init hosting`
   - Build and deploy: `npm run build && firebase deploy`

