const STORAGE_KEY = 'devdeploy-guide-state';

export function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { progress: {}, bookmarks: [], notes: {}, theme: 'dark' }
  } catch (error) {
    console.warn('Storage unavailable', error)
    return { progress: {}, bookmarks: [], notes: {}, theme: 'dark' }
  }
}

export function writeStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('Unable to save state', error)
  }
}

export function getProgress() {
  return readStorage().progress || {}
}

export function getLearningPathUnlocks() {
  return readStorage().learningPathUnlocks || ['git-installation']
}

export function unlockLearningStep(slug) {
  const state = readStorage()
  const unlocks = new Set(state.learningPathUnlocks || ['git-installation'])
  unlocks.add(slug)
  state.learningPathUnlocks = [...unlocks]
  writeStorage(state)
  return state.learningPathUnlocks
}

export function setProgress(tutorialId, value) {
  const state = readStorage()
  state.progress[tutorialId] = value
  writeStorage(state)
}

export function toggleBookmark(tutorialId) {
  const state = readStorage()
  const exists = state.bookmarks.includes(tutorialId)
  state.bookmarks = exists ? state.bookmarks.filter((id) => id !== tutorialId) : [...state.bookmarks, tutorialId]
  writeStorage(state)
  return state.bookmarks
}

export function getBookmarks() {
  return readStorage().bookmarks || []
}

export function saveNote(tutorialId, text) {
  const state = readStorage()
  state.notes[tutorialId] = text
  writeStorage(state)
}

export function getNote(tutorialId) {
  return readStorage().notes?.[tutorialId] || ''
}

export function getRecentSearches() {
  return readStorage().recentSearches || []
}

export function saveRecentSearch(term) {
  const value = String(term || '').trim()
  if (!value) {
    return getRecentSearches()
  }

  const state = readStorage()
  const existing = state.recentSearches || []
  const updated = [value, ...existing.filter((item) => item.toLowerCase() !== value.toLowerCase())].slice(0, 6)
  state.recentSearches = updated
  writeStorage(state)
  return updated
}
