import { getAllTutorials } from './tutorialService'

export function getRecommendations(completedTutorialIds = []) {
  const completed = new Set(completedTutorialIds)
  const catalog = getAllTutorials().filter((tutorial) => !completed.has(tutorial.id))

  return catalog.slice(0, 3).map((tutorial) => ({
    title: tutorial.title,
    reason: 'Builds on your recent progress and deployment concepts.',
    slug: tutorial.slug,
  }))
}
