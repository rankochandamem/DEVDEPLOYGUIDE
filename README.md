# DevDeploy Guide

DevDeploy Guide is a beginner-focused React + Vite learning website for Git, GitHub, deployment, and web development workflows. The project presents interactive tutorial pages for installing Git on Windows, connecting a project to GitHub, deploying to Render, and exploring related developer resources.

## Project purpose

This repository implements a documentation and tutorial experience with:

- a learning path for Git installation, GitHub connection, and deployment
- reusable tutorial data stored in the source data model
- command examples, explanations, and sample terminal output
- responsive UI styling for desktop, tablet, and mobile layouts
- GitHub-render deployment concepts for a front-end or static web project

## Tech stack

- Vite 8
- React 19
- React Router
- CSS styling and reusable UI blocks
- Oxlint for project linting

## Workspace structure

```text
src/
  components/
  data/
  pages/
  services/
public/
```

The most important files are:

- `src/data/tutorials.js` contains the tutorial catalog and detailed tutorial data, including command explanations and sample terminal output.
- `src/pages/TutorialDetailPage.jsx` renders tutorial sections, command blocks, explanations, sample output, and related content.
- `src/components/ui/CodeBlock.jsx` shows command and output blocks with copy support.
- `package.json` describes the project scripts and dependencies.

## Local development

Install dependencies:

```sh
npm install
```

Start the Vite development server:

```sh
npm run dev
```

The app usually runs at the local Vite address shown in the terminal.

## Production build

Create a production build:

```sh
npm run build
```

Preview the production output locally:

```sh
npm run preview
```

## Linting

The project uses Oxlint:

```sh
npm run lint
```

## Tutorial data model

The learning content is defined in the `tutorialData` array inside `src/data/tutorials.js`. Each tutorial has:

- `id`, `slug`, and `title`
- `category` and `categoryId`
- `difficulty`, `estimatedTime`, `lessons`
- `description`, `prerequisites`, and `sections`
- `tips`, `warnings`, and `troubleshooting`

The Git installation tutorial has been expanded with command examples and sample outputs to model a beginner command guide.

## Common development commands

```sh
npm install
npm run dev
npm run build
npm run lint
```

## Deployment and GitHub workflow

The tutorials support a simple learning flow:

1. Install Git on Windows
2. Connect your code to GitHub
3. Deploy the GitHub repository to Render

A typical GitHub workflow shown in the site is:

```sh
git init
git status
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/my-project.git
git push -u origin main
```

## Notes

This project is a guided educational UI rather than a production deployment template. Commands and output samples are documentation examples and may vary depending on Git version, OS, and repository state.
