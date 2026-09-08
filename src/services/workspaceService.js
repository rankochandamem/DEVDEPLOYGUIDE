const STORAGE_KEY = 'devdeploy-workspace-v1'

const defaultProject = {
  id: 'git-practice',
  name: 'My GitHub Practice',
  type: 'Git + GitHub',
  difficulty: 'Beginner',
  technology: 'Git + GitHub',
  description: 'Practice repository setup, commit flow, and deployment checks.',
  progress: 80,
  tasks: [
    { id: 'install-git', label: 'Install Git', done: true },
    { id: 'create-repo', label: 'Create repository', done: true },
    { id: 'init-git', label: 'Initialize Git', done: true },
    { id: 'commit-files', label: 'Commit files', done: true },
    { id: 'push-github', label: 'Push to GitHub', done: false },
  ],
  files: [
    { name: 'README.md', purpose: 'Project overview and setup notes' },
    { name: '.gitignore', purpose: 'Ignore secrets and local build artifacts' },
    { name: 'package.json', purpose: 'Project dependencies and scripts' },
  ],
  notes: 'Remember to add .gitignore before committing secrets or build output.',
  commands: ['git init', 'git status', 'git add .', 'git commit -m "Initial commit"'],
  resources: ['Git docs', 'GitHub repository guide', 'Render deployment checklist'],
}

function defaultState() {
  return {
    projects: [defaultProject],
    activeProjectId: defaultProject.id,
  }
}

export function readWorkspace() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw)
    return {
      projects: parsed.projects?.length ? parsed.projects : defaultState().projects,
      activeProjectId: parsed.activeProjectId || defaultState().projects[0].id,
    }
  } catch (error) {
    console.warn('Workspace unavailable', error)
    return defaultState()
  }
}

export function writeWorkspace(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('Unable to save workspace', error)
  }
}

export function getProjects() {
  return readWorkspace().projects || []
}

export function getActiveProject() {
  const state = readWorkspace()
  return state.projects.find((project) => project.id === state.activeProjectId) || state.projects[0]
}

export function setActiveProject(projectId) {
  const state = readWorkspace()
  state.activeProjectId = projectId
  writeWorkspace(state)
  return getActiveProject()
}

export function createProject(projectDraft) {
  const state = readWorkspace()
  const newProject = {
    id: `${Date.now()}`,
    name: projectDraft.name,
    type: projectDraft.type,
    difficulty: projectDraft.difficulty,
    technology: projectDraft.technology,
    description: projectDraft.description,
    progress: 0,
    tasks: [
      { id: 'task-1', label: 'Initialize project', done: false },
      { id: 'task-2', label: 'Add project structure', done: false },
      { id: 'task-3', label: 'Create README', done: false },
      { id: 'task-4', label: 'Push or deploy', done: false },
    ],
    files: [
      { name: 'README.md', purpose: 'Project overview' },
      { name: '.gitignore', purpose: 'Ignore generated files and secrets' },
      { name: 'package.json', purpose: 'Dependencies and scripts' },
    ],
    notes: '',
    commands: ['git init', 'git status', 'git add .'],
    resources: ['Official docs', 'Related tutorials'],
  }

  state.projects = [...state.projects, newProject]
  state.activeProjectId = newProject.id
  writeWorkspace(state)
  return newProject
}

export function toggleTaskByProject(projectId, taskId) {
  const state = readWorkspace()
  const project = state.projects.find((item) => item.id === projectId)
  if (!project) return null

  project.tasks = project.tasks.map((task) =>
    task.id === taskId ? { ...task, done: !task.done } : task,
  )

  const doneCount = project.tasks.filter((task) => task.done).length
  project.progress = Math.round((doneCount / project.tasks.length) * 100)

  writeWorkspace(state)
  return project
}

export function updateProject(projectId, updates) {
  const state = readWorkspace()
  const project = state.projects.find((item) => item.id === projectId)
  if (!project) return null

  Object.assign(project, updates)
  writeWorkspace(state)
  return project
}
