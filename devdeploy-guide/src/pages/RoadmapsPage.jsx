import { roadmap } from '../data/tutorials'

export default function RoadmapsPage() {
  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h2>Roadmaps</h2>
        </div>

        <div className="changelog-list">
          {roadmap.map((entry) => (
            <article key={`${entry.version}-${entry.title}`} className="panel">
              <p className="tiny-label">{entry.version}</p>
              <h3>{entry.title}</h3>
              <ul>
                {entry.details.map((detail) => <li key={`${entry.version}-${entry.title}-${detail}`}>{detail}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
