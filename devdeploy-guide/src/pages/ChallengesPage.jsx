import { getChallenges } from '../services/challengeService'

export default function ChallengesPage() {
  const challenges = getChallenges()

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h2>Build Challenges</h2>
        </div>

        <div className="tutorial-grid">
          {challenges.map((challenge) => (
            <article key={challenge.id} className="panel challenge-card">
              <p className="tiny-label">{challenge.difficulty}</p>
              <h3>{challenge.title}</h3>
              <p>{challenge.objective}</p>
              <ul>
                {challenge.requirements.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="warning-box">
                <strong>Expected result</strong>
                <p>{challenge.expectedResult}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
