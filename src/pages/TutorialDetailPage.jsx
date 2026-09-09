import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import CodeBlock from '../components/ui/CodeBlock'
import ImageBlock from '../components/media/ImageBlock'
import { getMediaLibrary } from '../services/mediaService'
import { getAllTutorials } from '../services/tutorialService'
import { readStorage, toggleBookmark, unlockLearningStep } from '../services/storageService'

const learningPath = [
  { slug: 'git-installation', label: 'Step 1', title: 'Install Git' },
  { slug: 'github-basics', label: 'Step 2', title: 'Connect GitHub' },
  { slug: 'render-deployment', label: 'Step 3', title: 'Deploy to Render' },
]

export default function TutorialDetailPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const location = useLocation()
  const tutorials = getAllTutorials()
  const tutorial = tutorials.find((item) => item.slug === slug)
  const storage = readStorage()
  const [isBookmarked, setIsBookmarked] = useState(storage.bookmarks?.includes(tutorial?.id) || false)

  if (!tutorial) {
    return (
      <main className="page-shell">
        <section className="panel empty-state">
          <h2>Tutorial not found</h2>
          <Link className="primary-btn" to="/tutorials">Back to tutorials</Link>
        </section>
      </main>
    )
  }

  const related = useMemo(
    () => tutorials.filter((item) => item.categoryId === tutorial.categoryId && item.id !== tutorial.id).slice(0, 3),
    [tutorial, tutorials],
  )
  const currentStepIndex = learningPath.findIndex((step) => step.slug === tutorial.slug)
  const nextStep = currentStepIndex >= 0 ? learningPath[currentStepIndex + 1] : null
  const openedFromLearningPath = new URLSearchParams(location.search).get('from') === 'learning-path'

  return (
    <main className="page-shell tutorial-detail">
      <div className="tutorial-toolbar-top">
        <button type="button" className="detail-back-button" onClick={() => navigate(-1)}>
          <span aria-hidden="true">←</span>
          <span>Back</span>
        </button>
      </div>

      <div className="tutorial-header">
        <div>
          <p className="eyebrow">{tutorial.category}</p>
          <h1>{tutorial.title}</h1>
        </div>
        <div className="tutorial-actions">
          <Button
            variant="secondary"
            onClick={() => setIsBookmarked(toggleBookmark(tutorial.id).includes(tutorial.id))}
          >
            {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </Button>
        </div>
      </div>

      <div className="detail-meta">
        <span>{tutorial.difficulty}</span>
        <span>{tutorial.estimatedTime}</span>
        <span>{tutorial.lessons} lessons</span>
      </div>

      {tutorial.externalLinks?.length > 0 && (
        <section className="panel external-links-panel">
          <h2>Official websites</h2>
          <div className="external-links">
            {tutorial.externalLinks.map((externalLink) => (
              <a
                key={externalLink.url}
                className="external-link"
                href={externalLink.url}
                target="_blank"
                rel="noreferrer"
              >
                {externalLink.label}
                <span aria-hidden="true"> ↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="content-stack">
        {tutorial.sections?.map((section) => (
          <section key={section.title} className="panel">
            <h2>{section.title}</h2>

            {section.content?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

            {section.blocks?.map((block) => <PublishedBlock block={block} key={block.id} />)}

            {section.links && (
              <div className="section-links">
                {section.links.map((sectionLink) => (
                  <a key={sectionLink.url} href={sectionLink.url} target="_blank" rel="noreferrer">
                    {sectionLink.label} ↗
                  </a>
                ))}
              </div>
            )}

            {section.media && (
              <div className="image-gallery">
                {section.media.map((mediaItem) => (
                  <ImageBlock
                    key={`${section.title}-${mediaItem.title || mediaItem.caption}`}
                    image={mediaItem.image}
                    title={mediaItem.title}
                    caption={mediaItem.caption}
                    description={mediaItem.description}
                    altText={mediaItem.altText}
                    stepNumber={mediaItem.stepNumber}
                  />
                ))}
              </div>
            )}

            {section.checklist && (
              <ul className="checklist">
                {section.checklist.map((item) => <li key={item}>☐ {item}</li>)}
              </ul>
            )}
            {section.commands?.map((command) => (
              <div className="command-example" key={`${section.title}-${command.code}`}>
                <CodeBlock title={command.label} code={command.code} language="bash" />
                {command.explanation && (
                  <div className="command-explanation">
                    <strong>What happens:</strong>
                    <p>{command.explanation}</p>
                  </div>
                )}
                {command.output && (
                  <CodeBlock title="Sample output" code={command.output} language="text" />
                )}
              </div>
            ))}
          </section>
        ))}
      </div>

      {tutorial.tips && (
        <section className="panel">
          <h2>Tips</h2>
          <ul>
            {tutorial.tips.map((tip) => <li key={tip}>{tip}</li>)}
          </ul>
        </section>
      )}

      {tutorial.warnings && (
        <section className="panel warning-box">
          <h2>Warning</h2>
          <ul>
            {tutorial.warnings.map((warning) => <li key={warning}>{warning}</li>)}
          </ul>
        </section>
      )}

      {tutorial.troubleshooting && (
        <section className="panel">
          <h2>Troubleshooting</h2>
          {tutorial.troubleshooting.map((item) => (
            <div key={item.title} className="troubleshooting-item">
              <h3>{item.title}</h3>
              <p>{item.solution}</p>
            </div>
          ))}
        </section>
      )}

      <section className="panel">
        <h2>Recommended next steps</h2>
        <div className="related-grid">
          {related.map((item) => (
            <Link key={item.id} className="related-card" to={`/tutorials/${item.slug}`}>
              <span>{item.category}</span>
              <strong>{item.title}</strong>
            </Link>
          ))}
        </div>
      </section>

      {currentStepIndex >= 0 && openedFromLearningPath && (
        <section className="next-learning-panel">
          {nextStep ? (
            <>
              <div>
                <span className="eyebrow">Continue the tutorial</span>
                <h2>Next: {nextStep.label} — {nextStep.title}</h2>
                <p>Move to the next step in the Git → GitHub → Render learning path.</p>
              </div>
              <Link
                className="primary-btn"
                to={`/tutorials/${nextStep.slug}?from=learning-path`}
                onClick={() => unlockLearningStep(nextStep.slug)}
              >
                Open next step →
              </Link>
            </>
          ) : (
            <div>
              <span className="eyebrow">Tutorial path complete</span>
              <h2>Nice work — you finished the core path.</h2>
              <p>Return to the tutorials page to explore the next deployment and developer guides.</p>
              <Link className="secondary-btn" to="/tutorials">Explore more tutorials</Link>
            </div>
          )}
        </section>
      )}
    </main>
  )
}

function PublishedBlock({ block }) {
  if (block.type === 'text') return <p>{block.content}</p>
  if (block.type === 'heading') return <h3>{block.content}</h3>
  if (block.type === 'divider') return <hr />
  if (block.type === 'image') {
    const image = getMediaLibrary().find((item) => item.id === block.imageId)
    return image ? <ImageBlock image={image} caption={block.caption} altText={block.altText || image.altText} /> : null
  }
  if (block.type === 'code') return <CodeBlock title={block.title || block.language} code={block.code} language={block.language} />
  if (block.type === 'terminal') return <CodeBlock title="Terminal command" code={block.command} language="bash" />
  if (block.type === 'checklist') return <div><h3>{block.title}</h3><ul className="checklist">{block.items?.map((item) => <li key={item}>☐ {item}</li>)}</ul></div>
  if (block.type === 'warning' || block.type === 'tip') return <div className={block.type === 'warning' ? 'warning-box' : 'builder-callout'}><strong>{block.title}</strong><p>{block.content}</p></div>
  if (block.type === 'quiz') return <div className="builder-callout"><strong>{block.question}</strong><ul>{block.options?.map((option) => <li key={option}>{option}</li>)}</ul><p>{block.explanation}</p></div>
  if (block.type === 'link') return <p><a href={block.url} target="_blank" rel="noreferrer">{block.label}</a></p>
  return null
}
