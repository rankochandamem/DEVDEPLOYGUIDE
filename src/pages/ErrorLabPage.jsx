import { useState } from 'react'
import { explainError, getErrorHistory, saveErrorHistory } from '../services/errorService'

const errorExamples = [
  'Failed to resolve import "./components/Navbar" from "src/App.jsx"',
  'Error: Invalid hook call. Hooks can only be called inside of the body of a function component.',
  'Warning: Each child in a list should have a unique "key" prop.',
  'Warning: Can\'t perform a React state update on an unmounted component.',
  'RENDER LOOP DETECTED. useEffect(() => { setProjects(loadProjects()) })',
  'DOMException: Failed to execute setItem on Storage. QuotaExceededError.',
  'DEVDEPLOY STORAGE ERROR: Unexpected end of JSON input',
  'API REQUEST FAILED: GET /api/projects Status: 503 Retry attempt: 17 / 999',
  'HTTP 401 Unauthorized. Error: TOKEN_EXPIRED',
  'Authentication Error. JsonWebTokenError: invalid signature',
  'HTTP 429 Too Many Requests. Retry-After: 42 seconds',
  'MIGRATION FAILED. relation "users" does not exist',
  'ERROR: duplicate key value violates unique constraint "users_email_key"',
  'ERROR: insert or update on table "projects" violates foreign key constraint "projects_user_id_fkey"',
  'TRANSACTION FAILED. duplicate key value violates unique constraint',
  'ERROR: Unsupported Node.js version. Required: Node >= 20.0.0 Detected: Node v18.19.1',
  'npm error ERESOLVE unable to resolve dependency tree. Peer dependency react@"^18.0.0"',
  'TS2322: Type number is not assignable to type string.',
  'npm run lint: no-unused-vars and missing useEffect dependency warning',
  'VITE ENVIRONMENT ERROR. Client-side environment variables must use the VITE_ prefix.',
  'CONFIGURATION ERROR. Production variables are missing.',
  'HTTP 404 for https://example.com/dashboard because client-side routing needs a fallback.',
  'MIXED CONTENT BLOCKED. HTTPS page tried to load insecure HTTP API.',
  'WebSocket connection failed. Unexpected response code: 502.',
  'BUILD FAILED: JavaScript heap out of memory.',
  'ERROR: EACCES Permission denied: C:\\Projects\\devdeploy\\node_modules',
  'Build Error. Module not found: ./Components/Header.jsx',
  'MODULE DEPENDENCY ERROR. Circular dependency detected.',
  'PERFORMANCE WARNING. DeploymentSimulator created 1,284 active timers.',
  'DEPLOYMENT HEALTH CHECK FAILED. GET /health timed out after 30 seconds.',
  'npm error Missing script: "server". Available scripts: dev build preview',
  'HEAD detached at a8f31c2',
  'git rebase main. CONFLICT (content): src/components/Dashboard.jsx',
  'git push origin main. assets/demo-video.mp4 is 157.4 MB and exceeds repository file size limit.',
  'DEPLOYMENT ROLLBACK. Health check failed after deployment.',
  'CRITICAL DEPLOYMENT ERROR. Build passed, health check failed, DATABASE_TIMEOUT after 30 seconds.',
]

