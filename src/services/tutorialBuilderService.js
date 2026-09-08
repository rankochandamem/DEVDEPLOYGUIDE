import { categories, tutorialData } from '../data/tutorials'

const STORAGE_KEY = 'devdeploy-tutorial-builder-v1'

function readState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const state = raw ? JSON.parse(raw) : {}
    return {
      drafts: Array.isArray(state.drafts) ? state.drafts : [],
      published: Array.isArray(state.published) ? state.published : [],
      versions: state.versions || {},
    }
  } catch (error) {
    console.warn('Tutorial builder storage unavailable', error)
    return { drafts: [], published: [], versions: {} }
  }
}

function writeState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  return state
}

function makeId(prefix = 'custom-tutorial') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function createEmptyTutorial() {
  return {
    id: makeId(),
    slug: `new-tutorial-${Date.now()}`,
    title: 'Untitled Tutorial',
    description: '',
    category: categories[0]?.name || 'General',
    categoryId: categories[0]?.id || 'git',
    difficulty: 'Beginner',
    estimatedTime: '15 minutes',
    lessons: 1,
    prerequisites: [],
    tags: [],
    status: 'Draft',
    sections: [
      {
        id: makeId('section'),
        title: 'Introduction',
        blocks: [{ id: makeId('block'), type: 'text', content: 'Start writing your tutorial here.' }],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export function getBuilderState() {
  return readState()
}

export function getDrafts() {
  return readState().drafts
}

export function getPublishedTutorials() {
  return readState().published
}

export function saveDraft(tutorial) {
  const state = readState()
  const next = { ...tutorial, status: 'Draft', updatedAt: new Date().toISOString() }
  const index = state.drafts.findIndex((item) => item.id === next.id)
  if (index === -1) state.drafts.unshift(next)
  else state.drafts[index] = next
  writeState(state)
  return next
}

export function publishTutorial(tutorial) {
  const validation = validateTutorial(tutorial)
  if (validation.errors.length) return { tutorial, validation }

  const state = readState()
  const next = { ...tutorial, status: 'Published', updatedAt: new Date().toISOString() }
  const index = state.published.findIndex((item) => item.id === next.id)
  if (index === -1) state.published.unshift(next)
  else state.published[index] = next
  state.drafts = state.drafts.filter((item) => item.id !== next.id)
  writeState(state)
  return { tutorial: next, validation }
}

export function duplicateTutorial(tutorial) {
  const copy = structuredClone(tutorial)
  copy.id = makeId()
  copy.slug = `${tutorial.slug}-copy-${Date.now()}`
  copy.title = `${tutorial.title} Copy`
  copy.status = 'Draft'
  copy.createdAt = new Date().toISOString()
  copy.updatedAt = copy.createdAt
  return saveDraft(copy)
}

export function deleteDraft(id) {
  const state = readState()
  state.drafts = state.drafts.filter((item) => item.id !== id)
  writeState(state)
}

export function saveVersion(tutorial) {
  const state = readState()
  const history = state.versions[tutorial.id] || []
  state.versions[tutorial.id] = [{ ...structuredClone(tutorial), savedAt: new Date().toISOString() }, ...history].slice(0, 10)
  writeState(state)
}

export function getVersions(id) {
  return readState().versions[id] || []
}

export function validateTutorial(tutorial) {
  const errors = []
  const warnings = []
  if (!tutorial.title?.trim()) errors.push('Title is required.')
  if (!tutorial.slug?.trim()) errors.push('Slug is required.')
  if (!tutorial.description?.trim()) errors.push('Description is required.')
  if (!tutorial.categoryId) errors.push('Category is required.')
  if (!tutorial.sections?.length) errors.push('At least one section is required.')

  tutorial.sections?.forEach((section, sectionIndex) => {
    if (!section.title?.trim()) errors.push(`Section ${sectionIndex + 1} needs a title.`)
    section.blocks?.forEach((block, blockIndex) => {
      if (block.type === 'text' && !block.content?.trim()) errors.push(`Section ${sectionIndex + 1}, block ${blockIndex + 1} is empty.`)
      if (block.type === 'code' && (!block.code?.trim() || !block.language?.trim())) errors.push(`Code block ${blockIndex + 1} needs language and code.`)
      if (block.type === 'image' && !block.altText?.trim()) warnings.push(`Image block ${blockIndex + 1} needs alt text.`)
    })
  })

  if (!tutorial.tags?.length) warnings.push('Add tags to make the tutorial easier to find.')
  return { errors, warnings, valid: errors.length === 0 }
}

export function exportTutorial(tutorial) {
  return JSON.stringify(tutorial, null, 2)
}

export function importTutorial(raw) {
  const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
  const next = { ...parsed, id: makeId(), status: 'Draft', updatedAt: new Date().toISOString() }
  return saveDraft(next)
}

export function getAllTutorialsWithPublished() {
  return [...tutorialData, ...getPublishedTutorials()]
}
