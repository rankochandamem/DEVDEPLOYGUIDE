import { roadmap } from '../data/tutorials'

export default function ChangelogPage() {
  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h2>Changelog & Roadmaps</h2>
        </div>

        <div className="changelog-list">
          {roadmap.map((item) => (
            <article key={`${item.version}-${item.title}`} className="panel">
              <p className="tiny-label">{item.version}</p>
              <h3>{item.title}</h3>
              <ul>
                {item.details.map((detail) => <li key={`${item.version}-${item.title}-${detail}`}>{detail}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
