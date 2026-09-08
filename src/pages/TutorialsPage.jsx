import { useState } from 'react'
import { Link } from 'react-router-dom'
import TutorialCard from '../components/tutorial/TutorialCard'
import { categories } from '../data/tutorials'
import { getAllTutorials } from '../services/tutorialService'
import { getBookmarks, readStorage, toggleBookmark } from '../services/storageService'

export default function TutorialsPage() {
  const state = readStorage()
  const [bookmarks, setBookmarks] = useState(getBookmarks())
  const tutorials = getAllTutorials()

  const handleToggleBookmark = (tutorialId) => {
    setBookmarks(toggleBookmark(tutorialId))
  }

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h2>All Tutorials</h2>
        </div>

        <div className="category-list">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <ul>
                {category.tutorials.map((id) => {
                  const tutorial = tutorials.find((item) => item.id === id)
                  return tutorial ? (
                    <li key={tutorial.id}>
                      <Link to={`/tutorials/${tutorial.slug}`}>{tutorial.title}</Link>
                    </li>
                  ) : null
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Available Tutorials</h2>
        </div>

        <div className="tutorial-grid">
          {tutorials.map((tutorial) => (
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
