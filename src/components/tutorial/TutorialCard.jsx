import { Link } from 'react-router-dom'

export default function TutorialCard({ tutorial, progress = 0, bookmarked = false, onToggleBookmark }) {
  return (
    <article className="tutorial-card">
      <div className="tutorial-card-header">
        <span className="difficulty-badge">{tutorial.difficulty}</span>
        <button type="button" className="bookmark-btn" onClick={() => onToggleBookmark(tutorial.id)}>
          {bookmarked ? '★' : '☆'}
        </button>
      </div>

      <div className="tutorial-card-body">
        <p className="tutorial-category">{tutorial.category}</p>
        <h3>{tutorial.title}</h3>
        <p>{tutorial.description}</p>
      </div>

      <div className="tutorial-meta">
        <span>{tutorial.estimatedTime}</span>
        <span>{tutorial.lessons} lessons</span>
      </div>

      <div className="mini-progress">
        <div className="mini-progress-bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <small>{progress}% complete</small>
      </div>

      <Link className="primary-btn tutorial-link" to={`/tutorials/${tutorial.slug}`}>
        Open Tutorial
      </Link>
    </article>
  )
}
