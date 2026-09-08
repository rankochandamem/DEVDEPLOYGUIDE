import { useMemo, useState } from 'react'

const tools = [
  { id: 'gitignore', title: '.gitignore Generator', description: 'Create a safe ignore file for your project stack.', category: 'Project setup' },
  { id: 'env', title: 'Environment Template', description: 'Build a shareable .env.example without exposing secrets.', category: 'Project setup' },
  { id: 'readme', title: 'README Builder', description: 'Generate a clean starting README for your repository.', category: 'Documentation' },
  { id: 'readiness', title: 'Deployment Readiness', description: 'Check the most important items before deploying.', category: 'Deployment' },
  { id: 'json', title: 'JSON Formatter', description: 'Format and validate JSON before using it in an API or config file.', category: 'Data' },
  { id: 'base64', title: 'Base64 Encoder', description: 'Encode or decode text for development and debugging workflows.', category: 'Data' },
  { id: 'url', title: 'URL Encoder', description: 'Encode or decode URL values safely for query strings.', category: 'Web' },
]

const gitignoreParts = {
  Node: 'node_modules/\nnpm-debug.log*\ndist/\n.env\n',
  React: 'node_modules/\ndist/\nbuild/\n.env\n',
  Python: '__pycache__/\n*.py[cod]\n.venv/\n.env\n',
  Java: 'target/\n*.class\n.idea/\n.env\n',
  Docker: '.dockerignore\n.env\n*.log\n',
}

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState('gitignore')
  const [stack, setStack] = useState('Node')
  const [projectName, setProjectName] = useState('My Project')
  const [description, setDescription] = useState('A developer project built with DevDeploy Guide.')
  const [envKeys, setEnvKeys] = useState('DATABASE_URL\nAPI_URL\nPORT')
  const [dataInput, setDataInput] = useState('{"name":"DevDeploy","status":"ready"}')
  const [dataMode, setDataMode] = useState('encode')
  const [copied, setCopied] = useState(false)
  const [checks, setChecks] = useState({ repository: false, env: false, build: false, health: false })

  const output = useMemo(() => {
    if (selectedTool === 'gitignore') return `# Generated for ${stack}\n${gitignoreParts[stack] || ''}`
    if (selectedTool === 'env') return envKeys.split('\n').map((key) => key.trim()).filter(Boolean).map((key) => `${key}=`).join('\n')
    if (selectedTool === 'readme') return `# ${projectName}\n\n${description}\n\n## Getting started\n\n~~~bash\nnpm install\nnpm run dev\n~~~\n\n## Deployment\n\nAdd the required environment variables, build the project, and deploy from GitHub.`
    if (selectedTool === 'json') {
      try {
        return JSON.stringify(JSON.parse(dataInput), null, 2)
      } catch (error) {
        return `Invalid JSON: ${error.message}`
      }
    }
    if (selectedTool === 'base64') {
      try {
        return dataMode === 'encode' ? window.btoa(dataInput) : window.atob(dataInput)
      } catch (error) {
        return `Unable to ${dataMode}: ${error.message}`
      }
    }
    if (selectedTool === 'url') {
      try {
        return dataMode === 'encode' ? encodeURIComponent(dataInput) : decodeURIComponent(dataInput)
      } catch (error) {
        return `Unable to ${dataMode}: ${error.message}`
      }
    }
    return ''
  }, [dataInput, dataMode, description, envKeys, projectName, selectedTool, stack])

  const completedChecks = Object.values(checks).filter(Boolean).length

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  const toggleCheck = (key) => setChecks((current) => ({ ...current, [key]: !current[key] }))

  return (
    <main className="page-shell tools-page">
      <section className="section-block">
        <div className="section-heading">
          <div><span className="eyebrow">Build faster</span><h2>Developer Tools</h2></div>
          <span className="tools-count">{tools.length} tools</span>
        </div>

        <div className="tools-layout">
          <aside className="panel tools-menu">
            <h3>Toolbox</h3>
            {tools.map((tool) => (
              <button type="button" key={tool.id} className={selectedTool === tool.id ? 'active' : ''} onClick={() => setSelectedTool(tool.id)}>
                <strong>{tool.title}</strong><small>{tool.category}</small>
              </button>
            ))}
          </aside>

          <section className="panel tool-workspace">
            {selectedTool === 'gitignore' && <>
              <h3>.gitignore Generator</h3><p>Choose the technologies in your project and generate a file you can add to its root folder.</p>
              <label>Primary stack<select value={stack} onChange={(event) => setStack(event.target.value)}>{Object.keys(gitignoreParts).map((item) => <option key={item}>{item}</option>)}</select></label>
            </>}

            {selectedTool === 'env' && <>
              <h3>Environment Template</h3><p>List variable names one per line. Values stay blank so this file can be safely committed as `.env.example`.</p>
              <label>Variable names<textarea value={envKeys} onChange={(event) => setEnvKeys(event.target.value)} /></label>
            </>}

            {selectedTool === 'readme' && <>
              <h3>README Builder</h3><p>Create a useful first README, then customize the generated Markdown before committing it.</p>
              <label>Project name<input value={projectName} onChange={(event) => setProjectName(event.target.value)} /></label>
              <label>Short description<textarea value={description} onChange={(event) => setDescription(event.target.value)} /></label>
            </>}

            {selectedTool === 'readiness' && <>
              <h3>Deployment Readiness</h3><p>Complete these checks before connecting the project to Render, Vercel, or Netlify.</p>
              <div className="readiness-checks">
                {[
                  ['repository', 'Code is pushed to GitHub'],
                  ['env', 'Production environment variables are configured'],
                  ['build', 'Production build passes locally'],
                  ['health', 'App has a start command and health check'],
                ].map(([key, label]) => <label key={key}><input type="checkbox" checked={checks[key]} onChange={() => toggleCheck(key)} />{label}</label>)}
              </div>
              <div className="readiness-meter"><strong>{completedChecks}/4 ready</strong><span><i style={{ width: `${completedChecks * 25}%` }} /></span></div>
            </>}

            {['json', 'base64', 'url'].includes(selectedTool) && <>
              <h3>{selectedTool === 'json' ? 'JSON Formatter' : selectedTool === 'base64' ? 'Base64 Encoder' : 'URL Encoder'}</h3>
              <p>{selectedTool === 'json' ? 'Paste JSON to validate and format it with readable indentation.' : selectedTool === 'base64' ? 'Encode plain text or decode an existing Base64 value.' : 'Encode a URL value or decode an encoded query-string value.'}</p>
              {selectedTool !== 'json' && <label>Mode<select value={dataMode} onChange={(event) => setDataMode(event.target.value)}><option value="encode">Encode</option><option value="decode">Decode</option></select></label>}
              <label>{selectedTool === 'json' ? 'JSON input' : 'Text input'}<textarea value={dataInput} onChange={(event) => setDataInput(event.target.value)} /></label>
            </>}

            {selectedTool !== 'readiness' && <div className="tool-output"><div className="tool-output-header"><strong>Generated output</strong><button type="button" onClick={copyOutput}>{copied ? 'Copied' : 'Copy'}</button></div><pre>{output}</pre></div>}
          </section>
        </div>
      </section>
    </main>
  )
}