export default function ErrorLabPage() {
  const [input, setInput] = useState('npm ERR! code ENOENT')
  const [result, setResult] = useState(() => explainError('npm ERR! code ENOENT'))
  const [history, setHistory] = useState(() => getErrorHistory())
  const [copied, setCopied] = useState(false)
  const [copiedDiagnosis, setCopiedDiagnosis] = useState(false)
  const [examples] = useState(() => pickRandomExamples(errorExamples, 5))

  const handleExplain = () => {
    const response = explainError(input)
    setResult(response)
    setHistory(saveErrorHistory({ title: response.title, message: input, solved: true }))
  }

  const handleCopyCommands = async () => {
    await navigator.clipboard.writeText(result.commands?.join('\n') || '')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const handleCopyDiagnosis = async () => {
    const diagnosis = [
      result.title,
      result.summary,
      `What happened: ${result.whatHappened}`,
      `Why it happened: ${result.why}`,
      `Recommended fixes: ${result.fixes?.join('; ')}`,
      `Commands: ${result.commands?.join(' | ')}`,
    ].join('\n')
    await navigator.clipboard.writeText(diagnosis)
    setCopiedDiagnosis(true)
    window.setTimeout(() => setCopiedDiagnosis(false), 1600)
  }

  const handleHistorySelect = (entry) => {
    setInput(entry.message)
    setResult(explainError(entry.message))
  }

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h2>Explain My Error</h2>
        </div>

        <div className="panel error-intro">
          <p>Paste the complete error message below. The Error Lab identifies the closest known problem, explains what happened, and suggests the next commands to try.</p>
          <div className="error-steps">
            <span><strong>1</strong> Copy the full terminal or deployment error</span>
            <span><strong>2</strong> Paste it into the analyzer</span>
            <span><strong>3</strong> Try one fix at a time</span>
          </div>
        </div>

        <div className="panel">
          <label htmlFor="error-message">Error message</label>
          <textarea id="error-message" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Paste an error message..." />
          <div className="error-input-meta">
            <span>{input.length} characters</span>
            <button type="button" className="link-button" onClick={() => setInput('')} disabled={!input}>Clear</button>
          </div>
          <div className="example-errors">
            <span>Try an example:</span>
            {examples.map((example) => <button type="button" key={example} onClick={() => setInput(example)}>{example}</button>)}
          </div>
          <div className="notes-actions">
            <button type="button" className="primary-btn" onClick={handleExplain} disabled={!input.trim()}>Explain Error</button>
            <button type="button" className="secondary-btn" onClick={handleCopyDiagnosis}>{copiedDiagnosis ? 'Copied' : 'Copy diagnosis'}</button>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="panel">
          <div className="error-result-header">
            <div>
              <span className="eyebrow">Diagnostic result</span>
              <h3>{result.title}</h3>
              <p className="diagnostic-summary">{result.summary}</p>
            </div>
            <span className="difficulty-badge">{result.difficulty}</span>
          </div>
          <p><strong>What happened:</strong> {result.whatHappened}</p>
          <p><strong>Why it happened:</strong> {result.why}</p>
          <div className="diagnostic-columns">
            <div><h4>Possible causes</h4><ul>{result.causes?.map((cause) => <li key={cause}>{cause}</li>)}</ul></div>
            <div><h4>Recommended fixes</h4><ul>{result.fixes?.map((fix) => <li key={fix}>{fix}</li>)}</ul></div>
          </div>
          <div className="diagnostic-columns">
            <div><h4>Investigation checklist</h4><ul>{result.checks?.map((check) => <li key={check}>{check}</li>)}</ul></div>
            <div><h4>Prevent it next time</h4><p>{result.prevention}</p></div>
          </div>
          <div className="code-block">
            <div className="code-header">
              <span>Commands to try</span>
              <button type="button" onClick={handleCopyCommands}>{copied ? 'Copied' : 'Copy commands'}</button>
            </div>
            <pre>{result.commands?.join('\n')}</pre>
          </div>
          <p><strong>Related tutorials:</strong> {result.relatedTutorials?.join(', ')}</p>
        </div>
      </section>

      <section className="section-block">
        <div className="panel">
          <h3>My Error History</h3>
          {history.length === 0 ? <p>No saved error history yet.</p> : (
            <ul>
              {history.slice(-5).reverse().map((entry, index) => (
                <li key={`${entry.title}-${index}`}><button type="button" className="history-entry" onClick={() => handleHistorySelect(entry)}><strong>{entry.title}</strong><span>{new Date(entry.date).toLocaleDateString()}</span></button></li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}

function pickRandomExamples(items, count) {
  const shuffled = [...items].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
