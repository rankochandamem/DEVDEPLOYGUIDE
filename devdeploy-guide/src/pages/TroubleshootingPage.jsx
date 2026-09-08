import { useState } from 'react'
import { getAllTutorials } from '../services/tutorialService'

const commonIssues = [
  { title: 'Port already in use', tutorialTitle: 'Local development', solution: 'Find the process using the port, stop it safely, or start the app on another available port.' },
  { title: 'Environment variable is undefined', tutorialTitle: 'Configuration', solution: 'Confirm the variable name matches your code, place it in the correct .env file, and restart the development server.' },
  { title: 'Changes are not appearing in the browser', tutorialTitle: 'Local development', solution: 'Check that the correct server is running, save the file, refresh the page, and inspect the browser console for errors.' },
  { title: 'Build works locally but fails in deployment', tutorialTitle: 'Deployment', solution: 'Compare the Node version, install command, build command, root directory, and required environment variables.' },
  { title: 'CORS request blocked', tutorialTitle: 'APIs', solution: 'Configure the API to allow the frontend origin and verify that the request uses the correct protocol, host, and port.' },
  { title: 'Module not found after installing a package', tutorialTitle: 'Dependencies', solution: 'Install the package in the project folder, verify the import name, and restart the dev server after changing dependencies.' },
  { title: 'Git reports a merge conflict', tutorialTitle: 'Git', solution: 'Open each conflicted file, choose the intended changes, remove conflict markers, then stage and commit the resolved files.' },
  { title: 'Deployed page shows a blank screen', tutorialTitle: 'Frontend deployment', solution: 'Inspect browser and deployment logs, confirm the build output and asset paths, and verify the router fallback configuration.' },
]

export default function TroubleshootingPage() {
  const isMobileViewport = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  const [issues] = useState(() => shuffle([
    ...getAllTutorials().flatMap((tutorial) =>
      (tutorial.troubleshooting || []).map((entry) => ({ ...entry, tutorialTitle: tutorial.title })),
    ),
    ...commonIssues,
  ]))
  const [selectedIssue, setSelectedIssue] = useState(null)

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h2>Troubleshooting</h2>
        </div>

        {selectedIssue && (
          <div className="troubleshooting-modal" role="presentation" onClick={() => setSelectedIssue(null)}>
            <section className="panel troubleshooting-detail" role="dialog" aria-modal="true" aria-labelledby="troubleshooting-detail-title" onClick={(event) => event.stopPropagation()}>
              <div className="troubleshooting-detail-header">
                <div>
                  <span className="eyebrow">Troubleshooting details</span>
                  <h3 id="troubleshooting-detail-title">{selectedIssue.title}</h3>
                  <p className="tiny-label">Related to: {selectedIssue.tutorialTitle}</p>
                </div>
                <button type="button" className="secondary-btn" onClick={() => setSelectedIssue(null)}>Close</button>
              </div>
              <p><strong>Recommended solution:</strong> {selectedIssue.solution}</p>
              <h4>What to check</h4>
              <ol>
                <li>Read the complete error message and note the command or page that triggered it.</li>
                <li>Check the related project configuration and compare it with the expected setup.</li>
                <li>Apply one change at a time, then retry the command or refresh the page.</li>
              </ol>
              <p className="troubleshooting-tip"><strong>Tip:</strong> If the problem continues, copy the full output into Explain My Error for another diagnostic pass.</p>
            </section>
          </div>
        )}

        <div className="troubleshooting-grid">
          {issues.map((issue) => (
            <button
              type="button"
              key={`${issue.tutorialTitle}-${issue.title}`}
              className="panel troubleshooting-card"
              onClick={() => !isMobileViewport && setSelectedIssue(issue)}
              disabled={isMobileViewport}
              aria-label={`View details for ${issue.title}`}
            >
              <h3>{issue.title}</h3>
              <p className="tiny-label">{issue.tutorialTitle}</p>
              <p>{issue.solution}</p>
              <span className="troubleshooting-card-action">View details →</span>
            </button>
          ))}
        </div>

      </section>
    </main>
  )
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5)
}
