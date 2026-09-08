import { tutorialData } from '../data/tutorials'
import databaseTutorials from '../data/databaseTutorials'
import { getPublishedTutorials } from './tutorialBuilderService'

function getCatalog() {
  return [...tutorialData, ...databaseTutorials, ...getPublishedTutorials()]
}

export function getAllTutorials() {
  return getCatalog()
}

export function getTutorialBySlug(slug) {
  return getCatalog().find((tutorial) => tutorial.slug === slug)
}

export function getTutorialById(id) {
  return getCatalog().find((tutorial) => tutorial.id === id)
}

export function getTutorialsByCategory(categoryId) {
  return getCatalog().filter((tutorial) => tutorial.categoryId === categoryId)
}

export function computeProgress(progressMap) {
  const total = getCatalog().length
  const completed = Object.values(progressMap || {}).filter((value) => value >= 100).length
  return Math.round((completed / total) * 100)
}
