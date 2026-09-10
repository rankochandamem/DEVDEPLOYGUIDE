import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { quickLinks } from '../data/tutorials'
import TutorialCard from '../components/tutorial/TutorialCard'
import { getBookmarks, getLearningPathUnlocks, readStorage, toggleBookmark } from '../services/storageService'
import { getAllTutorials } from '../services/tutorialService'
import stepOneGuide from '../../Step-1-install-git.txt?raw'
import stepTwoGuide from '../../Step-2-connect-code-to-github.txt?raw'
import stepThreeGuide from '../../Step-3-connect-github-to-render.txt?raw'

const downloadableGuides = [
  { fileName: 'Step-1-install-git.txt', content: stepOneGuide },
  { fileName: 'Step-2-connect-code-to-github.txt', content: stepTwoGuide },
  { fileName: 'Step-3-connect-github-to-render.txt', content: stepThreeGuide },
]

export default function HomePage() {
  const state = readStorage()
  const audioRef = useRef(null)
  const [bookmarks, setBookmarks] = useState(getBookmarks())
  const [videoOpen, setVideoOpen] = useState(false)
  const [learningPathUnlocks] = useState(getLearningPathUnlocks())

  useEffect(() => {
    const shouldOpen = sessionStorage.getItem('showFinishVideo') === 'true'
    if (shouldOpen) {
      setVideoOpen(true)
      sessionStorage.removeItem('showFinishVideo')
    }
  }, [])
  const [featured] = useState(() => shuffle(getAllTutorials()).slice(0, 3))
  const [recommended] = useState(() => shuffle(quickLinks))
  const nextLearningStep = [
    { slug: 'git-installation', title: 'Install Git' },
    { slug: 'github-basics', title: 'Connect GitHub' },
    { slug: 'render-deployment', title: 'Deploy to Render' },
  ].find((step) => !learningPathUnlocks.includes(step.slug)) || { slug: 'render-deployment', title: 'Deploy to Render' }

  const handleToggleBookmark = (tutorialId) => {
    setBookmarks(toggleBookmark(tutorialId))
  }

  const handlePlayVoice = async () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0

    try {
      await audio.play()
    } catch (error) {
      console.error('Failed to play voice clip:', error)
    }
  }

  return (
    <main className="page-shell home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="badge">Beginner Friendly</span>
          <h1>Learn. Build. Deploy.</h1>
          <p>
            Step-by-step guides for turning your code into real, deployed applications.
          </p>
          <div className="learning-path" aria-label="Tutorial steps">
            <h2>Tutorial For Render Deploy</h2>
            <div className="learning-steps">
            <Link className="learning-step" to="/tutorials/git-installation?from=learning-path">
              <span>Step 1</span>
              <strong>Install Git</strong>
            </Link>
            <LearningStep slug="github-basics" label="Step 2" title="Connect GitHub" unlocked={learningPathUnlocks.includes('github-basics')} />
            <LearningStep slug="render-deployment" label="Step 3" title="Deploy to Render" unlocked={learningPathUnlocks.includes('render-deployment')} />
            </div>
            <DownloadableGuides />
          </div>
        </div>

        <div className="pipeline-card">
          <img
            className="pipeline-image"
            src="/media/logo1.png"
            alt="DevDeploy deployment pipeline"
            onClick={handlePlayVoice}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handlePlayVoice()
              }
            }}
            style={{ cursor: 'pointer' }}
          />
          <audio ref={audioRef} src="/media/voice.mpeg" preload="auto" />
        </div>
      </section>

      {videoOpen && (
        <div className="video-modal-backdrop" role="presentation" onClick={() => setVideoOpen(false)}>
          <div className="video-modal" role="dialog" aria-modal="true" aria-label="Tutorial completion video" onClick={(event) => event.stopPropagation()}>
            <div className="video-modal-header">
              <h3>Finish Tutorial</h3>
              <button className="text-preview-close" type="button" aria-label="Close video" onClick={() => setVideoOpen(false)}>×</button>
            </div>
            <video
              className="video-player"
              src="/media/Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up%20(Official%20Video)%20(4K%20Remaster).mp4"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}

      <section className="dashboard-grid">
        <div className="panel">
          <h3>Recommended Tutorials</h3>
          <ul className="tag-list">
            {recommended.map((item) => (
              <li key={item.slug}><Link to={`/tutorials/${item.slug}`}>{item.title}</Link></li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <h3>Bookmarks</h3>
          <p>{bookmarks.length} saved guides</p>
          <Link className="secondary-btn" to="/bookmarks">View Bookmarks</Link>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Featured Tutorials</h2>
        </div>
        <div className="tutorial-grid">
          {featured.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              progress={state.progress?.[tutorial.id] || 0}
              bookmarked={bookmarks.includes(tutorial.id)}
              onToggleBookmark={handleToggleBookmark}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

function DownloadableGuides() {
  const [previewGuide, setPreviewGuide] = useState(null)

  return (
    <div className="download-guides">
      <h3>Download the guides</h3>
      <div className="download-guide-list">
        {downloadableGuides.map((guide) => (
          <div className="download-guide-row" key={guide.fileName}>
            <span className="download-guide-name">{guide.fileName}</span>
            <div className="download-guide-actions">
              <a
                className="download-guide-button"
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(guide.content)}`}
                download={guide.fileName}
              >
                Download
              </a>
              <button className="download-guide-button preview-button" type="button" onClick={() => setPreviewGuide(guide)}>
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {previewGuide && (
        <div className="text-preview-backdrop" role="presentation" onClick={() => setPreviewGuide(null)}>
          <section className="text-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="text-preview-title" onClick={(event) => event.stopPropagation()}>
            <div className="text-preview-header">
              <h3 id="text-preview-title">{previewGuide.fileName}</h3>
              <button className="text-preview-close" type="button" aria-label="Close preview" onClick={() => setPreviewGuide(null)}>×</button>
            </div>
            <pre>{previewGuide.content}</pre>
          </section>
        </div>
      )}
    </div>
  )
}

function LearningStep({ slug, label, title, unlocked }) {
  if (!unlocked) {
    return (
      <div className="learning-step learning-step-locked" aria-disabled="true">
        <span>{label}</span>
        <strong><span aria-hidden="true">🔒</span> {title}</strong>
      </div>
    )
  }

  return (
    <Link className="learning-step" to={`/tutorials/${slug}?from=learning-path`}>
      <span>{label}</span>
      <strong>{title}</strong>
    </Link>
  )
}
