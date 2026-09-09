export const mediaLibrary = [
  {
    id: 'github-repository-configuration',
    filename: 'github-repository-configuration.svg',
    url: '/media/github-repository-configuration.svg',
    altText: 'GitHub create repository form with repository configuration options',
    caption: 'Figure 2 — Configure the new GitHub repository',
    description: 'Enter a repository name, choose visibility, and create the repository.',
    width: 768,
    height: 780,
    fileSize: 'Local SVG asset',
    tags: ['github', 'repository', 'configuration'],
    createdAt: '2026-09-08',
    annotations: [
      { type: 'callout', label: 'Create repository', x: 80, y: 93, color: '#3fb950' },
    ],
  },
  {
    id: 'git-install-page',
    filename: 'git-install-page.svg',
    url: '/media/git-install-page.svg',
    altText: 'Git for Windows download page with the Windows installer link highlighted',
    caption: 'Figure 1 — Git for Windows download page',
    description: 'Choose the Windows x64 installer from the official Git download page.',
    width: 966,
    height: 730,
    fileSize: 'Local SVG asset',
    tags: ['git', 'windows', 'installation', 'download'],
    createdAt: '2026-09-08',
    annotations: [
      { type: 'callout', label: 'Download Git', x: 31, y: 32, color: '#f27a3d' },
    ],
  },
  {
    id: 'github-new-repo',
    filename: 'image-1788874019418.png',
    url: '/media/image-1788874019418.png',
    altText: 'GitHub repository creation interface',
    caption: 'Figure 1 — GitHub repository creation panel',
    description: 'Click the + button and choose New repository.',
    width: 633,
    height: 473,
    fileSize: 'Local PNG asset',
    tags: ['github', 'repository', 'setup'],
    createdAt: '2026-09-08',
    annotations: [
      { type: 'marker', label: '1', x: 18, y: 20, color: '#8b5cf6' },
      { type: 'callout', label: 'Click here', x: 20, y: 10, color: '#3b82f6' },
    ],
  },
  {
    id: 'render-web-service',
    filename: 'render-web-service.svg',
    url: '/media/render-web-service.svg',
    altText: 'Render web service setup screen',
    caption: 'Figure 2 — Render Create Web Service flow',
    description: 'Select New + and then Web Service to connect your repo.',
    width: 1200,
    height: 800,
    fileSize: 'Local SVG asset',
    tags: ['render', 'deployment', 'service'],
    createdAt: '2026-09-08',
    annotations: [
      { type: 'marker', label: '2', x: 30, y: 35, color: '#10b981' },
    ],
  },
  {
    id: 'github-push-flow',
    filename: 'git-push-flow.svg',
    url: '/media/git-push-flow.svg',
    altText: 'Git command flow to push code to GitHub',
    caption: 'Figure 3 — Git push flow',
    description: 'Use git add, git commit, and git push to publish your project.',
    width: 1200,
    height: 620,
    fileSize: 'Local SVG asset',
    tags: ['github', 'git', 'push'],
    createdAt: '2026-09-08',
    annotations: [
      { type: 'callout', label: 'git push', x: 53, y: 24, color: '#f59e0b' },
    ],
  },
  {
    id: 'screenshot-dashboard',
    filename: 'logo2.png',
    url: '/media/logo2.png',
    altText: 'DevDeploy Guide screenshot preview',
    caption: 'Figure 4 — DevDeploy Guide visual',
    description: 'Brand and interface preview image for the app layout.',
    width: 1200,
    height: 820,
    fileSize: 'Local PNG asset',
    tags: ['screenshot', 'design', 'brand'],
    createdAt: '2026-09-08',
    annotations: [
      { type: 'marker', label: 'UI', x: 20, y: 20, color: '#8b5cf6' },
    ],
  },
]

export function getMediaLibrary() {
  return mediaLibrary
}

export function getAllTags() {
  return Array.from(new Set(mediaLibrary.flatMap((item) => item.tags))).sort()
}

export function searchMedia(query) {
  const term = String(query || '').trim().toLowerCase()
  if (!term) return mediaLibrary

  return mediaLibrary.filter((item) => {
    const haystack = [item.filename, item.caption, item.description, item.tags.join(' ')].join(' ').toLowerCase()
    return haystack.includes(term)
  })
}
