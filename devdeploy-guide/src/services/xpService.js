const STORAGE_KEY = 'devdeploy-xp-v1'

export function getUserProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {
      xp: 1240,
      level: 7,
      streak: 7,
      tutorialsCompleted: 11,
      quizzesCompleted: 4,
      challengesCompleted: 2,
      missionsCompleted: 1,
    }
  } catch (error) {
    console.warn('XP state unavailable', error)
    return {
      xp: 1240,
      level: 7,
      streak: 7,
      tutorialsCompleted: 11,
      quizzesCompleted: 4,
      challengesCompleted: 2,
      missionsCompleted: 1,
    }
  }
}

export function saveUserProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return state
  } catch (error) {
    console.warn('Unable to save XP progress', error)
    return state
  }
}

export function addXp(amount) {
  const state = getUserProgress()
  state.xp = (state.xp || 0) + amount
  state.level = Math.max(1, Math.floor(state.xp / 250) + 1)
  saveUserProgress(state)
  return state
}
