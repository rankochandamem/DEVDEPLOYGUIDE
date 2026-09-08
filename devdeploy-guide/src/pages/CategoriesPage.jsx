import { Link, useParams } from 'react-router-dom'
import { categories } from '../data/tutorials'
import { getAllTutorials } from '../services/tutorialService'

export default function CategoriesPage() {
  const { categoryId } = useParams()
    const tutorials = getAllTutorials()
  const visibleCategories = categoryId
    ? categories.filter((category) => category.id === categoryId)
    : categories

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h2>Categories</h2>
        </div>

        <div className="category-list">
          {visibleCategories.map((category) => (
            <div key={category.id} className="category-card">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <ul>
                {tutorials.filter((item) => item.categoryId === category.id).map((tutorial) => {
                  return tutorial ? (
                    <li key={tutorial.id}><Link to={`/tutorials/${tutorial.slug}`}>{tutorial.title}</Link></li>
                  ) : null
                })}
              </ul>
            </div>
          ))}
        </div>
        {categoryId && visibleCategories.length === 0 && (
          <div className="panel empty-state">
            <p>Category not found.</p>
            <Link className="primary-btn" to="/categories">View all categories</Link>
          </div>
        )}
      </section>
    </main>
  )
}
