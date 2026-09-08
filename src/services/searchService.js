import { categories } from '../data/tutorials'
import { getAllTutorials } from './tutorialService'

export function searchContent(query) {
  const term = String(query || '').trim().toLowerCase()
  if (!term) return []

  const tutorialResults = []
  const sectionResults = []
  const categoryResults = []

  const containsTerm = (value) => String(value || '').toLowerCase().includes(term)

  getAllTutorials().forEach((tutorial) => {
    const getSectionText = (section) => [
      section.title,
      ...(section.content || []),
      ...(section.links || []).map((link) => `${link.label} ${link.url}`),
      ...(section.commands || []).map((command) => `${command.label} ${command.code} ${command.explanation}`),
    ].join(' ')
    const sectionText = (tutorial.sections || []).map(getSectionText).join(' ')
    const tutorialText = [
      tutorial.title,
      tutorial.description,
      tutorial.category,
      tutorial.categoryId,
      tutorial.difficulty,
      ...(tutorial.tags || []),
      sectionText,
    ].join(' ')

    if (containsTerm(tutorialText)) {
      tutorialResults.push({ type: 'Tutorial', label: tutorial.title, slug: tutorial.slug })
    }

    tutorial.sections?.forEach((section) => {
      if (containsTerm(getSectionText(section))) {
        sectionResults.push({ type: 'Section', label: `${tutorial.title} → ${section.title}`, slug: tutorial.slug })
      }
    })
  })

  categories.forEach((category) => {
    if (containsTerm(category.name) || containsTerm(category.id)) {
      categoryResults.push({ type: 'Category', label: category.name, slug: `categories/${category.id}` })
    }
  })

  return [...tutorialResults, ...categoryResults, ...sectionResults].slice(0, 10)
}
