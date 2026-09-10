import { useEffect, useState } from 'react'

const STORAGE_KEY = 'devdeploy-guide-reports'

const emptyForm = {
  title: '',
  page: '',
  priority: 'medium',
  description: '',
  steps: '',
  email: '',
  imageUrl: '',
}

const normalizeDriveImageUrl = (value = '') => {
  const trimmed = value.trim()

  if (!trimmed) {
    return ''
  }

  const fileMatch = trimmed.match(/\/file\/d\/([^/]+)/)
  if (fileMatch) {
    return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`
  }

  return trimmed
}

const isDriveFolderUrl = (value = '') => /drive\.google\.com\/.+\/folders\//.test(value)

const priorityTint = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#f97316',
  critical: '#ef4444',
}

export default function ReportsPage() {
  const [form, setForm] = useState(emptyForm)
  const [reports, setReports] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : [
        {
          id: 1,
          title: 'Sidebar item selection looks too heavy',
          page: '/home',
          priority: 'medium',
          description: 'The active menu item uses a strong highlight that feels a bit too heavy on mobile.',
          steps: 'Open the mobile sidebar and view the active page item.',
          email: 'team@devdeployguide.dev',
          status: 'Open',
          createdAt: new Date().toISOString(),
        },
      ]
    } catch (error) {
      console.warn('Unable to read reports', error)
      return []
    }
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports))
    } catch (error) {
      console.warn('Unable to save reports', error)
    }
  }, [reports])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextReport = {
      id: Date.now(),
      title: form.title.trim(),
      page: form.page.trim() || 'General',
      priority: form.priority,
      description: form.description.trim(),
      steps: form.steps.trim() || 'No reproduction steps provided.',
      email: form.email.trim(),
      imageUrl: form.imageUrl ? normalizeDriveImageUrl(form.imageUrl) : '',
      status: 'Open',
      createdAt: new Date().toISOString(),
    }

    if (!nextReport.title || !nextReport.description) {
      return
    }

    setReports((current) => [nextReport, ...current])
    setForm(emptyForm)
    setSubmitted(true)
  }

  return (
    <main className="page-shell report-page">
      <section className="section-block">
        <div className="section-heading">
          <h2>Reports</h2>
          <span className="badge badge-secondary">{reports.length} tracked</span>
        </div>

        <div className="report-layout">
          <form className="report-form panel" onSubmit={handleSubmit}>
            <div className="report-form-header">
              <h3>File a bug report</h3>
              <p>Let the team know what broke, where it happened, and how to reproduce it.</p>
            </div>

            <label>
              <span>Issue title</span>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Example: sidebar highlight is too dark" required />
            </label>

            <div className="report-form-row">
              <label>
                <span>Page</span>
                <input name="page" value={form.page} onChange={handleChange} placeholder="Home / Tools / Tutorials" />
              </label>

              <label>
                <span>Priority</span>
                <select name="priority" value={form.priority} onChange={handleChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </label>
            </div>

            <label>
              <span>What happened?</span>
              <textarea name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Describe the bug in plain language..." required />
            </label>

            <label>
              <span>Steps to reproduce</span>
              <textarea name="steps" value={form.steps} onChange={handleChange} rows={4} placeholder="1. Open the page...\n2. Click...\n3. Notice..." />
            </label>

            <label>
              <span>Email (optional)</span>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </label>

            <div className="report-form-actions">
              <button type="submit" className="primary-btn">Submit report</button>
              {submitted && <span className="report-submitted">Report sent</span>}
            </div>
          </form>

          <aside className="reports-list panel">
            <div className="report-list-header">
              <h3>Recent reports</h3>
            </div>

            {reports.length === 0 ? (
              <p className="empty-state">No reports yet. Your next bug report will appear here.</p>
            ) : (
              <ul className="report-item-list">
                {reports.map((report) => {
                  const reportImageUrl = normalizeDriveImageUrl(report.imageUrl || '')

                  return (
                    <li key={report.id} className="report-item">
                      <div className="report-item-topline">
                        <strong>{report.title}</strong>
                        <span className="priority-pill" style={{ background: `${priorityTint[report.priority] || '#8b5cf6'}1a`, color: priorityTint[report.priority] || '#8b5cf6' }}>
                          {report.priority}
                        </span>
                      </div>
                      <p className="report-meta">{report.page} • {report.status}</p>
                      <p>{report.description}</p>

                      {reportImageUrl && (
                        isDriveFolderUrl(reportImageUrl) ? (
                          <a className="report-drive-link" href={reportImageUrl} target="_blank" rel="noreferrer">
                            Open Google Drive folder
                          </a>
                        ) : (
                          <div className="report-image-box">
                            <img className="report-image" src={reportImageUrl} alt={report.title} />
                          </div>
                        )
                      )}

                      <small>{new Date(report.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</small>
                    </li>
                  )
                })}
              </ul>
            )}
          </aside>
        </div>
      </section>
    </main>
  )
}
