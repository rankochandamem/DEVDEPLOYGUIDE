const errorCatalog = [
  {
    id: 'npm-enoent',
    pattern: 'ENOENT',
    title: 'npm ERR! code ENOENT',
    summary: 'A file, folder, or dependency path required by npm is missing.',
    whatHappened: 'Node could not find a file or dependency path that the project expected to exist.',
    why: 'This often happens when the package is not installed, the script path is wrong, or the working directory is incorrect.',
    causes: ['Missing node_modules', 'Wrong folder selected in the terminal', 'Invalid package script path'],
    fixes: ['Run npm install', 'Verify your current directory', 'Check the package.json scripts section'],
    checks: ['Run pwd or Get-Location and confirm the project folder', 'Check that package.json exists', 'Inspect the full npm command for a misspelled path'],
    prevention: 'Run project commands from the folder that contains package.json and keep dependencies installed before starting development.',
    relatedTutorials: ['Install Git', 'Deploy GitHub to Render'],
    commands: ['npm install', 'ls', 'pwd'],
    difficulty: 'Beginner',
  },
  {
    id: 'git-push-rejected',
    pattern: 'rejected',
    title: 'Git push rejected',
    summary: 'The remote branch has changes or rules that prevent this push.',
    whatHappened: 'The remote repository rejected the push because the branch was behind or the remote settings do not match the local state.',
    why: 'Git needs a clean merge path before remote updates can be accepted.',
    causes: ['Local branch is not synced with origin', 'Protected branch rules', 'Merge conflict or incorrect remote'],
    fixes: ['git pull --rebase origin main', 'Resolve merge conflicts', 'Check GitHub branch protections'],
    checks: ['Run git status to inspect the current branch', 'Run git remote -v to verify the destination', 'Read the complete rejection message for branch rules'],
    prevention: 'Pull and review remote changes before pushing, especially when working with a shared main branch.',
    relatedTutorials: ['Connect Your Code to GitHub'],
    commands: ['git pull --rebase origin main', 'git push origin main'],
    difficulty: 'Intermediate',
  },
  {
    id: 'render-build-failed',
    pattern: 'build failed',
    title: 'Render build failed',
    summary: 'Render could not finish installing or building the deployed application.',
    whatHappened: 'Render could not complete the install or build stage for your project.',
    why: 'The runtime, build commands, or dependencies were not matching the project configuration.',
    causes: ['Missing dependency file', 'Build script issue', 'Wrong runtime or branch'],
    fixes: ['Check Render build logs', 'Verify package.json and start scripts', 'Confirm environment variables'],
    checks: ['Confirm the configured root directory', 'Run the build command locally', 'Compare Node and package manager versions with Render'],
    prevention: 'Keep the deployment command documented, test production builds locally, and configure required environment variables in Render.',
    relatedTutorials: ['Deploy GitHub to Render'],
    commands: ['npm install', 'npm run build', 'npm start'],
    difficulty: 'Intermediate',
  },
]

const STORAGE_KEY = 'devdeploy-error-history-v1'

export function explainError(errorMessage) {
  const text = String(errorMessage || '').toLowerCase()
  const match = errorCatalog.find((item) => text.includes(item.pattern.toLowerCase()))

  if (!match) {
    return {
      title: 'Unrecognized error',
      summary: 'The analyzer needs more context before it can identify this error.',
      whatHappened: 'The exact message is not in the local database yet.',
      why: 'This usually means the project dependency or tool version is different from the expected setup.',
      causes: ['Unknown command or environment mismatch', 'Tooling version mismatch', 'Project setup issue'],
      fixes: ['Check the exact command output', 'Review project config', 'Compare with the tutorial steps'],
      checks: ['Copy the complete error including the command above it', 'Note which folder and environment produced it', 'Check the tool version shown in the terminal'],
      prevention: 'Keep the full error output and the command that produced it together when troubleshooting.',
      relatedTutorials: ['Troubleshooting', 'Deploy GitHub to Render'],
      commands: ['npm install', 'npm run build', 'git status'],
      difficulty: 'Intermediate',
    }
  }

  return match
}

export function getErrorHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    console.warn('Error history unavailable', error)
    return []
  }
}

export function saveErrorHistory(entry) {
  try {
    const history = getErrorHistory()
    history.push({
      ...entry,
      date: new Date().toISOString(),
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    return history
  } catch (error) {
    console.warn('Unable to save error history', error)
    return []
  }
}
