import { Link } from 'react-router-dom'

export default function ResourcesPage() {
  const resources = [
    { title: 'Git Docs', url: 'https://git-scm.com/doc', category: 'Git' },
    { title: 'GitHub Docs', url: 'https://docs.github.com/', category: 'GitHub' },
    { title: 'Render Docs', url: 'https://render.com/docs', category: 'Deploy' },
    { title: 'Vercel Docs', url: 'https://vercel.com/docs', category: 'Deploy' },
    { title: 'React Docs', url: 'https://react.dev/', category: 'Frontend' },
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', category: 'Frontend' },
    { title: 'Vite Docs', url: 'https://vite.dev/guide/', category: 'Tooling' },
    { title: 'npm Docs', url: 'https://docs.npmjs.com/', category: 'Tooling' },
    { title: 'Docker Docs', url: 'https://docs.docker.com/', category: 'Containers' },
    { title: 'JavaScript.info', url: 'https://javascript.info/', category: 'JavaScript' },
    { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', category: 'TypeScript' },
    { title: 'Postman Learning Center', url: 'https://learning.postman.com/', category: 'APIs' },
  ]

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h2>Resources</h2>
        </div>

        <div className="resource-grid">
          {resources.map((resource) => (
            <a key={resource.title} href={resource.url} target="_blank" rel="noreferrer" className="resource-card">
              <span>{resource.category}</span>
              <strong>{resource.title}</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
