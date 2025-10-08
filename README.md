# Sentinel Snap Web

## About this project

Sentinel Snap Web is the frontend for the FaceLock Defender demo application. It is a Vite + React + TypeScript app using Tailwind CSS and shadcn-ui components. This repository contains the source code for the web UI, plus utility scripts and components used by the app.

This README has been updated to remove references to third-party editor-specific tooling and to provide clear instructions for copying and running the repository locally.

## How to copy this repository

You can copy this repository in several ways depending on your workflow:

- Fork on GitHub: create your own copy under your account, then clone your fork locally.
- Clone directly: clone this repository URL to your machine.
- Download ZIP: download the repository as a ZIP from GitHub and extract it.

Typical steps to clone and run locally:

```powershell
# 1) Clone the repo (replace <REPO_GIT_URL> with this repo's Git URL)
git clone <REPO_GIT_URL>

# 2) Enter the project directory
cd sentinel-snap-web

# 3) Install dependencies
npm install

# 4) Run the development server
npm run dev
```

If you prefer to fork the repository first (recommended for contributing):

1. Visit the repository on GitHub and click "Fork".
2. Clone your forked repo to your machine: `git clone https://github.com/<your-username>/sentinel-snap-web.git`
3. Add the original repo as an upstream remote (optional): `git remote add upstream https://github.com/muzammil67552/facelock_defender.git`

Note: Node.js and npm are required. If you need a version manager, see nvm: https://github.com/nvm-sh/nvm#installing-and-updating

## Editing and contributing

Use your preferred IDE (VS Code, WebStorm, etc.) to edit files locally. Commit and push changes to your fork or a feature branch.

If you want an online editor, you can use GitHub's web editor or Codespaces (if available on your account).

## Technologies used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Running the project

Install dependencies and run the dev server as shown above. Common npm scripts in this project (check `package.json` to confirm):

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally

## Deployment

This is a static frontend application that can be deployed to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.). The basic flow is:

1. Build the app: `npm run build`
2. Deploy the `dist` (or `build`) output directory to your hosting provider

Refer to your hosting provider's docs for specific instructions.
