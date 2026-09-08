import { useMemo, useState } from 'react'
import { getChallenges } from '../services/challengeService'
import { getMissions } from '../services/missionService'
import { getProjects, createProject, setActiveProject, toggleTaskByProject, getActiveProject } from '../services/workspaceService'
import { getUserProgress } from '../services/xpService'

const initialForm = {
  name: '',
  type: 'Git + GitHub',
  difficulty: 'Beginner',
  technology: 'Git + GitHub',
  description: '',
}

export default function WorkspacePage() {
  const [projects, setProjects] = useState(getProjects)
  const [activeProjectId, setActiveProjectId] = useState(() => getActiveProject()?.id)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLines, setTerminalLines] = useState([
    'user@devdeploy:~/project$ git status',
    'On branch main',
    'nothing to commit',
    'user@devdeploy:~/project$ ',
  ])

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) || projects[0],
    [projects, activeProjectId],
  )

  const goals = getMissions()
  const challengeList = getChallenges()
  const xpState = getUserProgress()

  const handleProjectCreate = (event) => {
    event.preventDefault()
    if (!form.name.trim()) return

    const project = createProject(form)
    setProjects(getProjects())
    setActiveProjectId(project.id)
    setForm(initialForm)
    setShowForm(false)
  }

  const handleToggleTask = (taskId) => {
    const updated = toggleTaskByProject(activeProject.id, taskId)
    if (!updated) return
    setProjects(getProjects())
    setActiveProjectId(updated.id)
  }

  const handleSetActiveProject = (projectId) => {
    setActiveProject(projectId)
    setActiveProjectId(projectId)
    setProjects(getProjects())
  }

  const handleTerminalSubmit = (event) => {
    event.preventDefault()
    const normalized = terminalInput.trim()
    const safeCommands = ['git init', 'git status', 'git add .', 'git commit', 'git log', 'git branch', 'git checkout', 'git remote', 'git push', 'git pull']

    if (!normalized) return

    const output = safeCommands.includes(normalized)
      ? [
          `user@devdeploy:~/project$ ${normalized}`,
          normalized === 'git status' ? 'On branch main\nnothing to commit' : normalized === 'git init' ? 'Initialized empty Git repository' : normalized === 'git add .' ? 'Files staged for commit' : normalized === 'git commit' ? 'Created commit with message' : normalized === 'git log' ? 'commit 0a1b2c3' : normalized === 'git branch' ? '* main' : normalized === 'git checkout' ? 'Switched to a new branch' : normalized === 'git remote' ? 'origin https://github.com/your-repo.git' : normalized === 'git push' ? 'Everything up-to-date' : normalized === 'git pull' ? 'Already up to date' : 'Command executed successfully',
        ]
      : [
          `user@devdeploy:~/project$ ${normalized}`,
          'This command is simulated only. No dangerous operations are executed.',
        ]

    setTerminalLines((current) => [...current, ...output, 'user@devdeploy:~/project$ '])
    setTerminalInput('')
  }

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h2>DevDeploy Workspace</h2>
          <button type="button" className="primary-btn" onClick={() => setShowForm((value) => !value)}>
            + New Practice Project
          </button>
        </div>

        {showForm && (
          <form className="panel workspace-form" onSubmit={handleProjectCreate}>
            <div className="field-grid">
              <div>
                <label>Project Name</label>
                <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="My GitHub Practice" />
              </div>
              <div>
                <label>Project Type</label>
                <input value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} />
              </div>
              <div>
                <label>Difficulty</label>
                <select value={form.difficulty} onChange={(event) => setForm({ ...form, difficulty: event.target.value })}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label>Technology</label>
                <input value={form.technology} onChange={(event) => setForm({ ...form, technology: event.target.value })} />
              </div>
            </div>
            <div>
              <label>Description</label>
              <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Describe the practice project" />
            </div>
            <div className="notes-actions">
              <button type="submit" className="primary-btn">Create Project</button>
            </div>
          </form>
        )}
      </section>

      <section className="workspace-layout">
        <aside className="panel workspace-sidebar">
          <h3>My Projects</h3>
          <div className="project-list">
            {projects.map((project) => (
              <button key={project.id} type="button" className={`project-item ${activeProject?.id === project.id ? 'active' : ''}`} onClick={() => handleSetActiveProject(project.id)}>
                <strong>{project.name}</strong>
                <small>{project.technology}</small>
              </button>
            ))}
          </div>
        </aside>

        <div className="workspace-main">
          {activeProject && (
            <>
              <section className="panel workspace-header-panel">
                <div className="workspace-heading">
                  <div>
                    <p className="tiny-label">Current Project</p>
                    <h2>{activeProject.name}</h2>
                  </div>
                  <div className="project-health">
                    <span>Project Health</span>
                    <strong>{activeProject.progress}%</strong>
                  </div>
                </div>

                <div className="progress-bar">
                  <span style={{ width: `${activeProject.progress}%` }} />
                </div>

                <div className="detail-meta">
                  <span>{activeProject.type}</span>
                  <span>{activeProject.difficulty}</span>
                  <span>{activeProject.technology}</span>
                </div>
              </section>

              <section className="workspace-grid">
                <div className="panel">
                  <h3>Tasks</h3>
                  <ul className="task-list">
                    {activeProject.tasks.map((task) => (
                      <li key={task.id}>
                        <label>
                          <input type="checkbox" checked={task.done} onChange={() => handleToggleTask(task.id)} />
                          <span>{task.label}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="panel">
                  <h3>Files</h3>
                  <ul className="file-list">
                    {activeProject.files.map((file) => (
                      <li key={file.name}>
                        <strong>{file.name}</strong>
                        <p>{file.purpose}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="panel">
                  <h3>Commands</h3>
                  <ul className="tag-list">
                    {activeProject.commands.map((command) => <li key={command}>{command}</li>)}
                  </ul>
                </div>

                <div className="panel">
                  <h3>Notes</h3>
                  <p>{activeProject.notes || 'No notes yet. Add some project reminders here.'}</p>
                </div>
              </section>

              <section className="panel terminal-panel">
                <h3>Terminal</h3>
                <div className="terminal-window">
                  <div className="terminal-output">
                    {terminalLines.map((line, index) => (
                      <div key={`${line}-${index}`}>{line}</div>
                    ))}
                  </div>
                  <form onSubmit={handleTerminalSubmit} className="terminal-form">
                    <input
                      value={terminalInput}
                      onChange={(event) => setTerminalInput(event.target.value)}
                      placeholder="Type a simulated command"
                    />
                    <button type="submit" className="primary-btn">Run</button>
                  </form>
                </div>
              </section>

              <section className="workspace-grid">
                <div className="panel">
                  <h3>Missions</h3>
                  {goals.map((mission) => (
                    <div key={mission.id} className="mission-card">
                      <strong>{mission.name}</strong>
                      <p>{mission.description}</p>
                      <small>{mission.reward}</small>
                    </div>
                  ))}
                </div>

                <div className="panel">
                  <h3>Build Challenges</h3>
                  {challengeList.map((challenge) => (
                    <div key={challenge.id} className="mission-card">
                      <strong>{challenge.title}</strong>
                      <p>{challenge.objective}</p>
                      <small>{challenge.difficulty}</small>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </section>

      <section className="section-block xp-panel">
        <div className="panel">
          <h3>Learning Stats</h3>
          <div className="xp-row">
            <div>
              <span>Level</span>
              <strong>{xpState.level}</strong>
            </div>
            <div>
              <span>XP</span>
              <strong>{xpState.xp}</strong>
            </div>
            <div>
              <span>Streak</span>
              <strong>{xpState.streak} days</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
