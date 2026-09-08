export const featureFlags = {
  workspace: true,
  missions: true,
  challenges: true,
  terminal: true,
  gitVisualizer: true,
  debuggingLabs: true,
  architectureBuilder: true,
  xpSystem: true,
  dailyChallenges: true,
  tools: true,
  cheatsheets: true,
  aiAssistant: false,
}

export function isFeatureEnabled(featureName) {
  return Boolean(featureFlags[featureName])
}

export function getEnabledFeatures() {
  return Object.entries(featureFlags)
    .filter(([, enabled]) => enabled)
    .map(([key]) => key)
}
