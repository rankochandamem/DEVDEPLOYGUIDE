import { Link } from 'react-router-dom'
import { getBookmarks } from '../services/storageService'
import { getAllTutorials } from '../services/tutorialService'

export default function BookmarksPage() {
  const bookmarkedIds = getBookmarks()
  const items = getAllTutorials().filter((tutorial) => bookmarkedIds.includes(tutorial.id))

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h2>My Bookmarks</h2>
        </div>

        {items.length === 0 ? (
          <div className="panel empty-state">
            <p>No bookmarks yet. Visit a tutorial and save it for later.</p>
            <Link className="primary-btn" to="/tutorials">Browse tutorials</Link>
          </div>
        ) : (
          <div className="tutorial-grid">
            {items.map((tutorial) => (
              <article key={tutorial.id} className="tutorial-card">
                <p className="tutorial-category">{tutorial.category}</p>
                <h3>{tutorial.title}</h3>
                <p>{tutorial.description}</p>
                <Link className="primary-btn tutorial-link" to={`/tutorials/${tutorial.slug}`}>
                  Open
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
