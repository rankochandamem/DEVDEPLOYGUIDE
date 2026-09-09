# DevDeploy Guide

DevDeploy Guide is a beginner-focused React + Vite tutorial site for teaching Git installation, GitHub workflows, and deployment to Render.

## Project purpose

This repository presents a guided learning experience that covers:

- installing Git on Windows
- connecting a local codebase to GitHub
- deploying a GitHub repository to Render
- exploring related tutorials, resources, and troubleshooting material

## Tech stack

- Vite 8
- React 19
- React Router
- CSS styling and reusable UI blocks
- Oxlint for linting

## Workspace structure

```text
src/
  components/
  data/
  pages/
  services/
public/
```

The main project files are:

- `src/data/tutorials.js` stores tutorial content and structured metadata.
- `src/pages/TutorialDetailPage.jsx` renders the tutorial detail page.
- `src/components/ui/CodeBlock.jsx` renders command and output blocks.
- `package.json` defines package scripts and dependencies.

## Local development

Install dependencies:

```sh
npm install
```

Start the Vite development server:

```sh
npm run dev
```

Create a production build:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

Run the project linter:

```sh
npm run lint
```

## Learning workflow

The intended flow for the project is:

1. Install Git on Windows.
2. Connect your project code to GitHub.
3. Connect the GitHub repository to Render and deploy the app.

A representative Git and GitHub workflow is:

```sh
git init
git status
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/my-project.git
git push -u origin main
```

## Troubleshooting

If a push is rejected because the local branch is behind the remote branch, run:

```sh
git fetch origin
git switch main
git pull --rebase origin main
git push origin main
```

This fetches the latest remote branch information, rebases your current work onto the latest remote history, and pushes the corrected branch back to GitHub.

If the rebase encounters conflicts:

```sh
git add <resolved-file>
git rebase --continue
```

To cancel the rebase:

```sh
git rebase --abort
```

## Notes

The project is a beginner-friendly educational UI rather than a production deployment template. Command examples and terminal output are teaching examples and may vary by platform, shell, and Git version.
